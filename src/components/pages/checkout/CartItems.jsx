import "./CartItems.css";
import { cleanImageUrl } from "../../../utils";

export default function CartItems({ cartItems }) {
  return (
    <div className="checkout-card">
      <h4>Cart Items</h4>

      {cartItems.map((item) => {
        const img =
          item.item?.image_full_url ||
          item.item?.images_full_url?.[0] ||
          item.item?.image;

        return (
          <div key={item.id} className="checkout-cart-item">
            <img
              src={cleanImageUrl(img)}
              alt={item.item?.name}
              className="cart-item-image"
              onError={(e) => (e.currentTarget.src = "/no-image.png")}
            />

            <div className="cart-item-info">
              <p className="cart-item-name">
                {item.item?.name}
              </p>
              <p className="cart-item-qty">
                Qty: {item.quantity}
              </p>
            </div>

            <div className="cart-item-price">
              ₹{item.price * item.quantity}
            </div>
          </div>
        );
      })}
    </div>
  );
}
