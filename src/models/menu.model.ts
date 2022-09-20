export interface BaseItem {
    name: string;
    price: number;
    decription: string;
    image: string;
}

export interface Item extends BaseItem {
    id: number;
}