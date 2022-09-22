import { useState, useEffect } from 'react';
import {Col, Row} from 'react-bootstrap'
import { MenuItem } from '../components/MenuItem'
import menuItems from '../data/items.json'
import { Item } from '../models/menu.model';


export function Menu () {
  const [menulist, setMenuList] = useState<Item[]>([]);
  
  
      useEffect(() => {
        const request = async()=>{
          const response = await fetch('http://localhost:8080/api/menu/items/'); //Connection to BE
        const menuRequest = await response.json();
        menuRequest ? setMenuList(menuRequest) : setMenuList([]);
      }
          request()
        }, []);

    return (
        <>
        <h1 style={{color: "white"}}>Place your order</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {menulist.map(item => (
            <Col key={item.id}><MenuItem {...item} /></Col>
          ))}
        </Row>
        </>
    )
}

