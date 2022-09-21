import React, { useState } from 'react';
import {Button, Offcanvas, Stack } from "react-bootstrap";
import { useMenuBasket } from "../context/MenuBasketContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { BasketItem } from "./BasketItem";

import { ShoppingConfirmation } from './ShoppingConfirmation';
import menuItems from "../data/items.json"
import { useEffect } from 'react';
type ShoppingBasketProps = {
    isOpen: boolean
}
export function ShoppingBasket ({ isOpen}: ShoppingBasketProps) {
    const { closeBasket, basketItems } = useMenuBasket()
    const [openModal, setOpenModal] = useState(false);
    const [total, setTotal] = useState('');
    useEffect(() => {
		calculateTootalPrice();
	}, [basketItems]);

    const confirmationOrder =()=>{
        console.log('cofirmo la orden ')
        setOpenModal(true)
    }

    const calculateTootalPrice = () => {
        const itemsTotal = formatCurrency(basketItems.reduce((total, MenuItem) => { const item = menuItems.find(i => i.id === MenuItem.id)
            return total + (item?.price || 0) * MenuItem.quantity}, 0));
            console.log(itemsTotal)
            setTotal(itemsTotal);
    }

    return <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
        
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {basketItems.map(item => <BasketItem key={item.id} {...item}/>)}
                <div className="ms-auto fw-bold fs-5">
                    {/* Total {formatCurrency(basketItems.reduce((total, MenuItem) => { const item = menuItems.find(i => i.id === MenuItem.id)
                    return total + (item?.price || 0) * MenuItem.quantity}, 0))} */}
                    {total}
                </div>
            </Stack>
            <Button variant='warning' className='w-100' onClick={confirmationOrder}>
                Check out
            </Button>
        </Offcanvas.Body> 
        {openModal && <ShoppingConfirmation open={openModal}/>}
    </Offcanvas>
}
