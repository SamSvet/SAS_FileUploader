%let start=%sysfunc(datetime());
%let commonMacroPath=/full/path/to/custom/automacro;
%include "/full/path/to/h54s.sas";
options mprint mlogic nosyntaxcheck nostsuffix MAUTOSOURCE;

%macro append_sasautos(newPath);
%if %index(%sysfunc(getoption(SASAUTOS)), &newPath)=0 %then %do;
    options append=SASAUTOS=("&newPath");
%end;
%mend;
%append_sasautos(&commonMacroPath);

/*here comes data sets - inputData, checkResult */
%bafGetDatasets;
resetline;

%global _RC_ _RS_ logmessage usermessage mTmpDSName mErrCnt mWrnCnt mSucCnt INTERCHECKBOXWRN PROCESS_CD USERFILENAME TARGET_TABLE;
data _null_;
    set inputData(obs=1 encoding='utf-8');
    call symputx("USERFILENAME", USERFILENAME);
    call symputx("PROCESS_CD", PROCESS_CD);
    call symputx("INTERCHECKBOXWRN", INTERCHECKBOXWRN);
run;

data _null_;
    set checkResult(encoding='utf-8');
    if RC>0 then call symputx("mErrCnt", CNT);
    else if RC<0 then call symputx("mWrnCnt", CNT);
    else call symputx("mSucCnt", CNT);
    if _n_=1 then call symputx("mTmpDSName", TABLENAME);
run;

%generate_target;
data _null_;
set target(where=(PROCESS_CD="&PROCESS_CD") keep=PROCESS_CD TARGET_TABLE);
call symputx("TARGET_TABLE", TARGET_TABLE);
run;

%load_data(inputData, checkResult);

%bafHeader;
    %bafOutDataset(data, work, program_data);
    %bafOutDataset(result, work, program_result);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(&logmessage, process time=&time);
%bafFooter;