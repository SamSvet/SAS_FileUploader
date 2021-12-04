%macro read_file(mOutputData);
    %clearerr;
    %local mname;
    %let mname=&sysmacroname;
    %local &mname._iter;
    %do &mname._iter=0 %to &_WEBIN_FILE_COUNT;
        %put iter=[&&&sysmacroname._iter];
        %put input=[&&&&_WEBIN_name&&&mname._iter];
        %if (%UPCASE("&&&&_WEBIN_name&&&mname._iter") eq "MYFILE") %then %do;
            %let userFileName=%sysfunc(pathname(&&&&_WEBIN_FILEREF&&&sysmacroname._iter));
            %let userOriginalName=&&&&_WEBIN_FILENAME&&&sysmacroname._iter;
            %put &=userFileName;
            %put &=userOriginalName;
            filename qweasd "%sysfunc(pathname(&&&&_WEBIN_FILEREF&&&mname._iter))";
            %if ("&&&&_WEBIN_CONTENT_TYPE&&&mname._iter" eq "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") %then %do;
                proc import datafile=qweasd out=qweasd replace dbms=xlsx; getnames=YES; run;
            %end;
            %else %do;
                data _null_;
                    set meta(obs=1);
                    saslinebreak=tranwrd(substr(linebreak,2,length(linebreak)-2),'\r', 'cr');
                    saslinebreak=tranwrd(saslinebreak,'\n', 'lf');
                    call symputx('mvDelimiter', delimiter);
                    call symputx('mvLineBreak', linebreak);
                    call symputx('mvSASLineBreak', saslinebreak);
                    call symputx('mvFields', fields);
                run;
                %let mvFieldsQuoted="%qsysfunc(tranwrd(&MVFIELDS., %str( ), %str(%"n %")))"%str(n);
                data qweasd(keep=%unquote(&mvFieldsQuoted));
                    if 0 then set &targetTable;
                    infile qweasd firstobs=2 dsd missover dlm=&mvDelimiter termstr=&mvSASLineBreak encoding='utf-8';
                    input %unquote(&mvFieldsQuoted);
                run;
            %end;
            %get_common_columns_meta(QWEASD, &targetTable, common_columns);
            data &mOutputData / view=&mOutputData;
                set qweasd;
                %do_sametype(common_columns);
            run;
            %checkerr(Could not import data from &&&&_WEBIN_FILENAME&&&sysmacroname._iter);
            %return;
        %end;
    %end;
%mend;