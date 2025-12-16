import api from "../api/axiosInstance";
import toast from "react-hot-toast";
export const addToCart = async ({ item }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Please login to add items to cart");
    window.dispatchEvent(new Event("open-login-modal"));

    return;
  }
  try {
    const payload = {
      item_id: item.id,
      quantity: 1,
      price: item.price,
      model: "Item",
    };
    await api.post("/api/v1/customer/cart/add", payload, {
      headers: {
        moduleId: 2,
        zoneId: JSON.stringify([3]),
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Added to cart");
    window.dispatchEvent(new Event("cart-updated"));
  } catch (err) {
    toast.error(
      err?.response?.data?.errors?.[0]?.message || "Add to cart failed"
    );
  }
};
