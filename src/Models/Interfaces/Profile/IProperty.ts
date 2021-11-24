interface IProperty{
    property_id?:number;

    address: string;
    city:string;
    description: string;

    images?:Array<string>; 

    landlord_id: number;
}

export default IProperty;