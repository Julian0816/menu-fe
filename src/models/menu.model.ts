export interface BaseItem {
    name: string;
    price: number;
    decription: string;
    imagen: string;
}

export interface Item extends BaseItem {
    id: number;
}