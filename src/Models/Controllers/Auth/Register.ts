/*
    UTilities not for loggging for the registration :D
*/

import databaseConnection from "../../../database/database";
import IUser from "../../Interfaces/IUser";

// beep boop stuff. its 2:15 lets see what happens

export default class Register {

    private _db = databaseConnection;

    public async createUser(profile: IUser): Promise<string|Error> {
        return new Promise((resolve, reject) => {
            let userExists:string = `
                SELECT COUNT(*) as 'occurances'
                FROM users
                WHERE email = :email;
            `;
            let userExistsParams = {email: profile.email}

            databaseConnection.query(userExists, userExistsParams, (err, res) => {
                if(err){reject(err)}
				console.log(res);
                if(res[0].occurances !=0) {
                    reject("sorry email already being used")
                }
            })

            // let query:string = `
            // INSERT into user
            // (firstname, lastname, email, salt, is_landlord)
            // VALUES
            // (:firstname, :lastname, :email, sha2(UUID(), 512), :is_landlord);
            // `
            let query:string = `
            INSERT into users
            (firstname, lastname, email, password, is_landlord)
            VALUES
            (:firstname, :lastname, :email, :password, :is_landlord);
            `;

            let params = {
                firstname: profile.firstname,
                lastname: profile.lastname,
                email: profile.email,
                password: profile.password,
                is_landlord: profile.is_landlord,
            }

            databaseConnection.query(query, params, (err, res) =>{
                if(err){reject(err)}
				// console.log("user added");
				resolve("user added");

                // let query2:string = `
                // UPDATE user
                // SET password = sha2(concat(:password, salt), 512)
                // WHERE user_id = :userId
                // `;
                // let param2 = {
                //     userId: res.insertId,
                //     password: profile.password[0]
                // }

                // databaseConnection.query(query2, param2, (err, res) => {
                //     if(err){reject(err)}
                //     resolve(res[0] as IUser) //this might be a problem but im rlly tired and cant think
                // })
            })
        })
    }
}

// let a = new Register();
// let user:IUser = {
// 	email:"hi",
// 	password:"hi",
// 	firstname:"hi",
// 	lastname:"hi",
// 	is_landlord: true
//
// }
// a.createUser(user).then(e => console.log(e)).catch(e => console.log(e));
