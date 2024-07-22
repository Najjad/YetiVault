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

export async function favgetting(website: string) 
{
    return 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + website
}

export async function change_service_email(
    userTag: string,
    serviceName: string,
    newEmail: string
): Promise<{ error: string } | { email: string }> {

    // Find the user by userTag
    const user = await User_Model.findOne({ userTag });

    if (!user) {
        return { error: "User could not be found." };
    }

    // Find the service in the savedPasswords array and update its email
    let serviceUpdated = false;
    for (let i = 0; i < user.savedPasswords.length; i++) {
        if (user.savedPasswords[i].service.name === serviceName) {
            user.savedPasswords[i].service.name = newEmail;
            serviceUpdated = true;
            break;
        }
    }

    if (!serviceUpdated) {
        return { error: "Service could not be found." };
    }

    try {
        await user.save();
        return { email: newEmail };
    } catch (err) {
        return { error: err?.toString() as string };
    }
}
