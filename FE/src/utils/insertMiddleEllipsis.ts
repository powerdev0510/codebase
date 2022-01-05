const insertMiddleEllipsis = (
  text: string,
  containerWidth: number,
  charWidth = 8,
  ellipsis = '...',
  safetyMargin = 1
) => {
  const textLen = text.length
  const charsFit = Math.floor(containerWidth / charWidth)
  const charsToTrim = Math.max(0, textLen - charsFit + safetyMargin)

  if (!charsToTrim) return text

  const charsToTrimWEllipsis = charsToTrim + ellipsis.length + safetyMargin

  const part1 = text.substr(0, Math.floor(textLen / 2))
  const part2 = text.substr(Math.floor(textLen / 2))

  const part1Trimmed = part1.substr(
    0,
    part1.length - Math.floor(charsToTrimWEllipsis / 2)
  )
  const part2Trimmed = part2.substr(Math.ceil(charsToTrimWEllipsis / 2))

  return `${part1Trimmed}${ellipsis}${part2Trimmed}`
}

export default insertMiddleEllipsis
