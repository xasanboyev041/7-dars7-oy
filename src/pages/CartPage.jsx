import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import "../styles/CartPage.css";

const CartPage = () => {
  const { items, subtotal, tax, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="container">
      <div className="cart-page">
        <h1>Your Cart</h1>
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <h2>{item.title}</h2>
              <p>Price: ${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
              />
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <p>
            Subtotal: <strong>${subtotal.toFixed(2)}</strong>
          </p>
          <p>
            Tax (12%): <strong>${tax.toFixed(2)}</strong>
          </p>
          <p>
            Total: <strong>${total.toFixed(2)}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
