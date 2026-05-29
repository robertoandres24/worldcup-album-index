import flags from '../data/flags.js'

const FWC_ICON = (
  <svg
    className="w-[1.625rem] h-auto shrink-0 block"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFD700"
  >
    <path
      d="M384,449.963v-12.629c0-17.643-14.357-32-32-32h-15.104c-19.989-34.176-27.52-93.973-27.563-127.659
      c3.349-6.059,6.549-11.712,9.237-16.341c17.557-30.379,44.096-99.072,44.096-133.333v-4.821c0-5.845-0.043-10.368-0.192-14.336
      c0.085-0.619,0.192-1.707,0.192-2.176C362.667,47.851,314.816,0,256,0S149.333,47.851,149.333,106.667
      c0,13.141,2.645,25.835,7.211,37.717c0.043,0.213-0.021,0.427,0.021,0.64l46.763,185.728
      c-9.493,31.317-23.019,62.037-28.779,74.581H160c-17.643,0-32,14.357-32,32v12.629c-12.395,4.416-21.333,16.149-21.333,30.037
      v21.333c0,5.888,4.779,10.667,10.667,10.667h277.333c5.888,0,10.667-4.779,10.667-10.667V480
      C405.333,466.112,396.395,454.379,384,449.963z M256,21.333c40.107,0,73.579,27.883,82.709,64.747
      c-9.323,1.856-12.672,12.373-16.704,27.072c-1.792,6.528-3.691,12.843-5.76,18.859c-6.677-14.912-21.568-25.344-38.912-25.344
      c-18.667,0-34.389,12.117-40.171,28.843c-2.453-5.333-4.843-10.965-7.232-17.003c-7.04-17.792-13.12-33.173-27.285-33.173
      c-4.117,0-7.851,1.771-10.496,4.992c-7.296,8.875-5.269,28.096,3.819,76.352c-15.936-15.744-25.301-37.141-25.301-60.011
      C170.667,59.605,208.939,21.333,256,21.333z M298.667,149.333c0,11.755-9.557,21.333-21.333,21.333S256,161.088,256,149.333
      c0-11.755,9.557-21.333,21.333-21.333S298.667,137.579,298.667,149.333z M189.76,189.483c3.84,3.051,7.893,5.845,12.203,8.384
      c5.717,29.824,11.371,61.099,11.371,79.467c0,1.536-0.149,3.221-0.235,4.821L189.76,189.483z M234.667,277.333
      c0-22.933-7.168-59.904-14.101-95.659c-3.243-16.789-7.189-37.035-9.536-53.035c9.472,23.893,23.829,56.832,56.939,62.251
      c3.029,0.683,6.144,1.109,9.365,1.109c3.392,0,6.656-0.491,9.835-1.259c34.816-6.123,47.445-43.371,54.165-67.435V128
      c0,27.157-23.061,91.2-42.219,124.373C285.12,276.565,256,326.912,256,373.333c0,5.888,4.779,10.667,10.667,10.667
      s10.667-4.779,10.667-10.667c0-18.496,5.717-38.229,13.184-56.619c3.136,28.309,9.664,62.016,22.08,88.619H197.952
      C210.347,377.365,234.667,317.333,234.667,277.333z M149.333,437.333c0-5.888,4.8-10.667,10.667-10.667h192
      c5.867,0,10.667,4.779,10.667,10.667V448H149.333V437.333z M384,490.667H128V480c0-5.888,4.8-10.667,10.667-10.667h234.667
      C379.2,469.333,384,474.112,384,480V490.667z"
    />
  </svg>
)

const CC_ICON = (
  <svg
    className="w-[1.625rem] h-auto shrink-0 block"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="13" fill="#E8000E" />
    <text
      x="14"
      y="14"
      textAnchor="middle"
      dominantBaseline="central"
      fill="white"
      fontSize="11"
      fontWeight="800"
      fontFamily="system-ui,sans-serif"
    >
      CC
    </text>
  </svg>
)

const PANINI_ICON = (
  <svg
    className="w-[1.625rem] h-auto shrink-0 block"
    viewBox="-6.5 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#6366F1"
  >
    <path d="M2.531 4.781h13.563c1.406 0 2.531 1.156 2.531 2.531v14.844c0 1.344-1.094 2.469-2.438 2.531v-1.688c0.406-0.063 0.75-0.438 0.75-0.844v-14.844c0-0.438-0.406-0.813-0.844-0.813h-13.563c-0.438 0-0.844 0.375-0.844 0.813 0.156-0.031 0.375-0.063 0.563-0.063 0.156 0 0.281 0 0.438 0.031l10.156 1.531c1.375 0.25 2.375 1.5 2.375 2.875v13.219c0 1.313-0.938 2.281-2.219 2.281-0.125 0-0.313 0-0.469-0.031l-10.125-1.531c-1.344-0.25-2.406-1.5-2.406-2.844v-15.469c0-1.375 1.156-2.531 2.531-2.531zM3.031 12.75l8.906 1.313 0.219-1.531-8.906-1.313zM4.906 14.094l-0.125 0.938 4.938 0.75 0.125-0.938z" />
  </svg>
)

