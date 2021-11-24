/*
    utilities for making a properties posting
*/

import databaseConnection from "../../../database/database";
import IProperty from "../../Interfaces/Profile/IProperty";

export default class Property{

    public create(property:IProperty):Promise<string> {
        let query:string = `
        INSEST INTO property
        (content,
            address
            city
            description
            landlord_id
            )
        VALUES
            (:address
            :city,
            :description
            );`
        let params = {
            address:property.address,
            city:property.city,
            description:property.description
        };
        return new Promise((resolve, reject) => {

			databaseConnection.query(query, params, (err) => {
				if(err){reject("Something's wrong with the database")}
				resolve("Property added");
			})
		})
    }
}