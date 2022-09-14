import { Offcanvas, Stack } from "react-bootstrap";
import { useMenuBasket } from "../context/MenuBasketContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { BasketItem } from "./BasketItem";
import menuItems from "../data/items.json"



type ShoppingBasketProps = {
    isOpen: boolean
}

export function ShoppingBasket ({ isOpen}: ShoppingBasketProps) {
    const { closeBasket, basketItems } = useMenuBasket()


    return <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {basketItems.map(item => <BasketItem key={item.id} {...item}/>)}
                <div className="ms-auto fw-bold fs-5">
                    Total {formatCurrency(basketItems.reduce((total, MenuItem) => { const item = menuItems.find(i => i.id === MenuItem.id)
                    return total + (item?.price || 0) * MenuItem.quantity}, 0))}
                </div>
            </Stack>
        </Offcanvas.Body>
    </Offcanvas>
}