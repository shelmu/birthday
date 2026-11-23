/* =========================================================
   pet.js — Interactive Pet Module
   Birthday Visual Novel for Aurel
   ========================================================= */

const PetManager = (() => {
  /* ── Private State ─────────────────────────────────────── */
  const HEART_EMOJIS = ['❤️', '💕', '💖', '💗', '✨', '🩷'];

  const state = {
    petElements: [],
    bubbleElement: null,
    particlesContainer: null,
    popupTexts: [],
    isAnimating: false,
    bubbleTimeout: null,
  };

  /* ── Helpers ───────────────────────────────────────────── */

  /**
   * Pick a random integer between min (inclusive) and max (inclusive).
   */
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Pick a random item from an array.
   */
  function randomFrom(arr) {
    return arr[arr.length * Math.random() | 0];
  }

  /**
   * Apply placeholder pet sprite styling (large cat emoji inside a
   * pastel circle) to every .pet-sprite element.
   */
  function stylePetSprites() {
    state.petElements.forEach((el) => {
      Object.assign(el.style, {
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #FDEEF2, #EDF5EF)',
        border: '2px solid #E6D8D5',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.18s ease',
        position: 'relative',
        zIndex: '10',
        lineHeight: '1',
        boxShadow: '0 4px 12px rgba(67,54,56,0.08)',
      });
      el.textContent = '🐱';
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'Pet the cat');
    });
  }

  /* ── Core Methods ──────────────────────────────────────── */

  /**
   * Initialise the pet system.
   * Call once after the DOM is ready.
   */
  function init() {
    // Query DOM elements
    state.petElements = Array.from(document.querySelectorAll('.pet-sprite'));
    state.bubbleElement = document.getElementById('pet-bubble');
    state.particlesContainer = document.getElementById('particles-container');

    // Load popup texts from config (fall back to defaults)
    if (
      typeof GAME_CONFIG !== 'undefined' &&
      GAME_CONFIG.pet &&
      Array.isArray(GAME_CONFIG.pet.popupTexts)
    ) {
      state.popupTexts = GAME_CONFIG.pet.popupTexts;
    } else {
      state.popupTexts = [
        'Meow~ 💕',
        'Aku sayang Aurel!',
        'Purrr~ 🐾',
        'Jangan lupa senyum ya! 😊',
        'Happy birthday! 🎂',
        'Kamu spesial! ✨',
        'Nyan~ 🩷',
        'Peluk aku lagi! 🤗',
        'Hehehe~ 😸',
        'Mau treat dong~ 🍰',
      ];
    }

    // Style the pet sprites with placeholder emoji appearance
    stylePetSprites();

    // Attach click handlers
    state.petElements.forEach((el) => {
      el.addEventListener('click', onPetClick);
    });

    // Ensure particles container exists (create if missing)
    if (!state.particlesContainer) {
      state.particlesContainer = document.createElement('div');
      state.particlesContainer.id = 'particles-container';
      Object.assign(state.particlesContainer.style, {
        position: 'fixed',
        inset: '0',
        pointerEvents: 'none',
        zIndex: '9999',
        overflow: 'hidden',
      });
      document.body.appendChild(state.particlesContainer);
    }

    // Inject CSS keyframes if not already present
    injectAnimations();
  }

  /**
   * Main interaction handler — called when any pet sprite is clicked.
   */
  function onPetClick(event) {
    if (state.isAnimating) return;

    state.isAnimating = true;

    const petEl = event.currentTarget;

    // 1. Bounce / squish animation
    petEl.classList.add('pet-bounce');

    // 2. Heart particles at click position
    createHeartParticles(event.clientX, event.clientY);

    // 3. Random speech bubble
    const text = randomFrom(state.popupTexts);
    showSpeechBubble(text, petEl);

    // 4. Play pet sound (if AudioManager is available)
    if (typeof AudioManager !== 'undefined' && typeof AudioManager.playPetSound === 'function') {
      AudioManager.playPetSound();
    }

    // 5. Reset after 400ms
    setTimeout(() => {
      petEl.classList.remove('pet-bounce');
      state.isAnimating = false;
    }, 400);
  }

  /**
   * Spawn 3–5 heart / sparkle emojis that float upward from (x, y).
   */
  function createHeartParticles(x, y) {
    const count = randInt(3, 5);

    for (let i = 0; i < count; i++) {
      const span = document.createElement('span');
      span.className = 'heart-particle';
      span.textContent = randomFrom(HEART_EMOJIS);

      const offsetX = randInt(-20, 20);
      const offsetY = randInt(-20, 20);
      const duration = (0.8 + Math.random() * 0.7).toFixed(2); // 0.8s – 1.5s

      Object.assign(span.style, {
        position: 'fixed',
        left: `${x + offsetX}px`,
        top: `${y + offsetY}px`,
        fontSize: `${randInt(16, 24)}px`,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: '10000',
        animation: `heartFloat ${duration}s ease-out forwards`,
        willChange: 'transform, opacity',
      });

      state.particlesContainer.appendChild(span);

      // Clean up after animation finishes
      span.addEventListener('animationend', () => {
        span.remove();
      });
    }
  }

  /**
   * Display the speech bubble near a pet element with the given text.
   */
  function showSpeechBubble(text, petEl) {
    if (!state.bubbleElement) return;

    // Set content
    state.bubbleElement.textContent = text;

    // Position safely above the pet that was clicked
    if (petEl) {
      const rect = petEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const safeX = Math.min(window.innerWidth - 110, Math.max(110, centerX));
      Object.assign(state.bubbleElement.style, {
        position: 'fixed',
        left: `${safeX}px`,
        top: `${rect.top - 12}px`,
        transform: 'translate(-50%, -100%)',
      });
    }

    // Show with pop-in animation
    state.bubbleElement.classList.remove('pop-out');
    state.bubbleElement.classList.add('pop-in');
    state.bubbleElement.style.display = 'block';
    state.bubbleElement.style.opacity = '1';
    state.bubbleElement.style.pointerEvents = 'auto';

    // Clear any existing timeout
    if (state.bubbleTimeout) {
      clearTimeout(state.bubbleTimeout);
      state.bubbleTimeout = null;
    }

    // Auto-hide after 2 seconds
    state.bubbleTimeout = setTimeout(() => {
      state.bubbleElement.classList.remove('pop-in');
      state.bubbleElement.classList.add('pop-out');

      // Wait for the pop-out animation to finish before hiding
      const onPopOutEnd = () => {
        state.bubbleElement.style.display = 'none';
        state.bubbleElement.classList.remove('pop-out');
        state.bubbleElement.removeEventListener('animationend', onPopOutEnd);
      };
      state.bubbleElement.addEventListener('animationend', onPopOutEnd);
    }, 2000);
  }

  /**
   * Show or hide the game-screen pet (the one NOT on the title screen).
   * Determined by scene config showPet flag.
   */
  function showInScene(show) {
    const container = document.getElementById('game-pet-container');
    if (container) {
      container.style.display = show ? 'block' : 'none';
    }
    const gamePet = document.querySelector('#game-screen .pet-sprite');
    if (gamePet) {
      gamePet.style.display = show ? 'flex' : 'none';
      if (show) {
        gamePet.style.animation = 'petIdle 2s ease-in-out infinite';
      } else {
        gamePet.style.animation = 'none';
      }
    }
  }

  /**
   * Show or hide the title-screen pet.
   */
  function showOnTitleScreen(show) {
    const container = document.getElementById('title-pet-container');
    if (container) {
      container.style.display = show ? 'block' : 'none';
    }
    const titlePet = document.querySelector('#title-screen .pet-sprite');
    if (titlePet) {
      titlePet.style.display = show ? 'flex' : 'none';
      if (show) {
        titlePet.style.animation = 'petIdle 2s ease-in-out infinite';
      } else {
        titlePet.style.animation = 'none';
      }
    }
  }

  /* ── Injected Animations ───────────────────────────────── */

  function injectAnimations() {
    if (document.getElementById('pet-animations-style')) return;

    const style = document.createElement('style');
    style.id = 'pet-animations-style';
    style.textContent = `
      /* Bounce / squish on click */
      .pet-bounce {
        animation: petBounce 0.4s ease !important;
      }

      @keyframes petBounce {
        0%   { transform: scale(1); }
        20%  { transform: scale(0.85, 1.15); }
        40%  { transform: scale(1.15, 0.85); }
        60%  { transform: scale(0.95, 1.05); }
        80%  { transform: scale(1.03, 0.97); }
        100% { transform: scale(1); }
      }

      /* Idle floating / breathing for the pet */
      @keyframes petIdle {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(-6px); }
      }

      /* Heart particles float up and fade */
      @keyframes heartFloat {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-80px) scale(1.5) rotate(15deg);
        }
      }

      /* Speech bubble pop in */
      .pop-in {
        animation: bubblePopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
      }

      @keyframes bubblePopIn {
        0%   { opacity: 0; transform: translate(-50%, -100%) scale(0.5); }
        100% { opacity: 1; transform: translate(-50%, -100%) scale(1); }
      }

      /* Speech bubble pop out */
      .pop-out {
        animation: bubblePopOut 0.25s ease-in forwards;
      }

      @keyframes bubblePopOut {
        0%   { opacity: 1; transform: translate(-50%, -100%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -100%) scale(0.4); }
      }

      /* Speech bubble base style */
      #pet-bubble {
        display: none;
        max-width: 200px;
        padding: 10px 16px;
        background: rgba(255, 255, 255, 0.95);
        border: 2px solid #E6D8D5;
        border-radius: 14px;
        font-family: 'Nunito', 'Plus Jakarta Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 700;
        color: #433638;
        text-align: center;
        box-shadow: 0 4px 16px rgba(67,54,56,0.1);
        z-index: 10001;
        pointer-events: none;
        white-space: nowrap;
      }

      /* Bubble tail / arrow */
      #pet-bubble::after {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 0; height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid rgba(255, 255, 255, 0.95);
        filter: drop-shadow(0 2px 1px rgba(67,54,56,0.06));
      }

      /* Heart particle base */
      .heart-particle {
        line-height: 1;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── Public API ────────────────────────────────────────── */
  return {
    // Exposed state (read-only references; use methods to mutate)
    get petElements()       { return state.petElements; },
    get bubbleElement()     { return state.bubbleElement; },
    get particlesContainer(){ return state.particlesContainer; },
    get popupTexts()        { return state.popupTexts; },
    get isAnimating()       { return state.isAnimating; },
    get bubbleTimeout()     { return state.bubbleTimeout; },

    // Methods
    init,
    onPetClick,
    createHeartParticles,
    showSpeechBubble,
    showInScene,
    showOnTitleScreen,
  };
})();
