import React, { useState } from 'react';
import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useMenuBasket } from "../context/MenuBasketContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { BasketItem } from "./BasketItem";
import menuItems from "../data/items.json"
import { useEffect } from 'react';
import { ShoppingConfirmation } from './ShoppingConfirmation';
import Modal from 'react-bootstrap/Modal';
type ShoppingBasketProps = {
    isOpen: boolean
}
export function ShoppingBasket({ isOpen }: ShoppingBasketProps) {
    const { closeBasket, basketItems, removeFromBasket } = useMenuBasket()
    const [openModal, setOpenModal] = useState(false);
    const [total, setTotal] = useState('');
    useEffect(() => {
        calculateTootalPrice();
    }, [basketItems]);
    const createOrder = async () => {
        console.log('created')
        const subTotal = total.slice(1,3) +'.'+ total.slice(4, 6)
        const orderTotal = parseFloat(subTotal);
        console.log(total)
        console.log(subTotal)
        const data = { items: basketItems, total: orderTotal };
        const response = await fetch('http://localhost:8080/api/order/add/', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const order = await response.json();
        basketItems.forEach((e) => {
            removeFromBasket(e.id);
        })
        setOpenModal(false);
    }
    const handleClose = () => setOpenModal(false);
    const confirmationOrder = () => {
        setOpenModal(true)
        // createOrder()
    }
    const calculateTootalPrice = () => {
        const itemsTotal = formatCurrency(basketItems.reduce((total, MenuItem) => {
            const item = menuItems.find(i => i.id === MenuItem.id)
            return total + (item?.price || 0) * MenuItem.quantity
        }, 0));
        setTotal(itemsTotal);
    }
    return <Offcanvas show={isOpen} onHide={closeBasket} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack gap={3}>
                {basketItems.map(item => <BasketItem key={item.id} {...item} />)}
                <div className="ms-auto fw-bold fs-5">
                    {total}
                </div>
            </Stack>
            <Button variant='warning' className='w-100' onClick={confirmationOrder}>
                Check out
            </Button>
        </Offcanvas.Body>
        {openModal && <Modal show={openModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm to place your order</Modal.Title>
            </Modal.Header>
            <Modal.Body>Enjoy your meal</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant='warning' onClick={createOrder}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>}
    </Offcanvas>
}