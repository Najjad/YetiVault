import { add_password, get_user_passwords } from '../../lib/server/password';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent, Load } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { cookie_options } from "$lib/server/utils";
import { favgetting } from '../../lib/server/password';
import { login_masterpass } from '$lib/server/login';

export const actions: Actions = {
    passForm: async (event: RequestEvent) => {
        const data = await event.request.formData();

        const userTag = event.cookies.get("userTag")?.toString();
        const password = (data.get("password") as string)?.trim();

        if (!userTag || !password) {
            return fail(400, { error: "userTag and password are required." });
        }

        let savedPasswords = [];
        let website_check = data.get("website-check") === "true";
        let app_check = data.get("app-check") === "true";
        let email_check = data.get("email-check") === "true";
        
        if (website_check) {
            const website = (data.get("website") as string)?.trim();
            savedPasswords.push({
                password,
                createdAt: new Date(),
                service: { name: website, type: 'website' }
            });
        } 
        else if (app_check) {
            const app = (data.get("app") as string)?.trim();
            savedPasswords.push({
                password,
                createdAt: new Date(),
                service: { name: app, type: 'app' }
            });
        } 
        else if (email_check) {
            const email = (data.get("email") as string)?.trim();
            savedPasswords.push({
                password,
                createdAt: new Date(),
                service: { name: email, type: 'email' }
            });
        } 
        else {
            console.log("None of the checkboxes were checked.");
        }
        
        const { error } = await add_password(userTag, savedPasswords);

        if (error) {
            return fail(400, { userTag, error });
        } else {
            return { userTag, message: "Password saved successfully!" };
        }
    },
    
    masterForm: async (event: RequestEvent) => {
        const data = await event.request.formData();
        const masterpass = data.get("master-input")?.toString();
        const email = event.cookies.get("email");

        if (!email || !masterpass) {
            return fail(400, { error: "email and masterpass are required." });
        }

        const user_data = await login_masterpass(email, masterpass);

        if ('error' in user_data) {
            return fail(401, { error: user_data.error });
        }

        let isAuthenticated = false;

        if ('token' in user_data) {
            isAuthenticated = true;
            console.log("User authenticated:", user_data);
        } else {
            console.log("Authentication failed:", user_data);
        }

        console.log(isAuthenticated)
        return { isAuthenticated, user_data };
    }
};

export const load: PageServerLoad = async (event) => {
    const userTag = event.cookies.get('userTag');

    if (!userTag) {
        return { passwords: [], error: "User not logged in" };
    }

    const result = await get_user_passwords(userTag);

    if ('error' in result) {
        return { passwords: [], error: result.error };
    }

    const passwords = await Promise.all(result.map(async (pwd: any) => {
        let favicon = null;

        if (pwd.service.type === 'website') {
            try {
                favicon = await favgetting(pwd.service.name);
            } catch (error) {
                console.error(`Failed to fetch favicon for ${pwd.service.name}:`, error);
            }
        }

        return {
            password: pwd.password,
            createdAt: new Date(pwd.createdAt).toISOString(),
            service: { name: pwd.service.name, type: pwd.service.type },
            favicon 
        };
    }));

    return { passwords };
};
