"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./arcade.module.css";

const COLUMNS = 22;
const ROWS = 16;
const CELL = 24;
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};
const INITIAL_DIRECTION = DIRECTIONS.ArrowRight;

function initialGame(mode = "ready") {
  return {
    snake: [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }],
    food: { x: 14, y: 8 },
    score: 0,
    mode,
  };
}

function findFood(snake) {
  const taken = new Set(snake.map((part) => part.x + ":" + part.y));
  const available = [];
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLUMNS; x++) {
      if (!taken.has(x + ":" + y)) available.push({ x, y });
    }
  }
  return available.length
    ? available[Math.floor(Math.random() * available.length)]
    : null;
}

export default function ArcadePage() {
  const [game, setGame] = useState(() => initialGame());
  const [best, setBest] = useState(0);
  const direction = useRef(INITIAL_DIRECTION);
  const lastMove = useRef(INITIAL_DIRECTION);
  const turnLocked = useRef(false);

  useEffect(() => {
    try {
      setBest(Number(window.localStorage.getItem("hulax-snake-best") || 0));
    } catch {
      // The game still works if local storage is disabled.
    }
  }, []);

  useEffect(() => {
    if (game.score <= best) return;
    setBest(game.score);
    try {
      window.localStorage.setItem("hulax-snake-best", String(game.score));
    } catch {
      // Optional local high score.
    }
  }, [game.score, best]);

  const reset = useCallback((play = false) => {
    direction.current = INITIAL_DIRECTION;
    lastMove.current = INITIAL_DIRECTION;
    turnLocked.current = false;
    setGame(initialGame(play ? "playing" : "ready"));
  }, []);

  const toggle = useCallback(() => {
    setGame((current) => {
      if (current.mode === "playing") return { ...current, mode: "paused" };
      if (current.mode === "paused" || current.mode === "ready")
        return { ...current, mode: "playing" };
      direction.current = INITIAL_DIRECTION;
      lastMove.current = INITIAL_DIRECTION;
      turnLocked.current = false;
      return initialGame("playing");
    });
  }, []);

  const changeDirection = useCallback((newDirection) => {
    if (!newDirection || turnLocked.current) return;
    const previous = lastMove.current;
    if (previous.x + newDirection.x === 0 && previous.y + newDirection.y === 0) return;
    direction.current = newDirection;
    turnLocked.current = true;
    setGame((current) => current.mode === "ready" ? { ...current, mode: "playing" } : current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (event.key === " " || event.key === "Enter") {
        if (event.key === " " || target === document.body) {
          event.preventDefault();
          toggle();
        }
        return;
      }
      const move = DIRECTIONS[event.key] || DIRECTIONS[event.key.toLowerCase()];
      if (move) {
        event.preventDefault();
        changeDirection(move);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, toggle]);

  useEffect(() => {
    if (game.mode !== "playing") return;
    const delay = Math.max(75, 150 - Math.floor(game.score / 3) * 9);
    const timer = window.setInterval(() => {
      setGame((current) => {
        if (current.mode !== "playing") return current;
        const delta = direction.current;
        lastMove.current = delta;
        turnLocked.current = false;
        const head = {
          x: current.snake[0].x + delta.x,
          y: current.snake[0].y + delta.y,
        };
        const eating = head.x === current.food.x && head.y === current.food.y;
        const body = eating ? current.snake : current.snake.slice(0, -1);
        const crash = head.x < 0 || head.y < 0 || head.x >= COLUMNS || head.y >= ROWS
          || body.some((part) => part.x === head.x && part.y === head.y);
        if (crash) return { ...current, mode: "gameover" };
        const snake = [head, ...current.snake].slice(0, current.snake.length + (eating ? 1 : 0));
        if (!eating) return { ...current, snake };
        const food = findFood(snake);
        if (!food) return { ...current, snake, food: null, score: current.score + 10, mode: "won" };
        return { ...current, snake, food, score: current.score + 10 };
      });
    }, delay);
    return () => window.clearInterval(timer);
  }, [game.mode, game.score]);

  const message = {
    ready: ["SYSTEM READY", "Collect data packets. Avoid walls and your own trail."],
    paused: ["PAUSED", "Press Space or Resume to continue."],
    gameover: ["GAME OVER", "Every failed experiment is a chance to iterate."],
    won: ["BOARD CLEARED", "You turned every cell into a successful deploy."],
  }[game.mode];

  return (
    <main className={styles.page}>
      <div className={styles.aurora} aria-hidden="true" />
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <a href="/" className={styles.back}>← RETURN TO PORTFOLIO</a>
          <a href="https://github.com/HuLaxx" className={styles.github} target="_blank" rel="noreferrer">GITHUB / HULAXX ↗</a>
        </header>

        <section className={styles.intro}>
          <span className={styles.eyebrow}><span className={styles.signal} /> HULAX LABS / INTERACTIVE EXPERIMENT 001</span>
          <h1>THE <span>NEURAL SNAKE</span></h1>
          <p>One little arcade experiment built at the intersection of code and play. Your mission: collect the glowing data packets without crashing the pipeline.</p>
        </section>

        <section className={styles.gamePanel} aria-label="Playable snake game">
          <div className={styles.statusbar}>
            <div className={styles.metric}><span>PACKETS PROCESSED</span><strong>{String(game.score).padStart(3, "0")}</strong></div>
            <div className={styles.metric}><span>PERSONAL BEST</span><strong>{String(best).padStart(3, "0")}</strong></div>
            <div className={styles.state}><span className={game.mode === "playing" ? styles.activeLight : styles.idleLight} /> {game.mode === "playing" ? "SYSTEM LIVE" : game.mode.toUpperCase()}</div>
          </div>

          <div className={styles.boardFrame}>
            <svg
              className={styles.board}
              viewBox={"0 0 " + COLUMNS * CELL + " " + ROWS * CELL}
              role="img"
              aria-label={"Snake board, score " + game.score + ". " + (message ? message[0] : "Playing")}
            >
              <defs>
                <pattern id="snakeGrid" width={CELL} height={CELL} patternUnits="userSpaceOnUse">
                  <rect width={CELL} height={CELL} fill="#0b1528" />
                  <path d={"M" + CELL + " 0H0V" + CELL} stroke="#1d314c" strokeWidth=".65" fill="none" />
                </pattern>
                <radialGradient id="foodGlow"><stop stopColor="#ffdee8" /><stop offset=".4" stopColor="#fb7185" /><stop offset="1" stopColor="#f43f5e" /></radialGradient>
              </defs>
              <rect x="0" y="0" width={COLUMNS * CELL} height={ROWS * CELL} fill="url(#snakeGrid)" />
              {game.food && (
                <g>
                  <circle cx={game.food.x * CELL + CELL / 2} cy={game.food.y * CELL + CELL / 2} r="10" fill="#fb7185" opacity=".24" />
                  <circle cx={game.food.x * CELL + CELL / 2} cy={game.food.y * CELL + CELL / 2} r="5.8" fill="url(#foodGlow)" />
                </g>
              )}
              {game.snake.map((part, index) => (
                <rect
                  key={part.x + ":" + part.y}
                  x={part.x * CELL + 2.3}
                  y={part.y * CELL + 2.3}
                  width={CELL - 4.6}
                  height={CELL - 4.6}
                  rx={index === 0 ? 7 : 5}
                  fill={index === 0 ? "#b6fff2" : index < 4 ? "#59e4d0" : "#28a4b8"}
                  stroke={index === 0 ? "#ffffff" : "#3ffbd6"}
                  strokeOpacity={index === 0 ? ".8" : ".25"}
                  strokeWidth=".7"
                  opacity={Math.max(.53, 1 - index * .022)}
                />
              ))}
            </svg>
            {message && (
              <div className={styles.overlay}>
                <div className={styles.overlayBox}>
                  <span className={styles.overlaySmall}>[ HULAX // TERMINAL ]</span>
                  <h2>{message[0]}</h2>
                  <p>{message[1]}</p>
                  <button onClick={toggle}>{game.mode === "paused" ? "RESUME MISSION ↗" : game.mode === "ready" ? "START GAME ↗" : "TRY AGAIN ↗"}</button>
                </div>
              </div>
            )}
          </div>

          <div className={styles.toolbar}>
            <div className={styles.toolbarText}>MOVE <kbd>↑</kbd><kbd>←</kbd><kbd>↓</kbd><kbd>→</kbd> OR <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> · <kbd>SPACE</kbd> PAUSE</div>
            <div className={styles.actions}>
              <button onClick={toggle} className={styles.primary}>{game.mode === "playing" ? "Ⅱ PAUSE" : game.mode === "paused" ? "▶ RESUME" : "▶ PLAY"}</button>
              <button onClick={() => reset(false)} className={styles.secondary}>↺ RESTART</button>
            </div>
          </div>
        </section>

        <div className={styles.touch} aria-label="Touch controls">
          <span>TOUCH CONTROLS</span>
          <div><button aria-label="Move up" onClick={() => changeDirection(DIRECTIONS.ArrowUp)}>↑</button></div>
          <div>
            <button aria-label="Move left" onClick={() => changeDirection(DIRECTIONS.ArrowLeft)}>←</button>
            <button aria-label="Move down" onClick={() => changeDirection(DIRECTIONS.ArrowDown)}>↓</button>
            <button aria-label="Move right" onClick={() => changeDirection(DIRECTIONS.ArrowRight)}>→</button>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>BUILT BY RAHUL KHANKE · CODE IS A PLAYGROUND.</span>
          <a href="https://github.com/HuLaxx/HuLaxx" target="_blank" rel="noreferrer">EXPLORE THE GITHUB PROFILE ↗</a>
        </footer>
      </div>
    </main>
  );
}
