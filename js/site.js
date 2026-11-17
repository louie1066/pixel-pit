// Pixel Pit site script. Shared by every page; each part runs only if its elements exist on that page.

// Logo: a tiny 4x4 pixel pattern (every page)
const logoPattern = [1,0,1,0, 0,1,1,1, 1,1,0,1, 0,1,0,1];
document.getElementById('logo').innerHTML = logoPattern
  .map(v => `<i style="background:${v ? 'var(--cyan)' : 'transparent'}"></i>`).join('');

// Snapshot from each game's database, last refreshed 14 Nov 2026 and refreshed on request.
// Plays only count in games that have the play counter (Orbit Courier so far).
const games = [
  { name: "Orbit Courier",   desc: "Deliver rocket parts across the orbit, dodge hunters and fill every fuel cell.", plays: 6, high: 26195, by: "MJN", color: "#3fe0ff", sprite: "rocket" },
  { name: "Sugar Hop",       desc: "Help a gingerbread kid hop across cookie platforms and collect the jam jars.", plays: 0, high: 3440, by: "MJN", color: "#ff4fa3", sprite: "kid" },
  { name: "Sky Siege",       desc: "Hold the castle against waves of raiders in this space-shooter defence.", plays: 0, high: 3960, by: "MJN", color: "#ffd23f", sprite: "ship" },
  { name: "Tower Tumble",    desc: "Climb the towers with Sparky while the robot Clank tries to stop you.", plays: 0, high: 25300, by: "MJN", color: "#7CFF6B", sprite: "tower" },
  { name: "Bit Bot",         desc: "Scrubby the nanobot gobbles binary bits and dodges four nasty viruses.", plays: 0, high: 21740, by: "MJN", color: "#3fe0ff", sprite: "bot" },
  { name: "Rampart Rebound", desc: "Bounce a cannonball off a trampoline and crumble the castle wall.", plays: 0, high: 652, by: "MJN", color: "#ff4fa3", sprite: "wall" },
  { name: "Gravity Miner", desc: "Flip gravity to mine through eight caves, with checkpoints every third cave.", plays: 0, high: 19520, by: "MJN", color: "#3fe0ff", sprite: "tower" },
  { name: "Pogo Bongo", desc: "Bounce a monkey on a pogo stick, collect gold coins and avoid the bombs.", plays: 0, high: 39750, by: "MJN", color: "#ffd23f", sprite: "kid" },
  { name: "Star Lancer", desc: "Pilot a fighter through three stages, with bosses and a charged Lance shot.", plays: 0, high: 34360, by: "MJN", color: "#ff4fa3", sprite: "ship" }
];
games.push({ name: "Summit Soar", desc: "Ski off the big hill, lock your speed and angle, and land the longest jump.", plays: 0, high: 67744, by: "MJN", color: "#3fe0ff", sprite: "ski" });
// New games added 14 Nov 2026 (no plays or scores yet; numbers appear at the next refresh)
games.push(
  { name: "Castle Escape", desc: "Run the castle ramparts, dodge arrows and fireballs, and ring the bell before the torch guard catches you.", plays: 0, high: 0, by: "–", color: "#ffd23f", sprite: "bell" },
  { name: "Graveyard Shift", desc: "Hold the gate against waves of movie-style monsters, with a boss fight every four levels.", plays: 0, high: 0, by: "–", color: "#7CFF6B", sprite: "ghost" },
  { name: "Pong", desc: "The classic bat-and-ball game for one or two players, with a computer opponent that gets sharper each level.", plays: 0, high: 0, by: "–", color: "#3fe0ff", sprite: "pong" },
  { name: "Void Breaker", desc: "Shoot every tumbling space rock to dust, wave after wave, and watch out for the hunters.", plays: 0, high: 0, by: "–", color: "#ff4fa3", sprite: "rock" },
  { name: "Starhold", desc: "Fly five shooter missions, break the dreadnought, then take on a faster, angrier fleet.", plays: 0, high: 0, by: "–", color: "#ffd23f", sprite: "ship" },
  { name: "Canopy Quest", desc: "Guide Juno across 64 screens of rainforest and tunnels to recover every lost relic before time runs out.", plays: 0, high: 0, by: "–", color: "#7CFF6B", sprite: "leaf" },
  { name: "Looping", desc: "Fly your biplane through four stages, shoot the enemies and loop the loop to dodge danger.", plays: 0, high: 0, by: "–", color: "#3fe0ff", sprite: "plane" },
  { name: "Escape the Dungeon", desc: "Steer through 15 random mazes with F, B, L and R, and find the golden ladder before the timer runs out and a hunter catches you.", plays: 0, high: 0, by: "–", color: "#ffd23f", sprite: "dungeon" }
);
// Top 5 per game as [score, reached, time]; read from each game's saved scores on 14 Nov 2026
const TOP5 = {
  "Orbit Courier": [[26195,"Level 6",1793606934619],[21700,"Level 6",1794620030447],[17010,"Level 4",1793605757336],[14975,"Level 4",1793663305272],[14500,"Level 4",1793504866161]],
  "Sugar Hop": [[3440,"Level 2",1793801140225],[270,"Level 1",1793801042224],[220,"Level 1",1793472400088],[200,"Level 1",1793800993291]],
  "Sky Siege": [[3960,"Wave 4",1794066399713],[3675,"Wave 3",1793796621455],[3115,"Wave 3",1793800932623],[1955,"Wave 2",1793796172301],[1005,"Wave 1",1794066199745]],
  "Tower Tumble": [[25300,"Level 2",1793790989624],[21200,"Level 2",1793792456076],[14700,"Level 1",1793791812064]],
  "Bit Bot": [[21740,"",0]],
  "Rampart Rebound": [[652,"Wall 2",1794035144188],[599,"Wall 2",1794034184970],[413,"Wall 1",1794243059026],[360,"Wall 1",1794035733398],[338,"Wall 1",1794243160461]],
  "Gravity Miner": [[19520,"Cave 7",1793883643279],[3640,"Cave 2",1793883240308],[3460,"Cave 2",1793883355318]],
  "Pogo Bongo": [[39750,"Temple 6",1794591131028],[27000,"Temple 5",1794244036174],[17450,"Temple 4",1794245147518],[17250,"Temple 4",1793975273871],[17250,"Temple 4",1794243310757]],
  "Star Lancer": [[34360,"Stage 3",1793804534156],[5650,"Stage 1",1793889523452],[5200,"Stage 1",1793803127509],[4900,"Stage 1",1793803668390],[1910,"Stage 1",1793803559411]],
  "Summit Soar": [[67744,"Best 785.5 m",1794109622070],[56364,"Best 1263.0 m",1794112419521],[45404,"Best 711.0 m",1794244506148],[45320,"Best 648.0 m",1794244620245],[45142,"Best 704.5 m",1794244360959]]
};
games.forEach(g => { g.top5 = (TOP5[g.name] || []).map(([score, reached, t]) => ({ name: g.by, score, reached, t })); });
// Category for each game (Summit Soar has no mock card yet, so it falls under Other)
const categoryOf = { "Orbit Courier": "Platform", "Sugar Hop": "Platform", "Tower Tumble": "Platform", "Pogo Bongo": "Platform", "Sky Siege": "Shooter", "Star Lancer": "Shooter", "Bit Bot": "Puzzle", "Rampart Rebound": "Puzzle", "Gravity Miner": "Puzzle", "Castle Escape": "Platform", "Graveyard Shift": "Shooter", "Pong": "Classic", "Void Breaker": "Shooter", "Starhold": "Shooter", "Canopy Quest": "Platform", "Looping": "Classic", "Escape the Dungeon": "Puzzle" };
games.forEach(g => g.cat = categoryOf[g.name] || "Other");
let activeCat = "All";

