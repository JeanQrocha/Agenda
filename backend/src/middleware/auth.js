import jwt from "jsonwebtoken"
import ServiceUser from "../service/clientes.js"

const JWT_SECRET = "S3gr3do"

export default function authMiddleware(roles = []) {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']

            const tokenJwt = token.split(" ")[1];

            if (!token) {
                throw new error(" Você nao tem permissão para realizar essa ação")
            }

            const decoded = jwt.verify(tokenJwt, JWT_SECRET)

            const user = await ServiceUser.FindOne(decoded.id)

            if (roles.length &&
                !roles.includes(user.permissao)) {
                throw new Error("Você nao tem permissão para realizar essa ação")
            }

            req.headers.user = user

            next()
        } catch (error) {
            res.status(403).send({
                data: null,
                msg: error.message,
                error: true
            })
        }
    }
}

// export default async function authMiddleware(req, res, next) {

// }