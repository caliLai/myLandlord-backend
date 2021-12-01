// file to handle routing stuff for profiles and their functions

import IUser from "../../Interfaces/Profile/IProfile";
import IReview from "../../Interfaces/Profile/IReview";
import IProperty from "../../Interfaces/Profile/IProperty";

import express, {Router, Request} from "express";
import View from "./View";
import Setup from "./Setup";
import Review from "./Review";
import Property from "./Property";

class ProfileController {
	public path = "/profile";
	public router = express.Router();
	private _viewProfile = new View();
	private _setupProfile = new Setup();
	private _handleReviews = new Review();
	private _newProperty = new Property();

	constructor() {
		this.router.get(`${this.path}/whoami`, this.whoami);
		this.router.get(`${this.path}/me/:id`, this.myinfo);

		this.router.get(`${this.path}/view/:id`, this.view);
		this.router.get(`${this.path}/reviews/:id/getAll`, this.getLandlordReviews);
		this.router.get(`${this.path}/reviews/:id/getAllWritten`, this.getTenantReviews);
		this.router.get(`${this.path}/reviews/:id/count`, this.count);
		this.router.get(`${this.path}/reviews/:id/countWritten`, this.countWritten);
		this.router.post(`${this.path}/reviews/create`, this.create);

		this.router.post(`${this.path}/property/create`,this.createprop);

		this.router.put(`${this.path}/update`, this.update);
	}
	// update ur profile
	private update = async (req:express.Request, res:express.Response) => {
		console.log(req.user);
		let currentUser = req.user as IUser;
		let newChanges = {...req.body}
		// this._setupProfile.update(newChanges, 15)
		this._setupProfile.update(newChanges, currentUser.user_id)
		.then(() => res.end("updated"))
		.catch(() => res.end("Error"))
	}
	// this is stupid
	private whoami = async(req:express.Request, res:express.Response) => {
		// console.log(req.user);
		res.end(JSON.stringify(req.user as IUser));
		// res.end("hi")
	}
	// not only is this stupid, its dangerous:
	// im so sorry whoever is reading this code but listen man theres like
	// 2 days until I present this thing and like
	// everything that could've possibly went wrong in this project
	// went wrong and now here I am at 2:25am desperately trying to 
	// get things to look like they work.
	// no one use this for real oh my god 
	private myinfo = async(req:express.Request, res:express.Response) => {
		this._viewProfile.myself(parseInt(req.params.id))
		.then(data => res.end(JSON.stringify(data)))
		.catch(() => res.end())
	}

	//viewing a profile that (ideally) isn't your own
	private view = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

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
	// obtain reviews written by a tenant; to be shown on their profile.
	// Why didn't we just count stuff on frontend? Idk that didn't cross my mind.
	// Now it's too late to change.
	private getTenantReviews = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
		this._handleReviews.viewWritten(parseInt(req.params.id))
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
	// count how many reviews a tenant has
	private countWritten = async (req:express.Request, res:express.Response) => {
		this._handleReviews.countWritten(parseInt(req.params.id))
		.then(count => res.end(JSON.stringify(count)))
		.catch(() => res.end("Unavailable"))
	}

	private createprop = async (req:express.Request, res:express.Response) => {

		let u = req.user as IUser;
		
		let newProperty:IProperty = {
			address: req.body.address,
			city: req.body.city,
			description: req.body.description,
			// use the current user (who MUST be a landlord)'s id:
			landlord_id: u.user_id
		}

		this._newProperty.create(newProperty)
		.then(m => res.end(m))
		.catch(() => res.end("error occurred"));
	}

}

export default ProfileController;
