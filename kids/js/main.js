// ══════════════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════════════
const LETTERS = [
  { letter: 'A', emoji: '🍎', word: 'Apple' },
  { letter: 'B', emoji: '⚽', word: 'Ball' },
  { letter: 'C', emoji: '🐱', word: 'Cat' },
  { letter: 'D', emoji: '🐶', word: 'Dog' },
  { letter: 'E', emoji: '🐘', word: 'Elephant' },
  { letter: 'F', emoji: '🐟', word: 'Fish' },
  { letter: 'G', emoji: '🍇', word: 'Grapes' },
  { letter: 'H', emoji: '🎩', word: 'Hat' },
  { letter: 'I', emoji: '🍦', word: 'Ice Cream' },
  { letter: 'J', emoji: '🪼', word: 'Jellyfish' },
  { letter: 'K', emoji: '🪁', word: 'Kite' },
  { letter: 'L', emoji: '🦁', word: 'Lion' },
  { letter: 'M', emoji: '🐒', word: 'Monkey' },
  { letter: 'N', emoji: '🪺', word: 'Nest' },
  { letter: 'O', emoji: '🍊', word: 'Orange' },
  { letter: 'P', emoji: '🐼', word: 'Panda' },
  { letter: 'Q', emoji: '👸', word: 'Queen' },
  { letter: 'R', emoji: '🌈', word: 'Rainbow' },
  { letter: 'S', emoji: '☀️', word: 'Sun' },
  { letter: 'T', emoji: '🐯', word: 'Tiger' },
  { letter: 'U', emoji: '☂️', word: 'Umbrella' },
  { letter: 'V', emoji: '🎻', word: 'Violin' },
  { letter: 'W', emoji: '🍉', word: 'Watermelon' },
  { letter: 'X', emoji: '🎄', word: 'Xmas' },
  { letter: 'Y', emoji: '🪀', word: 'Yo-yo' },
  { letter: 'Z', emoji: '🦓', word: 'Zebra' },
];
const NUMBERS = [
  { num: 1, word: 'One', emoji: '🍎' }, { num: 2, word: 'Two', emoji: '🌟' },
  { num: 3, word: 'Three', emoji: '🌸' }, { num: 4, word: 'Four', emoji: '🍭' },
  { num: 5, word: 'Five', emoji: '🐣' }, { num: 6, word: 'Six', emoji: '🍓' },
  { num: 7, word: 'Seven', emoji: '🌈' }, { num: 8, word: 'Eight', emoji: '🦋' },
  { num: 9, word: 'Nine', emoji: '🍀' }, { num: 10, word: 'Ten', emoji: '🎈' },
  { num: 11, word: 'Eleven', emoji: '⭐' }, { num: 12, word: 'Twelve', emoji: '🍕' },
  { num: 13, word: 'Thirteen', emoji: '🐠' }, { num: 14, word: 'Fourteen', emoji: '🌻' },
  { num: 15, word: 'Fifteen', emoji: '🎵' }, { num: 16, word: 'Sixteen', emoji: '🍦' },
  { num: 17, word: 'Seventeen', emoji: '🦄' }, { num: 18, word: 'Eighteen', emoji: '🌺' },
  { num: 19, word: 'Nineteen', emoji: '🍇' }, { num: 20, word: 'Twenty', emoji: '🎉' },
];
const WEEKDAYS = [
  { name: 'Monday', emoji: '☀️', short: 'Mon' },
  { name: 'Tuesday', emoji: '🌤️', short: 'Tue' },
  { name: 'Wednesday', emoji: '🌈', short: 'Wed' },
  { name: 'Thursday', emoji: '⚡', short: 'Thu' },
  { name: 'Friday', emoji: '🎉', short: 'Fri' },
  { name: 'Saturday', emoji: '🏖️', short: 'Sat' },
  { name: 'Sunday', emoji: '🌟', short: 'Sun' },
];
const MONTHS = [
  { name: 'January', emoji: '❄️', short: 'Jan' }, { name: 'February', emoji: '💝', short: 'Feb' },
  { name: 'March', emoji: '🌸', short: 'Mar' }, { name: 'April', emoji: '🌦️', short: 'Apr' },
  { name: 'May', emoji: '🌻', short: 'May' }, { name: 'June', emoji: '☀️', short: 'Jun' },
  { name: 'July', emoji: '🏖️', short: 'Jul' }, { name: 'August', emoji: '🌊', short: 'Aug' },
  { name: 'September', emoji: '🍂', short: 'Sep' }, { name: 'October', emoji: '🎃', short: 'Oct' },
  { name: 'November', emoji: '🍁', short: 'Nov' }, { name: 'December', emoji: '🎄', short: 'Dec' },
];

const SECTIONS = {
  letters: { data: LETTERS, total: 26 },
  numbers: { data: NUMBERS, total: 20 },
  weekdays: { data: WEEKDAYS, total: 7 },
  months: { data: MONTHS, total: 12 },
};

