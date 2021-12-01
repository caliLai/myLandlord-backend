/*
	for viewing profiles, both landlord and tenants
*/

import databaseConnection from "../../../database/database";
import IProfile from "../../Interfaces/Profile/IProfile";

export default class View {

	public async retrieve(userId:number):Promise<IProfile> {
		return new Promise((resolve, reject) => {

			let query:string = "SELECT user_id, firstname, lastname, email, is_landlord, profile_image FROM users WHERE user_id = :userId";
			let params = {userId:userId};

			databaseConnection.query(query, params, (err,res) => {
				// console.log(res);
				if(err){reject("Something went wrong")}

				if(!res[0]) {
					reject("User does not exist");
				}
				// console.log(typeof(res[0]));
				resolve(res[0] as IProfile);
			})
		})

	}

	public async myself(userId:number):Promise<IProfile> {
		let query:String = `SELECT * FROM users WHERE user_id = :id`;
		let params = {id:userId};
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				err ? reject("fuck this") : null;
				if(!res[0]) {
					reject("this is so convoluted");
				}
				resolve(res[0]);
			})
		})
	}
}
