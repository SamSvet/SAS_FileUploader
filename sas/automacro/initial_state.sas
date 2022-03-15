%macro initial_state;
    %clearerr;
    %local mname;
    %let mname=&sysmacroname;

    data _null_;
    set sashelp.vmember(where=(libname='SASUSER') obs=1);
    last_slash=length(path)-length(scan(path,-1, '/'));
    call symputx('tmppath', substr(path, 1, last_slash));
    run;

    libname TMP "&tmppath";
    %if %sysfunc(libref(TMP)) %then %do;
        %seterr(Could not assign TMP library);
        %return;
    %end;

    %let tempData=TMP.FILEUPLOADER_%sysfunc(round(%sysfunc(datetime())));
    data program_data;
        length rc 8 desc $10 cnt 8;
        stop;
    run;

    data program_result;
        RC=&_RC_;RS="&_RS_";
    run;

    %generate_target;
    data _null_;
    set target(where=(PROCESS_CD="&PROCESS_CD"));
    call symputx('TARGET_TABLE', TARGET_TABLE);
    run;

    %generate_rule_column;
    proc sort data=rule_column;by rule_num;run;
    data cols(drop=rule_column);
        set rule_column; by rule_num;
        length columns $1024;
        retain columns;
        if first.rule_num then call missing(columns);
        columns=catx(',', columns, rule_column);
        if last.rule_num then output;
    run;

    %generate_condition;
    %generate_conditionrc_overall;
    proc sql noprint;
    create table user_conditions as
    select a.rule_num, a.rule_condition, a.rule_description, a.rule_value, cols.columns
    from condition a, cols
    where 1=1
    and cols.rule_num=a.rule_num
    and (a.rule_num in (select num from selectChecks(encoding='utf-8')) or missing(a.label))
    order by rule_num;
    quit;

    data conditionRC(keep=rule_num rule_condition rule_value columns )
    conditionRS(
        keep=rule_num rule_conditionRS rule_description 
        rename=(rule_conditionRS=rule_condition rule_description=rule_value)
    );  
        set user_conditions;
        rule_conditionRS=cats('RC_ARR[', _n_, ']=', rule_value);
    run;
%mend;