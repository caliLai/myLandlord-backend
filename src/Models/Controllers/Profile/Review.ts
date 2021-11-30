/*
	utilities for writing reviews and ratings
*/

import databaseConnection from "../../../database/database";
import IReview from "../../Interfaces/Profile/IReview";

export default class Review {
	//PRIVATE
	// private _db = databaseConnection;
	// //PUBLIC
	// public content:string;

	// constructor(private _tenantID:number, private _landlordID:number) {

	// }

	// create a review for a landlord
	// there's gotta be a better way to do this
	public create(review:IReview):Promise<string> {
		let query:string =`
			INSERT INTO reviews 
			(content,
			cleanliness_rating,
			maintenance_rating,
			availability_rating,
			communication_rating,
			is_recommended,
			tenant_id,
			landlord_id
			)
		VALUES
			(:content,
			:c_rating,
			:m_rating,
			:a_rating,
			:comm_rating,
			:is_recommended, 
			:tenant_id,
			:landlord_id
			);`
		let params = {
			content:review.content,
			c_rating:review.cleanliness_rating,
			m_rating:review.maintenance_rating,
			a_rating:review.availability_rating,
			comm_rating:review.communication_rating,
			is_recommended:review.is_recommended,
			tenant_id:review.tenant_id,
			landlord_id:review.landlord_id
		};
		return new Promise((resolve, reject) => {

			databaseConnection.query(query, params, (err) => {
				if(err){reject("Something's wrong with the database")}
				resolve("Review added");
			})
		})
	}

	// obtain all reviews for a landlord
	public view(landlord:number):Promise<Array<IReview>> {
		let query:string = 
		`SELECT reviews.*, users.firstname, users.lastname 
		FROM reviews
		RIGHT JOIN users on users.user_id = reviews.tenant_id
		WHERE landlord_id = :landlord`;
		let params = {landlord:landlord};
		
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				if(err){reject("Something's wrong with MySQL")}
				if(!res) {
					reject("F");
				}
				resolve(res as Array<IReview>);
			})
		})
	}

	public viewWritten(tenant:number):Promise<Array<IReview>> {
		let query:string = 
		`SELECT reviews.*, users.firstname, users.lastname 
		FROM reviews
		RIGHT JOIN users on users.user_id = reviews.landlord_id
		WHERE tenant_id = :tenant`;
		let params={tenant:tenant}
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				err ? reject("Something's wrong with MySQL") : null;
				if(!res) {
					reject("What the hell happened");
				}
				resolve(res as Array<IReview>);
			})
		})
	}
	
	// get number of reviews for a landlord
	public count(id:number):Promise<string|number> {
		let query:string = `
		SELECT COUNT(*) as count
		FROM reviews
		WHERE landlord_id = :id`;
		let params = {id:id};

		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				if(err){reject("Something wrong with the database")}
				if(res[0].count == 0) {
					resolve("No")
				}
				resolve(res[0].count);
			})
		})
	}
	// count how many reviews have been written by a tenant
	public countWritten(id:number):Promise<string|number> {
		let query:string = `
		SELECT COUNT(*) AS count
		FROM reviews
		WHERE tenant_id = :id`;
		let params = {id:id};

		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				err ? reject("Something is wrong with the database") : null;
				if(res[0].count == 0) {
					resolve ("No");
				}
				resolve(res[0].count);
			})
		})
	}
}

// let a = new Review();
// a.count(5).then(e => console.log(e)).catch(e => console.log(e));
// let r:IReview = {
// 	content:"new review",
// 	cleanliness_rating:3,
// 	communication_rating:4,
// 	maintenance_rating: 5,
// 	availability_rating:1,
// 	is_recommended:true,
// 	tenant_id:27,
// 	landlord_id:5

// }
// a.view(5).then(e => console.log(e));
// a.create(r);