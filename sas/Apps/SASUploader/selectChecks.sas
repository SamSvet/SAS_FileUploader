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

%bafGetDatasets;/*here comes inputdata dataset*/
resetline;

data _null_;
set inputdata(obs=1);
call symputx('PROCESS_CD', PROCESS_CD);
run;

%generate_rule_column;
proc sort data=rule_column;by rule_num;run;
data col(drop=rule_column);
set rule_column; by rule_num;
length columns $1024;
retain columns;
if first.rule_num then call missing(columns);
columns=catx(',', columns, rule_column);
if last.rule_num then output;
run;
 
%generate_target;
%generate_condition;
%generate_process_rule;
proc sql noprint;
create table selectCheckList as
select p.process_cd, r.rule_num as num, r.isfixed, col.columns, c.label, c.value
from target as p
inner join process_rule r on p.process_cd=r.process_cd
inner join col on col.rule_num=r.rule_num
inner join condition c on c.rule_num=r.rule_num
where p.process_cd="&PROCESS_CD";
quit; 

%bafheader;
    %bafOutDataset(selectCheckList, work, selectCheckList);
    %let time=%sysevalf(%sysfunc(datetime()) - &start );
    %let time=%sysfunc(putn(&time, time8.));
    %let logmessage=%str(process time=&time);
    %let usermessage=%str(&_program: successfully completed);
%bafFooter;