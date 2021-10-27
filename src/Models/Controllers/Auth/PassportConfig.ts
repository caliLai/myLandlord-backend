/*
	configuration n stuff for authentication using Passport

	for login purposes
*/

import passport from "passport";
import { IVerifyOptions, IStrategyOptions, Strategy as LocalStrategy } from "passport-local";

import Login from "./Login";
import IUser from "../../Interfaces/IUser";

class PassportConfig {
	private static _login:Login = new Login();
	// private static _user:IUser;
	private static _localStrategy:LocalStrategy;
	private static _strategyOptions: IStrategyOptions = {
	    usernameField: "email",
	    passwordField: "password",
  	};

	constructor() {
		PassportConfig._localStrategy = new LocalStrategy(
			PassportConfig._strategyOptions,
			(email, password, done) => {
				PassportConfig._login.findUserByEmail(email, password)
					.then(user => done(null, user))
					.catch((err) => done(null, false));
			}
		)
		passport.use(PassportConfig._localStrategy);
		passport.serializeUser(PassportConfig.serializeUser);
		passport.deserializeUser(PassportConfig.deserializeUser);
	}

	private static serializeUser(user:IUser, done):void {
		done(null, user.id);
	}

	private static async deserializeUser(id:number, done):Promise<void> {
		PassportConfig._login.findUserById(id)
			.then(user => done(null, user))
			.catch(err => done({message: "user not found"}, null));
		// try {
		//     const user = await this._login.findUserById(id);
		//     return done(null, user);
	    // } catch (error) {
	    //   	done({ message: "user not found" }, null);
	    // }
  	}

}

let config = new PassportConfig();
export default config;
