/*
	configuration n stuff for authentication using Passport

	for login purposes
*/

import passport from "passport";
import { IVerifyOptions, IStrategyOptions, Strategy as LocalStrategy } from "passport-local";
import IUser from "../../Interfaces/IUser"

import Login from "./Login";
// import IUser from "../../Interfaces/IUser";

class PassportConfig {
	private static _login = new Login();
	// private static _user:IUser;
	private static _localStrategy:LocalStrategy;
	private static _strategyOptions: IStrategyOptions = {
	    usernameField: "email",
	    passwordField: "password",
  	};

	constructor() {
		// PassportConfig._login = new Login();

		console.log("I just need confirmation pls");

		PassportConfig._localStrategy = new LocalStrategy(
			PassportConfig._strategyOptions,
			(email, password, done) => {
				PassportConfig._login.findUserByEmail(email, password)
					.then((user) => {
						// console.log("yep");
						done(null, user);
					})
					.catch((err) => {
						console.log("is this part even running");
						done(null, false);
					});
			}
		)
		passport.use(PassportConfig._localStrategy);
		passport.serializeUser(PassportConfig.serializeUser);
		passport.deserializeUser(PassportConfig.deserializeUser);
	}

	private static serializeUser(user:IUser, done):void {
		// console.log("OH MY FUCKING GOD", user.user_id);
		done(null, user.user_id);
	}

	private static deserializeUser(id:number, done):void {
		console.log("got here");
		PassportConfig._login.findUserById(id)
			.then((user) => {
				console.log("inside deserializeUser: ", user);
				done(null, user);
			})
			.catch(err => done({message: "user not found"}, null));
  	}

}

// let config = new PassportConfig();
// export default config;
export default PassportConfig;
