// file to handle routing stuff for profiles and their functions

import IUser from "../../Interfaces/Profile/IProfile";
import IReview from "../../Interfaces/Profile/IReview";

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
		this.router.get(`${this.path}/reviews/:id/count`, this.count);
		this.router.post(`${this.path}/reviews/create`, this.create);
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

	// create a review
	private create = async(req:express.Request, res:express.Response) => {

		let u = req.user as IUser;

		let newReview:IReview = {
			content: req.body.content,
			is_recommended: req.body.is_recommended,	
			cleanliness_rating:req.body.cleanliness_rating,
			communication_rating:req.body.communication_rating,
			maintenance_rating:req.body.maintenance_rating,
			availability_rating:req.body.availability_rating,

			landlord_id:req.body.landlord_id,
			tenant_id:u.user_id
		};
		this._handleReviews.create(newReview)
		.then(m => res.end(m))
		.catch(() => res.end("error occurred"));
	}

	// obtain reviews for a single landlord; to be shown on their profile
	private getLandlordReviews = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		this._handleReviews.view(parseInt(req.params.id))
		.then(reviews => res.end(JSON.stringify(reviews)))
		.catch(err => {
			console.log(err)
			res.end("Reviews unavailable");
		})
	}
	// count how many reviews a Landlord has
	private count = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		// console.log("hi");
		this._handleReviews.count(parseInt(req.params.id))
		.then(count => res.end(JSON.stringify(count)))
		.catch(() => res.end("Unavailable"))
	}

}

export default ProfileController;
