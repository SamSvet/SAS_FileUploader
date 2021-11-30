%macro varlist(tablename, dlm=%str( ));
    %local varlist resDlm;
    %let varlist=;
    %let resDlm=;
    %let dsid=%sysfunc(open(&tablename,i));
    %if &dsid>0 %then %do;
        %do varlistN=1 %to %sysfunc(attrn(&dsid, nvars));
            %let varlist=&varlist%superq(resDlm)%sysfunc(varname(&dsid, &varlistN));
            %let resDlm=&dlm;
        %end;
    %end;
    %let rc=%sysfunc(close(&dsid));
    &varlist
%mend;