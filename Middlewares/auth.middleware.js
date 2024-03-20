import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.authtoken.split(" ")[1];

        if (!token) return res.statuss(401).json({success: false, message: "Unauthorized request"});

        const decodedToken = jwt.verify(token, process.env.AUTH_TOKEN);
        req.userId = decodedToken._id;

        next();
    } catch (error) {
        return res.status(401).json({success: false, message: "Unauthorized request"});
    }
};
