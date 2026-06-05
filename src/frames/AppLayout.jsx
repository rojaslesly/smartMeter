import { useState, useEffect, useRef } from 'react';

export default function AppLayout({ children }) {
  const mainRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const onScroll = () => setVisible(el.scrollTop > 300);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main ref={mainRef} style={styles.phoneFrame}>
      {children}

      <button
        aria-label="Back to top"
        onClick={scrollToTop}
        style={{
          position: 'fixed',
          bottom: '84px',
          right: '20px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#2563eb',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 998,
          opacity: visible ? 1 : 0,
          pointerEvents: visible ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
          appearance: 'none',
          WebkitAppearance: 'none',
          outline: 'none',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 13.5V4.5M9 4.5L4.5 9M9 4.5L13.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
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
    paddingTop: "50px",
    paddingBottom: "90px",
    fontFamily: "system-ui",
    boxSizing: "border-box",
    background: "white",
    overflowY: "auto",
    height: "100vh",
  },
};
