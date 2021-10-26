/*
	configuration n stuff for authentication using Passport

	for login purposes
*/

import passport from "passport";
import { IVerifyOptions, IStrategyOptions, Strategy as LocalStrategy } from "passport-local";

import Login from "./Login";

export default class PassportConfig {
	private static _user:IUser;
	private static _localStrategy:LocalStrategy;
	private static _strategyOptions: IStrategyOptions = {
	    usernameField: "email",
	    passwordField: "password",
  	};

	constructor() {
		PassportConfig._localStrategy = new LocalStrategy()
	}

	private static serializeUser(user:IUser, done):void {
		done(null, user.email);
	}

	private static deserializeUser(email:string, done):void {

	}

}
