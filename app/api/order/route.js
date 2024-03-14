const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const getCartItems = async (line_items) => {
  return new Promise((resolve, reject) => {
    let cartItems = [];
    cartItems = line_items.data.map((item) => {
      return {
        price: item.price.product,
        quantity: item.quantity,
      };
    });
    resolve(cartItems);
  });
};

export const POST = async (req, res) => {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("stripe-signature");
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const line_Items = await stripe.checkout.sessions.listLineItems(
        session.id
      );
    }
  } catch (error) {
    console.error(error);
  }
};
