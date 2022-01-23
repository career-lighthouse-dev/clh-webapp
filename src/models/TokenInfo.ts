export interface TokenInfo {
    tokenName: string;
    tokenValue: string;
    isLogin: boolean;
    loginId: any;
    loginType: string;
    tokenTimeout: BigInteger;
    sessionTimeout: BigInteger
    tokenSessionTimeout: BigInteger;
    tokenActivityTimeout: BigInteger;
    loginDevice: string;
}