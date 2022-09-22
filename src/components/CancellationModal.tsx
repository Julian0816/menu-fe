import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function CancellationModal (props: any) {
    const [show, setShow] = useState(props.open);


    const cancelOrder = async () => {
      const res = await fetch(`http://localhost:8080/api/order/delete/${props.idOrder}`, { method: 'DELETE' })
      const data = await res.json();
      setShow(false);
  
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Are you sure you want to cancel your order?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='warning' onClick={cancelOrder}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}