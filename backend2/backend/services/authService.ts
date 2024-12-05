import bcrypt from "bcryptjs";
import User from "../models/user";

interface IUser {
    username: string;
    password: string;
}

export const hashPassword = async (password: string): Promise<string> => {
    try {
        return await bcrypt.hash(password, 10);
    } catch (error) {
        throw new Error("Şifre hash'lenirken bir hata oluştu");
    }
};

export const createUser = async (userData: IUser) => {
    try {
        const { username, password } = userData;

        // Kullanıcı mevcut mu kontrol et
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error("Bu kullanıcı adı zaten alınmış");
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        return await newUser.save();
    } catch (error) {
        throw error;
    }
};
