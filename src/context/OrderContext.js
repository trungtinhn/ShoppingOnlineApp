import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [promoCode, setPromoCode] = useState();
  const [address, setAddress] = useState();
  const [product, setProduct] = useState([]);
  const [payment, setPayment] = useState();
  const [numCart, setNumCart] = useState(0);
  return (
    <OrderContext.Provider value={{ promoCode, setPromoCode, address, setAddress, product, setProduct, payment, setPayment, numCart, setNumCart }}>
      {children}
    </OrderContext.Provider>
  );
};
