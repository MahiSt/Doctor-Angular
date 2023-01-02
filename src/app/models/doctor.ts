import { Address } from "./address";

export class Doctor {
    constructor(	
        public id:number,
        public doctorName:string,
        public gender:string,
        public contactNo:number,
        public registrationId:number,
        public dob:Date,
        public email:string,
        public address:Address,
        public qualification:string,
        public speciality:string,
        public certification:string, 
        public experience:number,
        public hospitalName:string,
        public available_time:string,
        public bloodGroup:string,
        public mode:string[],
        public fees:number,
        public languagesKnown:string[],
        public description:string,
        public ratings:number,
    ){ }
}
