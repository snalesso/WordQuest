
export function isNilOrEmpty(value: string | null | undefined): value is null | undefined {
  return value == null || value.length <= 0;
}

export function getFirstLine(text: string | undefined | null, maxChars: number = 15) {
  if (text == null)
    return text;
  const firstReturnIdx = text.indexOf('\r');
  const firstNewLineIdx = text.indexOf('\n');
  const chunkLength = Math.max(maxChars, Math.min(maxChars, firstReturnIdx, firstNewLineIdx));
  return text.substring(0, chunkLength);
}