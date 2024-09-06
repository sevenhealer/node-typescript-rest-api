import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '1h';

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const getIdByToken = (token: string): any => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        return decoded;
    } catch (err) {
        throw new Error('Invalid or expired token');
    }
}
