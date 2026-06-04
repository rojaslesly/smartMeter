import homeIcon from "../assets/homeIcon.svg";
import graphIcon from "../assets/graphIcon.svg";
import profileIcon from "../assets/profileIcon.svg";

export default function BottomNav({ page, setPage, setMode }) {
  return (
    <div style={styles.nav}>

      <button
        style={page === "analytics" ? styles.active : styles.button}
        onClick={() => {setPage("analytics");
                       setMode("hard");}}
      >
        <img src={graphIcon} alt="Analytics" style={styles.icon} />
      </button>

      <button
        style={page === "home" ? styles.active : styles.button}
        onClick={() => {
          setPage("home");
          setMode('easy');

        }}
      >
        <img src={homeIcon} alt="Home" style={styles.icon} />
      </button>

      <button
  style={page === "user" ? styles.active : styles.button}
  onClick={() => setPage("user")}
>
  <img src={profileIcon} alt="User" style={styles.icon} />
</button>
    </div>
  );
}

const styles = {
  nav: {
    position: "fixed",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
  
    width: "100%",
    maxWidth: "430px",
    height: "70px",
  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  
    background: "#fff",
    borderTop: "1px solid #ddd",
    boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
  
    boxSizing: "border-box",
    zIndex: 1000,
  },

  button: {
    background: "none",
    border: "none",
    cursor: "pointer",
    opacity: 0.6,
    transition: "0.2s",
  },

  active: {
    background: "none",
    border: "none",
    cursor: "pointer",
    opacity: 1,
    transform: "scale(1.1)",
    transition: "0.2s",
  },

  icon: {
    width: "28px",
    height: "28px",
  },
};