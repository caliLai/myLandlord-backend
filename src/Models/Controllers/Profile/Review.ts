import databaseConnection from "../../../database/database";
import IReview from "../../Interfaces/Profile/IReview";

export default class Review {
	//PRIVATE
	private _db = databaseConnection;
	//PUBLIC
	public content:string;

	constructor(private _tenantID:number, private _landlordID:number) {

	}

	public create(review:IReview):void {

	}
}
