import { useEffect } from 'react'
import { useI18n } from './hooks/useI18n.js'
import { useAuth } from './hooks/useAuth.js'
import { useGlobalCollection } from './hooks/useGlobalCollection.js'
import { useScroll } from './hooks/useScroll.js'
import { useShare } from './hooks/useShare.js'
import { useStickerSearch } from './hooks/useStickerSearch.js'
import { useBanners } from './hooks/useBanners.js'
import { useTheme } from './hooks/useTheme.js'

import SuggestionModal from './components/SuggestionModal.jsx'
import StickerPanel from './components/StickerPanel.jsx'
import GlobalStatsBar from './components/GlobalStatsBar.jsx'
import WhatsNewModal from './components/WhatsNewModal.jsx'
import { PromoBanner } from './components/PromoBanner.jsx'
import CuriosityCarousel from './components/CuriosityCarousel.jsx'
import ImportCollectionModal from './components/ImportCollectionModal.jsx'
import Header from './components/Header.jsx'
import SearchBox from './components/SearchBox.jsx'
import ResultsCount from './components/ResultsCount.jsx'
import StickerList from './components/StickerList.jsx'
import Footer from './components/Footer.jsx'
import ScrollTopButton from './components/ScrollTopButton.jsx'
import RedirectBanner from './components/RedirectBanner.jsx'
import WelcomeModal from './components/WelcomeModal.jsx'
import AboutModal from './components/AboutModal.jsx'

function App() {
  const { locale, t, toggleLocale } = useI18n()
  const { user, loading: authLoading, signInWithGoogle, signOut } = useAuth()
  useTheme()
  const { totals, loading: collectionLoading, updateEntry } = useGlobalCollection(user)
  const { showScrollTop, isAtBottom, scrollToTop } = useScroll()
  const { share, shareOptions } = useShare(t)
  const {
    search,
    setSearch,
    selectedCode,
    selectCountry,
    clearSearch,
    searchFocused,
    setSearchFocused,
    searchInputRef,
    filteredStickers,
    activeCountry,
  } = useStickerSearch()
  const {
    showWhatsNew,
    setShowWhatsNew,
    whatsNewUnread,
    openWhatsNew,
    showPromoBanner,
    dismissPromoBanner,
    showWelcomeModal,
    dismissWelcomeModal,
    showAbout,
    setShowAbout,
    showSuggestionModal,
    setShowSuggestionModal,
    showImportModal,
    setShowImportModal,
    showRedirectBanner,
    dismissRedirectBanner,
  } = useBanners(user)

  // SEO meta tags
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t('metaTitle')
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', t('metaDescription'))
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', t('metaTitle'))
    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute('content', t('metaDescription'))
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', t('metaTitle'))
    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute('content', t('metaDescription'))
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) ogLocale.setAttribute('content', locale === 'en' ? 'en_US' : 'es_ES')
  }, [locale, t])

  const handleClearSearch = () => {
    clearSearch()
    searchInputRef.current?.focus()
  }

  const handleBackSearch = () => {
    clearSearch()
    searchInputRef.current?.blur()
  }

  const handleSelectCountry = (code) => {
    selectCountry(code)
    scrollToTop()
  }

  return (
    <div className="container">
      <Header
        t={t}
        user={user}
        authLoading={authLoading}
        whatsNewUnread={whatsNewUnread}
        onOpenWhatsNew={openWhatsNew}
        onSignIn={signInWithGoogle}
        onSignOut={signOut}
        onImport={() => setShowImportModal(true)}
      />

      {showRedirectBanner && (
        <RedirectBanner onDismiss={dismissRedirectBanner} t={t} />
      )}

      {showWelcomeModal && (
        <WelcomeModal onClose={dismissWelcomeModal} t={t} />
      )}

      {showPromoBanner && !user && (
        <PromoBanner
          icon="✨"
          title={t('newFeatureTitle')}
          body={t('newFeatureBody')}
          onLogin={signInWithGoogle}
          onDismiss={dismissPromoBanner}
          storageKey="promo-banner-home"
        />
      )}

      <header className={searchFocused ? 'search-focus-mode' : ''}>
        <h1><span>⚽</span> {t('title')}</h1>
        <p>{t('description')}</p>
      </header>

      {user && (
        <GlobalStatsBar totals={totals} loading={collectionLoading} t={t} />
      )}

      {showAbout && (
        <AboutModal onClose={() => setShowAbout(false)} t={t} />
      )}

      {showSuggestionModal && (
        <SuggestionModal onClose={() => setShowSuggestionModal(false)} />
      )}

      {showWhatsNew && (
        <WhatsNewModal onClose={() => setShowWhatsNew(false)} t={t} locale={locale} />
      )}

      {showImportModal && (
        <ImportCollectionModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => window.location.reload()}
          t={t}
        />
      )}

      <SearchBox
        search={search}
        onChange={setSearch}
        onClear={handleClearSearch}
        onBack={handleBackSearch}
        inputRef={searchInputRef}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
        placeholder={t('searchPlaceholder')}
        t={t}
      />

      {search && (
        <ResultsCount count={filteredStickers.length} t={t} />
      )}

      <StickerList
        stickers={filteredStickers}
        onSelect={handleSelectCountry}
        t={t}
        scrollToTop={scrollToTop}
      />

      {activeCountry && user && (
        <StickerPanel
          countryCode={activeCountry.code}
          user={user}
          stickerCount={activeCountry.count ?? 20}
          onCollectionChange={updateEntry}
          t={t}
        />
      )}

      {activeCountry && !user && !authLoading && (
        <PromoBanner
          icon="🏆"
          title={t('promoBannerCountryTitle')}
          body={t('promoBannerCountryBody').replace('{count}', activeCountry.count ?? 20).replace('{country}', activeCountry.name)}
          onLogin={signInWithGoogle}
          onDismiss={() => localStorage.setItem('promo-banner-country', '1')}
          storageKey="promo-banner-country"
          className="promo-banner--country"
        />
      )}

      {activeCountry && (
        <CuriosityCarousel countryCode={activeCountry.code} locale={locale} />
      )}

      <Footer
        t={t}
        locale={locale}
        toggleLocale={toggleLocale}
        onShowAbout={() => setShowAbout(true)}
        onShowSuggestion={() => setShowSuggestionModal(true)}
        share={share}
        shareOptions={shareOptions}
      />

      <ScrollTopButton
        show={showScrollTop}
        isRaised={isAtBottom}
        onClick={scrollToTop}
        t={t}
      />
    </div>
  )
}

export default App
