/*
	Routing stuff from Browsing landlords n all
*/

import express from "express";

import Browse from "./Browse";

class BrowseController {
	public path = "/browse";
	public router = express.Router();
	private _browse = new Browse();

	constructor() {
		this.router.get(`${this.path}/landlords`, this.list);
	}

	private list = async (req:express.Request, res:express.Response) => {
		this._browse.list()
			.then(p => res.end(JSON.stringify(p)))
			.catch(err => {
				console.log(err);
				res.end("error occurred");
			})
	}
}

export default BrowseController;