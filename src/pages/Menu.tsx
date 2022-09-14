import { useState, useEffect } from 'react';
import {Col, Row} from 'react-bootstrap'
import { MenuItem } from '../components/MenuItem'
import menuItems from '../data/items.json'


export function Menu () {
  const [menulist, setMenuList] = useState([]);
  //
  const request = async()=>{
      const response = await fetch('http://localhost:3001/api/menu/items/');
    const menuRequest = await response.json();
    menuRequest ? setMenuList(menuRequest) : setMenuList([]);
  }
  
  
      useEffect(() => {
          request()
        }, []);

    return (
        <>
        <h1 style={{color: "white"}}>Menu</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {menulist.map(item => (
            <Col key={item.id}><MenuItem {...item} /></Col>
          ))}
        </Row>
        </>
    )
}


//