// Pixel-art thumbnails drawn as simple SVG blocks
const sprites = {
  rocket: `<rect x="40" y="10" width="20" height="50" fill="#e8ecff"/><rect x="34" y="30" width="6" height="22" fill="#3fe0ff"/><rect x="60" y="30" width="6" height="22" fill="#3fe0ff"/><rect x="46" y="60" width="8" height="8" fill="#ffd23f"/><rect x="0" y="0" width="0" height="0"/>`,
  kid:    `<rect x="44" y="20" width="12" height="12" fill="#c98b4a"/><rect x="42" y="34" width="16" height="18" fill="#ff4fa3"/><rect x="42" y="52" width="6" height="14" fill="#c98b4a"/><rect x="52" y="52" width="6" height="14" fill="#c98b4a"/><rect x="10" y="72" width="30" height="6" fill="#ffd23f"/><rect x="60" y="66" width="30" height="6" fill="#ffd23f"/>`,
  ship:   `<rect x="44" y="50" width="12" height="8" fill="#3fe0ff"/><rect x="48" y="44" width="4" height="6" fill="#3fe0ff"/><rect x="20" y="16" width="8" height="8" fill="#ffd23f"/><rect x="40" y="12" width="8" height="8" fill="#ffd23f"/><rect x="60" y="16" width="8" height="8" fill="#ffd23f"/><rect x="0" y="76" width="100" height="4" fill="#2a2f4a"/>`,
  tower:  `<rect x="30" y="20" width="40" height="60" fill="#8a90b5"/><rect x="36" y="28" width="8" height="8" fill="#0d0f1a"/><rect x="56" y="28" width="8" height="8" fill="#0d0f1a"/><rect x="46" y="10" width="8" height="10" fill="#7CFF6B"/><rect x="0" y="80" width="100" height="4" fill="#2a2f4a"/>`,
  bot:    `<rect x="0" y="0" width="100" height="100" fill="#050b1f"/><path d="M10 20H90M10 50H90M10 80H90M30 10V90M70 10V90" stroke="#1d4b5a" stroke-width="2"/><rect x="44" y="40" width="12" height="12" fill="#3fe0ff"/><rect x="22" y="22" width="6" height="6" fill="#ffd23f"/><rect x="72" y="72" width="6" height="6" fill="#ff4fa3"/>`,
  wall:   `<rect x="0" y="60" width="100" height="40" fill="#2a2f4a"/><rect x="8" y="48" width="10" height="12" fill="#8a90b5"/><rect x="22" y="48" width="10" height="12" fill="#8a90b5"/><rect x="36" y="40" width="10" height="20" fill="#8a90b5"/><rect x="52" y="48" width="10" height="12" fill="#8a90b5"/><circle cx="72" cy="30" r="5" fill="#ffd23f"/><rect x="60" y="78" width="30" height="6" fill="#3fe0ff"/>`
  ,ski:   `<rect x="0" y="0" width="100" height="100" fill="#0b1a33"/><polygon points="0,40 55,40 100,85 100,100 0,100" fill="#e8ecff"/><rect x="62" y="36" width="8" height="8" fill="#ff4fa3"/><rect x="50" y="46" width="22" height="3" fill="#ffd23f"/>`,
  bell:   `<rect x="0" y="0" width="100" height="100" fill="#07060d"/><rect x="0" y="70" width="100" height="30" fill="#8a3a2a"/><rect x="0" y="70" width="100" height="4" fill="#b9a7a0"/><rect x="74" y="14" width="14" height="14" fill="#ffd23f"/><rect x="30" y="46" width="10" height="24" fill="#e8ecff"/><rect x="28" y="38" width="14" height="10" fill="#c9ced8"/><rect x="54" y="60" width="8" height="8" fill="#ff8a1f"/>`,
  ghost:  `<rect x="0" y="0" width="100" height="100" fill="#0a0710"/><rect x="22" y="60" width="10" height="18" fill="#8a90b5"/><rect x="68" y="56" width="10" height="22" fill="#8a90b5"/><rect x="40" y="20" width="20" height="20" fill="#7CFF6B"/><rect x="44" y="26" width="4" height="4" fill="#0a0710"/><rect x="52" y="26" width="4" height="4" fill="#0a0710"/><rect x="46" y="80" width="8" height="8" fill="#ffd23f"/>`,
  pong:   `<rect x="0" y="0" width="100" height="100" fill="#050611"/><rect x="49" y="6" width="2" height="88" fill="#2a2f4a"/><rect x="10" y="30" width="6" height="24" fill="#e8ecff"/><rect x="84" y="48" width="6" height="24" fill="#e8ecff"/><rect x="60" y="44" width="6" height="6" fill="#ffd23f"/>`,
  rock:   `<rect x="0" y="0" width="100" height="100" fill="#080616"/><polygon points="20,30 40,20 55,32 50,52 28,54" fill="#8a90b5"/><polygon points="64,60 82,56 90,72 76,86 62,78" fill="#8a90b5"/><polygon points="44,86 50,70 56,86" fill="#3fe0ff"/><rect x="49" y="60" width="2" height="8" fill="#ffd23f"/>`,
  leaf:   `<rect x="0" y="0" width="100" height="100" fill="#0b1510"/><rect x="0" y="78" width="100" height="22" fill="#17421f"/><rect x="10" y="54" width="30" height="6" fill="#3a9a4a"/><rect x="56" y="40" width="30" height="6" fill="#3a9a4a"/><rect x="22" y="36" width="8" height="16" fill="#ffd23f"/><rect x="68" y="24" width="8" height="8" fill="#ff4fa3"/>`,
  plane:  `<rect x="0" y="0" width="100" height="100" fill="#10163a"/><rect x="0" y="80" width="100" height="20" fill="#242838"/><rect x="10" y="56" width="12" height="24" fill="#2740a8"/><rect x="26" y="44" width="12" height="36" fill="#7a2aa8"/><rect x="40" y="32" width="26" height="8" fill="#e8352b"/><rect x="62" y="28" width="4" height="16" fill="#ffd23f"/><rect x="76" y="60" width="12" height="12" fill="#e8352b"/>`,
  dungeon: `<rect x="0" y="0" width="100" height="100" fill="#050407"/><rect x="8" y="8" width="84" height="84" fill="#1a1218"/><rect x="24" y="24" width="52" height="52" fill="#2b2029"/><rect x="38" y="38" width="24" height="24" fill="#0f0b10"/><rect x="44" y="40" width="2" height="20" fill="#d4a634"/><rect x="54" y="40" width="2" height="20" fill="#d4a634"/><rect x="44" y="44" width="12" height="2" fill="#d4a634"/><rect x="44" y="50" width="12" height="2" fill="#d4a634"/><rect x="44" y="56" width="12" height="2" fill="#d4a634"/><rect x="12" y="40" width="6" height="6" fill="#ff8a1f"/><rect x="82" y="40" width="6" height="6" fill="#ff8a1f"/>`
};

