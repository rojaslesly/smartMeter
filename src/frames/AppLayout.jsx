export default function AppLayout({ children }) {
  return (
    <main style={styles.phoneFrame}>
      {children}
    </main>
  );
}

const styles = {
  phoneFrame: {
    width: "100%",
    maxWidth: "430px",
    minHeight: "100vh",
    margin: "0 auto",
    padding: "20px",
    paddingBottom: "90px",
    fontFamily: "system-ui",
    boxSizing: "border-box",
    background: "white",
  },
};