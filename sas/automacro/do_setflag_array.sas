%macro do_setflag_array(
  mvDSCondition /*Condition Data Set. Should have columns: [rule_num,rule_condition,rule_value]*/
, mvFlagName    /*Data Set Column/Variable name*/
);
    %local dsid rc &sysmacroname._iter;
    %let dsid=%sysfunc(open(&mvDSCondition(where=(^missing(rule_condition))), IS));
    %if &dsid>0 %then %do;
        DO;
        %syscall set(dsid);
        %let rc = %sysfunc(fetch(&dsid));
        %let &sysmacroname._iter=1;
        %do %while(&rc=0);
            %let rule_condition=&rule_condition;
            %let rule_value=&rule_value;
            IF &rule_condition THEN DO;    
                &mvFlagName[&&&sysmacroname._iter]=&rule_value;
            END;
            %let &sysmacroname._iter=%eval(&&&sysmacroname._iter + 1);
            %let rc = %sysfunc(fetch(&dsid));
        %end;
        %let rc=%sysfunc(close(&dsid));
        END;
    %end;
%mend;