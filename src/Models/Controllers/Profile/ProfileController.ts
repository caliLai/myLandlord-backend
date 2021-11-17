// file to handle routing stuff for profiles and their functions

import IUser from "../../Interfaces/Profile/IProfile";

import express, {Router, Request} from "express";
import View from "./View";
import Setup from "./Setup";
import Review from "./Review";

class ProfileController {
	public path = "/profile";
	public router = express.Router();
	private _viewProfile = new View();
	private _setupProfile = new Setup();
	private _handleReviews = new Review();

	constructor() {
		this.router.get(`${this.path}/view/:id`, this.view);
		this.router.get(`${this.path}/reviews/:id/getAll`, this.getLandlordReviews);
	}
	//viewing a profile that (ideally) isn't your own
	private view = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

		// console.log("USER: ", req.user);

		this._viewProfile.retrieve(parseInt(req.params.id))
		.then(p => res.end(JSON.stringify(p)))
		.catch(err => {
			console.log(err);
			res.end("error occurred");
		})
	}
	
	private getLandlordReviews = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		this._handleReviews.view(parseInt(req.params.id))
		.then(reviews => res.end(JSON.stringify(reviews)))
		.catch(err => {
			console.log(err)
			res.end("Reviews unavailable");
		})
	}

}

export default ProfileController;
