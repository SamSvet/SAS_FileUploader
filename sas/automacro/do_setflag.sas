%macro do_setflag(
  mvDSCondition /*Condition Data Set. Should have columns: [rule_num,rule_condition,rule_value]*/
, mvFlagName    /*Data Set Column/Variable name*/
, mvCaseWhen=0  /*SQL Ansi 'case when' logic. 1=enable;0=disable. Disabled by default*/
);
    %local dsid rc;
    %let dsid=%sysfunc(open(&mvDSCondition(where=(^missing(rule_condition))), IS));
    %if &dsid>0 %then %do;
        DO _do_setflag_iter_=1 TO 1;
        %syscall set(dsid);
        %let rc = %sysfunc(fetch(&dsid));
        %do %while(&rc=0);
            %let rule_condition=&rule_condition;
            %let rule_value=&rule_value;
            IF &rule_condition THEN DO;    
                &mvFlagName=&rule_value;
                %if &mvCaseWhen=1 %then %do; LEAVE; %end;
            END;
            %let rc = %sysfunc(fetch(&dsid));
        %end;
        %let rc=%sysfunc(close(&dsid));
        END;
    %end;
%mend;