// ── WORD FAMILIES ─────────────────────────────────────
const WORD_FAMILIES = [
  {
    family: '-AN', color: 'col-red', words: [
      { word: 'can', emoji: '🥫' }, { word: 'man', emoji: '👨' }, { word: 'fan', emoji: '🪭' }
    ]
  },
  {
    family: '-AT', color: 'col-orange', words: [
      { word: 'mat', emoji: '🗺️' }, { word: 'cat', emoji: '🐱' }, { word: 'hat', emoji: '🎩' }
    ]
  },
  {
    family: '-EN', color: 'col-yellow', words: [
      { word: 'hen', emoji: '🐔' }, { word: 'pen', emoji: '🖊️' }, { word: 'ten', emoji: '🔟' }
    ]
  },
  {
    family: '-ET', color: 'col-green', words: [
      { word: 'pet', emoji: '🐹' }, { word: 'jet', emoji: '✈️' }, { word: 'wet', emoji: '💧' }
    ]
  },
  {
    family: '-IN', color: 'col-blue', words: [
      { word: 'pin', emoji: '📌' }, { word: 'fin', emoji: '🦈' }, { word: 'bin', emoji: '🗑️' }
    ]
  },
  {
    family: '-IT', color: 'col-purple', words: [
      { word: 'pit', emoji: '🕳️' }, { word: 'bit', emoji: '💾' }, { word: 'hit', emoji: '🥊' }
    ]
  },
  {
    family: '-OG', color: 'col-pink', words: [
      { word: 'jog', emoji: '🏃' }, { word: 'fog', emoji: '🌫️' }, { word: 'log', emoji: '🪵' }
    ]
  },
  {
    family: '-OT', color: 'col-teal', words: [
      { word: 'dot', emoji: '🔵' }, { word: 'pot', emoji: '🪴' }, { word: 'hot', emoji: '🔥' }
    ]
  },
  {
    family: '-UG', color: 'col-red', words: [
      { word: 'bug', emoji: '🐛' }, { word: 'hug', emoji: '🤗' }, { word: 'rug', emoji: '🟫' }
    ]
  },
  {
    family: '-UT', color: 'col-orange', words: [
      { word: 'nut', emoji: '🥜' }, { word: 'hut', emoji: '🛖' }, { word: 'cut', emoji: '✂️' }
    ]
  },
];

const COLORS = ['col-red', 'col-orange', 'col-yellow', 'col-green', 'col-blue', 'col-purple', 'col-pink', 'col-teal'];
const BAND_COLORS = ['#FF6B6B', '#FF9F43', '#FFD93D', '#6BCB77', '#4D96FF', '#C56BFF', '#FF6EB4', '#00CEC9'];
const CONFETTI_COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#C56BFF', '#FF9F43'];

// ══════════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════════
let currentSection = 'letters';
let currentIndex = 0;
let currentData = LETTERS;
let spellEnabled = true;
let musicOn = false;
let isReadingAll = false;
let readAllStop = false;

// Per-section visited sets
const visited = { letters: new Set(), numbers: new Set(), weekdays: new Set(), months: new Set(), words: new Set() };

// ══════════════════════════════════════════════════════
//  SPLASH SCREEN
// ══════════════════════════════════════════════════════
const splash = document.getElementById('splash');
setTimeout(() => splash.classList.add('hide'), 1800);
setTimeout(() => {
  splash.remove();
  // Attempt to unlock speech if splash is removed by timer
  unlockSpeech();
}, 2400);

// Also unlock on first splash click
if (splash) {
  splash.addEventListener('click', () => {
    unlockSpeech();
  }, { once: true });
}

// ══════════════════════════════════════════════════════
//  PER-SECTION BACKGROUND SHIFT
// ══════════════════════════════════════════════════════
const BG_CLASSES = ['bg-letters', 'bg-numbers', 'bg-weekdays', 'bg-months', 'bg-words'];
function setBodyBg(section) {
  BG_CLASSES.forEach(c => document.body.classList.remove(c));
  document.body.classList.add(`bg-${section}`);
}
setBodyBg('letters');

// ══════════════════════════════════════════════════════
//  STAR PROGRESS
// ══════════════════════════════════════════════════════
const STAR_TOTALS = { letters: 26, numbers: 20, weekdays: 7, months: 12, words: 10 };
const MAX_STARS = 10; // max pips shown regardless of total

function initStarTrack(section) {
  const track = document.getElementById(`starTrack-${section}`);
  if (!track) return;
  track.innerHTML = '';
  const total = STAR_TOTALS[section];
  const pips = Math.min(total, MAX_STARS);
  for (let i = 0; i < pips; i++) {
    const pip = document.createElement('span');
    pip.className = 'star-pip';
    pip.textContent = '⭐';
    pip.id = `pip-${section}-${i}`;
    track.appendChild(pip);
  }
}

