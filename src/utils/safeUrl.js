// ============================================================
//  safeUrl.js — link security helpers
// ------------------------------------------------------------
//  Every outbound link in the portal goes through here so that:
//   1. Only https:// URLs are ever opened (blocks javascript:,
//      data:, file:, vbscript: and other injection vectors).
//   2. The URL is parsed/normalised before use (rejects junk).
//   3. New tabs are opened with noopener,noreferrer and the
//      opener reference is severed (prevents reverse tabnabbing,
//      where the opened site can control window.opener.location).
// ============================================================

// Only allow secure https links to leave the portal.
const ALLOWED_PROTOCOLS = ['https:'];

/**
 * Validate and normalise a URL.
 * @param {string} rawUrl
 * @returns {string|null} the safe href, or null if not allowed.
 */
export function getSafeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  let parsed;
  try {
    // Base origin lets relative junk fail closed instead of resolving oddly.
    parsed = new URL(rawUrl.trim(), window.location.origin);
  } catch {
    return null; // not a parseable URL
  }

  if (!ALLOWED_PROTOCOLS.includes(parsed.protocol)) return null;

  return parsed.href;
}

/**
 * True if the URL is safe to open.
 * @param {string} rawUrl
 * @returns {boolean}
 */
export function isSafeUrl(rawUrl) {
  return getSafeUrl(rawUrl) !== null;
}

/**
 * Safely open a URL in a new tab. Returns true on success.
 * @param {string} rawUrl
 * @returns {boolean}
 */
export function openSafely(rawUrl) {
  const safe = getSafeUrl(rawUrl);
  if (!safe) {
    // Bad/blocked URL — fail silently rather than navigating somewhere unsafe.
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn('[safeUrl] Blocked attempt to open unsafe URL:', rawUrl);
    }
    return false;
  }

  const win = window.open(safe, '_blank', 'noopener,noreferrer');
  // Belt-and-suspenders: detach opener in case the browser ignores the flag.
  if (win) win.opener = null;
  return true;
}
