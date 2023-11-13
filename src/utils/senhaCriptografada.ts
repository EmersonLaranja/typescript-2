import crypto from "crypto";

const criarSenhaCriptografada = (senha: string) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.createHmac("sha256", salt);
    hash.update(senha);
    return hash.digest("hex");
};

export { criarSenhaCriptografada };