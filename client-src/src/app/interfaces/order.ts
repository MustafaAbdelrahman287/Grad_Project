export interface IOrder {
    order_code: string,
    date: Date,
    customer_id_fk: string,
    order_items_code: number [],
    total_price: number,
    branch_id_fk: string,
    id: string
  }