import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useMenuBasket } from '../context/MenuBasketContext';
import { useEffect, useState } from 'react';



export function BackOfHouse () {
    const { closeBasket, basketItems } = useMenuBasket()
    const [orders, setOrders] = useState<any>([])

    const getAllOrders = async () => {
      const res = await fetch('http://localhost:3001/api/order', {method: 'GET'})
      const data = await res.json();
      console.log(data);
      
      data.map(async ({id, items, total})=>  {
        const products = [];
        const productItems = items.split('}');
        productItems.map( async (e) => {
          let element = e + '}';
          element = await JSON.parse(element)
          // console.log(element)
          // products.push(element)
          return element;
        })
        console.log(productItems);
      })
    };

    useEffect(() => {
      getAllOrders();
    },[])

    return (
        <>
            <h1 style={{color: "white"}}>Orders</h1>
            <ListGroup>
                
      <ListGroup.Item><Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card></ListGroup.Item>
      
    </ListGroup>
        </>
    )
}