import databaseConnection from "../../../database/database";


export default class Review {
	//PRIVATE
	private _db = databaseConnection;
	//PUBLIC
	public content:string;

	constructor(private _tenantID:number, private _landlordID:number) {

	}

	public submit():void {

	}
}
