/**
 * storage.js — localStorage persistence module
 * Birthday Interactive Visual Novel for Aurel
 *
 * Exposes a global `GameStorage` object (IIFE pattern)
 * with methods to load, save, and query game state:
 *   - Game completion flag
 *   - Unlocked trophies (inside-joke quizzes)
 *   - Claimed vouchers ("Anything You Want")
 *   - Audio settings (BGM / SFX mute toggles)
 */

const GameStorage = (() => {
  /* ── Constants ─────────────────────────────────────────── */

  const STORAGE_KEY = 'bday_vn_aurel_v1';

  const DEFAULT_DATA = Object.freeze({
    isGameCompleted: false,
    unlockedTrophies: [],
    claimedVouchers: [],
    settings: {
      bgmMuted: false,
      sfxMuted: false
    }
  });

  /* ── Helpers ───────────────────────────────────────────── */

  /**
   * Return a deep copy of DEFAULT_DATA so mutations never
   * leak back into the frozen template.
   */
  function _defaultCopy() {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  /* ── Core I/O ──────────────────────────────────────────── */

  /**
   * Read the saved blob from localStorage, parse it, and
   * return the resulting object.  Falls back to a fresh
   * DEFAULT_DATA copy on any error or if the key is absent.
   */
  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw === null) return _defaultCopy();

      const parsed = JSON.parse(raw);

      // Merge with defaults so newly-added fields are always present
      const data = _defaultCopy();
      if (typeof parsed.isGameCompleted === 'boolean') {
        data.isGameCompleted = parsed.isGameCompleted;
      }
      if (Array.isArray(parsed.unlockedTrophies)) {
        data.unlockedTrophies = parsed.unlockedTrophies;
      }
      if (Array.isArray(parsed.claimedVouchers)) {
        data.claimedVouchers = parsed.claimedVouchers;
      }
      if (parsed.settings && typeof parsed.settings === 'object') {
        if (typeof parsed.settings.bgmMuted === 'boolean') {
          data.settings.bgmMuted = parsed.settings.bgmMuted;
        }
        if (typeof parsed.settings.sfxMuted === 'boolean') {
          data.settings.sfxMuted = parsed.settings.sfxMuted;
        }
      }

      return data;
    } catch (_err) {
      console.warn('[GameStorage] Failed to load – returning defaults.', _err);
      return _defaultCopy();
    }
  }

  /**
   * Persist the given data object to localStorage.
   */
  function save(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('[GameStorage] Failed to save.', err);
    }
  }

  /* ── Convenience ───────────────────────────────────────── */

  /** Load and return the current data (shorthand). */
  function getData() {
    return load();
  }

  /* ── Game Completion ───────────────────────────────────── */

  /** Mark the game as completed and persist. */
  function setGameCompleted() {
    const data = load();
    data.isGameCompleted = true;
    save(data);
  }

  /** Return whether the game has been completed at least once. */
  function isGameCompleted() {
    return load().isGameCompleted;
  }

  /* ── Trophies ──────────────────────────────────────────── */

  /**
   * Unlock a trophy by id.
   * @param  {string}  trophyId
   * @return {boolean} true if the trophy was newly added, false if already unlocked.
   */
  function unlockTrophy(trophyId) {
    const data = load();
    if (data.unlockedTrophies.includes(trophyId)) return false;

    data.unlockedTrophies.push(trophyId);
    save(data);
    return true;
  }

  /**
   * Check whether a specific trophy has been unlocked.
   * @param  {string}  trophyId
   * @return {boolean}
   */
  function isTrophyUnlocked(trophyId) {
    return load().unlockedTrophies.includes(trophyId);
  }

  /** Return the full array of unlocked trophy ids. */
  function getUnlockedTrophies() {
    return load().unlockedTrophies;
  }

  /* ── Vouchers ──────────────────────────────────────────── */

  /**
   * Claim (or update) a voucher.
   * @param {string} voucherId
   * @param {string} [note='']  Optional note attached to the claim.
   */
  function claimVoucher(voucherId, note = '') {
    const data = load();
    const existing = data.claimedVouchers.find((v) => v.id === voucherId);

    if (existing) {
      // Update the existing claim
      existing.claimed = true;
      existing.note = note;
      existing.claimedAt = new Date().toISOString();
    } else {
      data.claimedVouchers.push({
        id: voucherId,
        claimed: true,
        note: note,
        claimedAt: new Date().toISOString()
      });
    }

    save(data);
  }

  /**
   * Check whether a voucher has been claimed.
   * @param  {string}  voucherId
   * @return {boolean}
   */
  function isVoucherClaimed(voucherId) {
    const voucher = load().claimedVouchers.find((v) => v.id === voucherId);
    return voucher ? voucher.claimed === true : false;
  }

  /** Return the full array of claimed voucher objects. */
  function getClaimedVouchers() {
    return load().claimedVouchers;
  }

  /**
   * Return the claim object for a specific voucher, or null.
   * @param  {string}      voucherId
   * @return {object|null}
   */
  function getVoucherClaim(voucherId) {
    const voucher = load().claimedVouchers.find((v) => v.id === voucherId);
    return voucher || null;
  }

  /* ── Settings ──────────────────────────────────────────── */

  /**
   * Toggle BGM mute state.
   * @return {boolean} The new bgmMuted value.
   */
  function toggleBgm() {
    const data = load();
    data.settings.bgmMuted = !data.settings.bgmMuted;
    save(data);
    return data.settings.bgmMuted;
  }

  /**
   * Toggle SFX mute state.
   * @return {boolean} The new sfxMuted value.
   */
  function toggleSfx() {
    const data = load();
    data.settings.sfxMuted = !data.settings.sfxMuted;
    save(data);
    return data.settings.sfxMuted;
  }

  /** Return a copy of the current settings object. */
  function getSettings() {
    return load().settings;
  }

  /* ── Reset ─────────────────────────────────────────────── */

  /** Remove the storage key entirely (full reset). */
  function resetAll() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('[GameStorage] Failed to reset.', err);
    }
  }

  /* ── Public API ────────────────────────────────────────── */

  return {
    STORAGE_KEY,
    DEFAULT_DATA,

    // Core I/O
    load,
    save,
    getData,

    // Game completion
    setGameCompleted,
    isGameCompleted,

    // Trophies
    unlockTrophy,
    isTrophyUnlocked,
    getUnlockedTrophies,

    // Vouchers
    claimVoucher,
    isVoucherClaimed,
    getClaimedVouchers,
    getVoucherClaim,

    // Settings
    toggleBgm,
    toggleSfx,
    getSettings,

    // Reset
    resetAll
  };
})();
