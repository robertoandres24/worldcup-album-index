function ResultsCount({ count, t }) {
  return (
    <div className="results-count">
      {count} {count === 1 ? t('resultsCount') : t('resultsCountPlural')}
    </div>
  )
}

export default ResultsCount