const sorted = [...games].sort((a, b) => b.plays - a.plays || b.high - a.high);  // ties: higher top score first

// Published game pages (from the games list). Each card opens its game in a new tab.
const gameUrl = {
  "Orbit Courier": "https://claude.ai/artifact/K4CLZtLDsevg1pBgUf9der",
  "Sugar Hop": "https://claude.ai/artifact/T3AxokvkxUFRRKS7PgwddU",
  "Sky Siege": "https://claude.ai/artifact/Qv8M5JR7CrtYcHJkXorD5z",
  "Tower Tumble": "https://claude.ai/artifact/KXL6Ym15ChLFWicP6aPT94",
  "Bit Bot": "https://claude.ai/artifact/3apwaJL1drV3Doty5yLfv9",
  "Rampart Rebound": "https://claude.ai/artifact/1voGYFpgc684847rLwEXzV",
  "Star Lancer": "https://claude.ai/artifact/H2qJgYdP66oabkKgCdzqur",
  "Gravity Miner": "https://claude.ai/artifact/8jiwnxXVmMxuQ9jgSXgTUN",
  "Pogo Bongo": "https://claude.ai/artifact/4j6sBaQNDJ8ohskCePzsQQ",
  "Summit Soar": "https://claude.ai/artifact/UTkWLFEZm8kPDBAmRTByoj",
  "Castle Escape": "https://claude.ai/artifact/W1eQNdTiUDWjcsBBpXfX79",
  "Graveyard Shift": "https://claude.ai/artifact/8fW9QopiSDzq2QFUGpuuvi",
  "Pong": "https://claude.ai/artifact/Ewcenv9Xi4rx72KbptjEzJ",
  "Void Breaker": "https://claude.ai/artifact/LdCQc4y39vKuodfWHKA8bB",
  "Starhold": "https://claude.ai/artifact/VmeNDzo4u2kob5V1u3vbjt",
  "Canopy Quest": "https://claude.ai/artifact/4E9z9HmihVHu6bCL8VGQee",
  "Looping": "https://claude.ai/artifact/5eLSbrQU67nbkNDLKk2mVr",
  "Escape the Dungeon": "https://claude.ai/artifact/NLz3fpiXCbFSgdy5QpoFii"
};

