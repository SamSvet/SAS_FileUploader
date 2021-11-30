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

/*Process list for demo*/
data fileParamsType;
attrib
    value             length=$16
    label             length=$32
    target_table      length=$32
    target_table_dyn  length=$32
    columns           length=$1024
    columns_dyn       length=$1024
    check_stp         length=$256
    load_stp          length=$256
    select_checks_stp length=$256
;
check_stp='/Apps/SASUploader/checkData';load_stp='/Apps/SASUploader/loadData';select_checks_stp='/Apps/SASUploader/selectChecks';
value='sashelp_shoes';label='shoes list';target_table='SASHELP.SHOES';columns="%varlist(SASHELP.SHOES, dlm=%str(,))";
output;
value='sashelp_class';label='class list';target_table='SASHELP.CLASS';columns="%varlist(SASHELP.CLASS, dlm=%str(,))";
output;
run;

%bafheader;
    %bafOutDataset(fileParamsType, work, fileParamsType);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(process time=&time);
    %let usermessage=%str(&_program: successfully completed);
%bafFooter;