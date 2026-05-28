import UserMenu from './UserMenu.jsx'

function Header({ t, user, authLoading, whatsNewUnread, onOpenWhatsNew, onSignOut, onImport }) {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {whatsNewUnread && (
          <button className="about-link whats-new-btn" onClick={onOpenWhatsNew}>
            {t('whatsNewButton')}
            <span className="whats-new-badge" />
          </button>
        )}
      </div>
      <div className="user-auth-area">
        {authLoading && <div className="user-avatar-skeleton" aria-hidden="true" />}
        {!authLoading && user && (
          <UserMenu user={user} onSignOut={onSignOut} onImport={onImport} t={t} />
        )}
      </div>
    </div>
  )
}

export default Header
