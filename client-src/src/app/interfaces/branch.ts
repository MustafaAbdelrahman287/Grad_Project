export interface IBranch {
    branch_code: number,
    name: string,
    province?: string,
    city: string,
    branch_area?: number,
    branch_manager?: string,
    branch_phone_numbers?: number[],
    branch_power?: number,
    branch_location: {lat: number, lng: number},
    orders_code?: string[],
    items_code?: string[],
    rating?: number,
    id?: string
}