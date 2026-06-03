export default function ModeToggle({ mode, setMode }) {
  const buttonStyle = (active) => ({
    padding: '10px 20px',
    borderRadius: '999px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500,
    background: active ? '#1f1f1f' : '#f5f5f5',
    color: active ? 'white' : '#111',
    fontFamily: 'Arial, sans-serif',
    transition: '0.2s ease',
  });

  return (
    <div
      style={{
        display: 'flex',

        // NEW:
        // Pushes toggle to left side
        justifyContent: 'flex-start',

        alignItems: 'center',

        // NEW:
        // Gives spacing from edge of app
        paddingLeft: '1px',
        marginTop: '20px',

        // CHANGED:
        // Space between buttons
        gap: '15px',

        // Makes container take full width
        width: '100%',
      }}
    >
      <button
        type="button"
        onClick={() => setMode('easy')}
        aria-pressed={mode === 'easy'}
        style={buttonStyle(mode === 'easy')}
      >
        Simple
      </button>

      <button
        type="button"
        onClick={() => setMode('hard')}
        aria-pressed={mode === 'hard'}
        style={buttonStyle(mode === 'hard')}
      >
      Advanced
      </button>
    </div>
  );
}
