import { add_password, get_user_passwords } from '../../lib/server/password';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent, Load } from '@sveltejs/kit';
import { login_masterpass } from "$lib/server/login";
import type { PageServerLoad } from './$types';

interface PasswordEntry {
    password: string;
    createdAt: string; // change to string for serialization
}

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const data = await event.request.formData();

        const email = (data.get("email") as string)?.toLowerCase()?.trim();
        const password = (data.get("password") as string)?.trim();
        const masterpass = (data.get("masterpass") as string)?.trim();

        const user_data = await login_masterpass(email, masterpass);

        if (!email || !password) {
            return fail(400, { error: "Email and password are required." });
        }

        const savedPasswords = [{ password, createdAt: new Date() }];
        const { error } = await add_password(email, savedPasswords);

        if (error) {
            return fail(400, { email, error });
        } else {
            return { email, message: "Password saved successfully!" };
        }
    }
};

export const load: PageServerLoad = async (event) => {
    const cookies = event.cookies;
    const userTag = cookies.get('userTag');

    if (!userTag) {
        return { passwords: [], error: "User not logged in" };
    }

    const result = await get_user_passwords(userTag);

    if ('error' in result) {
        return { passwords: [], error: result.error };
    }

    const passwords = (result as any).map((pwd: any) => ({
        password: pwd.password,
        createdAt: pwd.createdAt.toISOString() // Convert Date to string
    }));

    return { passwords };
};
