%macro generate_process_rule;
data process_rule;
attrib
process_cd  length=$16
rule_num    length=8
isfixed     length=3
;
process_cd='sashelp_shoes';rule_num=1;isfixed=1;output;
process_cd='sashelp_shoes';rule_num=2;isfixed=1;output;
process_cd='sashelp_shoes';rule_num=3;isfixed=0;output;
process_cd='sashelp_shoes';rule_num=4;isfixed=0;output;
process_cd='sashelp_class';rule_num=5;isfixed=1;output;
process_cd='sashelp_class';rule_num=6;isfixed=1;output;
process_cd='sashelp_class';rule_num=7;isfixed=0;output;
process_cd='sashelp_class';rule_num=8;isfixed=0;output;
process_cd='sashelp_class';rule_num=9;isfixed=0;output;
run;
%mend;