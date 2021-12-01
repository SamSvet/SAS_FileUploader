%macro generate_rule_column;
data rule_column;
attrib
rule_num    length=8
rule_column length=$32
;
rule_num=1; rule_column='Product'; output;
rule_num=2; rule_column='Stores'; output;
rule_num=3; rule_column='Region'; output;
rule_num=4; rule_column='Returns'; output;
rule_num=5; rule_column='Sex'; output;
rule_num=6; rule_column='Age'; output;
rule_num=7; rule_column='Height'; output;
rule_num=8; rule_column='Weight'; output;
rule_num=9; rule_column='Name'; output;
run;
%mend;