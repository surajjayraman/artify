import Navbar from "@components/Navbar";
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
      <div className="cart">Cart</div>;
    </>
  );
};

export default Cart;
