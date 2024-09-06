import mongoose, { Document, Model } from 'mongoose';

interface IAuthentication {
    password: string;
}

interface IUser extends Document {
    username: string;
    email: string;
    authentication: IAuthentication;
}

const UserSchema = new mongoose.Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    authentication: {
        password: { type: String, required: true, select: false },
    },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export const getUsers = async () => {
    try {
        return await UserModel.find();
    } catch (error) {
        console.error('Error fetching all the users:', error);
        throw error;
    }
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        return await UserModel.findOne({ email }).select('+authentication.password').exec();
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
};

export const getUserById = async (id: string): Promise<IUser | null> => {
    try {
        return await UserModel.findById(id).exec();
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

export const createUser = async (values: Record<string, any>): Promise<IUser> => {
    try {
        const user = new UserModel(values);
        return await user.save().then((user) => user.toObject());
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

export const deleteUserById = async (id: string): Promise<IUser | null> => {
    try {
        return await UserModel.findByIdAndDelete(id).exec();
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        throw error;
    }
};

export const updateUserById = async (id: string, values: Record<string, any>): Promise<IUser | null> => {
    try {
        return await UserModel.findByIdAndUpdate(id, values, { new: true }).exec();
    } catch (error) {
        console.error('Error updating user by ID:', error);
        throw error;
    }
};
