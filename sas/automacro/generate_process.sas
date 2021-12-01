%macro generate_process;
data process;
attrib
     process_cd        length=$16
     process_name      length=$128
     target_table      length=$32
     target_table_dyn  length=$32
     check_stp         length=$256
     load_stp          length=$256
     select_checks_stp length=$256
;
check_stp='/Apps/SASUploader/checkData';
load_stp='/Apps/SASUploader/loadData';
select_checks_stp='/Apps/SASUploader/selectChecks';
process_cd='sashelp_shoes'; process_name='shoes list'; target_table='SASHELP.SHOES'; output;
process_cd='sashelp_class'; process_name='class list'; target_table='SASHELP.CLASS'; output;
run;
%mend;