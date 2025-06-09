/**
 * Calculate percentage change between two values
 */
export const calculatePercentageChange = (currentValue, previousValue) => {
  const parseValue = (val) => {
    if (typeof val === 'number') return val
    
    return parseFloat(
      val
        .replace(/[^0-9,-]/g, '')
        .replace('.', '')
        .replace(',', '.'),
    )
  }
  
  const current = parseValue(currentValue)
  const previous = parseValue(previousValue)
  
  if (previous === 0) return 0
  
  return Number((((current - previous) / previous) * 100).toFixed(2))
}
