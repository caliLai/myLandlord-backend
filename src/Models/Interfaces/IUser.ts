/*
	INTERFACE FOR A USER OBJECT
*/

interface IUser {
	user_id:number;
	email:string;
	password:string;
	firstName:string;
	lastName:string;
	is_landlord:boolean;
	profilePic?:string;
	phone_number?:number;
}

export default IUser;
