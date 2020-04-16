# Wavify – Music Player

A sleek music player UI with a playlist, progress bar, shuffle/repeat controls, and a spinning vinyl album art animation. Built with vanilla JavaScript.

## Features

- Play, pause, next, previous controls
- Clickable progress bar with seek functionality
- Live current time and duration display
- Shuffle mode — randomizes next track
- Repeat mode — loops current track
- Spinning vinyl animation while playing
- Clickable playlist with active track highlight
- Volume slider
- Keyboard shortcuts — Space to play/pause, Arrow keys to skip

## Tech Stack

- HTML5
- CSS3 (animations, glassmorphism, CSS Grid)
- Vanilla JavaScript (setInterval for progress simulation)

## Getting Started

```bash
git clone https://github.com/saheerc/music-player.git
cd music-player
open index.html
```

## Note

This is a UI-only player — it simulates playback using a timer. To wire up real audio, replace the progress interval with an HTML5 `<audio>` element and point `src` to actual audio files.

## Screenshots

![Wavify Player](https://picsum.photos/seed/music-player-ss/700/450)

## Project Structure

```
music-player/
├── index.html
├── style.css
└── app.js
```

---

Built with HTML, CSS & JavaScript
