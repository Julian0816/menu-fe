import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useMenuBasket } from '../context/MenuBasketContext';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function BackOfHouse() {
  const { closeBasket, basketItems } = useMenuBasket()
  const [order, setOrder] = useState<string>('');
  const [orders, setOrders] = useState<any>([]);
  const [showModal, setShowModal] = useState<Boolean>(false)
  
  const getAllOrders = async () => {
    const res = await fetch('http://localhost:8080/api/order', { method: 'GET' })
    const data = await res.json();
    setOrders(data)
  };

  useEffect(() => {
    getAllOrders();
  }, [])
  const handleClose = () => setShowModal(false);
  
  const cancelOrder =(id)=>{
    setOrder(id);
    setShowModal(true);

  }

  const confirmCancelOrder = async () => {
    const res = await fetch(`http://localhost:8080/api/order/delete/${order}`, { method: 'DELETE' })
    const data = await res.json();
    getAllOrders();
    setShowModal(false);

  };


  return (
    <>
      <h1 style={{ color: "white" }}>Orders</h1>
      <ListGroup>
        {orders.map(({ id, items, total }: any, index) => (
          <ListGroup.Item key={index}>
            <Card style={{ width: '60rem' }}>
              <Card.Body>
                <Card.Title>No order:{id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Total price: {`£ ${total}`}</Card.Subtitle>
                {JSON.parse('[' + items + ']').map(({ quatities }) => (
                  <Card.Text>{quatities}</Card.Text>
                ))}
                <Card.Link href="#"><Button variant='danger' size='sm' onClick={()=>{cancelOrder(id)}}>cancel order</Button></Card.Link>
                <Card.Link href="#"> <Button variant='warning'>Preparing</Button></Card.Link>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}

      </ListGroup>
      {showModal && <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to cancel your order?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='warning' onClick={confirmCancelOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>}
    </>
  )
}