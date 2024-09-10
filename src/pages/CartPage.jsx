import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, changeQuantity } from "../redux/cartSlice";
import "./CartPage.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const { items, subTotal, tax, totalAmount } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} />
          <div>
            <h4>{item.title}</h4>
            <p>Price: ${item.price}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, Number(e.target.value))
              }
              min="1"
            />
            <button onClick={() => dispatch(removeFromCart(item.id))}>
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <p>Subtotal: ${subTotal.toFixed(2)}</p>
        <p>Tax (12%): ${tax.toFixed(2)}</p>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CartPage;
