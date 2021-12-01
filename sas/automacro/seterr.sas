%macro seterr(mvMessage, mvCode=1);
    %global _RC_ _RS_ ;
    %let _RC_=&mvCode;
    %let _RS_=&mvMessage;
%mend;