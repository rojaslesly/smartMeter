export default function AppLayout({ children }) {
    return (
      <main
        style={{
          width: "100%",
          maxWidth: "430px",
          minHeight: "100vh",
          margin: "0 auto",
          padding: "20px",
          fontFamily: "system-ui",
          boxSizing: "border-box",
          background: "white",
          
        }}
      >
        {children}
      </main>
    );
  }