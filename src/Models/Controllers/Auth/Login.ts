/*
	Utilities for logging a user in
*/

//------ MODULES ------ //
import databaseConnection from "../../../database/database";
import IUser from "../../Interfaces/IUser";
// import * as mysql2 from "mysql2/promise";


//------ stuff happens here -----//

export default class Login {

	private _db = databaseConnection;

	/******
	find users via their email and verifies password. If correct,
	return user

	TODO: add params to prevent injections
	*******/
	// public async findUserByEmail(email:string, password:string):Promise<void> {
	public async findUserByEmail(email:string, password:string):Promise<IUser> {
		let query:string = `SELECT * FROM users WHERE email = :email`;
		let params = {email: email};

		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				if(err){reject("Something's wrong with MySQL")}
				// resolve(results[0]);
				if(!res[0]) {
					console.log("login.ts  no user found");
					reject("Username or password incorrect");
				} else {
					if(res[0].password === password) {
						console.log("login.ts user passwords match");
						resolve(res[0] as IUser);
					} else {
						console.log("login.ts passwords do not match");
						reject("Username or password incorrect");
					}
				}
			})
		})
	}

	public async findUserById(id:number):Promise<IUser|string> {
		let query:string = `SELECT * from users where user_id = :userId`;
		let params = {userId: id};

		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err, res) => {
				if(err){reject("Something's wrong with MySQL")}
				if(!res[0]) {
					reject("User does not exist");
				}
				resolve(res[0] as IUser);
			})
		})
	}
}

// let a = new Login();
// a.findUserByEmail("tester@tester.test", "tester").then(e => console.log(e)).catch(e => console.log(e));
// a.findUserById(5).then(e => console.log(e)).catch(e => console.log(e));
