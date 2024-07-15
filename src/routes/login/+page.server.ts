import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login_user } from "$lib/server/login";
import { cookie_options } from "$lib/server/utils";
import { userTagVar } from '$lib/server/userTag';


export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();

		const email = (data.get("email") as string)
			?.toLowerCase()
			?.trim();
		const password = data.get("password") as string;

		const user_data = await login_user(email, password);

		if ("error" in user_data) {
			return fail(400, { email, error: user_data.error });
		} else {
			const { token, user } = user_data;

			event.cookies.set("auth-token", token, cookie_options);
			event.cookies.set("email", user.email, cookie_options);
			event.cookies.set("name", user.name, cookie_options);
			event.cookies.set("userTag", userTagVar, cookie_options);

			return { email, user };
		}
	}
};

/*
import crypto from 'crypto';
const userTag = crypto.randomBytes(64).toString('hex');
event.cookies.set("userTag", userTag, cookie_options); //use to login
*/