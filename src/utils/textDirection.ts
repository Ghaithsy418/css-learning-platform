// Detect if a string is mostly Arabic (for RTL) or contains code (for LTR)
export function getTextDirection(text: string): 'rtl' | 'ltr' {
  const content = text.trim();
  if (!content) return 'ltr';

  const hasCodeFence = /```|`[^`]+`/.test(content);
  const hasJsKeywords =
    /\b(function|var|let|const|if|else|return|for|while|class|import|export|switch|case|new)\b/.test(
      content,
    );
  const hasHtmlTag = /<\/?[a-z][^>]*>/i.test(content);
  const hasCssRule =
    /\b[a-z-]+\s*:\s*[^;{}]+;?/i.test(content) && /[{};]/.test(content);
  const hasCodePunctuation = /[{};=]|=>/.test(content);

  const codeSignals = [
    hasCodeFence,
    hasJsKeywords,
    hasHtmlTag,
    hasCssRule,
    hasCodePunctuation,
  ].filter(Boolean).length;

  // Force LTR only when we have strong evidence that the text is code.
  if (codeSignals >= 2) return 'ltr';

  const arabicMatches = content.match(
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/g,
  );
  const latinMatches = content.match(/[A-Za-z]/g);

  const arabicCount = arabicMatches?.length ?? 0;
  const latinCount = latinMatches?.length ?? 0;

  if (arabicCount > latinCount) return 'rtl';
  return 'ltr';
}
