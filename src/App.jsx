import { useState } from "react";
//import React, { useMemo, useState } from "react";
import ModeToggle from "./buttons/ModeToggle";
import EasyPage from "./pages/EasyPage";
import HardPage from "./pages/HardPage";


function App() {

 const [mode, setMode] = useState("easy"); // "easy" | "hard"

 return (
   <div style={{ padding: 20, fontFamily: "system-ui" }}>
     <ModeToggle mode={mode} setMode={setMode} />

     <div style={{ marginTop: 16 }}>
       {mode === "easy" ? <EasyPage /> : <HardPage />}
     </div>
   </div>
   
 );

}

export default App;