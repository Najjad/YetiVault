import { breachCheck } from "$lib/server/dashboard";
import { dateChecker } from "$lib/server/dashboard";
import type { PageServerLoad } from './$types';
import { cookie_options } from "$lib/server/utils";
import { favgetting } from "$lib/server/password";
import type { RequestEvent } from '@sveltejs/kit';
import crypto from 'crypto';


export const actions = {
    passGen: async (event: RequestEvent) => {
        const data = await event.request.formData();
        const lengthString = data.get("length");
        const length = parseInt(lengthString as string, 10);
    
        if (!length || length <= 0) {
            return { error: "Please provide a valid positive length." };
        }
    
        const password = generateRandomString(length);
        return { password };
    },

    breachAction: async (event: RequestEvent) => {
        const email = event.cookies.get("email");
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
        
    },

    passDate: async (event: RequestEvent) => {
        const userTag = event.cookies.get("userTag");
    
        if (!userTag) {
            return { error: "User tag is undefined" };
        }

        try {
            const oldPass = await dateChecker(userTag);
            return JSON.stringify(oldPass);
        } catch (error) {
            return { error: "An error occurred while checking the dates" };
        }
    }
};

const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@!#$%&*-';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    return result;
};
