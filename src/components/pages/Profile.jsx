import { useAuth } from "../../context/AuthContext";
import { User, Package, Heart, MapPin, CreditCard, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log(storedUser);




  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
      {/* LEFT SIDEBAR */}
      <div className="col-span-12 md:col-span-4 lg:col-span-3">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-sm text-gray-500">Hello</p>
          <h2 className="text-xl font-semibold mb-4">{user?.name || "User"}</h2>

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
    console.log("User logged out");
    navigate("/"); // redirect
  }}
  className="mt-6 w-full flex items-center justify-center gap-2 text-red-600 font-medium"
>
  <LogOut size={18} /> Logout
</button>

        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-12 md:col-span-8 lg:col-span-9">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Profile Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField label="Full Name" value={user?.name} />
            <ProfileField label="Email" value={user?.email} />
            <ProfileField label="Phone" value={user?.phone} />
            <ProfileField label="Member Since" value="--" />
          </div>

          <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <li
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium $
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
