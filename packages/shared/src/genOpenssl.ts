import { execSync } from "child_process";

type OpenSslMethod = "base64" | "hex" | "binary";

//cmd to generate key: openssl rand -base64 172 | tr -d '\n'
const genOpensslRand = (length: number, method: OpenSslMethod = "base64") => {
  const cmd = `openssl rand -${method} ${length} | tr -d '\\n'`;

  const key = execSync(cmd).toString();
  return key;
};

export default genOpensslRand;
