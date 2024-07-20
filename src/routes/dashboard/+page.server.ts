import { breachCheck } from "$lib/server/dashboard";
import type { PageServerLoad } from './$types';
import { cookie_options } from "$lib/server/utils";

export const load: PageServerLoad = async ({ cookies }) => {
    const email = cookies.get("email");
    let breachData = null;
    if (email) {
        breachData = await breachCheck(email);
    }
    return { breachData };
};