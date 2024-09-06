import { Request, Response, NextFunction } from 'express';
import { getIdByToken, verifyToken } from '../services/authService';
import { getUserById } from '../model/users';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies['TOKEN'];

    if (!token) {
        return res.status(401).json({ error: 'Token is missing or invalid' });
    }

    try {
        const user = verifyToken(token);
        (req as any).user = user;
        next();
    } catch (err) {
        console.error('Token verification failed:', err);
        return res.status(403).json({ error: 'Forbidden' });
    }
};

export const verifyId = async (req : Request , res : Response , next : NextFunction) => {
    const { id } = req.params;
    const token = req.cookies['TOKEN'];

    if(!token){
        return res.status(401).json({ error: 'Token is missing or invalid' });
    }

    try{
        const idFromToken = getIdByToken(token);
        if(idFromToken.id != id){
            return res.status(403).json({ error: 'Forbidden' });
        }
        next();
    }catch(err){
        console.error('Token verification failed:', err);
        return res.status(403).json({ error: 'Forbidden' });
    }
}