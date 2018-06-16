export interface IItem{
    item_code: string,
    name: string,
    price: string,
    size: string,
    color: string,
    category: string,
    picture: string,
    sub_category: string,
    discount: number,
    order_id_fk: string,
    branch_id_fk: string,
    availabe_in_branches:number [],
    rating: number,
    id: string

    
}