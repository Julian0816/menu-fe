import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from './pages/Home'
import { Menu } from './pages/Menu'
import { BackOfHouse } from './pages/BackOfHouse'
import { Navbar } from './components/Navbar'
import { MenuBasketProvider } from "./context/MenuBasketContext"



function App() {
  return (
    <MenuBasketProvider>
    <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/backOfHouse" element={<BackOfHouse />}/>
        </Routes>
      </Container>
    </MenuBasketProvider>
  )
}

export default App

