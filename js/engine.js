/**
 * engine.js — Core Game Engine
 * Birthday Interactive Visual Novel for Aurel ("Cerita Kita ✨")
 *
 * Implements:
 *   - Screen transitions (Title -> Game -> Video -> Voucher)
 *   - 16:9 responsive display with safe padding
 *   - Character Sprites rendering (Left, Center, Right)
 *   - Verbatim dialogue typewriter effect with click-to-finish
 *   - Clean choices, hilarious dead-ends with retry
 *   - Video player with auto-advance to 5 Vouchers
 *   - localStorage persistence for Chapter Select & claimed vouchers
 */

const GameEngine = (() => {
  'use strict';

  /* ── State ──────────────────────────────────────────────── */
  const state = {
    currentScreen: 'title',
    currentChapterIndex: 0,
    currentSceneIndex: 0,
    currentScene: null,

    // Typewriter
    isTyping: false,
    typewriterTimer: null,
    fullText: '',
    currentCharIndex: 0,

    // Scene transition (fade gelap -> terang)
    isSceneTransitioning: false,
    hasRenderedScene: false,

    // Active voucher claim modal target
    claimingVoucherId: null
  };

  /* ── DOM Cache ─────────────────────────────────────────── */
  let dom = {};

  function cacheDom() {
    dom = {
      // Screens
      screens: {
        title: document.getElementById('title-screen'),
        game: document.getElementById('game-screen'),
        video: document.getElementById('video-screen'),
        voucher: document.getElementById('voucher-screen')
      },

      // Title Screen
      btnStartGame: document.getElementById('btn-start-game'),
      btnChapterSelect: document.getElementById('btn-chapter-select'),
      titleAudioToggle: document.getElementById('title-audio-toggle'),

      // Game Screen
      gameHud: document.getElementById('game-hud'),
      hudChapterTitle: document.getElementById('hud-chapter-title'),
      hudAudioToggle: document.getElementById('hud-audio-toggle'),

      gameBg: document.getElementById('game-bg'),
      gameBgImg: document.getElementById('game-bg-img'),
      gameBgLight: document.getElementById('game-bg-light'),

      // Character slots
      characterContainer: document.getElementById('character-container'),
      charImgLeft: document.getElementById('char-img-left'),
      charImgCenter: document.getElementById('char-img-center'),
      charImgRight: document.getElementById('char-img-right'),
      gamePetContainer: document.getElementById('game-pet-container'),

      // Dialog
      dialogBox: document.getElementById('dialog-box'),
      dialogSpeaker: document.getElementById('dialog-speaker'),
      dialogSpeakerName: document.getElementById('dialog-speaker-name'),
      dialogText: document.getElementById('dialog-text'),
      dialogNextBtn: document.getElementById('dialog-next-btn'),
      dialogChoices: document.getElementById('dialog-choices'),

      // Overlays
      deadEndModal: document.getElementById('dead-end-modal'),
      deadEndTitle: document.getElementById('dead-end-title'),
      deadEndText: document.getElementById('dead-end-text'),
      btnDeadEndRetry: document.getElementById('btn-dead-end-retry'),

      interludeOverlay: document.getElementById('interlude-overlay'),
      interludeText: document.getElementById('interlude-text'),

      // Scene transition & confession light burst
      sceneFade: document.getElementById('scene-fade'),
      confessionGlow: document.getElementById('confession-glow'),

      // Video Screen
      videoPlayer: document.getElementById('video-player'),
      btnVideoSkip: document.getElementById('btn-video-skip'),

      // Voucher Screen
      voucherGrid: document.getElementById('voucher-grid'),
      btnVoucherBack: document.getElementById('btn-voucher-back'),

      // Chapter Select Modal
      chapterSelectModal: document.getElementById('chapter-select-modal'),
      chapterSelectCloseBtn: document.getElementById('chapter-select-close-btn'),
      chapterCards: document.querySelectorAll('.chapter-card'),

      // Claim Modal
      claimModal: document.getElementById('claim-modal'),
      claimWishInput: document.getElementById('claim-wish-input'),
      btnClaimConfirm: document.getElementById('btn-claim-confirm'),
      btnClaimCancel: document.getElementById('btn-claim-cancel')
    };
  }

  /* ── Screen Management ──────────────────────────────────── */
  function showScreen(screenName) {
    Object.keys(dom.screens).forEach(key => {
      const el = dom.screens[key];
      if (key === screenName) {
        el.style.display = 'flex';
        el.classList.add('screen--active', 'screen-enter');
        setTimeout(() => el.classList.remove('screen-enter'), 500);
      } else {
        el.style.display = 'none';
        el.classList.remove('screen--active');
      }
    });
    state.currentScreen = screenName;

    // Transisi gelap hanya untuk pergantian adegan, bukan saat pertama masuk layar game
    if (screenName !== 'game') {
      state.hasRenderedScene = false;
    }
  }

  /* ── Scene Lookup Helper ────────────────────────────────── */
  function findSceneById(sceneId) {
    for (let c = 0; c < GAME_CONFIG.chapters.length; c++) {
      const chapter = GAME_CONFIG.chapters[c];
      for (let s = 0; s < chapter.scenes.length; s++) {
        if (chapter.scenes[s].id === sceneId) {
          return { chapterIndex: c, sceneIndex: s, scene: chapter.scenes[s] };
        }
      }
    }
    return null;
  }

  /* ── Scene Loading & Rendering ──────────────────────────── */
  function loadScene(chapterIndex, sceneIndex, options = {}) {
    if (chapterIndex < 0 || chapterIndex >= GAME_CONFIG.chapters.length) {
      console.warn('Chapter index out of range:', chapterIndex);
      return;
    }

    const chapter = GAME_CONFIG.chapters[chapterIndex];
    if (sceneIndex < 0 || sceneIndex >= chapter.scenes.length) {
      console.warn('Scene index out of range:', sceneIndex);
      return;
    }

    const scene = chapter.scenes[sceneIndex];

    const render = () => {
      state.currentChapterIndex = chapterIndex;
      state.currentSceneIndex = sceneIndex;
      state.currentScene = scene;
      state.hasRenderedScene = true;
      renderScene(scene);
    };

    // Saat pertama masuk game langsung render; pergantian adegan memakai fade gelap -> terang.
    const useTransition = !options.instant &&
      state.currentScreen === 'game' &&
      state.hasRenderedScene &&
      dom.sceneFade;

    if (!useTransition) {
      render();
      return;
    }

    state.isSceneTransitioning = true;
    clearInterval(state.typewriterTimer);
    state.isTyping = false;

    dom.sceneFade.classList.add('is-visible');

    window.setTimeout(() => {
      render();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          dom.sceneFade.classList.remove('is-visible');
          window.setTimeout(() => {
            state.isSceneTransitioning = false;
          }, 320);
        });
      });
    }, 280);
  }

  function renderScene(scene) {
    // 1. Update HUD Chapter Title
    const chapter = GAME_CONFIG.chapters[state.currentChapterIndex];
    if (dom.hudChapterTitle && chapter) {
      dom.hudChapterTitle.textContent = chapter.title;
    }

    // 2. Background Handling
    if (scene.bg === 'white_light') {
      dom.gameBgImg.style.display = 'none';
      dom.gameBgLight.style.display = 'block';
    } else {
      dom.gameBgLight.style.display = 'none';
      dom.gameBgImg.style.display = 'block';
      if (dom.gameBgImg.src !== scene.bg) {
        dom.gameBgImg.src = scene.bg;
      }
    }

    // 3. Character Sprites (Left, Center, Right)
    updateCharacterSlot(dom.charImgLeft, scene.charLeft);
    updateCharacterSlot(dom.charImgCenter, scene.charCenter);
    updateCharacterSlot(dom.charImgRight, scene.charRight);

    // Active Speaker Highlighting
    applySpeakerFocus(scene.activeChar);

    // 4. Pet Visibility in Game Screen
    if (dom.gamePetContainer) {
      dom.gamePetContainer.style.display = scene.showPet ? 'flex' : 'none';
    }

    // 5. Sound Effects
    if (scene.sfx && typeof AudioManager !== 'undefined') {
      switch (scene.sfx) {
        case 'splash': AudioManager.playSplash(); break;
        case 'brake': AudioManager.playBrake(); break;
        case 'crash': AudioManager.playCrash(); break;
        case 'phone': AudioManager.playPhone(); break;
        case 'toot': AudioManager.playToot(); break;
        default: break;
      }
    }

    // 6. Special Visual Effects
    if (scene.specialEffect) {
      triggerSpecialEffect(scene.specialEffect);
    }

    // 7. Speaker Name
    if (scene.speaker) {
      dom.dialogSpeaker.style.display = 'block';
      dom.dialogSpeakerName.textContent = scene.speaker;
    } else {
      dom.dialogSpeaker.style.display = 'none';
    }

    // 8. Hide Choices & Next button while typing
    dom.dialogChoices.style.display = 'none';
    dom.dialogChoices.innerHTML = '';
    dom.dialogNextBtn.style.display = 'none';

    // 9. Start Typewriter
    startTypewriter(scene.text, () => {
      onDialogueComplete(scene);
    });
  }

  function updateCharacterSlot(imgEl, src) {
    if (!imgEl) return;
    if (src) {
      imgEl.src = src;
      imgEl.style.display = 'block';
    } else {
      imgEl.style.display = 'none';
      imgEl.src = '';
    }
  }

  function applySpeakerFocus(active) {
    [dom.charImgLeft, dom.charImgCenter, dom.charImgRight].forEach(el => {
      if (!el) return;
      el.classList.remove('is-speaking', 'is-dimmed');
    });

    if (active === 'left' && dom.charImgLeft && dom.charImgLeft.style.display !== 'none') {
      dom.charImgLeft.classList.add('is-speaking');
      if (dom.charImgRight.style.display !== 'none') dom.charImgRight.classList.add('is-dimmed');
      if (dom.charImgCenter.style.display !== 'none') dom.charImgCenter.classList.add('is-dimmed');
    } else if (active === 'right' && dom.charImgRight && dom.charImgRight.style.display !== 'none') {
      dom.charImgRight.classList.add('is-speaking');
      if (dom.charImgLeft.style.display !== 'none') dom.charImgLeft.classList.add('is-dimmed');
      if (dom.charImgCenter.style.display !== 'none') dom.charImgCenter.classList.add('is-dimmed');
    } else if (active === 'center' && dom.charImgCenter && dom.charImgCenter.style.display !== 'none') {
      dom.charImgCenter.classList.add('is-speaking');
      if (dom.charImgLeft.style.display !== 'none') dom.charImgLeft.classList.add('is-dimmed');
      if (dom.charImgRight.style.display !== 'none') dom.charImgRight.classList.add('is-dimmed');
    }
  }

  /* ── Special Effects ─────────────────────────────────────── */
  function triggerSpecialEffect(effectName) {
    if (effectName === 'shake') {
      dom.screens.game.classList.remove('shake');
      void dom.screens.game.offsetWidth; // force reflow
      dom.screens.game.classList.add('shake');
      setTimeout(() => dom.screens.game.classList.remove('shake'), 600);
    } else if (effectName === 'interlude-30years') {
      if (dom.interludeOverlay) {
        dom.interludeOverlay.style.display = 'flex';
        setTimeout(() => {
          dom.interludeOverlay.style.display = 'none';
        }, 2200);
      }
    }
  }

  /* ── Typewriter System ──────────────────────────────────── */
  function startTypewriter(text, onComplete) {
    clearInterval(state.typewriterTimer);
    state.isTyping = true;
    state.fullText = text || '';
    state.currentCharIndex = 0;
    dom.dialogText.textContent = '';

    const speed = 25; // ms per character
    state.typewriterTimer = setInterval(() => {
      if (state.currentCharIndex < state.fullText.length) {
        dom.dialogText.textContent += state.fullText[state.currentCharIndex];
        state.currentCharIndex++;

        // Sound tick every 3 characters
        if (state.currentCharIndex % 3 === 0 && typeof AudioManager !== 'undefined') {
          AudioManager.playTypewriterTick();
        }
      } else {
        clearInterval(state.typewriterTimer);
        state.isTyping = false;
        if (onComplete) onComplete();
      }
    }, speed);
  }

  function finishTypewriterInstantly() {
    if (!state.isTyping) return;
    clearInterval(state.typewriterTimer);
    state.isTyping = false;
    dom.dialogText.textContent = state.fullText;
    if (state.currentScene) {
      onDialogueComplete(state.currentScene);
    }
  }

  function onDialogueComplete(scene) {
    if (scene.choices && scene.choices.length > 0) {
      renderChoices(scene.choices);
    } else {
      dom.dialogNextBtn.style.display = 'flex';
    }
  }

  function renderChoices(choices) {
    dom.dialogChoices.innerHTML = '';
    choices.forEach((choice) => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-choice';
      btn.innerHTML = `<span class="choice-icon">💭</span> <span>${choice.label}</span>`;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        handleChoice(choice);
      });
      dom.dialogChoices.appendChild(btn);
    });
    dom.dialogChoices.style.display = 'flex';
  }

  function handleChoice(choice) {
    if (state.isSceneTransitioning) return;

    if (typeof AudioManager !== 'undefined') {
      AudioManager.playClick();
    }

    if (choice.isDeadEnd) {
      showDeadEndModal(choice.funnyResponse, choice.retrySceneId);
      return;
    }

    if (choice.nextSceneId) {
      advanceToSceneId(choice.nextSceneId);
    }
  }

  function showDeadEndModal(message, retrySceneId) {
    if (typeof AudioManager !== 'undefined') {
      AudioManager.playCrash();
    }
    dom.deadEndText.textContent = message || 'INI BUKAN CERITA TENTANG AUREL TERNYATA CIK';
    dom.deadEndModal.style.display = 'flex';

    dom.btnDeadEndRetry.onclick = () => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.playClick();
      }
      dom.deadEndModal.style.display = 'none';
      if (retrySceneId) {
        advanceToSceneId(retrySceneId);
      }
    };
  }

  /* ── Progression & Next Scene ───────────────────────────── */
  function advanceDialogue() {
    if (state.isSceneTransitioning) return;

    if (state.isTyping) {
      finishTypewriterInstantly();
      return;
    }

    const scene = state.currentScene;
    if (!scene) return;

    if (scene.choices && scene.choices.length > 0) {
      return; // Must select choice
    }

    if (scene.advanceEffect === 'confession-transform') {
      playConfessionTransform(scene.nextSceneId);
      return;
    }

    if (scene.nextSceneId === 'TRIGGER_VIDEO_ENDING') {
      triggerEndingVideo();
      return;
    }

    if (scene.nextSceneId) {
      advanceToSceneId(scene.nextSceneId);
    } else {
      const nextIndex = state.currentSceneIndex + 1;
      const chapter = GAME_CONFIG.chapters[state.currentChapterIndex];
      if (nextIndex < chapter.scenes.length) {
        loadScene(state.currentChapterIndex, nextIndex);
      } else {
        const nextChapterIndex = state.currentChapterIndex + 1;
        if (nextChapterIndex < GAME_CONFIG.chapters.length) {
          loadScene(nextChapterIndex, 0);
        } else {
          triggerEndingVideo();
        }
      }
    }
  }

  function advanceToSceneId(sceneId) {
    const found = findSceneById(sceneId);
    if (found) {
      loadScene(found.chapterIndex, found.sceneIndex);
    } else {
      console.warn('Scene ID not found:', sceneId);
    }
  }

  /* ── Confession Transformation (BABAK 2 ADEGAN 6) ───────── */
  function playConfessionTransform(nextSceneId) {
    if (state.isSceneTransitioning) return;
    state.isSceneTransitioning = true;

    clearInterval(state.typewriterTimer);
    state.isTyping = false;
    dom.dialogNextBtn.style.display = 'none';
    dom.dialogChoices.style.display = 'none';

    // Ambil sprite versi full dari adegan tujuan (fallback ke nama file langsung).
    const nextFound = nextSceneId ? findSceneById(nextSceneId) : null;
    const nextScene = nextFound ? nextFound.scene : null;
    const fullLeft = (nextScene && nextScene.charLeft) || 'assets/images/chars/shelmu full.png';
    const fullRight = (nextScene && nextScene.charRight) || 'assets/images/chars/aurel full.png';

    const glow = dom.confessionGlow;
    if (glow) {
      glow.classList.remove('is-active');
      void glow.offsetWidth; // restart animasi
      glow.classList.add('is-active');
    }

    // Saat cahaya paling terang: karakter berubah ke versi full.
    window.setTimeout(() => {
      updateCharacterSlot(dom.charImgLeft, fullLeft);
      updateCharacterSlot(dom.charImgRight, fullRight);
      [dom.charImgLeft, dom.charImgRight].forEach(el => {
        if (!el) return;
        el.classList.remove('char-reveal');
        void el.offsetWidth;
        el.classList.add('char-reveal');
      });
      applySpeakerFocus(state.currentScene ? state.currentScene.activeChar : null);
      if (typeof AudioManager !== 'undefined') AudioManager.playChime();
    }, 620);

    window.setTimeout(() => {
      [dom.charImgLeft, dom.charImgRight].forEach(el => {
        if (el) el.classList.remove('char-reveal');
      });
    }, 1700);

    window.setTimeout(() => {
      if (glow) glow.classList.remove('is-active');
    }, 2050);

    // Lanjut ke alur normal setelah animasi selesai.
    window.setTimeout(() => {
      state.isSceneTransitioning = false;
      if (nextSceneId) {
        advanceToSceneId(nextSceneId);
      }
    }, 2200);
  }

  /* ── Video Ending Screen ────────────────────────────────── */
  function triggerEndingVideo() {
    if (typeof GameStorage !== 'undefined') {
      GameStorage.setGameCompleted();
    }
    updateChapterSelectState();

    if (typeof AudioManager !== 'undefined') {
      AudioManager.stopAllBgm();
    }

    showScreen('video');

    if (dom.videoPlayer) {
      dom.videoPlayer.currentTime = 0;
      const playPromise = dom.videoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }

      dom.videoPlayer.onended = () => {
        showVoucherScreen();
      };
    }
  }

  /* ── Voucher Reward Screen ──────────────────────────────── */
  function showVoucherScreen() {
    if (dom.videoPlayer) {
      dom.videoPlayer.pause();
    }

    showScreen('voucher');

    if (typeof AudioManager !== 'undefined') {
      AudioManager.playVoucherBgm();
    }

    renderVouchers();
  }

  function renderVouchers() {
    if (!dom.voucherGrid) return;
    const cards = dom.voucherGrid.querySelectorAll('.voucher-card');

    cards.forEach(card => {
      const id = card.getAttribute('data-voucher-id');
      const isClaimed = typeof GameStorage !== 'undefined' ? GameStorage.isVoucherClaimed(id) : false;
      const overlay = card.querySelector(`[data-voucher-overlay="${id}"]`);
      const claimBtn = card.querySelector(`.voucher-claim-btn`);
      const dateEl = card.querySelector(`[data-voucher-date="${id}"]`);
      const noteEl = card.querySelector(`[data-voucher-note="${id}"]`);

      if (isClaimed) {
        const claimData = GameStorage.getVoucherClaim(id);
        if (overlay) overlay.style.display = 'flex';
        if (claimBtn) claimBtn.style.display = 'none';
        if (dateEl && claimData && claimData.claimedAt) {
          const date = new Date(claimData.claimedAt);
          dateEl.textContent = `Terklaim: ${date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}`;
        }
        if (noteEl && claimData && claimData.note) {
          noteEl.textContent = `"${claimData.note}"`;
        }
      } else {
        if (overlay) overlay.style.display = 'none';
        if (claimBtn) {
          claimBtn.style.display = 'inline-flex';
          claimBtn.onclick = (e) => {
            e.stopPropagation();
            openClaimModal(id);
          };
        }
      }
    });
  }

  function openClaimModal(voucherId) {
    if (typeof AudioManager !== 'undefined') {
      AudioManager.playClick();
    }
    state.claimingVoucherId = voucherId;
    dom.claimWishInput.value = '';
    dom.claimModal.style.display = 'flex';
  }

  function confirmClaim() {
    if (!state.claimingVoucherId) return;
    const wishNote = dom.claimWishInput.value.trim();

    if (typeof GameStorage !== 'undefined') {
      GameStorage.claimVoucher(state.claimingVoucherId, wishNote);
    }

    if (typeof AudioManager !== 'undefined') {
      AudioManager.playClick();
    }

    dom.claimModal.style.display = 'none';
    state.claimingVoucherId = null;
    renderVouchers();
  }

  /* ── Chapter Select Unlocking ───────────────────────────── */
  function updateChapterSelectState() {
    const isCompleted = typeof GameStorage !== 'undefined' ? GameStorage.isGameCompleted() : false;
    if (dom.btnChapterSelect) {
      if (isCompleted) {
        dom.btnChapterSelect.disabled = false;
        dom.btnChapterSelect.classList.remove('is-locked');
        dom.btnChapterSelect.innerHTML = '<span>📚</span> Pilih Babak';
        dom.btnChapterSelect.removeAttribute('title');
      } else {
        dom.btnChapterSelect.disabled = true;
        dom.btnChapterSelect.classList.add('is-locked');
        dom.btnChapterSelect.innerHTML = '<span>📚</span> Pilih Babak 🔒';
        dom.btnChapterSelect.title = 'Tamatkan cerita terlebih dahulu untuk membuka pilihan babak';
      }
    }
  }

  /* ── Audio UI Update ────────────────────────────────────── */
  function updateAudioIcons() {
    const isMuted = typeof AudioManager !== 'undefined' ? AudioManager.isMuted().bgm : false;
    [dom.titleAudioToggle, dom.hudAudioToggle].forEach(btn => {
      if (!btn) return;
      const on = btn.querySelector('.icon-audio-on');
      const off = btn.querySelector('.icon-audio-off');
      if (on && off) {
        on.style.display = isMuted ? 'none' : 'inline';
        off.style.display = isMuted ? 'inline' : 'none';
      }
    });
  }

  /* ── Event Listeners ────────────────────────────────────── */
  function bindEvents() {
    // Title button
    dom.btnStartGame.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.playClick();
        AudioManager.playMainBgm();
      }
      showScreen('game');
      loadScene(0, 0);
    });

    dom.btnChapterSelect.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') AudioManager.playClick();
      dom.chapterSelectModal.style.display = 'flex';
    });

    // Audio toggles
    [dom.titleAudioToggle, dom.hudAudioToggle].forEach(btn => {
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (typeof AudioManager !== 'undefined') {
          AudioManager.toggleBgm();
          updateAudioIcons();
        }
      });
    });

    // Dialog Box click -> advance dialogue
    dom.dialogBox.addEventListener('click', () => {
      advanceDialogue();
    });

    // Keyboard Space / Enter to advance dialogue
    window.addEventListener('keydown', (e) => {
      if (state.currentScreen === 'game') {
        if (e.key === ' ' || e.key === 'Enter') {
          if (dom.deadEndModal.style.display === 'flex' || dom.chapterSelectModal.style.display === 'flex') return;
          advanceDialogue();
        }
      }
    });

    // Modals close buttons
    dom.chapterSelectCloseBtn.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') AudioManager.playClick();
      dom.chapterSelectModal.style.display = 'none';
    });

    dom.btnClaimCancel.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') AudioManager.playClick();
      dom.claimModal.style.display = 'none';
    });

    dom.btnClaimConfirm.addEventListener('click', () => {
      confirmClaim();
    });

    // Chapter Cards selection
    dom.chapterCards.forEach(card => {
      card.addEventListener('click', () => {
        const chapterNum = parseInt(card.getAttribute('data-chapter'), 10) - 1;
        if (chapterNum >= 0 && chapterNum < GAME_CONFIG.chapters.length) {
          if (typeof AudioManager !== 'undefined') {
            AudioManager.playClick();
            AudioManager.playMainBgm();
          }
          dom.chapterSelectModal.style.display = 'none';
          showScreen('game');
          loadScene(chapterNum, 0);
        }
      });
    });

    // Video skip button
    dom.btnVideoSkip.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') AudioManager.playClick();
      showVoucherScreen();
    });

    // Voucher screen back button
    dom.btnVoucherBack.addEventListener('click', () => {
      if (typeof AudioManager !== 'undefined') {
        AudioManager.playClick();
        AudioManager.stopAllBgm();
      }
      showScreen('title');
      updateChapterSelectState();
    });
  }

  /* ── Initialization ─────────────────────────────────────── */
  function init() {
    cacheDom();

    if (typeof AudioManager !== 'undefined') {
      AudioManager.init({
        lofiBgm: GAME_CONFIG.meta.lofiBgmPath,
        voucherBgm: GAME_CONFIG.meta.voucherBgmPath
      });
      // Backsound langsung menyala saat masuk (dengan fallback interaksi pertama).
      AudioManager.startBacksound();
    }

    if (typeof PetManager !== 'undefined') {
      PetManager.init();
    }

    bindEvents();
    updateChapterSelectState();
    updateAudioIcons();

    // Debug query param support (e.g. ?scene=c1_s1_6 or ?deadend=1 or ?screen=voucher)
    const urlParams = new URLSearchParams(window.location.search);
    const debugScene = urlParams.get('scene');
    const debugScreen = urlParams.get('screen');
    const debugDeadEnd = urlParams.get('deadend');

    if (debugDeadEnd) {
      showScreen('game');
      loadScene(0, 5);
      showDeadEndModal('INI BUKAN CERITA TENTANG AUREL TERNYATA CIK', 'c1_s1_6');
    } else if (debugScreen) {
      showScreen(debugScreen);
      if (debugScreen === 'voucher') renderVouchers();
    } else if (debugScene) {
      showScreen('game');
      advanceToSceneId(debugScene);
    } else {
      showScreen('title');
    }

    console.log('[GameEngine] Running cleanly: 16:9 laptop layout, verbatim dialogue, lofi audio ready.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return {
    init,
    loadScene,
    showScreen,
    triggerEndingVideo,
    showVoucherScreen
  };
})();
