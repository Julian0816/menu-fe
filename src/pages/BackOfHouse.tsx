import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useMenuBasket } from '../context/MenuBasketContext';



export function BackOfHouse () {
    const { closeBasket, basketItems } = useMenuBasket()
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