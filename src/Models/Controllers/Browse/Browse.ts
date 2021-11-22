/*
	utilities for browsing through landlords
*/

import { RowDataPacket } from "mysql2";
import { resolve } from "path/posix";
import databaseConnection from "../../../database/database";

export default class Browse {

	// showing 
	public list():Promise<RowDataPacket> {
		let query:string = `
			SELECT user_id, firstname, lastname, profile_image
			FROM users
			WHERE is_landlord = 1
		`;
		
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, (err, res) => {
				err ? reject("Something's wrong with the database") : resolve(res);
			})
		});
	}
}
// let b = new Browse();
// b.list("firstname").then(e => console.log(e[0].user_id));