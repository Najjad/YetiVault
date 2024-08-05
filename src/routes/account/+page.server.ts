import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { cookie_options } from "$lib/server/utils";
import { change_email, change_name } from "$lib/server/account";
import { change_password } from "$lib/server/register";
import { User_Model } from "$lib/server/models";
import crypto from "crypto"
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
	name: async (event) => {
		const data = await event.request.formData();
		const name = (data.get("name") as string)?.trim();

		const update = await change_name(event.cookies, name);

		if ("error" in update) {
			return fail(400, { error: update.error });
		}

		event.cookies.set("name", name, cookie_options);

		const message = `Your new name is ${name}.`;

		return { name, message };
	},

	email: async (event) => {
		const data = await event.request.formData();
		const email = (data.get("email") as string)
			?.toLowerCase()
			?.trim();

		const update = await change_email(event.cookies, email);

		if ("error" in update) {
			return fail(400, { error: update.error });
		}

		event.cookies.set("email", email, cookie_options);

		const message = `Your new email is ${email}.`;

		return { email, message };
	},

	NUKE: async (event) => {
		const data = await event.request.formData();
		const cookies = event.cookies.getAll();
		const userTag = (event.cookies.get("userTag") as string)?.trim();;
		const user = await User_Model.findOne({ userTag });
		const newPass = (data.get("new_password") as string)?.trim();
	
		if (!user || !userTag) {
		  console.log("User could not be found");
		} else {
		  user.userTag = "NUKED-TAG_" + crypto.randomBytes(10).toString('hex');
		  await change_password(userTag, newPass);
		  await user.save();
		}

		cookies.forEach(cookie => {
			event.cookies.delete(cookie.name, {
			  path: '/', 
			  httpOnly: true, 
			  secure: true
			});
		  });
	
		  throw redirect(301, "/");
	  }
};
