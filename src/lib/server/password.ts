import { User_Model } from "./models";

export async function add_password(
    email: string,
    savedPasswords: Array<{ password: string, createdAt: Date }>
): Promise<{ error: string }> {
    try {
        const user = await User_Model.findOne({ email });
        
        if (!user) {
            return { error: 'User not found.' };
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
