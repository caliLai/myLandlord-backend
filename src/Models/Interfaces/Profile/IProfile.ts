import IUser from "../IUser";
import IReview from "./IReview";

interface IProfile extends IUser {
	reviews:Array<IReview>;
}

export default IProfile;
