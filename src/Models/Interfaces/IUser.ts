/*
	INTERFACE FOR A USER OBJECT
*/

interface IUser {
	user_id?:number;
	email:string;
	password?:string;
	firstName:string;
	lastName:string;
	is_landlord:boolean;
	profile_image?:string;
	phone_number?:number;
}

export default IUser;
