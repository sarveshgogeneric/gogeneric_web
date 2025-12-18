import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export const addToCart = async ({ item }) => {
  const token = localStorage.getItem("token");

  let guestId = localStorage.getItem("guest_id");

  if (!token) {
    if (!guestId || isNaN(Number(guestId))) {
      guestId = Date.now(); 
      localStorage.setItem("guest_id", guestId);
    }
  }
  try {
    const payload = {
      item_id: item.id,
      quantity: 1,
      price: item.price,
      model: "Item",
      ...(token ? {} : { guest_id: Number(guestId) }),
    };
    await api.post("/api/v1/customer/cart/add", payload, {
      headers: {
        moduleId: 2,
        zoneId: JSON.stringify([3]),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    toast.success("Added to cart");
    console.log(item);
    window.dispatchEvent(new Event("cart-updated"));
  } catch (err) {
    console.error("Add to cart error:", err?.response?.data);
    toast.error(
      err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        "Add to cart failed"
    );
  }
};
