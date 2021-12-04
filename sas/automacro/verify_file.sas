%macro verify_file(mUserData, mTempData, mProgramData, mProgramResult, mTargetTable);
    %clearerr;
    %local mname;
    %let mname=&sysmacroname;

    data &mTempData(keep=%varlist(&mUserData) row_rc row_rs LineNum )
        &mProgramData(keep=RC CNT DESC TABLENAME);
        length row_rc 8 row_rs $200 ;
        retain sumRC sumOK sumWR ;
        drop sumRC sumOK sumWR ;
        set &mUserData end=eof;

        LineNum=_n_;
        array RC_ARR{%obsnum(conditionRC)} 8 ;
        %do_setflag_array(conditionRC, RC_ARR);
        %do_setflag(conditionRC_overall, row_rc);
        %do_setflag(conditionRS, row_rs);         

        if row_rc>0 then sumRC+1;
        else if row_rc=0 then sumOK+1;
        else if row_rc<0 then sumWR+1

        if eof then do;
            if sumOK>0 then do;
                RC=0; CNT=sumOK; DESC="Success"; TABLENAME="&mTempData";
                output &mProgramData;
            end;
            if sumRC>0 then do;
                RC=1; CNT=sumRC; DESC="Error"; TABLENAME="&mTempData";
                output &mProgramData;
            end;
            if sumWR>0 then do;
                RC=-1; CNT=sumWR; DESC="Warning"; TABLENAME="&mTempData";
                output &mProgramData;
            end;
        end;
        output &mTempData;
    run;
    %checkerr(&mname: Error verifying user data);

    data &mProgramResult;
        RC=&_RC_;RS="&_RS_";
    run;
%mend;