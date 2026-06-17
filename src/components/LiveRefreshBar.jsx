/** Shared live-status dot + manual refresh button shown at the top of data pages. */
export default function LiveRefreshBar({ isLive, isLoading, onRefresh, spinning }) {
  return (
    <div style={styles.row}>
      <span style={styles.status}>
        <span style={{ ...styles.dot, background: isLive ? '#22c55e' : '#d1d5db' }} />
        {isLoading ? 'Updating…' : isLive ? 'Live' : 'No data'}
      </span>
      <button
        onClick={onRefresh}
        title="Refresh data"
        style={{
          ...styles.btn,
          transform: spinning ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        ↻
      </button>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '6px',
  },
  status: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '11px',
    color: '#888',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  btn: {
    background: 'none',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '4px 8px',
    cursor: 'pointer',
    fontSize: '14px',
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.5s ease',
    outline: 'none',
    appearance: 'none',
    WebkitAppearance: 'none',
  },
};
