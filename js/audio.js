/**
 * audio.js — Audio Manager for Visual Novel Aurel
 *
 * Mendukung pemutaran backsound kustom:
 * - Taruh file musik kamu di: assets/audio/backsound.m4a
 * - Backsound otomatis dicoba diputar saat game dibuka. Jika browser memblokir
 *   autoplay, musik akan menyala pada interaksi pertama pemain.
 * - Jika file belum ada, sistem tetap aman tanpa error.
 */

const AudioManager = (() => {
  'use strict';

  let _ctx = null;
  let _bgmLofi = null;
  let _bgmVoucher = null;
  let _currentBgm = null;
  let _isBgmMuted = false;
  let _isSfxMuted = false;
  let _unlockBound = false;

  const _volumes = {
    bgmLofi: 0.45,
    bgmVoucher: 0.45,
    sfxType: 0.12,
    sfxClick: 0.28,
    sfxPet: 0.35,
    sfxSpecial: 0.35
  };

  function getAudioContext() {
    if (!_ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        _ctx = new AudioCtx();
      }
    }
    if (_ctx && _ctx.state === 'suspended') {
      _ctx.resume().catch(() => {});
    }
    return _ctx;
  }

  function _createAudio(srcList, opts = {}) {
    const list = Array.isArray(srcList) ? srcList : [srcList];
    for (const src of list) {
      if (!src) continue;
      try {
        const audio = new Audio(src);
        if (opts.loop) audio.loop = true;
        if (typeof opts.volume === 'number') audio.volume = opts.volume;
        audio.preload = opts.preload || 'auto';
        audio.addEventListener('error', () => {
          // File not found / silent fallback
        });
        return audio;
      } catch (_e) {}
    }
    return null;
  }

  function synthClick() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(_volumes.sfxClick, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (_e) {}
  }

  function synthTypewriter() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1100 + Math.random() * 300, ctx.currentTime);
      gain.gain.setValueAtTime(_volumes.sfxType, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.025);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (_e) {}
  }

  function synthPet() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.linearRampToValueAtTime(750, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(_volumes.sfxPet, now + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (_e) {}
  }

  function synthChime() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + i * 0.09;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.16, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.7);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.72);
      });
    } catch (_e) {}
  }

  function synthBrake() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.28);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch (_e) {}
  }

  function synthCrash() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.5);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } catch (_e) {}
  }

  function synthSplash() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.35);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (_e) {}
  }

  function synthPhone() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      [0, 0.2].forEach(offset => {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(440, now + offset);
        osc2.frequency.setValueAtTime(480, now + offset);
        gain.gain.setValueAtTime(0.2, now + offset);
        gain.gain.setValueAtTime(0.2, now + offset + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.15);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now + offset);
        osc2.start(now + offset);
        osc1.stop(now + offset + 0.16);
        osc2.stop(now + offset + 0.16);
      });
    } catch (_e) {}
  }

  function synthToot() {
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.linearRampToValueAtTime(75, now + 0.2);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.26);
    } catch (_e) {}
  }

  function fadeIn(audio, targetVol = 0.45, duration = 800) {
    if (!audio) return;
    try {
      audio.volume = 0;
      audio.play().then(() => {
        const step = targetVol / (duration / 50);
        const timer = setInterval(() => {
          if (audio.volume + step < targetVol) {
            audio.volume += step;
          } else {
            audio.volume = targetVol;
            clearInterval(timer);
          }
        }, 50);
      }).catch(() => {});
    } catch (_e) {}
  }

  function fadeOut(audio, duration = 600) {
    return new Promise(resolve => {
      if (!audio || audio.paused) return resolve();
      const startVol = audio.volume;
      const step = startVol / (duration / 50);
      const timer = setInterval(() => {
        if (audio.volume > step) {
          audio.volume -= step;
        } else {
          audio.volume = 0;
          audio.pause();
          clearInterval(timer);
          resolve();
        }
      }, 50);
    });
  }

  // Putar track hanya jika belum berjalan, supaya fade-in tidak mengulang dari awal.
  function startTrack(audio, targetVol = 0.45, duration = 900) {
    if (!audio) return;
    if (!audio.paused && audio.volume > 0) return;
    fadeIn(audio, targetVol, duration);
  }

  // Autoplay browser biasanya diblokir sebelum ada interaksi user.
  // Pasang listener sekali saja untuk menyalakan backsound pada gestur pertama.
  function bindAutoplayUnlock() {
    if (_unlockBound) return;
    _unlockBound = true;

    const unlock = () => {
      document.removeEventListener('pointerdown', unlock);
      document.removeEventListener('keydown', unlock);
      document.removeEventListener('touchstart', unlock);
      _unlockBound = false;
      if (_isBgmMuted || !_bgmLofi) return;
      if (_bgmLofi.paused) {
        _currentBgm = _bgmLofi;
        startTrack(_bgmLofi, _volumes.bgmLofi, 900);
      }
    };

    document.addEventListener('pointerdown', unlock);
    document.addEventListener('keydown', unlock);
    document.addEventListener('touchstart', unlock, { passive: true });
  }

  return {
    init(paths = {}) {
      // Prioritaskan file lofi yang akan dimasukkan user
      const lofiSources = [
        paths.lofiBgm || 'assets/audio/backsound.m4a',
        'assets/audio/backsound.mp3',
        'assets/audio/lofi.mp3',
        'assets/audio/bgm_lofi.mp3',
        'assets/audio/main_bgm.mp3'
      ];
      _bgmLofi = _createAudio(lofiSources, { loop: true, volume: _volumes.bgmLofi });
      _bgmVoucher = _createAudio(paths.voucherBgm || 'assets/audio/voucher_bgm.mp3', { loop: true, volume: _volumes.bgmVoucher });

      if (typeof GameStorage !== 'undefined') {
        const settings = GameStorage.getSettings();
        if (settings) {
          _isBgmMuted = !!settings.bgmMuted;
          _isSfxMuted = !!settings.sfxMuted;
        }
      }
    },

    // Dipanggil sekali saat game dibuka: coba autoplay, dan pastikan
    // backsound tetap menyala pada interaksi pertama jika diblokir browser.
    startBacksound() {
      bindAutoplayUnlock();
      if (_isBgmMuted || !_bgmLofi) return;
      _currentBgm = _bgmLofi;
      startTrack(_bgmLofi, _volumes.bgmLofi, 1200);
    },

    playMainBgm() {
      if (_isBgmMuted || !_bgmLofi) return;
      if (_bgmVoucher && !_bgmVoucher.paused) {
        fadeOut(_bgmVoucher, 500).then(() => {
          _currentBgm = _bgmLofi;
          startTrack(_bgmLofi, _volumes.bgmLofi, 800);
        });
      } else {
        _currentBgm = _bgmLofi;
        startTrack(_bgmLofi, _volumes.bgmLofi, 800);
      }
    },

    playVoucherBgm() {
      if (_isBgmMuted || !_bgmVoucher) return;
      if (_bgmLofi && !_bgmLofi.paused) {
        fadeOut(_bgmLofi, 500).then(() => {
          _currentBgm = _bgmVoucher;
          fadeIn(_bgmVoucher, _volumes.bgmVoucher, 800);
        });
      } else {
        _currentBgm = _bgmVoucher;
        fadeIn(_bgmVoucher, _volumes.bgmVoucher, 800);
      }
    },

    stopAllBgm() {
      if (_bgmLofi) fadeOut(_bgmLofi, 400);
      if (_bgmVoucher) fadeOut(_bgmVoucher, 400);
      _currentBgm = null;
    },

    playClick() {
      if (_isSfxMuted) return;
      synthClick();
    },

    playTypewriterTick() {
      if (_isSfxMuted) return;
      synthTypewriter();
    },

    playPetSound() {
      if (_isSfxMuted) return;
      synthPet();
    },

    playChime() {
      if (_isSfxMuted) return;
      synthChime();
    },

    playSplash() {
      if (_isSfxMuted) return;
      synthSplash();
    },

    playBrake() {
      if (_isSfxMuted) return;
      synthBrake();
    },

    playCrash() {
      if (_isSfxMuted) return;
      synthCrash();
    },

    playPhone() {
      if (_isSfxMuted) return;
      synthPhone();
    },

    playToot() {
      if (_isSfxMuted) return;
      synthToot();
    },

    toggleBgm() {
      _isBgmMuted = !_isBgmMuted;
      if (_isBgmMuted) {
        this.stopAllBgm();
      } else {
        if (_currentBgm) {
          fadeIn(_currentBgm, _currentBgm === _bgmVoucher ? _volumes.bgmVoucher : _volumes.bgmLofi, 400);
        } else {
          this.playMainBgm();
        }
      }
      if (typeof GameStorage !== 'undefined') {
        GameStorage.toggleBgm();
      }
      return _isBgmMuted;
    },

    isMuted() {
      return { bgm: _isBgmMuted, sfx: _isSfxMuted };
    }
  };
})();
