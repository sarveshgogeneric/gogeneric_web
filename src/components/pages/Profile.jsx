import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axiosInstance";
import { Pencil } from "lucide-react";
import { useWallet } from "../../context/WalletContext";
import { cleanImageUrl } from "../../utils";

export default function Profile() {
  const navigate = useNavigate();
  const { balance } = useWallet();
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);

  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalOrders, setTotalOrders] = useState(0);

  /* ================= FETCH USER (LOCAL) ================= */
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      setPreviewImage(cleanImageUrl(u.image || ""));

    }
  }, []);

  /* ================= FETCH USER (API) ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/api/v1/customer/info", {
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
            "X-localization": "en",
          },
        });

        console.log("🟢 PROFILE API RESPONSE:", res.data);

        const apiUser = res.data?.data || res.data;

        const normalizedUser = {
          id: apiUser.id,
          email: apiUser.email,
          phone: apiUser.phone,
          name: `${apiUser.f_name || ""} ${apiUser.l_name || ""}`.trim(),
          f_name: apiUser.f_name,
          l_name: apiUser.l_name,
          image: apiUser.image_full_url || apiUser.image || "",
        };

        setUser(normalizedUser);
       setPreviewImage(cleanImageUrl(normalizedUser.image));

        localStorage.setItem("user", JSON.stringify(normalizedUser));
      } catch (err) {
        console.error("❌ Profile fetch error:", err);
      }
    };

    fetchProfile();
  }, []);

  /* ================= TOTAL ORDERS ================= */
  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await api.get("/api/v1/customer/order/list", {
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
          },
          params: { limit: 1, offset: 0 },
        });

        console.log("🟢 ORDERS API RESPONSE:", res.data);
        setTotalOrders(res.data?.total_size || 0);
      } catch (err) {
        console.error("Orders count error:", err);
      }
    };

    fetchTotalOrders();
  }, []);

  /* ================= LOYALTY POINTS ================= */
useEffect(() => {
  const fetchLoyaltyPoints = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get(
        "/api/v1/customer/loyalty-point/transactions",
        {
          params: {
            limit: 20,
            offset: 0, // first page
          },
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
          },
        }
      );

      console.log("🟢 LOYALTY API RESPONSE:", res.data);

      const transactions = res.data?.data || [];

      // ✅ CORRECT TOTAL CALCULATION
      const totalPoints = transactions.reduce(
        (sum, tx) =>
          sum + Number(tx.credit || 0) - Number(tx.debit || 0),
        0
      );

      console.log("🟣 TOTAL LOYALTY POINTS:", totalPoints);

      setLoyaltyPoints(totalPoints);
    } catch (err) {
      console.error("❌ Loyalty fetch error:", err);
      setLoyaltyPoints(0);
    }
  };

  fetchLoyaltyPoints();
}, []);



  /* ================= UPDATE PROFILE ================= */
  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("phone", user.phone);
      formData.append("button_type", "profile");

      if (profileImage) {
        formData.append("image", profileImage);
      }

      /* 🔍 FORM DATA LOG */
      for (let pair of formData.entries()) {
        console.log("🟡 FORM DATA:", pair[0], pair[1]);
      }

      const res = await api.post(
        "/api/v1/customer/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
          },
        }
      );

      console.log("🟢 UPDATE PROFILE RESPONSE:", res.data);

      /* ✅ IMAGE + USER SYNC (IMPORTANT FIX) */
      if (res.data?.image_full_url) {
        const updatedUser = {
          ...user,
          image: res.data.image_full_url,
        };

        setUser(updatedUser);
        setPreviewImage(cleanImageUrl(res.data.image_full_url));

        localStorage.setItem("user", JSON.stringify(updatedUser));
      }

      toast.success(res.data.message || "Profile updated");
      setProfileImage(null);
      setEditing(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.errors?.[0]?.message ||
          "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/api/v1/customer/update-profile",
        {
          password: newPassword,
          button_type: "change_password",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
          },
        }
      );

      console.log("🟢 CHANGE PASSWORD RESPONSE:", res.data);

      toast.success(res.data.message || "Password updated");
      setShowChangePassword(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* ===== PROFILE HEADER ===== */}
      <div className="bg-teal-50 rounded-2xl p-6 flex justify-between items-center mb-6">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <img
  src={
    previewImage
      ? cleanImageUrl(previewImage)
      : "https://via.placeholder.com/150?text=User"
  }
  alt="Profile"
  className="w-16 h-16 rounded-full object-cover border"
/>


            {editing && (
              <label className="absolute -bottom-1 -right-1 bg-teal-600 p-1 rounded-full cursor-pointer">
                <Pencil size={14} className="text-white" />
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setProfileImage(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}
          </div>

          <div>
            <h2 className="font-semibold">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>

        <button
          onClick={() => setEditing(true)}
          className="bg-white p-2 rounded-full shadow"
        >
          <Pencil size={18} />
        </button>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Loyalty Points" value={loyaltyPoints} />
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Wallet Balance" value={`₹${balance}`} />
      </div>

      {/* ===== PROFILE DETAILS ===== */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        {editing ? (
          <>
            <Input label="Name" value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })} />
            <Input label="Email" value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <Input label="Phone" value={user.phone || ""}
              onChange={(e) => setUser({ ...user, phone: e.target.value })} />

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </>
        ) : (
          <p><strong>Email:</strong> {user.email}</p>
        )}
      </div>

      {/* ===== ACTIONS ===== */}
      <div className="bg-white rounded-2xl shadow divide-y">
        <SettingItem label="Change Password" onClick={() => setShowChangePassword(true)} />
        <SettingItem
          label="Logout"
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        />
      </div>
    </div>
  );
}

/* ===== HELPERS ===== */
function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium">{label}</label>
      <input {...props} className="w-full border rounded-lg px-3 py-2" />
    </div>
  );
}

function SettingItem({ label, onClick }) {
  return (
    <div onClick={onClick} className="p-4 cursor-pointer font-medium">
      {label}
    </div>
  );
}