function updateStarProgress(section, done) {
  const total = STAR_TOTALS[section];
  const pips = Math.min(total, MAX_STARS);
  const filled = Math.round((done / total) * pips);
  const label = document.querySelector(`#starProg-${section} .star-progress-label`);
  if (label) label.textContent = `${done}/${total}`;
  for (let i = 0; i < pips; i++) {
    const pip = document.getElementById(`pip-${section}-${i}`);
    if (!pip) continue;
    const shouldFill = i < filled;
    if (shouldFill && !pip.classList.contains('filled')) {
      pip.classList.add('filled');
    } else if (!shouldFill) {
      pip.classList.remove('filled');
    }
  }
}

// Init all star tracks
Object.keys(STAR_TOTALS).forEach(initStarTrack);

// ══════════════════════════════════════════════════════
//  TILE SLIDE-IN ANIMATION
// ══════════════════════════════════════════════════════
function animateTilesIn(section) {
  const grid = document.getElementById(`grid-${section}`);
  if (!grid) return;
  const tiles = grid.querySelectorAll('.tile');
  tiles.forEach((tile, i) => {
    tile.classList.remove('tile-animate');
    void tile.offsetWidth; // reflow
    tile.style.animationDelay = `${i * 0.03}s`;
    tile.classList.add('tile-animate');
  });
}
animateTilesIn('letters'); // animate on load

// ══════════════════════════════════════════════════════
//  CELEBRATION VARIETY
// ══════════════════════════════════════════════════════
let celebrationIndex = 0;
const BALLOON_EMOJIS = ['🎈', '🎀', '🌟', '💛', '❤️', '💚', '💙', '💜'];

function celebrate(intensity = 'normal') {
  const type = celebrationIndex % 3;
  celebrationIndex++;
  if (type === 0) spawnConfetti(intensity === 'high' ? 80 : 30);
  else if (type === 1) spawnBalloons(intensity === 'high' ? 20 : 10);
  else spawnFireworks(intensity === 'high' ? 8 : 4);
}

