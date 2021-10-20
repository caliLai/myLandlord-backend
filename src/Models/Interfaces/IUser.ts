/*
	INTERFACE FOR A USER OBJECT
*/

interface IUser {
	email:string;
	password:string;
	firstName:string;
	lastName:string;
	is_landlord:boolean;
	profilePic?:string;
	phone_number?:number;
}

export default IUser;
