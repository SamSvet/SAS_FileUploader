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

%generate_target;
/*Process list for demo*/
data fileParamsType(drop=rc);
length columns $1024;
set target(
     keep=check_stp load_stp select_checks_stp process_name process_cd target_table
     rename=(process_name=label process_cd=value)
);
rc=dosubl('%let col=%varlist('||target_table||', dlm=%str(,));');
columns=symget('col');
run;

%bafheader;
    %bafOutDataset(fileParamsType, work, fileParamsType);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(process time=&time);
    %let usermessage=%str(&_program: successfully completed);
%bafFooter;