function spawnBalloons(count = 10) {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'balloon-piece';
    b.textContent = BALLOON_EMOJIS[Math.floor(Math.random() * BALLOON_EMOJIS.length)];
    b.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      animation-delay: ${Math.random() * 0.8}s;
      animation-duration: ${1.5 + Math.random() * 1}s;
      font-size: ${1.5 + Math.random() * 1.5}rem;
    `;
    container.appendChild(b);
  }
  setTimeout(() => container.innerHTML = '', 3500);
}

function spawnFireworks(count = 4) {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const cx = 15 + Math.random() * 70;
    const cy = 15 + Math.random() * 60;
    for (let j = 0; j < 12; j++) {
      const p = document.createElement('div');
      p.className = 'firework-piece';
      const angle = (j / 12) * 360;
      const dist = 40 + Math.random() * 60;
      const tx = Math.cos(angle * Math.PI / 180) * dist;
      const ty = Math.sin(angle * Math.PI / 180) * dist;
      p.style.cssText = `
        left: ${cx}%; top: ${cy}%;
        background: hsl(${Math.random() * 360},90%,60%);
        animation-delay: ${i * 0.25}s;
        animation-duration: 0.7s;
        transform-origin: center;
        --tx: ${tx}px; --ty: ${ty}px;
      `;
      // Use simpler translate animation
      p.style.animation = `none`;
      p.style.transition = `transform 0.6s ease, opacity 0.6s ease`;
      container.appendChild(p);
      setTimeout(() => {
        p.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        p.style.opacity = '0';
      }, i * 250 + 50);
    }
  }
  setTimeout(() => container.innerHTML = '', 2500);
}
// ══════════════════════════════════════════════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

// Play a single beep
const activeOscillators = [];
function beep(freq, duration, type = 'sine', volume = 0.3, startTime = 0) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);
    gain.gain.setValueAtTime(volume, ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);
    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration + 0.05);
    activeOscillators.push({ osc, gain });
    osc.onended = () => {
      const idx = activeOscillators.findIndex(o => o.osc === osc);
      if (idx > -1) activeOscillators.splice(idx, 1);
    };
  } catch (e) { }
}

function stopAllOscillators() {
  activeOscillators.forEach(({ osc, gain }) => {
    try { gain.gain.setValueAtTime(0, getAudioCtx().currentTime); osc.stop(); } catch (e) { }
  });
  activeOscillators.length = 0;
}

// Pop sound — tile tap
function playPop() {
  if (!musicOn) return;
  beep(600, 0.06, 'square', 0.15);
  beep(900, 0.08, 'sine', 0.12, 0.05);
}

// Ding — between Read All items
function playDing() {
  if (!musicOn) return;
  beep(880, 0.15, 'sine', 0.18);
}

// Chime — Well Done / modal open
function playChime() {
  if (!musicOn) return;
  const notes = [523, 659, 784, 1047];
  notes.forEach((f, i) => beep(f, 0.25, 'sine', 0.2, i * 0.13));
}

// Background music — simple looping nursery tune
let bgMusicInterval = null;
const BG_MELODY = [
  // Twinkle twinkle style melody: C C G G A A G rest F F E E D D C
  [523, 0.18], [523, 0.18], [784, 0.18], [784, 0.18], [880, 0.18], [880, 0.18], [784, 0.35],
  [0, 0.15],
  [698, 0.18], [698, 0.18], [659, 0.18], [659, 0.18], [587, 0.18], [587, 0.18], [523, 0.35],
  [0, 0.2],
  [784, 0.18], [784, 0.18], [698, 0.18], [698, 0.18], [659, 0.18], [659, 0.18], [587, 0.35],
  [0, 0.15],
  [784, 0.18], [784, 0.18], [698, 0.18], [698, 0.18], [659, 0.18], [659, 0.18], [587, 0.35],
  [0, 0.25],
];

let bgPlaying = false;
let bgLoopId = null;

function playBgMusic() {
  if (!musicOn || bgPlaying) return;
  bgPlaying = true;
  let noteIdx = 0;
  let t = 0;

  function scheduleLoop() {
    if (!musicOn) { bgPlaying = false; return; }
    const ctx = getAudioCtx();
    t = ctx.currentTime;
    BG_MELODY.forEach(([freq, dur]) => {
      if (freq > 0) beep(freq, dur * 0.85, 'sine', 0.07, t - ctx.currentTime);
      t += dur + 0.02;
    });
    const totalDur = BG_MELODY.reduce((s, [, d]) => s + d + 0.02, 0) * 1000;
    bgLoopId = setTimeout(scheduleLoop, totalDur - 200);
  }
  scheduleLoop();
}

function stopBgMusic() {
  bgPlaying = false;
  clearTimeout(bgLoopId);
  stopAllOscillators();
}

// Start music after first user interaction (browser policy)
let musicStarted = false;
function tryStartMusic() {
  if (musicOn && !musicStarted) {
    musicStarted = true;
    playBgMusic();
  }
}
document.addEventListener('click', tryStartMusic, { once: true });

// Music toggle button
const btnMusic = document.getElementById('btnMusic');
btnMusic.addEventListener('click', () => {
  musicOn = !musicOn;
  btnMusic.textContent = musicOn ? '🎵 Music: ON' : '🔇 Music: OFF';
  btnMusic.classList.toggle('on', musicOn);
  btnMusic.classList.toggle('off', !musicOn);
  if (musicOn) { musicStarted = false; tryStartMusic(); }
  else { stopBgMusic(); }
});

// ══════════════════════════════════════════════════════
//  SPELL TOGGLE
// ══════════════════════════════════════════════════════
const spellToggle = document.getElementById('spellToggle');
const spellLabel = document.getElementById('spellLabel');
spellToggle.addEventListener('change', () => {
  spellEnabled = spellToggle.checked;
  spellLabel.textContent = spellEnabled ? 'ON' : 'OFF';
});

// ══════════════════════════════════════════════════════
//  VOICE
// ══════════════════════════════════════════════════════
// Prevent GC on mobile: maintain a global reference to active utterances
let speechQueue = [];

// Interaction unlock for mobile browsers
function unlockSpeech() {
  if (window.speechSynthesis) {
    const u = new SpeechSynthesisUtterance(' ');
    u.volume = 0;
    window.speechSynthesis.speak(u);
    console.log("Speech synthesis unlocked.");
  }
}

// Warm up voices
if (window.speechSynthesis) {
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// Use device default voice — best natural voice per platform
function mkU(text, rate = 0.72, pitch = 1.35) {
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate; u.pitch = pitch;

  // Keep reference until finished to avoid GC on certain browsers
  speechQueue.push(u);
  u.onend = () => {
    const idx = speechQueue.indexOf(u);
    if (idx > -1) speechQueue.splice(idx, 1);
  };
  u.onerror = u.onend;

  return u;
}

// ══════════════════════════════════════════════════════
//  BUILD GRIDS
// ══════════════════════════════════════════════════════
function buildGrid(containerId, section, items, mainFn, emojiFn, subFn, fontSize) {
  const g = document.getElementById(containerId);
  items.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = `tile ${COLORS[i % COLORS.length]}`;
    tile.id = `tile-${section}-${i}`;
    tile.innerHTML = `
      <div class="t-main" style="font-size:${fontSize}">${mainFn(item)}</div>
      <div class="t-emoji">${emojiFn(item)}</div>
      <div class="t-sub">${subFn(item)}</div>
    `;
    tile.addEventListener('click', () => {
      playPop();
      markVisited(section, i);
      openModal(section, i);
    });
    g.appendChild(tile);
  });
}

buildGrid('grid-letters', 'letters', LETTERS, d => d.letter, d => d.emoji, d => d.word, '2.1rem');
buildGrid('grid-numbers', 'numbers', NUMBERS, d => d.num, d => d.emoji, d => d.word, '2.1rem');
buildGrid('grid-weekdays', 'weekdays', WEEKDAYS, d => d.short, d => d.emoji, d => d.name, '1.35rem');
buildGrid('grid-months', 'months', MONTHS, d => d.short, d => d.emoji, d => d.name, '1.35rem');

// Build word family tiles
(function buildWordFamilyGrid() {
  const g = document.getElementById('grid-words');
  WORD_FAMILIES.forEach((fam, i) => {
    const tile = document.createElement('div');
    tile.className = `tile ${fam.color}`;
    tile.id = `tile-words-${i}`;
    tile.innerHTML = `
      <div class="t-main" style="font-size:1.6rem">${fam.family}</div>
      <div class="t-emoji">${fam.words.map(w => w.emoji).join('')}</div>
      <div class="t-sub">${fam.words.map(w => w.word).join(' · ')}</div>
    `;
    tile.addEventListener('click', () => {
      playPop();
      markVisited('words', i);
      openWordDetail(i);
    });
    g.appendChild(tile);
  });
})();

// ══════════════════════════════════════════════════════
//  PROGRESS TRACKER
// ══════════════════════════════════════════════════════
function markVisited(section, index) {
  visited[section].add(index);
  if (section === 'words') { updateWordsProgress(); return; }
  updateProgress(section);
}

function updateProgress(section) {
  const total = SECTIONS[section].total;
  const done = visited[section].size;
  updateStarProgress(section, done);

  // Old progress bar (hidden via CSS but kept for compatibility)
  const pb = document.getElementById(`prog-${section}`);
  if (pb) pb.style.width = Math.round((done / total) * 100) + '%';

  const starCount = Math.floor((done / total) * 5);
  const starsEl = document.getElementById(`stars-${section}`);
  if (starsEl) starsEl.textContent = starCount > 0 ? '⭐'.repeat(starCount) + ` ${done} visited!` : '';

  document.querySelectorAll(`[id^="tile-${section}-"]`).forEach((el, i) => {
    el.classList.toggle('visited', visited[section].has(i));
  });
}

// ══════════════════════════════════════════════════════
//  TABS
// ══════════════════════════════════════════════════════
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (isReadingAll) stopReadAll();
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    currentSection = btn.dataset.tab;
    if (SECTIONS[currentSection]) currentData = SECTIONS[currentSection].data;
    setBodyBg(currentSection);
    animateTilesIn(currentSection);
  });
});

// ══════════════════════════════════════════════════════
//  READ ALL
// ══════════════════════════════════════════════════════
['letters', 'numbers', 'weekdays', 'months'].forEach(sec => {
  document.getElementById(`readAll-${sec}`).addEventListener('click', () => {
    if (isReadingAll && currentSection === sec) { stopReadAll(); return; }
    if (isReadingAll) stopReadAll();
    startReadAll(sec);
  });
});

function startReadAll(section) {
  isReadingAll = true;
  readAllStop = false;
  currentSection = section;
  currentData = SECTIONS[section].data;

  const btn = document.getElementById(`readAll-${section}`);
  btn.textContent = '⏹ Stop';
  btn.classList.add('stop');

  readAllSequence(section, 0);
}

function stopReadAll() {
  readAllStop = true;
  isReadingAll = false;
  window.speechSynthesis && window.speechSynthesis.cancel();
  clearAllHighlights();
  ['letters', 'numbers', 'weekdays', 'months'].forEach(sec => {
    const btn = document.getElementById(`readAll-${sec}`);
    btn.classList.remove('stop');
    btn.textContent = '▶ Read All';
  });
}

function clearAllHighlights() {
  document.querySelectorAll('.tile.reading').forEach(t => t.classList.remove('reading'));
}

function readAllSequence(section, index) {
  if (readAllStop) { stopReadAll(); return; }

  const data = SECTIONS[section].data;
  if (index >= data.length) {
    // Finished!
    stopReadAll();
    markAllVisited(section);
    setTimeout(() => showWellDone(section), 400);
    return;
  }

  const item = data[index];
  const tileEl = document.getElementById(`tile-${section}-${index}`);

  clearAllHighlights();
  if (tileEl) {
    tileEl.classList.add('reading');
    tileEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  markVisited(section, index);
  playDing();

  const uList = buildReadAllUtterances(section, item);

  // After last utterance, move to next
  const last = uList[uList.length - 1];
  last.onend = () => {
    if (readAllStop) return;
    setTimeout(() => readAllSequence(section, index + 1), 350);
  };
  last.onerror = () => {
    if (!readAllStop) readAllSequence(section, index + 1);
  };

  window.speechSynthesis.cancel();
  uList.forEach(u => window.speechSynthesis.speak(u));
}

function buildReadAllUtterances(section, item) {
  const uList = [];

  if (section === 'letters') {
    // Just say the letter: "A"
    uList.push(mkU(item.letter, 0.75, 1.35));

  } else if (section === 'numbers') {
    // Just say the number: "1"
    uList.push(mkU(String(item.num), 0.75, 1.35));

  } else if (section === 'weekdays') {
    // Just say the day: "Monday"
    uList.push(mkU(item.name, 0.75, 1.35));

  } else {
    // Just say the month: "January"
    uList.push(mkU(item.name, 0.75, 1.35));
  }
  return uList;
}

function markAllVisited(section) {
  const total = SECTIONS[section].total;
  for (let i = 0; i < total; i++) visited[section].add(i);
  updateProgress(section);
}

// ══════════════════════════════════════════════════════
//  WELL DONE
// ══════════════════════════════════════════════════════
const wellDoneOverlay = document.getElementById('wellDoneOverlay');
const wellDoneSub = document.getElementById('wellDoneSub');
const labels = { letters: 'Letters', numbers: 'Numbers', weekdays: 'Weekdays', months: 'Months', words: 'Word Families' };

function showWellDone(section) {
  wellDoneSub.textContent = `You finished all the ${labels[section]}! 🎉`;
  wellDoneOverlay.classList.add('active');
  celebrate('high');
  playChime();
}

document.getElementById('btnWellDoneClose').addEventListener('click', () => {
  wellDoneOverlay.classList.remove('active');
});

// ══════════════════════════════════════════════════════
//  MODAL
// ══════════════════════════════════════════════════════
const overlay = document.getElementById('modalOverlay');
const modalBand = document.getElementById('modalBand');
const modalMain = document.getElementById('modalMain');
const modalWordLbl = document.getElementById('modalWordLabel');
const modalEmoji = document.getElementById('modalEmoji');
const countGrid = document.getElementById('countGrid');
const btnClose = document.getElementById('btnClose');
const btnSpeak = document.getElementById('btnSpeak');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const navCounter = document.getElementById('navCounter');
const speakDots = document.getElementById('speakDots');

function openModal(section, index) {
  if (isReadingAll) stopReadAll();
  currentSection = section;
  currentData = SECTIONS[section].data;
  currentIndex = index;
  updateModal();
  overlay.classList.add('active');
  celebrate('normal');
  playChime();
  speakCurrent();
}

function updateModal() {
  const item = currentData[currentIndex];
  modalBand.style.background = BAND_COLORS[currentIndex % BAND_COLORS.length];
  navCounter.textContent = `${currentIndex + 1} / ${currentData.length}`;

  modalEmoji.style.display = 'block';
  countGrid.innerHTML = '';
  countGrid.style.display = 'none';

  if (currentSection === 'letters') {
    modalMain.textContent = item.letter;
    modalWordLbl.textContent = item.word;
    modalEmoji.textContent = item.emoji;

  } else if (currentSection === 'numbers') {
    modalMain.textContent = item.num;
    modalWordLbl.textContent = item.word;
    modalEmoji.style.display = 'none';
    countGrid.style.display = 'flex';
    const size = item.num <= 5 ? '2.4rem' : item.num <= 10 ? '2rem' : item.num <= 15 ? '1.6rem' : '1.3rem';
    for (let i = 0; i < item.num; i++) {
      const span = document.createElement('span');
      span.textContent = item.emoji;
      span.style.cssText = `font-size:${size};line-height:1.1`;
      countGrid.appendChild(span);
    }

  } else if (currentSection === 'weekdays') {
    modalMain.textContent = item.short;
    modalWordLbl.textContent = item.name;
    modalEmoji.textContent = item.emoji;

  } else {
    modalMain.textContent = item.short;
    modalWordLbl.textContent = item.name;
    modalEmoji.textContent = item.emoji;
  }

  modalEmoji.style.animation = 'none';
  void modalEmoji.offsetWidth;
  modalEmoji.style.animation = 'popIn 0.45s cubic-bezier(0.34,1.56,0.64,1)';
}

function closeModal() {
  overlay.classList.remove('active');
  window.speechSynthesis && window.speechSynthesis.cancel();
  setSpeaking(false);
}

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

btnPrev.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + currentData.length) % currentData.length;
  markVisited(currentSection, currentIndex);
  updateModal(); speakCurrent();
});
btnNext.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % currentData.length;
  markVisited(currentSection, currentIndex);
  updateModal(); speakCurrent();
});
btnSpeak.addEventListener('click', speakCurrent);

document.addEventListener('keydown', e => {
  if (!overlay.classList.contains('active')) return;
  if (e.key === 'ArrowRight') btnNext.click();
  if (e.key === 'ArrowLeft') btnPrev.click();
  if (e.key === 'Escape') closeModal();
  if (e.key === ' ') { e.preventDefault(); speakCurrent(); }
});

// ══════════════════════════════════════════════════════
//  SPEECH (modal)
// ══════════════════════════════════════════════════════
function setSpeaking(val) {
  btnSpeak.classList.toggle('speaking', val);
  speakDots.classList.toggle('visible', val);
  btnSpeak.textContent = val ? '🔊 Speaking...' : '🔊 Say It!';
}

function buildFullUtterances(section, item) {
  const uList = [];
  if (section === 'letters') {
    uList.push(mkU(`${item.letter} for ${item.word}`, 0.72, 1.35));
    if (spellEnabled) {
      item.word.replace(/\s/g, '').split('').forEach(ch => uList.push(mkU(ch, 0.62, 1.35)));
      uList.push(mkU(item.word, 0.78, 1.4));
    }
  } else if (section === 'numbers') {
    // "1" → "O N E" → "One"
    uList.push(mkU(String(item.num), 0.75, 1.35));
    if (spellEnabled) {
      item.word.split('').forEach(ch => uList.push(mkU(ch, 0.62, 1.35)));
    }
    uList.push(mkU(item.word, 0.78, 1.4));
  } else if (section === 'weekdays') {
    uList.push(mkU(item.name, 0.75, 1.35));
    if (spellEnabled) {
      item.name.split('').forEach(ch => uList.push(mkU(ch, 0.62, 1.35)));
      uList.push(mkU(item.name, 0.78, 1.4));
    }
  } else {
    uList.push(mkU(item.name, 0.75, 1.35));
    if (spellEnabled) {
      item.name.split('').forEach(ch => uList.push(mkU(ch, 0.62, 1.35)));
      uList.push(mkU(item.name, 0.78, 1.4));
    }
  }
  return uList;
}

function speakCurrent() {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  setSpeaking(true);
  const item = currentData[currentIndex];
  const uList = buildFullUtterances(currentSection, item);
  uList[uList.length - 1].onend = () => setSpeaking(false);
  uList.forEach(u => window.speechSynthesis.speak(u));
}

// ══════════════════════════════════════════════════════
//  WORD DETAIL & QUIZ
// ══════════════════════════════════════════════════════
let currentFamilyIndex = 0;

const wordDetailOverlay = document.getElementById('wordDetailOverlay');
const wordFamilyTitle = document.getElementById('wordFamilyTitle');
const wordCardsGrid = document.getElementById('wordCardsGrid');
const quizOverlay = document.getElementById('quizOverlay');
const quizQCount = document.getElementById('quizQCount');
const quizScore = document.getElementById('quizScore');
const quizEmoji = document.getElementById('quizEmoji');
const quizChoices = document.getElementById('quizChoices');
const btnQuizSpeak = document.getElementById('btnQuizSpeak');

function openWordDetail(index) {
  if (isReadingAll) stopReadAll();
  currentFamilyIndex = index;
  const fam = WORD_FAMILIES[index];
  wordFamilyTitle.textContent = `${fam.family} Words`;
  wordFamilyTitle.style.color = 'var(--tab-words)';

  // Build word cards
  wordCardsGrid.innerHTML = '';
  fam.words.forEach(w => {
    const card = document.createElement('div');
    card.className = 'word-card';
    card.innerHTML = `<span class="wc-emoji">${w.emoji}</span><span class="wc-word">${w.word}</span>`;
    card.addEventListener('click', () => {
      playPop();
      speakWord(w.word);
    });
    wordCardsGrid.appendChild(card);
  });

  wordDetailOverlay.classList.add('active');
  spawnConfetti(20);
  playChime();
  // Auto-read the family words
  speakFamilyWords(fam);
}

function speakFamilyWords(fam) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const uList = [];
  // Say family name first e.g. "A T words"
  uList.push(mkU(`${fam.family.replace('-', '')} words`, 0.75, 1.35));
  fam.words.forEach(w => {
    uList.push(mkU(w.word, 0.72, 1.35));
  });
  uList.forEach(u => window.speechSynthesis.speak(u));
}

function speakWord(word) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const uList = [];
  if (spellEnabled) {
    word.split('').forEach(ch => uList.push(mkU(ch, 0.62, 1.35)));
  }
  uList.push(mkU(word, 0.75, 1.35));
  uList.forEach(u => window.speechSynthesis.speak(u));
}

document.getElementById('btnWordDetailClose').addEventListener('click', () => {
  wordDetailOverlay.classList.remove('active');
  window.speechSynthesis && window.speechSynthesis.cancel();
});

// ── QUIZ ──────────────────────────────────────────────
let quizQuestions = [];
let quizCurrentQ = 0;
let quizCurrentScore = 0;
let quizAnswered = false;

document.getElementById('btnStartQuiz').addEventListener('click', () => {
  startQuiz(currentFamilyIndex);
});

document.getElementById('btnQuizClose').addEventListener('click', closeQuiz);

function startQuiz(familyIndex) {
  const fam = WORD_FAMILIES[familyIndex];
  // Build questions — one per word in the family
  quizQuestions = fam.words.map(w => {
    // Wrong options: 2 from other families, random
    const allOtherWords = WORD_FAMILIES
      .filter((_, i) => i !== familyIndex)
      .flatMap(f => f.words.map(fw => fw.word));
    const shuffled = allOtherWords.sort(() => Math.random() - 0.5);
    const wrongOptions = shuffled.slice(0, 3).filter(o => o !== w.word);
    const options = [w.word, ...wrongOptions.slice(0, 3)].sort(() => Math.random() - 0.5);
    return { word: w.word, emoji: w.emoji, options };
  });

  quizCurrentQ = 0;
  quizCurrentScore = 0;
  quizAnswered = false;
  quizScore.textContent = '0';
  quizOverlay.classList.add('active');
  showQuizQuestion();
}

function showQuizQuestion() {
  if (quizCurrentQ >= quizQuestions.length) {
    finishQuiz(); return;
  }
  quizAnswered = false;
  const q = quizQuestions[quizCurrentQ];
  quizQCount.textContent = `Q ${quizCurrentQ + 1} / ${quizQuestions.length}`;

  // Emoji
  quizEmoji.textContent = q.emoji;
  quizEmoji.style.animation = 'none';
  void quizEmoji.offsetWidth;
  quizEmoji.style.animation = 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1)';

  // Auto-speak the word
  setTimeout(() => speakWord(q.word), 300);

  // Build choice buttons
  quizChoices.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-choice';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleQuizAnswer(btn, opt, q.word));
    quizChoices.appendChild(btn);
  });
}

function handleQuizAnswer(btn, chosen, correct) {
  if (quizAnswered) return;

  if (chosen === correct) {
    quizAnswered = true;
    btn.classList.add('correct');
    quizCurrentScore++;
    quizScore.textContent = quizCurrentScore;
    playChime();
    spawnConfetti(25);
    setTimeout(() => {
      quizCurrentQ++;
      showQuizQuestion();
    }, 1100);
  } else {
    // Wrong — shake, buzz, stay on same question
    btn.classList.add('wrong');
    beep(200, 0.3, 'sawtooth', 0.15);
    setTimeout(() => btn.classList.remove('wrong'), 600);
  }
}

// Quiz scores per family
const quizScores = {}; // familyIndex -> { score, total }

function updateFamilyScoreBadge(familyIndex) {
  const tileEl = document.getElementById(`tile-words-${familyIndex}`);
  if (!tileEl) return;
  const sc = quizScores[familyIndex];
  if (!sc) return;
  // Remove existing badge
  const existing = tileEl.querySelector('.score-badge');
  if (existing) existing.remove();
  const stars = sc.score === sc.total ? '⭐' : sc.score >= sc.total / 2 ? '🌟' : '💪';
  const badge = document.createElement('div');
  badge.className = 'score-badge';
  badge.style.cssText = `
    position:absolute; bottom:5px; right:5px;
    background:rgba(0,0,0,0.25); color:#fff;
    font-size:0.55rem; font-weight:900;
    border-radius:20px; padding:2px 6px;
    font-family:'Nunito',sans-serif;
    z-index:3;
  `;
  badge.textContent = `${stars} ${sc.score}/${sc.total}`;
  tileEl.appendChild(badge);
}

function finishQuiz() {
  closeQuiz();
  const total = quizQuestions.length;
  const fam = WORD_FAMILIES[currentFamilyIndex];

  // Save score
  quizScores[currentFamilyIndex] = { score: quizCurrentScore, total };
  updateFamilyScoreBadge(currentFamilyIndex);

  // Stars rating
  const stars = quizCurrentScore === total ? '⭐⭐⭐' :
    quizCurrentScore >= total * 0.66 ? '⭐⭐' : '⭐';
  const msg = quizCurrentScore === total
    ? 'Perfect score! You are a star! 🌟'
    : quizCurrentScore >= total * 0.66
      ? 'Great job! Keep practising!'
      : 'Good try! Let\'s try again!';

  document.getElementById('wellDoneSub').textContent =
    `${fam.family} Quiz: ${quizCurrentScore}/${total} ${stars}\n${msg}`;
  document.getElementById('wellDoneOverlay').classList.add('active');
  spawnConfetti(quizCurrentScore === total ? 80 : 40);
  playChime();
}

function closeQuiz() {
  quizOverlay.classList.remove('active');
  window.speechSynthesis && window.speechSynthesis.cancel();
}

btnQuizSpeak.addEventListener('click', () => {
  if (quizCurrentQ < quizQuestions.length) {
    speakWord(quizQuestions[quizCurrentQ].word);
  }
});

// Update progress for words section (10 families)
function updateWordsProgress() {
  const total = 10;
  const done = visited['words'].size;
  updateStarProgress('words', done);
  const starCount = Math.floor((done / total) * 5);
  const starsEl = document.getElementById('stars-words');
  if (starsEl) starsEl.textContent = starCount > 0 ? '⭐'.repeat(starCount) + ` ${done} visited!` : '';
  document.querySelectorAll('[id^="tile-words-"]').forEach((el, i) => {
    el.classList.toggle('visited', visited['words'].has(i));
  });
}

// ══════════════════════════════════════════════════════
//  CONFETTI
// ══════════════════════════════════════════════════════
function spawnConfetti(count = 30) {
  const container = document.getElementById('confettiContainer');
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: -10px;
      background: ${CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]};
      width:  ${6 + Math.random() * 8}px;
      height: ${6 + Math.random() * 8}px;
      border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
      animation-delay:    ${Math.random() * 0.6}s;
      animation-duration: ${1.2 + Math.random() * 0.8}s;
    `;
    container.appendChild(p);
  }
  setTimeout(() => container.innerHTML = '', 3000);
}

// ══════════════════════════════════════════════════════
//  FOOTER YEAR DYNAMIC INJECTION
// ══════════════════════════════════════════════════════
const currentYearEl = document.getElementById("current-year");
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}
