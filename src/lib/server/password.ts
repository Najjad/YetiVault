import { User_Model } from "./models";

export async function add_password(
    userTag: string, 
    savedPasswords: Array<{ password: string, createdAt: Date }>
): Promise<{ error: string }> {
    try {
        const user = await User_Model.findOne({ userTag });
        
        if (!user) {
            return { error: 'userTag not found.' };
        }

        // Append new passwords to the user's savedPasswords array
        user.savedPasswords.push(...savedPasswords);

        // Save the updated user document
        await user.save();
        return { error: "" };
    } catch (err) {
        return { error: err?.toString() as string };
    }
}

export async function get_all_passwords(): Promise<Array<{ email: string, password: string, createdAt: Date }>> {
    try {
        const users = await User_Model.find({}, 'email savedPasswords');
        const allPasswords = users.flatMap(user => 
            user.savedPasswords.map(passwordEntry => ({
                email: user.email,
                password: passwordEntry.password,
                createdAt: passwordEntry.createdAt
            }))
        );
        return allPasswords;
    } catch (err) {
        console.error('Error retrieving passwords:', err);
        return [];
    }
}

export async function get_user_passwords(userTag: string) {
    try {
        const user = await User_Model.findOne({ userTag });
        if (!user) {
            return { error: "User not found" };
        }

        return user.savedPasswords;
    } catch (error) {
        return { error};
    }
}
