import fridgeIcon from '../assets/fridge.svg';
import tvIcon from '../assets/tv.svg';
import washerIcon from '../assets/washing.svg';

const appliances = [
  { id: 1, name: 'Fridge', icon: fridgeIcon, power: '150 W' },
  { id: 2, name: 'TV', icon: tvIcon, power: '90 W' },
  { id: 3, name: 'Dish Washer', icon: washerIcon, power: '500 W' },
];

export default function ApplianceCarousel() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h3 style={styles.title}> Detected Appliances</h3>

        <button style={styles.arrowButton}>›</button>
      </div>

      <div style={styles.carousel}>
        {appliances.map((item) => (
          <div key={item.id} style={styles.item}>
            <div style={styles.circle}>
              <img src={item.icon} alt={item.name} style={styles.icon} />
            </div>

            <h3 style={styles.name}>{item.name}</h3>
            <p style={styles.power}>{item.power}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: '20px 24px',
    backgroundColor: '#ffffff',
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
    
  },

  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '140%',
    color: '#111',
  },

  arrowButton: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#f4f4f4',
    fontSize: '30px',
    lineHeight: '28px',
    cursor: 'pointer',
  },

  carousel: {
    display: 'flex',
    gap: '28px',
    overflowX: 'auto',
    paddingBottom: '10px',
    scrollbarWidth: 'none', // Firefox
  },

  item: {
    minWidth: '110px',
    textAlign: 'center',
    flexShrink: 0,
  },

  circle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    backgroundColor: '#e9e9e6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '10px',
  },

  icon: {
    width: '70px',
    height: '70px',
    objectFit: 'contain',
  },

  name: {
    margin: '0',
    fontSize: '16px',
    fontWeight: '600',
    paddingRight: 16,
  },

  power: {
    margin: '0px 0 0',
    fontSize: '13px',
    color: '#666',
    paddingRight: 16,
  },
};
