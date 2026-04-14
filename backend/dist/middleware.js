import jwt, {} from 'jsonwebtoken';
export const middleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(400).json({
            msg: "Token not found"
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        if (!decoded || typeof decoded !== "object") {
            return res.status(401).json({
                msg: "Invalid token"
            });
        }
        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };
        next();
    }
    catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token"
        });
    }
};
//# sourceMappingURL=middleware.js.map