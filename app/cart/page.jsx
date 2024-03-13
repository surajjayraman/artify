"use client";
import Navbar from "@components/Navbar";
import { AddCircle, Remove, RemoveCircle } from "@mui/icons-material";
import "@styles/Cart.scss";
import { useSession } from "next-auth/react";
const Cart = () => {
  const { data: session, update } = useSession();
  const cart = session?.user?.cart;
  const userId = session?.user?._id;

  const updateCart = async (cart) => {
    const response = await fetch(`/api/user/${userId}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    const data = await response.json();
    console.log(`updated cart: ${JSON.stringify(data)}`);
    update({ user: { cart: data } });
  };

  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="details">
          <div className="top">
            <h1>Your Cart</h1>
            <h2>
              Subtotal: <span>$300</span>
            </h2>
          </div>

          {cart?.length === 0 && <h3>Empty Cart</h3>}
          {cart?.length > 0 && (
            <div className="all-items">
              {cart?.map((item, index) => (
                <div className="item" key={index}>
                  <div className="item_info">
                    <img src={item.image} alt="product" />
                    <div className="text">
                      <h3>{item.title}</h3>
                      <p>Category: {item.category}</p>
                      <p>Seller: {item.creator.username}</p>
                      <h4>${item.price}</h4>
                    </div>
                  </div>

                  <div className="quantity">
                    <AddCircle
                      sx={{
                        fontSize: "18px",
                        color: "grey",
                        cursor: "pointer",
                      }}
                    />
                    <h3>{item.quantity}</h3>
                    <RemoveCircle
                      sx={{
                        fontSize: "18px",
                        color: "grey",
                        cursor: "pointer",
                      }}
                    />
                    <button
                      onClick={() => {
                        const newCart = cart.map((cartItem) => {
                          if (cartItem._id === item._id) {
                            cartItem.quantity -= 1;
                          }
                          return cartItem;
                        });
                        updateCart(newCart);
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => {
                        const newCart = cart.map((cartItem) => {
                          if (cartItem._id === item._id) {
                            cartItem.quantity += 1;
                          }
                          return cartItem;
                        });
                        updateCart(newCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Cart;