// Ads: set to true once the domain, privacy policy and consent banner are in place
const ADS_ON = false;
document.body.classList.toggle('ads-on', ADS_ON);

// ---------- Home page: game grid, pager, category chips, Surprise me ----------
const grid = document.getElementById('grid');
const pager = document.getElementById('pager');
const chips = document.getElementById('chips');
// 9 cards on desktop (3x3), 6 on mobile and tablet
const perPage = () => window.innerWidth >= 1024 ? 9 : 6;
let page = 0;

function render() {
  if (!grid) return;   // not the home page
  const all = sorted.filter(g => activeCat === "All" || g.cat === activeCat);
  const per = perPage(), pages = Math.max(1, Math.ceil(all.length / per));
  page = Math.min(page, pages - 1);
  const list = all.slice(page * per, (page + 1) * per);
  document.getElementById('introTitle').textContent = activeCat === 'All' ? 'Most played games' : 'Most played: ' + activeCat + ' games';
  grid.innerHTML = list.length ? list.map((g, i) => `
    <article class="card">
      ${gameUrl[g.name] ? `<a class="card-link" data-base="${gameUrl[g.name]}" href="${gameUrl[g.name]}#${document.documentElement.dataset.theme || 'dark'}" target="_blank" rel="noopener" aria-label="Play ${g.name} (opens in a new tab)"></a>` : ''}
      <div class="rank">#${page * per + i + 1} MOST PLAYED</div>
      <h3>${g.name}</h3>
      <div class="row">
        <div class="thumb">
          <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${g.name} thumbnail">${sprites[g.sprite]}</svg>
        </div>
        <p class="desc">${g.desc}</p>
      </div>
      <div class="stats">
        <span>Plays: <b>${g.plays.toLocaleString()}</b></span>
        <span class="hi">High score: <b>${g.high.toLocaleString()}</b></span>
      </div>
    </article>
  `).join('') : '<p class="empty">No games in this category yet.</p>';
  // Ad slot inside the grid, after the 6th card (desktop only, where a page holds 9 cards)
  if (window.innerWidth >= 1024 && list.length > 6) {
    grid.querySelectorAll('.card')[5].insertAdjacentHTML('afterend', '<div class="ad-slot" aria-label="Advertisement"></div>');
  }
  // Prev / Next buttons when there is more than one page
  pager.innerHTML = pages > 1
    ? `<button class="chip" id="prevPg" ${page === 0 ? 'disabled' : ''}>← Prev</button><span class="pg-info">Page ${page + 1} of ${pages}</span><button class="chip" id="nextPg" ${page === pages - 1 ? 'disabled' : ''}>Next →</button>`
    : '';
  if (pages > 1) {
    document.getElementById('prevPg').onclick = () => { page--; render(); window.scrollTo(0, 0); };
    document.getElementById('nextPg').onclick = () => { page++; render(); window.scrollTo(0, 0); };
  }
}

