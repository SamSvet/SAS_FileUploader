%macro load_data(mInputName, mCheckResult);
     %clearerr;
     %let mname=&sysmacroname;
     data program_data;
          length key value $100;
          stop;
     run;
     data program_result;
          RC=&_RC_;RS="&_RS_";
     run;
     %if &mSucCnt eq 0 %then %goto exit;

     data _null_;
     set sashelp.vmember(where=(libname='SASUSER') obs=1);
     last_slash=length(path)-length(scan(path,-1, '/'));
     call symputx('tmppath', substr(path, 1, last_slash));
     run;

     libname TMP "&tmppath";

     %if %sysfunc(libref(TMP)) %then %do;
          %seterr(Could not assign TMP library);
          %goto exit;
     %end;

     %if ^%sysfunc(exist(&mInputName)) %then %do;
          %seterr(Input data not found);
          %goto exit;
     %end;

     /*This is where the user data is handled*/
     /*For demo use-case i am clearing temporary data*/
     proc sql noprint;
          drop table &mTmpDSName;
     quit;

%exit:
     data params;
          USER_DATA="&mTmpDSName";
          DATE_LOAD=datetime();
          FILE_NAME="&mFileName";
          FILE_USAGE_PERIOD=0;
          PROCESS_NAME="&mProcessName";
          GOOD_COUNT=&mSucCnt;
          BAD_COUNT=%eval(&mErrCnt + &mWrnCnt);
          ERROR_TEXT="&_RS_";
          STATUS=ifc(&_RC_>0, 'ERROR', 'SUCCESS');
          LOAD_PID=&sysjobid;
          LOAD_USER="&_METAUSER";
          LOAD_IP="&_RMTADDR";
     run;

     proc transpose data=params out=tran label=label name=Key PREFIX=Column ;
          var _all_;
     run;

    data program_data;
        label Key='KEY';
        length Key $32 VALUE $128;drop Column1;
        set tran(keep=Key Column:);
        VALUE=left(trim(Column1));
    run;

    data program_result;
        RC=&_RC_;RS="&_RS_";
    run;
    %if &_RC_ %then %do;
        %let usermessage=%str(&_program: ended with errors);
        %let logmessage=%str(exit code=&_RC_:&_RS_);
    %end;
    %else %do;
        %let usermessage=%str(&_program: completed successfully);
        %let logmessage=%str(exit code=&_RC_:temporary table=&tempData);
    %end;
%mend;