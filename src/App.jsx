import { useState } from "react";

import ModeToggle from "./buttons/ModeToggle";
import EasyPage from "./pages/EasyPage";
import HardPage from "./pages/HardPage";
import UserPage from "./pages/UserPage";

import Header from "./Header/Header";
import AppLayout from "./frames/AppLayout";
import BottomNav from "./dashboard/Dashboard";

function App() {
  const [mode, setMode] = useState("easy");
  const [page, setPage] = useState("home");

  return (
    <AppLayout>
      <div
        style={{
          padding: 20,
          fontFamily: "system-ui",
          position: "relative",
        }}
      >
        <Header onLogoClick={() => { setPage("home"); setMode("easy"); }} />

        {/* Show toggle everywhere except User page */}
        {page !== "user" && (
          <ModeToggle mode={mode} setMode={setMode} />
        )}

        <div style={{ marginTop: 16 }}>
          {/* Home and Analytics both respect the toggle */}
          {(page === "home" || page === "analytics") &&
            (mode === "easy" ? <EasyPage /> : <HardPage />)}

          {/* User Page */}
          {page === "user" && <UserPage />}
        </div>

        <BottomNav
          page={page}
          setPage={setPage}
          setMode={setMode}
        />
      </div>
    </AppLayout>
  );
}

export default App;