const categories = ["All", "Shooter", "Platform", "Puzzle", "Classic", "Other"];
function drawChips() {
  const btn = c => `<button class="chip ${c === activeCat ? 'on' : ''}" aria-pressed="${c === activeCat}" data-cat="${c}">${c}</button>`;
  chips.innerHTML = btn('All') + '<div class="chip-scroll">' + categories.slice(1).map(c => btn(c)).join('')
    + `<button class="chip surprise" id="surprise">Surprise me</button></div>`;
  chips.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { activeCat = b.dataset.cat; page = 0; drawChips(); chips.querySelector('.chip.on').scrollIntoView({ inline: 'center', block: 'nearest' }); render(); window.scrollTo(0, 0); });
  document.getElementById('surprise').onclick = () => {
    document.getElementById('surprise').classList.add('used');
    const cards = [...grid.querySelectorAll('.card')];
    if (!cards.length) return;
    const prev = cards.find(c => c.classList.contains('pick'));
    cards.forEach(c => c.classList.remove('pick'));
    // Never pick the same card twice in a row, so every click visibly moves
    const pool = cards.length > 1 ? cards.filter(c => c !== prev) : cards;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    pick.classList.add('pick');
    // Scroll so the card sits in the middle of the visible area (also works in embedded views)
    const top = pick.getBoundingClientRect().top + window.scrollY - (window.innerHeight - pick.offsetHeight) / 2;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };
}

// ---------- Leaderboard page: top score per game ----------
let DATA_UPDATED = '14 November 2026';   // change when the numbers are refreshed
const openLb = new Set();   // games whose top 5 is expanded
const fmtDate = t => t ? new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const top5Html = g => (g.top5 && g.top5.length)
  ? '<ol class="top5">' + g.top5.map(e => `<li><b>${(Number(e.score) || 0).toLocaleString()}</b> ${esc(e.name || '–')}${e.reached ? ' · ' + esc(e.reached) : ''}${e.t ? ' · ' + esc(fmtDate(e.t)) : ''}</li>`).join('') + '</ol>'
  : '<p class="lb-note">No scores saved yet.</p>';
