import { getUsers, createUser, getUserByEmail, deleteUserById, updateUserById, getUserById } from "../model/users";
import { Request, Response } from "express";
import { hashPassword , verifyPassword} from "../services/userService";
import { generateToken } from "../services/authService";

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await createUser({
            username,
            email,
            authentication: {
                password: hashedPassword
            }
        });

        return res.status(201).json({ 
            message: "User created successfully", 
            user: {
                username: user.username,
                email: user.email
            } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await getUserByEmail(email);

        if (!user || !user.authentication || !user.authentication.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        const isPasswordValid = await verifyPassword(password, user.authentication.password);
        

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const token = generateToken(user._id.toString());

        res.cookie('TOKEN', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000,
            sameSite: 'lax'
        });
        
        return res.status(200).json({ message: 'Login successful' });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getAllUsers = async (req : Request , res : Response) => {
    try{
        const user = await getUsers();

        return res.status(200).json(user)
    }catch(err){
        console.error(err);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req : Request , res : Response) => {
    try{
        const { id } = req.params;
        
        const deletedUser = await deleteUserById(id);

        return res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser
        });
    }catch(err){
        console.error(err);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = req.body;
    try {
        const user = await getUserById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        user.username = username;
        const updatedUser = await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
