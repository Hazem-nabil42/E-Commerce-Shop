import React, { createContext, useState, useEffect } from 'react';

// create context
export const CartContext = createContext();

const CartProvider = ({children}) => {
  // cart state
  const [ cart, setCart ] = useState([]);
  // item amount state
  const [itemAmount, setItemAmount] = useState(0);
  // total price
  const [total, setTotal] = useState(0);

  //update item amount
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0)
      setItemAmount(amount);
    }
  }, [cart])

  // total price 
  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.amount;
      }, 0)
      setTotal(amount);
    }
  }, [cart])

  const addToCart = (product, id) => {
    // info about the item to be desplayed in the cart
    const newItem = {...product, amount: 1}
    // check if the item is already in the cart
    const cartItem = cart.find(item => {
      return item.id === id 
    });
    // if cartItem true do this
    if (cartItem) {

      const newCart = [...cart].map(item => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount + 1};
        }else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
    // console.log(cartItem);
    // console.log(`item ${product.title} added To Cart Successfuly`);
  };
  // console.log(cart);


  // remove from cart
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id
    });
    setCart(newCart)
  }
  //clear the cart
  const clearCart = () => {
    setCart([])
  }

  // increase amount
  const increaseAmount = (id) => {
    const cartItem = cart.find(item => {

      addToCart(item, id);
    })
  }

  // decrease the amount
  const decreaseAmount = (id) => {
    // check if the item id already exist
    const cartItem = cart.find(item => {
      return item.id === id;
    });
    // if the item exist do this decrease the amount
    if (cartItem) {
      const newCart = cart.map(item => {
        if (item.id === id) {
          return {...item, amount: cartItem.amount - 1};
        }else {
          return item;
        }
      });
      setCart(newCart);
      } 
        
      if (cartItem.amount < 2) {
          removeFromCart(id);
      }
      
    }






  return (
    <CartContext.Provider
      value={ { 
        cart,
        addToCart, 
        removeFromCart, 
        clearCart, 
        increaseAmount, 
        decreaseAmount,
        itemAmount,
        total } }>
      {children}
    </CartContext.Provider>
    );
};

export default CartProvider;
