type OpenSslMethod = "base64" | "hex" | "binary";
declare const genOpensslRand: (length: number, method?: OpenSslMethod) => string;
export default genOpensslRand;
//# sourceMappingURL=genOpenssl.d.ts.map