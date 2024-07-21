import { add_password, get_user_passwords, change_service_email } from '../../lib/server/password';
//import { favgetting } from '../../lib/server/password';
import { fail } from '@sveltejs/kit';
import type { Actions, RequestEvent, Load } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { cookie_options } from "$lib/server/utils";

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const data = await event.request.formData();

        const userTag = event.cookies.get("userTag")?.toString();
        const password = (data.get("password") as string)?.trim();

        let savedPasswords = [];

        if (!userTag || !password) {
            return fail(400, { error: "userTag and password are required." });
        }

        let website_check = data.get("website-check") === "true";
        let app_check = data.get("app-check") === "true";
        let email_check = data.get("email-check") === "true";
        
        if (website_check) {
            const website = (data.get("website") as string)?.trim(); //set some variable equal to this, use favgetting function to get link, display link in sveltefile and it should auto become an image
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

    const passwords = (result as any).map((pwd: any) => ({
        password: pwd.password,
        createdAt: new Date(pwd.createdAt).toISOString()
    }));

    //let favICO = await favgetting("youtube.com")

    return { passwords };
};