import databaseConnection from "../../../database/database";
// import * as mysql2 from "mysql2/promise";


export default class Login {

	private _db = databaseConnection;

	// TODO: add params to prevent injections
	public async findUserByEmail(email:string):Promise<void> {
		let query = `SELECT * FROM pencils`;
		databaseConnection.query(query)
	    	.then((r) => {
	        	console.log('The solution is: ',r[0]);
	    	});
	}
}

let a = new Login();
a.findUserByEmail("800")
