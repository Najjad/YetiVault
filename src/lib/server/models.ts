import mongoose from "mongoose";
const Password_Schema = new mongoose.Schema({
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User_Schema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	masterpass: {type: String, required: true},
	userTag: {type: String},
	savedPasswords: [Password_Schema]
});

export const User_Model = mongoose.model("User", User_Schema);