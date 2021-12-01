import databaseConnection from "../../../database/database";
import IUser from "../../Interfaces/IUser";

export default class Setup {
	
	public update = (user, id):Promise<String> => {
		let query:string = `
		UPDATE users
		SET
		firstname = :firstname,
		lastname = :lastname,
		email = :email,
		password = :password,
		profile_image = :profile_image
		WHERE user_id = :user`;
		let params = {
			firstname:user.firstname,
			lastname:user.lastname,
			email:user.email,
			password:user.password,
			profile_image:user.profile_image,
			user:id
		}
		return new Promise((resolve, reject) => {
			databaseConnection.query(query, params, (err) => {
				err ? reject("Something's wrong with the database") : null;
				resolve("Profile sucessfully updated");
			})
		})
	}
	
}