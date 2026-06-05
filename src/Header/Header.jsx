import './Header.css';
import gridPingLogo from '../assets/GridPing.png';

export default function Header({ onLogoClick }) {
  return (
    <header className="topbar">
      <button
        onClick={onLogoClick}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
        aria-label="Go to home"
      >
        <img src={gridPingLogo} alt="GridPing" className="app-header-logo" />
      </button>
    </header>
  );
}
