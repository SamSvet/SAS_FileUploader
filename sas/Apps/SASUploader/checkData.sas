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

/*here comes data sets - meta, process, selectChecks */
%bafGetDatasets;
resetline;

%global _RC_ _RS_ logmessage usermessage tempData targetTable process userFileName userOriginalName;
data _null_;
    set process(obs=1);
    call symputx('PROCESS_CD', PROCESS_CD);
run;

%macro checkData;
    %clearerr;
    %local mname;
    %let mname=&sysmacroname;

    %initialState;
    %if &_RC_ %then %goto exit;

    %read_file(userData);
    %if &_RC_ %then %goto exit;

    %verify_file(userData, &tempData, program_data, program_result, &targetTable);
    %if &_RC_ %then %goto exit;
%exit:
    %if &_RC_ %then %do;
        %let usermessage=%str(&_program: ended with errors);
        %let logmessage=%str(exit code=&_RC_:&_RS_);
    %end;
    %else %do;
        %let usermessage=%str(&_program: completed successfully);
        %let logmessage=%str(exit code=&_RC_:temporary table=&tempData);
    %end;
%mend checkData;
%checkData;

%bafHeader;
    %bafOutDataset(data, work, program_data);
    %bafOutDataset(result, work, program_result);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(&logmessage, process time=&time);
%bafFooter;