function StickerCard({ sticker, stats, onClick, isComplete, isActive }) {
  const stateClasses = isActive
    ? 'border-accent-blue-border bg-accent-blue-subtle shadow-none'
    : isComplete
      ? 'border-accent-orange-border bg-accent-orange-subtle'
      : 'bg-card-bg border-border-color hover:bg-bg-tertiary hover:border-border-strong hover:shadow-sm'

  const baseCard =
    'rounded-lg px-[1.125rem] py-[1rem] flex items-center gap-[0.875rem] border border-solid transition-[background,border-color,box-shadow] duration-200 cursor-pointer max-sm:px-[1rem] max-sm:w-full max-sm:min-w-0'

  const pageNumberClasses =
    'text-[1.375rem] font-bold text-muted min-w-[44px] text-center tracking-tight tabular-nums max-sm:text-2xl max-sm:min-w-[50px]'
  const countryInfoClasses = 'flex-1 min-w-0'
  const countryFlagClasses = 'w-[1.625rem] h-auto shrink-0 rounded-[3px] block'
  const countryCodeClasses =
    'text-xs text-muted font-semibold uppercase tracking-widest mb-[0.2rem]'
  const codeRowCodeClasses =
    'text-xs text-muted font-semibold uppercase tracking-widest leading-none'
  const countryNameClasses =
    'text-base font-semibold text-country-name-color whitespace-nowrap overflow-hidden text-ellipsis max-sm:text-[1.1rem]'
  const statsClasses = 'flex flex-col items-end gap-[0.2rem] shrink-0'
  const statsCountClasses = 'text-sm font-semibold leading-tight tabular-nums'
  const statsNumClasses = 'text-accent-blue'
  const statsSepClasses = 'text-muted font-medium'
  const statsTotalClasses = 'text-muted font-medium'
  const statsAllBlueClasses = 'text-accent-blue'
  const statsRepeatedClasses = 'text-xs text-accent-orange leading-tight tabular-nums'
  const codeRowClasses = 'flex items-center gap-2 mb-1'
  const groupBadgeClasses =
    'bg-bg-quaternary border border-border-color text-muted w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0'
  const groupBadgeSmallClasses =
    'w-4 h-4 rounded-full inline-flex items-center justify-center font-bold text-[0.6rem] text-white shrink-0 -mt-px opacity-85'

  const groupColor = (group) => {
    const colors = {
      a: 'bg-[#2d7a35]',
      b: 'bg-[#c53030]',
      c: 'bg-[#b7791f]',
      d: 'bg-[#2b6cb0]',
      e: 'bg-[#c05621]',
      f: 'bg-[#276749]',
      g: 'bg-[#6b46c1]',
      h: 'bg-[#086f83]',
      i: 'bg-[#553c9a]',
      j: 'bg-[#b7445a]',
      k: 'bg-[#97266d]',
      l: 'bg-[#744210]',
    }
    return colors[group.toLowerCase()] || ''
  }

  if (sticker.type) {
    const icon = sticker.type === 'fwc' ? FWC_ICON : sticker.type === 'cc' ? CC_ICON : PANINI_ICON
    const total = sticker.count
    const codeClasses =
      sticker.type === 'fwc'
        ? 'bg-[var(--fwc-gradient)] bg-clip-text text-transparent text-xs font-semibold uppercase tracking-widest mb-[0.2rem]'
        : sticker.type === 'cc'
          ? 'text-[#e84040] text-xs font-semibold uppercase tracking-widest mb-[0.2rem]'
          : countryCodeClasses
    const statsCompleteSpecial = stats && stats.collected >= total
    return (
      <div
        className={`${baseCard} justify-start ${stateClasses}`.trim()}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
      >
        <div className={pageNumberClasses}>{sticker.page}</div>
        {icon}
        <div className={countryInfoClasses}>
          <div className={codeClasses}>{sticker.code}</div>
          <div className={countryNameClasses}>{sticker.label}</div>
        </div>
        {stats ? (
          <div className={statsClasses}>
            <div
              className={`${statsCountClasses} ${statsCompleteSpecial ? 'text-accent-blue' : ''}`}
            >
              <span className={statsCompleteSpecial ? statsAllBlueClasses : statsNumClasses}>
                {stats.collected}
              </span>
              <span className={statsCompleteSpecial ? statsAllBlueClasses : statsSepClasses}>
                /
              </span>
              <span className={statsCompleteSpecial ? statsAllBlueClasses : statsTotalClasses}>
                {total}
              </span>
            </div>
            {stats.repeated > 0 && <div className={statsRepeatedClasses}>{stats.repeated}</div>}
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div
      className={`${baseCard} ${stateClasses}`.trim()}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div className={pageNumberClasses}>{sticker.page}</div>
      <img src={flags[sticker.iso]} alt={sticker.name} className={countryFlagClasses} />
      <div className={countryInfoClasses}>
        <div className={codeRowClasses}>
          <span className={codeRowCodeClasses}>{sticker.code}</span>
          <span className={`${groupBadgeSmallClasses} ${groupColor(sticker.group)}`}>
            {sticker.group}
          </span>
        </div>
        <div className={countryNameClasses}>{sticker.name}</div>
      </div>
      {stats ? (
        <div className={statsClasses}>
          <div
            className={`${statsCountClasses} ${stats.collected >= stats.total ? 'text-accent-blue' : ''}`}
          >
            <span
              className={stats.collected >= stats.total ? statsAllBlueClasses : statsNumClasses}
            >
              {stats.collected}
            </span>
            <span
              className={stats.collected >= stats.total ? statsAllBlueClasses : statsSepClasses}
            >
              /
            </span>
            <span
              className={stats.collected >= stats.total ? statsAllBlueClasses : statsTotalClasses}
            >
              {stats.total}
            </span>
          </div>
          {stats.repeated > 0 && <div className={statsRepeatedClasses}>{stats.repeated}</div>}
        </div>
      ) : (
        <div className={`${groupBadgeClasses} ${groupColor(sticker.group)}`}>{sticker.group}</div>
      )}
    </div>
  )
}

export default StickerCard
