%macro generate_conditionrc_overall;
data conditionRC_overall;
attrib
    rule_num             length=8
    rule_condition       length=$1024
    rule_value           length=$256
;
rule_num=1; rule_condition='1=1'; rule_value='ifn(max(of RC_ARR{*})=0, min(of RC_ARR{*}), max(of RC_ARR{*}))'; 
run;
%mend;