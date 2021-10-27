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

	constructor() {
		this.router.post(`${this.path}/login`, this.login);
	}

	// callback function for authenticating login
	// refer to http://www.passportjs.org/docs/authenticate/
	// "custom callback" section
	private login(req:express.Request, res:express.Response, next:express.NextFunction) {
		passport.authenticate("local", function (err, user) {
      if (err) {
        return next(err);
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
      });
      return res.send("hiasfasdf");
    })(req, res, next);

		// passport.authenticate('local', function(err, user, info) {
		// 	if (err) { return next(err); }
		// 	console.log(user);
		// 	if (!user) { return res.end("Invalid creds"); }
		// 	req.login(user, function(err) {
		// 		if (err) { return next(err); }
		// 	return res.end("Invalid credentials");
		// 	});
		// })(req, res, next);
	}

	private register() {

	}

}

export default AuthController;
