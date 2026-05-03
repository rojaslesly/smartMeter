import { useState } from "react";

// import SVGs here
import fridgeIcon from "../assets/fridge.svg";
import tvIcon from "../assets/tv.svg";
import washerIcon from "../assets/washing.svg";
//import lampIcon from "../assets/lamp.svg";

const appliances = [
  { id: 1, name: "Fridge", icon: fridgeIcon, power: "150 W" }, //,
  { id: 3, name: "TV", icon: tvIcon, power: "90 W" },
  { id: 2, name: "Washer", icon: washerIcon, power: "500 W" }
//  { id: 4, name: "Lamp", icon: lampIcon, power: "12 W" },
];

export default function ApplianceCarousel() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % appliances.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + appliances.length) % appliances.length);
  };

  const current = appliances[index];

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.title}>Appliances</h2>

      <div style={styles.carousel}>
        <button onClick={prevSlide} style={styles.button}>
          ◀
        </button>

        <div style={styles.card}>
          <img src={current.icon} alt={current.name} style={styles.icon} />
          <h3 style={styles.name}>{current.name}</h3>
          <p style={styles.power}>{current.power}</p>
        </div>

        <button onClick={nextSlide} style={styles.button}>
          ▶
        </button>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    marginBottom: "16px",
  },
  carousel: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    width: "220px",
    minHeight: "240px",
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    marginBottom: "12px",
  },
  name: {
    margin: "8px 0 4px 0",
  },
  power: {
    margin: 0,
    color: "#555",
  },
  button: {
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    fontSize: "20px",
    cursor: "pointer",
    backgroundColor: "#eaeaea",
  },
};
