/*
	configuration n stuff for authentication using Passport

	for login purposes
*/

import passport from "passport";
import { IVerifyOptions, IStrategyOptions, Strategy as LocalStrategy } from "passport-local";

export default class Passport {
	private static _user:IUser;
	private static _localStrategy:LocalStrategy;
	private static _strategyOptions: IStrategyOptions = {
	    usernameField: "email",
	    passwordField: "password",
  	};

	constructor() {

	}

	private static serializeUser(user:IUser, done):void {
		done(null, user.email);
	}

	private static deserializeUser(email:string, done):void {

	}

}
