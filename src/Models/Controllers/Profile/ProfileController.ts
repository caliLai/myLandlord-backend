// file to handle routing stuff for profiles and their functions

import express, {Router, Request} from "express";
import View from "./View";
import Setup from "./Setup";
import Review from "./Review";

class ProfileController {
	public path = "profile";
	public router = express.Router();
	private _viewProfile = new View();
	private _setupProfile = new Setup();

	constructor() {
		this.router.post(`${this.path}/view/:id`)
	}
	//viewing a profile that isn't your own
	private view = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		this._viewProfile(req.viewUserId)
		.then(p => res.end(p))
		.catch(err => {
			console.log(err);
			res.end(error occurred);
		})
	}
}

export default ProfileController;
