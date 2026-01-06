import { createContext, useContext, useState, useEffect } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem("user_location");
    return saved ? JSON.parse(saved) : null;
  });
  const [addressVersion, setAddressVersion] = useState(0);

  const notifyAddressChange = () =>{
    setAddressVersion((v)=> v+1);
  };


  useEffect(() => {
    if (location) {
      localStorage.setItem("user_location", JSON.stringify(location));
    }
  }, [location]);

  return (
    <LocationContext.Provider value={{ location, setLocation, addressVersion, notifyAddressChange }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);
