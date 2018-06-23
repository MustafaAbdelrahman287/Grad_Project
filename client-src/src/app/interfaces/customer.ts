export interface ICustomer{
    customer_Code:number,
    name:string,
    mobile_number:number,
    email:string,
    interset_list:string[],
    survey_points:number,
    cst_location:{lat: number, lng: number},
    loyalty_points:number,
    date_of_birth:Date,
    gender:string,
    age:number,
    income_level:string,
    educational_level:string,
    username:string,
    password:string,
    orders_code:string[],
    user_type:string


}