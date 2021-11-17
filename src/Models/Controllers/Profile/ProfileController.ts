// file to handle routing stuff for profiles and their functions

import IUser from "../../Interfaces/Profile/IProfile";

import express, {Router, Request} from "express";
import View from "./View";
import Setup from "./Setup";
import Review from "./Review";
import Profile from "./Profile";

class ProfileController {
	public path = "/profile";
	public router = express.Router();
	private _viewProfile = new View();
	private _setupProfile = new Setup();

	constructor() {
		this.router.get(`${this.path}/view/:id`, this.view);
	}
	//viewing a profile that isn't your own
	private view = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

		console.log("USER: ", req.user);

		this._viewProfile.retrieve(parseInt(req.params.id))
		.then(p => res.end(JSON.stringify(p)))
		.catch(err => {
			console.log(err);
			res.end("error occurred");
		})
	}
}

export default ProfileController;
