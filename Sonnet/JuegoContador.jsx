import { useState, useEffect, useRef, useCallback } from "react";

const COUNTDOWN_STEPS = ["Preparados", "Listos", "¡Ya!"];
const GAME_DURATION = 5;

const PHASE = {
  IDLE: "idle",
  COUNTDOWN: "countdown",
  PLAYING: "playing",
  FINISHED: "finished",
};

function useGameTimer(phase, setPhase, setTimeLeft, setClicks, setMaxScore, clicks) {
  const intervalRef = useRef(null);

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startPlayingTimer = useCallback(() => {
    let remaining = GAME_DURATION;
    setTimeLeft(remaining);
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      setTimeLeft(remaining);
      if (remaining <= 0) {
        clearTimer();
        setPhase(PHASE.FINISHED);
        setMaxScore((prev) => Math.max(prev, clicks.current));
      }
    }, 1000);
  }, [setPhase, setTimeLeft, setMaxScore, clicks]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  return { clearTimer, startPlayingTimer };
}

export default function JuegoContador() {
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [countdownStep, setCountdownStep] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [maxScore, setMaxScore] = useState(0);
  const [pulse, setPulse] = useState(false);

  const clicksRef = useRef(0);

  const handleClick = useCallback(() => {
    clicksRef.current += 1;
    setClicks(clicksRef.current);
    setPulse(true);
    setTimeout(() => setPulse(false), 80);
  }, []);

  const { clearTimer, startPlayingTimer } = useGameTimer(
    phase,
    setPhase,
    setTimeLeft,
    setClicks,
    setMaxScore,
    clicksRef
  );

  const startGame = useCallback(() => {
    clearTimer();
    clicksRef.current = 0;
    setClicks(0);
    setTimeLeft(GAME_DURATION);
    setCountdownStep(0);
    setPhase(PHASE.COUNTDOWN);

    let step = 0;
    const countdownInterval = setInterval(() => {
      step += 1;
      setCountdownStep(step);
      if (step >= COUNTDOWN_STEPS.length - 1) {
        clearInterval(countdownInterval);
        setPhase(PHASE.PLAYING);
        startPlayingTimer();
      }
    }, 1000);
  }, [clearTimer, startPlayingTimer]);

  const isIdle = phase === PHASE.IDLE;
  const isCountdown = phase === PHASE.COUNTDOWN;
  const isPlaying = phase === PHASE.PLAYING;
  const isFinished = phase === PHASE.FINISHED;

  const beatMax = isFinished && clicks > 0 && clicks >= maxScore;
  const timerUrgent = isPlaying && timeLeft <= 2;

  return (
    <div style={{ fontFamily: "'Georgia', serif", padding: "1.5rem 1rem", maxWidth: 480, margin: "0 auto" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h1 style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: "-0.5px",
          color: "var(--color-text-primary)",
          margin: 0,
          fontFamily: "'Georgia', serif",
        }}>
          Juego<span style={{ color: "#D85A30" }}>Contador</span>
        </h1>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "4px 0 0", fontFamily: "var(--font-sans)" }}>
          ¿Cuántos clicks podés hacer en 5 segundos?
        </p>
      </div>

      {/* Score Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
        <div style={{
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          padding: "1rem",
          textAlign: "center",
        }}>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: 1 }}>
            Clicks actuales
          </p>
          <p style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            color: isPlaying ? "#D85A30" : "var(--color-text-primary)",
            transition: "color 0.2s",
            transform: pulse ? "scale(1.12)" : "scale(1)",
            display: "inline-block",
            transition: "transform 0.08s ease",
          }}>
            {clicks}
          </p>
        </div>
        <div style={{
          background: "var(--color-background-secondary)",
          borderRadius: "var(--border-radius-lg)",
          padding: "1rem",
          textAlign: "center",
          border: beatMax ? "1.5px solid #1D9E75" : "none",
          transition: "border 0.3s",
        }}>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px", fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: 1 }}>
            Puntaje máximo
          </p>
          <p style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            color: beatMax ? "#1D9E75" : "var(--color-text-primary)",
            transition: "color 0.3s",
          }}>
            {maxScore}
          </p>
        </div>
      </div>

      {/* Timer Bar */}
      <div style={{
        background: "var(--color-background-secondary)",
        borderRadius: "var(--border-radius-md)",
        height: 8,
        marginBottom: "1.5rem",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: "var(--border-radius-md)",
          background: timerUrgent ? "#E24B4A" : "#D85A30",
          width: isPlaying ? `${(timeLeft / GAME_DURATION) * 100}%` : isIdle || isFinished ? "0%" : "100%",
          transition: isPlaying ? "width 1s linear, background 0.3s" : "none",
        }} />
      </div>

      {/* Central Stage */}
      <div style={{
        background: "var(--color-background-primary)",
        border: "0.5px solid var(--color-border-tertiary)",
        borderRadius: "var(--border-radius-lg)",
        padding: "1.5rem",
        textAlign: "center",
        marginBottom: "1.5rem",
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}>
        {isIdle && (
          <p style={{ fontSize: 15, color: "var(--color-text-secondary)", margin: 0, fontFamily: "var(--font-sans)" }}>
            Presioná <strong style={{ color: "var(--color-text-primary)" }}>Iniciar</strong> cuando estés listo
          </p>
        )}
        {isCountdown && (
          <>
            <p style={{
              fontSize: 42,
              fontWeight: 700,
              margin: 0,
              color: countdownStep === 2 ? "#D85A30" : "var(--color-text-primary)",
              letterSpacing: "-1px",
              animation: "pop 0.3s ease",
            }}>
              {COUNTDOWN_STEPS[countdownStep]}
            </p>
          </>
        )}
        {isPlaying && (
          <>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, fontFamily: "var(--font-sans)", textTransform: "uppercase", letterSpacing: 1 }}>
              Tiempo restante
            </p>
            <p style={{
              fontSize: 56,
              fontWeight: 700,
              margin: 0,
              color: timerUrgent ? "#E24B4A" : "var(--color-text-primary)",
              transition: "color 0.3s",
              fontFamily: "'Georgia', serif",
            }}>
              {timeLeft}s
            </p>
          </>
        )}
        {isFinished && (
          <>
            {beatMax ? (
              <>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#1D9E75" }}>Nuevo récord</p>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, fontFamily: "var(--font-sans)" }}>
                  ¡{clicks} clicks! Superaste tu marca anterior.
                </p>
              </>
            ) : (
              <>
                <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "var(--color-text-primary)" }}>¡Tiempo!</p>
                <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, fontFamily: "var(--font-sans)" }}>
                  Hiciste {clicks} click{clicks !== 1 ? "s" : ""}. ¿Podés mejorar?
                </p>
              </>
            )}
          </>
        )}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* Click Button */}
        <button
          onClick={handleClick}
          disabled={!isPlaying}
          style={{
            width: "100%",
            padding: "1.2rem",
            fontSize: 18,
            fontWeight: 700,
            fontFamily: "'Georgia', serif",
            letterSpacing: "-0.3px",
            borderRadius: "var(--border-radius-lg)",
            border: "none",
            cursor: isPlaying ? "pointer" : "not-allowed",
            background: isPlaying ? "#D85A30" : "var(--color-background-secondary)",
            color: isPlaying ? "#fff" : "var(--color-text-tertiary)",
            transition: "background 0.2s, transform 0.08s, color 0.2s",
            transform: pulse && isPlaying ? "scale(0.97)" : "scale(1)",
            userSelect: "none",
          }}
        >
          {isPlaying ? "¡CLICK!" : "Click"}
        </button>

        {/* Start Button */}
        <button
          onClick={startGame}
          disabled={isCountdown || isPlaying}
          style={{
            width: "100%",
            padding: "0.8rem",
            fontSize: 15,
            fontWeight: 500,
            fontFamily: "var(--font-sans)",
            borderRadius: "var(--border-radius-lg)",
            border: "0.5px solid var(--color-border-secondary)",
            cursor: isCountdown || isPlaying ? "not-allowed" : "pointer",
            background: isCountdown || isPlaying ? "var(--color-background-secondary)" : "var(--color-background-primary)",
            color: isCountdown || isPlaying ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          {isFinished ? "Jugar de nuevo" : "Iniciar"}
        </button>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.85); opacity: 0.5; }
          60% { transform: scale(1.06); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
