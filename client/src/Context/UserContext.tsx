import userContext from "../context";
import { useState } from "react";

function UserContext({children}) {
  
  const [scannedBarcode, setScannedBarcode]=useState<string | null>('')

  return (
    <>
    <userContext.Provider value={{scannedBarcode,setScannedBarcode}}> 
    {children}
    </userContext.Provider>
    </>
  );
}

export default UserContext;
