import { add_password, get_all_passwords } from '../../lib/server/password';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent, Load } from '@sveltejs/kit';

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const data = await event.request.formData();

        const email = (data.get("email") as string)?.toLowerCase()?.trim();
        const password = (data.get("password") as string)?.trim();

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

export const load: Load = async () => {
    const passwords = await get_all_passwords();
    return { passwords };
};
