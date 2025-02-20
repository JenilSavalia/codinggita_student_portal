import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: "Not authorized" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

export default protect;