import { breachCheck } from "$lib/server/dashboard";
import type { PageServerLoad } from './$types';
import { cookie_options } from "$lib/server/utils";
import { favgetting } from "$lib/server/password";

export const load: PageServerLoad = async ({ cookies }) => {
    const email = cookies.get("email");
    let breachData = null;
    if (email) {
        breachData = await breachCheck(email);

        if (breachData && breachData.sources) {
            for (const source of breachData.sources) {
                source.favicon = await favgetting(source.name);
            }
        }
    }

    return { breachData };
};