// Phones show short forms for big numbers (12.3K, 1.2M) so the table fits; wider screens show every digit
const compactNum = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const isPhone = () => window.innerWidth <= 480;
const fmt = (n, limit) => isPhone() && n >= limit ? compactNum.format(n) : n.toLocaleString();
const fullTip = (n, limit) => isPhone() && n >= limit ? ` title="${n.toLocaleString()}"` : '';
function renderLeaderboard() {
  const body = document.getElementById('lbBody');
  if (!body) return;   // not the leaderboard page
  const theme = document.documentElement.dataset.theme || 'dark';
  body.innerHTML = sorted.map((g, i) => {
    const url = gameUrl[g.name];
    const name = url ? `<a class="lb-link" data-base="${url}" href="${url}#${theme}" target="_blank" rel="noopener">${esc(g.name)}</a>` : esc(g.name);
    const open = openLb.has(g.name);
    const tog = `<button class="lb-tog" data-g="${esc(g.name)}" aria-expanded="${open}" aria-label="Top 5 scores for ${esc(g.name)}">${open ? '▾' : '▸'}</button>`;
    return `<tr><td class="rank">${i + 1}</td><td>${tog}${name}</td><td class="num score"${fullTip(g.high, 1e6)}>${fmt(g.high, 1e6)}</td><td class="num"${fullTip(g.plays, 1e4)}>${fmt(g.plays, 1e4)}</td><td>${esc(g.by || '–')}</td></tr>`
      + (open ? `<tr class="lb-detail"><td colspan="5">${top5Html(g)}</td></tr>` : '');
  }).join('');
  document.getElementById('lbNote').textContent = 'Last updated ' + DATA_UPDATED + '.';
}

// ---------- Live numbers (only when the site runs inside the Claude artifact viewer) ----------
(async () => {
  let db = null;
  try { db = window.claude && await window.claude.use('db'); } catch (e) { db = null; }
  if (!db) return;
  const timer = setTimeout(() => {
    const note = document.getElementById('lbNote');
    if (note) note.textContent = 'Last updated ' + DATA_UPDATED + '. Live data could not be reached, so these are the last saved numbers.';
  }, 10000);
  db.collection('board').onSnapshot(snap => {
    clearTimeout(timer);
    if (snap.empty) return;
    snap.docs.forEach(d => {
      const v = d.data() || {};
      const g = games.find(x => x.name === v.name);
      if (!g) return;
      if (typeof v.plays === 'number') g.plays = v.plays;
      if (typeof v.high === 'number') g.high = v.high;
      if (typeof v.by === 'string') g.by = v.by;
      if (Array.isArray(v.top5)) g.top5 = v.top5.slice(0, 5);
      if (typeof v.updated === 'string') DATA_UPDATED = v.updated;
    });
    sorted.sort((a, b) => b.plays - a.plays || b.high - a.high);
    render();
    renderLeaderboard();
  }, () => { clearTimeout(timer); });
})();

const lbBody = document.getElementById('lbBody');
if (lbBody) {
  renderLeaderboard();
  lbBody.addEventListener('click', e => {
    const b = e.target.closest('.lb-tog');
    if (!b) return;
    const n = b.dataset.g;
    if (openLb.has(n)) openLb.delete(n); else openLb.add(n);
    renderLeaderboard();
  });
}
let lbPhone = isPhone();
window.addEventListener('resize', () => { if (isPhone() !== lbPhone) { lbPhone = isPhone(); renderLeaderboard(); } });

// ---------- Home page start-up ----------
if (grid) {
  drawChips();
  render();
  // Only re-render when the page size changes (mobile address bar fires resize while scrolling)
  let lastPer = perPage();
  window.addEventListener('resize', () => { const p = perPage(); if (p !== lastPer) { lastPer = p; render(); } });
}

