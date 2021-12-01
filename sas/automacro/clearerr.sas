%macro clearerr;
    %global _RC_ _RS_ SQLRC SQLXRC;
    %let _RC_=0;
    %let _RS_=;
    %let SYSCC=0;
    %let SQLRC=0;
    %let SQLXRC=0;
%mend clearerr;