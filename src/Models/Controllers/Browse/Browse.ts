/*
	utilities for browsing through landlords
*/

import { RowDataPacket } from "mysql2";
import { resolve } from "path/posix";
import databaseConnection from "../../../database/database";

export default class Browse {

	// showing 
	public list(sortby:string):Promise<RowDataPacket> {
		let query:string = `
			SELECT user_id, firstname, lastname, profile_image
			FROM users
			WHERE is_landlord = 1
		`;
		let params = {sortby:sortby}
		
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				err ? reject("Something's wrong with the database") : resolve(res);
				// console.log(res);
				// resolve(res);
			})
		});
	}
}
// let b = new Browse();
// b.list("firstname").then(e => console.log(e[0].user_id));