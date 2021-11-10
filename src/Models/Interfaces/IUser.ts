/*
	INTERFACE FOR A USER OBJECT
*/

interface IUser {
	user_id?:number;
	email:string;
	password?:string;
	firstname:string;
	lastname:string;
	is_landlord:boolean;
	profile_image?:string;
	phone_number?:number;
}

export default IUser;
