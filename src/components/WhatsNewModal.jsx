const FEATURES = [
  {
    id: 'global-stats',
    date: '24/05/26',
    icon: '📊',
    title: 'Contadores globales — Mi Álbum',
    description:
      'Ya puedes ver el resumen completo de tu colección en un solo vistazo: cuántas figuritas de selecciones, FWC y CC tienes, más el total de repetidas. El panel se actualiza en tiempo real a medida que marcas figuritas.',
  },
  {
    id: 'fwc-cc-cards',
    date: '24/05/26',
    icon: '🃏',
    title: 'Cartas FWC y CC',
    description:
      'Se agregaron las secciones especiales del álbum: FWC (19 cartas, páginas 1–3 y 106–109) y CC (14 cartas, páginas 112–113). Puedes buscarlas por nombre y registrar tus figuritas igual que con las selecciones.',
  },
  {
    id: 'nav-redesign',
    date: '24/05/26',
    icon: '🎨',
    title: 'Rediseño de navegación',
    description:
      'Top-bar más limpio: solo Novedades y tu perfil. El botón de usuario ahora muestra tu nombre con un menú desplegable. Reorganizacion de items en el footer.',
  }
]

const STORAGE_KEY = 'whats-new-read'

function WhatsNewModal({ onClose }) {
  return (
    <div className="about-modal-overlay" onClick={onClose}>
      <div className="about-modal whats-new-modal" onClick={(e) => e.stopPropagation()}>
        <button className="about-close-btn" onClick={onClose} aria-label="Cerrar">×</button>
        <div className="whats-new-header">
          <span className="whats-new-title-icon">✨</span>
          <h2 className="whats-new-title">What's new</h2>
        </div>
        <div className="whats-new-list">
          {FEATURES.map((f) => (
            <div key={f.id} className="whats-new-item">
              <div className="whats-new-item-icon">{f.icon}</div>
              <div className="whats-new-item-body">
                <div className="whats-new-item-meta">
                  <span className="whats-new-item-title">{f.title}</span>
                  <span className="whats-new-item-date">{f.date}</span>
                </div>
                <p className="whats-new-item-desc">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export { FEATURES, STORAGE_KEY }
export default WhatsNewModal
