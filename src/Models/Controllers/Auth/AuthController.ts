// file to handle routing stuff for authentication functions

import passport from "passport";
import express, {Router, Request} from "express";

import PassportConfig from "./PassportConfig";

// interface IController {
//   path: string;
//   router: Router;
// }


class AuthController {

	public path = "/auth";
	public router = express.Router();
	// public static pass;

	constructor() {
		// new PassportConfig();
		this.router.post(`${this.path}/login`, this.login);
	}

	// callback function for authenticating login
	// refer to http://www.passportjs.org/docs/authenticate/
	// "custom callback" section
	private login(req:express.Request, res:express.Response, next:express.NextFunction) {


		passport.authenticate('local', function(err, user, info) {
			if (err) {
				return next(err);
			}
			console.log(user);
			if (!user) {
				return res.end("no user");
			}
			req.login(user, function(err) {
				if (err) {
					return next(err);
					// return res.end("broken");
				}
				return res.end("idk what happened but its  not broken");
			});
		})(req, res, next);
	}

	private register() {

	}

}

export default AuthController;
