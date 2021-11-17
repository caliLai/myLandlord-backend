import databaseConnection from "../../../database/database";
import IProfile from "../../Interfaces/Profile/IProfile";

export default class Profile {
    public async getProfile(userId: number):Promise<IProfile> {
        return new Promise<IProfile>((resolve, reject) => {

            let query:string = "SELECT firstname, lastname, email, phone_number FROM users";
            let params = {userId:userId};

            databaseConnection.query(query, params, (err,res) => {
				// console.log(res);
				if(err){reject("Something went wrong")}

				if(!res[0]) {
					reject("User does not exist");
				}
				resolve(res[0] as IProfile,);
                console.log(res);
			})
        })

    }
}