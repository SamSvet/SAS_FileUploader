options mprint mlogic symbolgen fullstimer;

%macro xlsx_bak_delete(file=);
     data _null_;
          fname='todelete';
          rc = filename(fname, "&file..bak");
          rc = fdelete(fname);
          rc = filename(fname);
     run;
%mend;

%macro getExtListData(mvtable=, mvtype=);
     %let start=%sysfunc(datetime());
     
     %let filename=%sysfunc(pathname(WORK))/%nrstr(&)mvtable..xlsx;

     %if &mvtype >= 1 %then %do;
          %let mvfile2download=&mvtable._ERROR.xlsx;
          proc sql noprint;
                create view export2downloadR as
                select *
                from &mvtable where row_rc>=1;
          quit;
          %if %attrnType(export2downloadR,  type=ANY)>0 %then %do;
                proc export data=export2downloadR dbms=xlsx outfile="%unquote(&filename)" ;
                     sheet="Error";
                run;
          %end;
     %end;

     %else %if &mvtype < 0 %then %do;
          %let mvfile2download=&mvtable._WARNING.xlsx;
          proc sql noprint;
                create view export2downloadW as
                select *
                from &mvtable where row_rc<0;
          quit;
          %if %attrnType(export2downloadW,  type=ANY)>0 %then %do;
                proc export data=export2downloadW dbms=xlsx outfile="%unquote(&filename)" ;
                     sheet="Warning";
                run;
          %end;
     %end;

     %else %do;
          %let mvfile2download=&mvtable._SUCCESS.xlsx;
          proc sql noprint;
                create view export2downloadS as
                select *
                from &mvtable where row_rc=0;
          quit;
          %if %attrnType(export2downloadS,  type=ANY)>0 %then %do;
                proc export data=export2downloadS dbms=xlsx outfile="%unquote(&filename)" ;
                     sheet="Success";
                run;
          %end;
     %end;

     %xlsx_bak_delete(file=%unquote(&filename.));

     %let rc = %sysfunc(appsrv_header(Content-disposition,%str(attachement; filename=&mvfile2download.)));
     %let rc = %sysfunc(appsrv_header(Content-type,application/octet-stream));
 

filename in "%unquote(&filename)";

data _null_;
     length data $1;
     infile in recfm=n;
     file _webout recfm=n mod;
     input data $char1. @@;
     put data $char1. @@;
run;


%let time=%sysevalf(%sysfunc(datetime()) - &start );
%let time=%sysfunc(putn(&time, time8.));
%put &=time;
filename in clear;

%mend;

%getExtListData(mvtable=&TABLE., mvtype=&TYPE.);