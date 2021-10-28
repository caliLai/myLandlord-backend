// file to handle routing stuff for authentication functions

import passport from "passport";
import express, {Router, Request} from "express";
import IUser from "../../Interfaces/IUser"
import Register from "../Auth/Register"

import PassportConfig from "./PassportConfig";

// interface IController {
//   path: string;
//   router: Router;
// }


class AuthController {

	public path = "/auth";
	public router = express.Router();
	private _auth_service: Register;

	constructor() {
		this.router.post(`${this.path}/login`, this.login);
		this.router.post(`${this.path}/register`, this.register);
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

	private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		// ALRIGHT WE GOING TO CREATE A ANEW FUCKING USER. 
		let newUser: IUser ={
			id: (Date.now() + Math.floor(Math.random() * 10)),
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			is_landlord: req.body.is_landlord
		}
		//need to add user to the database but fuck im tired so im going to sleep 
		this._auth_service.createUser(newUser)
		.then((user) => {
			console.log(`${user.email} has been registered`);
			return res.send("EWGW")
		})
		.catch((userExists) => {
			return next(userExists)
		})
	}

}

// it is 3:03 and i told calista i will got to sleep.

export default AuthController;
