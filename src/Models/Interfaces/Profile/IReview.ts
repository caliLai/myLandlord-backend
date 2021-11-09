import IRating from "./IReview";

interface IReview {
	review_id?:number;

	content:string;

	cleanliness_rating:IRating;
	communication_rating:IRating;
	maintenance_rating:IRating;
	availability_rating:IRating;

	is_recommended:boolean;
	date:Date;
	images?:Array<string>;

	tendant_id:number;
	landlord_id:number;
}
