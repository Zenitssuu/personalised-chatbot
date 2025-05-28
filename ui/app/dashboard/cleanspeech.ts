/**
 * Cleans AI-generated text before sending it to speech synthesis.
 * Removes emojis, unwanted unicode symbols, extra whitespace,
 * and optionally normalizes punctuation for better voice output.
 */

export function cleanForSpeech(text: string) {
  if (!text || typeof text !== "string") return "";

  return (
    text
      // Remove emoji Unicode blocks
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      // Remove misc symbols / pictographs / dingbats
      .replace(/[^\w\s.,!?'"-]/g, "")
      // Normalize punctuation spacing
      .replace(/\s{2,}/g, " ")
      // Trim leading/trailing whitespace
      .trim()
      // add pause between sentences
      .replace(/([.?!])\s*/g, "$1. ") 

  );
}
