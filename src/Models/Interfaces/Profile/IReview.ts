import IRating from "./IRating";

interface IReview {
	review_id?:number;

	content:string;

	cleanliness_rating:number|null;
	communication_rating:number|null;
	maintenance_rating:number|null;
	availability_rating:number|null;
	// 	cleanliness_rating:IRating;
	// 	communication_rating:IRating;
	// 	maintenance_rating:IRating;
	// 	availability_rating:IRating;

	is_recommended:boolean;
	date?:Date;
	images?:Array<string>;

	tenant_id:number;
	landlord_id:number;
}

export default IReview;
