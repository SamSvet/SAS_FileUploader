%macro attrntype(tablename, type=NOBS);
    %let dsid=%sysfunc(open(&tablename,i));
    %if &dsid>0 %then %do;
        %sysfunc(attrn(&dsid,&type))
    %end;
    %else %do;
        -1
    %end;
    %let rc=%sysfunc(close(&dsid));
%mend;