import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { login_user } from "$lib/server/login";
import { cookie_options } from "$lib/server/utils";
import { userTagVar } from '$lib/server/userTag';
import { User_Model } from "$lib/server/models";
import crypto from 'crypto';

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

			const existingUserTag = event.cookies.get("userTag");

			if (existingUserTag) {
				event.cookies.delete("userTag", cookie_options);
				const userFromDB = await User_Model.findOne({ email: user.email });
				if (userFromDB && userFromDB.userTag) {
					const userTag = userFromDB.userTag;
					event.cookies.set("userTag", userTag, cookie_options);
				} else {
					// Handle case where userFromDB is null or userTag is missing
					const userTag = crypto.randomBytes(64).toString('hex');
					event.cookies.set("userTag", userTag, cookie_options);
					await User_Model.updateOne({ email: user.email }, { userTag });
				}
			} else {
				const userTag = crypto.randomBytes(64).toString('hex');
				event.cookies.set("userTag", userTag, cookie_options);
				await User_Model.updateOne({ email: user.email }, { userTag });
			}

			return { email, user };
		}
	}
};
