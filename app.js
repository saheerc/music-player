const tracks = [
  { title: 'Midnight Dreams',   artist: 'The Coastal',    album: 'Summer Sessions',  duration: '3:24', seed: 'music-cover-1' },
  { title: 'Golden Hour',       artist: 'Aurelia',         album: 'Sunlit',           duration: '4:12', seed: 'music-cover-2' },
  { title: 'Neon Rain',         artist: 'Voltex',          album: 'Cityscape',        duration: '3:55', seed: 'music-cover-3' },
  { title: 'Deep Blue',         artist: 'Oceanic',         album: 'Beneath',          duration: '5:01', seed: 'music-cover-4' },
  { title: 'Wander',            artist: 'The Nomads',      album: 'Open Road',        duration: '3:38', seed: 'music-cover-5' },
  { title: 'Starfall',          artist: 'Lunar Echo',      album: 'Cosmos',           duration: '4:44', seed: 'music-cover-6' },
];

let current = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;
let progress = 0;
let progressInterval = null;

function durationToSec(d) {
  const [m, s] = d.split(':').map(Number);
  return m * 60 + s;
}
function secToStr(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

function loadTrack(index) {
  const t = tracks[index];
  document.getElementById('track-title').textContent = t.title;
  document.getElementById('track-artist').textContent = t.artist;
  document.getElementById('track-album').textContent = t.album;
  document.getElementById('duration').textContent = t.duration;
  document.getElementById('cover-img').src = `https://picsum.photos/seed/${t.seed}/300/300`;
  document.getElementById('track-counter').textContent = `${index + 1} / ${tracks.length}`;
  document.getElementById('current-time').textContent = '0:00';
  document.getElementById('progress-fill').style.width = '0%';
  document.getElementById('progress-thumb').style.left = '0%';
  progress = 0;
  renderPlaylist();
}

function togglePlay() {
  isPlaying = !isPlaying;
  document.getElementById('play-btn').textContent = isPlaying ? '⏸' : '▶';
  document.getElementById('album-art').classList.toggle('playing', isPlaying);
  if (isPlaying) {
    const total = durationToSec(tracks[current].duration);
    progressInterval = setInterval(() => {
      progress += 1;
      if (progress >= total) { nextTrack(); return; }
      const pct = (progress / total) * 100;
      document.getElementById('progress-fill').style.width = pct + '%';
      document.getElementById('progress-thumb').style.left = pct + '%';
      document.getElementById('current-time').textContent = secToStr(progress);
    }, 1000);
  } else {
    clearInterval(progressInterval);
  }
}

function nextTrack() {
  clearInterval(progressInterval);
  isPlaying = false;
  current = isShuffle
    ? Math.floor(Math.random() * tracks.length)
    : (current + 1) % tracks.length;
  loadTrack(current);
  togglePlay();
}

function prevTrack() {
  clearInterval(progressInterval);
  isPlaying = false;
  current = (current - 1 + tracks.length) % tracks.length;
  loadTrack(current);
  togglePlay();
}

function seek(e) {
  const bar = document.getElementById('progress-bar');
  const pct = e.offsetX / bar.offsetWidth;
  const total = durationToSec(tracks[current].duration);
  progress = Math.floor(pct * total);
  document.getElementById('progress-fill').style.width = (pct * 100) + '%';
  document.getElementById('progress-thumb').style.left = (pct * 100) + '%';
  document.getElementById('current-time').textContent = secToStr(progress);
}

function setVolume(val) {}

function toggleShuffle() {
  isShuffle = !isShuffle;
  document.getElementById('btn-shuffle').classList.toggle('active', isShuffle);
}

function toggleRepeat() {
  isRepeat = !isRepeat;
  document.getElementById('btn-repeat').classList.toggle('active', isRepeat);
}

function renderPlaylist() {
  const list = document.getElementById('track-list');
  list.innerHTML = tracks.map((t, i) => `
    <li class="track-item ${i === current ? 'active' : ''}" onclick="selectTrack(${i})">
      <span class="track-num">${i === current && isPlaying ? '♪' : i + 1}</span>
      <img class="track-thumb" src="https://picsum.photos/seed/${t.seed}/80/80" alt="${t.title}" />
      <div class="track-meta">
        <strong>${t.title}</strong>
        <span>${t.artist}</span>
      </div>
      <span class="track-duration">${t.duration}</span>
    </li>
  `).join('');
}

function selectTrack(index) {
  clearInterval(progressInterval);
  isPlaying = false;
  current = index;
  loadTrack(index);
  togglePlay();
}

document.addEventListener('keydown', e => {
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.key === 'ArrowRight') nextTrack();
  if (e.key === 'ArrowLeft') prevTrack();
});

loadTrack(0);
