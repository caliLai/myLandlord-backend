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
	private _auth_service = new Register();
	// public static pass;


	constructor() {
		// new PassportConfig();
		this.router.post(`${this.path}/login`, this.login);
		this.router.post(`${this.path}/register`, this.register);
		this.router.post(`${this.path}/logout` , this.logout);
	}

	// callback function for authenticating login
	// refer to http://www.passportjs.org/docs/authenticate/
	// "custom callback" section
	private login(req:express.Request, res:express.Response, next:express.NextFunction) {

		// res.setHeader('Access-Control-Allow-Origin', 'http://localhost3000:');
		// res.setHeader('Access-Control-Allow-Methods', 'POST');

		passport.authenticate('local', function(err, user, info) {
			// console.log(user);
			if (err) {
				return next(err);
			}
			if (!user) {
				console.log("authcontroller no user found");
				return res.end("no user");
			}
			req.login(user, function(err) {
				// console.log(user);
				if (err) {
					console.log("authController error w user")
					return next(err);
					// return res.end("broken");
				}
				console.log("authController well i assumed everything worked");
				return res.end("idk what happened but its  not broken");
			});
		})(req, res, next);
	}

	private logout(req:express.Request, res:express.Response, next:express.NextFunction) {
		req.logout();
		res.end();
	}

	private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
		// ALRIGHT WE GOING TO CREATE A NEW FUCKING USER.
		let newUser: IUser = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: req.body.password,
			is_landlord: req.body.is_landlord
		}
		//need to add user to the database but fuck im tired so im going to sleep
		this._auth_service.createUser(newUser)
		.then(() => {
			console.log(`${newUser.email} has been registered`);
			return res.send("Welcome");
		})
		.catch((userExists) => {
			return next(userExists);
		})
	}

}


export default AuthController;
