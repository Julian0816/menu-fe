import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingBasket } from "../components/ShoppingBasket";
import { useLocalStorage } from "../hooks/useLocalStorage";


//Types
type MenuBasketProviderProps = {
  children: ReactNode
}
type BasketItem = {
  id: number
  quantity: number
}

// type Order = {
//   total: number
//   items: BasketItem[]
// }

type MenuBasketContext = {
  openBasket: () => void
    closeBasket: () => void       
    getItemQuantity: (id: number) => number
    increaseBasketQuantity: (id: number) => void
    decreaseBasketQuantity: (id: number) => void
    removeFromBasket: (id: number) => void
    basketQuantity: number
    basketItems: BasketItem[]
    // order: Order
    
}


const MenuBasketContext = createContext({} as MenuBasketContext)


export function useMenuBasket () {
    return useContext(MenuBasketContext)
}


export function MenuBasketProvider ({ children }: MenuBasketProviderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [basketItems, setBasketItems] = useLocalStorage<BasketItem[]>("Shopping-basket",[])
    
    const basketQuantity = basketItems.reduce(
        (quantity, item) => item.quantity + quantity, 0
    )
    

    const openBasket = () => setIsOpen(true)
    const closeBasket = () => setIsOpen(false)

    
    function getItemQuantity (id: number) {
        return basketItems.find(item => item.id === id)?.quantity || 0
    }
    function increaseBasketQuantity(id: number) {
        setBasketItems(currItems => {
          if (currItems.find(item => item.id === id) == null) {
            return [...currItems, { id, quantity: 1 }]
          } else {
            return currItems.map(item => {
              if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 }
              } else {
                return item
              }
            })
          }
        })
      }
    function decreaseBasketQuantity (id: number) {
        setBasketItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
              return currItems.filter(item => item.id !== id)
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                } else {
                  return item
                }
              })
            }
          })
    }
    function removeFromBasket (id: number) {
        setBasketItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    return (
        <MenuBasketContext.Provider value={{ 
            getItemQuantity, 
            increaseBasketQuantity, 
            decreaseBasketQuantity, 
            removeFromBasket, 
            openBasket, 
            closeBasket, 
            basketItems, 
            basketQuantity
            }}>
            {children}
            <ShoppingBasket isOpen={isOpen}/>
        </MenuBasketContext.Provider>
    )
}