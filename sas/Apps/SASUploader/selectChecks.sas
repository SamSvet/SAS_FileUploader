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


%bafGetDatasets;/*here comes inputdata*/
resetline;

data _null_;
set inputdata(obs=1);
call symputx('PROCESS_CD', PROCESS_CD);
run;

 
/*all checks for demo*/
data allChecks;
attrib
    process_cd length=$16
    num        length=8
    isfixed    length=3
    columns    length=$1024
    label      length=$32
    value      length=$1024
;
process_cd='sashelp_shoes';
num=1; isfixed=1; columns='Product'; label=columns; value='Product - value should be in ("Boot", "Sandal", "Slipper")';
output;
num=2; columns='Stores'; label=columns;  value='Stores - Stores>=1 and Stores<=100';
output;
num=3; isfixed=0; columns='Region'; label=columns; value='Region - value should be in ("Africa", "Western Europe", "Pacific")';
output;
num=4; columns='Returns'; label=columns; value='Returns - Returns>=100.0 and Returns<=10000.0';
output;
process_cd='sashelp_class';
num=5; isfixed=1; columns='Sex'; label=columns; value='Sex - value should be in ("M", "F")';
output;
num=6; columns='Age'; label=columns;  value='Age - Age>=10 and Age<=16';
output;
num=7; isfixed=0; columns='Height'; label=columns; value='Height - Height>=50.0 and Height<=70.0';
output;
num=8; columns='Weight'; label=columns; value='Weight - Weight>=80.0 and Weight<=120.0';
output;
num=9; columns='Name'; label=columns; value='Name - Name="Sam"';
output;
run;

data selectCheckList;
set allChecks(where=(process_cd="&PROCESS_CD"));
run;

 

%bafheader;
    %bafOutDataset(selectCheckList, work, selectCheckList);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(process time=&time);
    %let usermessage=%str(&_program: successfully completed);
%bafFooter;