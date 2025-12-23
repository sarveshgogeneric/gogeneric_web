import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { useAuth } from "./AuthContext";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchWallet = async () => {
    try {
      if (!user) {
        setWalletBalance(0);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) return;

      setLoading(true);

      const res = await api.get(
        "/api/v1/customer/wallet/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            zoneId: JSON.stringify([3]),
            moduleId: 2,
          },
          params: {
            limit: 100,
            offset: 0,
          },
        }
      );

      const transactions = res.data?.transactions || [];

      const total = transactions.reduce(
        (sum, tx) => sum + Number(tx.amount || 0),
        0
      );

      setWalletBalance(total);
    } catch (err) {
      console.error("Wallet fetch error", err);
      setWalletBalance(0);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Auto fetch on login/logout
  useEffect(() => {
    fetchWallet();
  }, [user]);

  return (
    <WalletContext.Provider
      value={{
        walletBalance,
        loading,
        refreshWallet: fetchWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