// ---------- Light/dark mode: always opens dark; the toggle lasts only while the page is open ----------
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
function applyTheme(t) {
  root.dataset.theme = t;
  // Pass the choice to each game link, so the game opens in the same mode
  document.querySelectorAll('.card-link, .lb-link').forEach(a => a.href = a.dataset.base + '#' + t);
  // Sun shows in dark mode (click for light), moon shows in light mode (click for dark)
  const ICON_ATTR = 'width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';
  toggle.innerHTML = t === 'light'
    ? `<svg ${ICON_ATTR}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>`
    : `<svg ${ICON_ATTR}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>`;
  toggle.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
}
// Always open in dark mode; the toggle still switches light and dark during the visit
applyTheme('dark');
toggle.onclick = () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
};

// ---------- Contact form: sends the message through Web3Forms, which emails it to the inbox linked to the key ----------
const WEB3FORMS_KEY = '96b7c327-46cb-4714-813d-b45d286eaba6';   // public form key; the inbox is set on web3forms.com
const CONTACT_EMAIL = 'louie1066@gmail.com';   // temporary address; replace when the real one is chosen
const cf = id => document.getElementById(id);
function cfSet(id, errId, text) {
  cf(errId).textContent = text;
  cf(id).closest('.field').classList.toggle('bad', !!text);
  cf(id).setAttribute('aria-invalid', text ? 'true' : 'false');
  return !text;
}
// Small pop-up that closes on its own after a few seconds, or with its × button (top right)
function showToast(text) {
  const old = document.getElementById('toast');
  if (old) old.remove();
  const t = document.createElement('div');
  t.id = 'toast';
  t.className = 'toast';
  t.setAttribute('role', 'status');
  const msg = document.createElement('span');
  msg.textContent = text;
  const x = document.createElement('button');
  x.type = 'button';
  x.className = 'toast-x';
  x.setAttribute('aria-label', 'Close message');
  x.textContent = '×';
  t.append(msg, x);
  document.body.appendChild(t);
  const close = () => t.remove();
  x.addEventListener('click', close);
  setTimeout(close, 6000);
}
function sendContact() {
  const name = cf('cfName').value.replace(/\s+/g, ' ').trim();
  const email = cf('cfEmail').value.trim();
  const topic = cf('cfTopic').value;
  const msg = cf('cfMsg').value.trim();
  const status = cf('cfStatus');
  const okName = cfSet('cfName', 'eName', name ? '' : 'Please enter your name.');
  const okEmail = cfSet('cfEmail', 'eEmail', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? '' : 'Please enter a valid email address.');
  const okMsg = cfSet('cfMsg', 'eMsg', msg.length >= 10 ? '' : 'Please write at least 10 characters.');
  if (!(okName && okEmail && okMsg)) {
    status.textContent = '';
    cf(!okName ? 'cfName' : !okEmail ? 'cfEmail' : 'cfMsg').focus();
    return;
  }
  if (cf('cfHp').value) { status.textContent = 'Thanks! Your message has been sent.'; return; }   // hidden spam-trap field was filled: do nothing
  const btn = cf('cfSend');
  btn.disabled = true;
  status.textContent = 'Sending...';
  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: '[Pixel Pit] ' + topic + ' from ' + name,
      from_name: 'Pixel Pit contact form',
      name: name,
      email: email,
      replyto: email,
      topic: topic,
      message: msg
    })
  })
    .then(r => r.json())
    .then(d => {
      if (!d.success) throw new Error(d.message || 'failed');
      status.textContent = 'Thanks! Your message has been sent.';
      showToast('Thanks! Your message has been sent.');
      cf('cfName').value = ''; cf('cfEmail').value = ''; cf('cfMsg').value = '';
      cf('cfCount').textContent = '0 / 1000';
    })
    .catch(() => {
      status.textContent = 'Sorry, the message did not send. Please try again, or email ' + CONTACT_EMAIL + '.';
    })
    .finally(() => { btn.disabled = false; });
}
if (cf('cfSend')) {
  cf('cfMsg').addEventListener('input', () => { cf('cfCount').textContent = cf('cfMsg').value.length + ' / 1000'; });
  cf('cfSend').addEventListener('click', sendContact);
  ['cfName', 'cfEmail'].forEach(id => cf(id).addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); sendContact(); } }));
}

// ---------- Mobile: hide header on scroll down, show on scroll up (every page) ----------
const header = document.getElementById('siteHeader');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
  if (window.innerWidth >= 720) { header.classList.remove('hidden'); return; }
  const y = window.scrollY;
  if (y > lastY && y > 80) header.classList.add('hidden');
  else header.classList.remove('hidden');
  lastY = y;
}, { passive: true });
