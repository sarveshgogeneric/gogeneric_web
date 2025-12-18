import { useAuth } from "../../context/AuthContext";
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../../api/axiosInstance";
import LoginModal from "../auth/LoginModal";

export default function Profile() {
  const { user, logout, setUser } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

 
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  /* ================= UPDATE PROFILE ================= */
  const handleUpdate = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    const res = await api.post(
      "/api/v1/customer/update-profile",
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          moduleId:2,
          zoneId : JSON.stringify([3])
        },
      }
    );

  const updatedUser = {
  ...user,
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
};

setUser(updatedUser);
localStorage.setItem("user", JSON.stringify(updatedUser));

    toast.success("Profile updated successfully");
    logout();
    navigate('/LoginModal');
    setEditing(false);
  } catch (err) {
    console.error("Update error:", err);
    console.log("Axios Error:", err);
  console.log("Status:", err?.response?.status);
  console.log("Status Text:", err?.response?.statusText);
  console.log("Response Data:", err?.response?.data);
  console.log("Request Config:", err?.config);
  console.log("Headers Sent:", err?.config?.headers);
    toast.error(
      err?.response?.data?.message || "Update failed"
    );
  }
};


  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
      {/* ===== LEFT SIDEBAR ===== */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Hello</p>
          <h2 className="text-xl font-semibold mb-4">
            {user?.name || "User"}
          </h2>

          <ul className="space-y-3">
            <SidebarItem icon={<User size={18} />} label="Profile Overview" active />
            <SidebarItem icon={<Package size={18} />} label="Orders" />
            <SidebarItem icon={<Heart size={18} />} label="Wishlist" />
            <SidebarItem icon={<MapPin size={18} />} label="Addresses" />
            <SidebarItem icon={<CreditCard size={18} />} label="Saved Cards" />
          </ul>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 text-red-600 font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* ===== RIGHT CONTENT ===== */}
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Details</h3>

          {/* ===== VIEW MODE ===== */}
          {!editing && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileField label="Full Name" value={user?.name} />
                <ProfileField label="Email" value={user?.email} />
                <ProfileField label="Phone" value={user?.phone} />
                <ProfileField label="Member Since" value="—" />
              </div>

              <button
                onClick={() => setEditing(true)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full"
              >
                Edit Profile
              </button>
            </>
          )}

          {/* ===== EDIT MODE ===== */}
          {editing && (
            <div className="space-y-4">
              <InputField
                label="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <InputField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <InputField
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="px-6 py-2 bg-green-600 text-white rounded-full disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save"}
                </button>

                <button
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 bg-gray-200 rounded-full"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SidebarItem({ icon, label, active }) {
  return (
    <li
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium ${
        active
          ? "bg-pink-50 text-pink-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      {label}
    </li>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <input
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
      />
    </div>
  );
}
