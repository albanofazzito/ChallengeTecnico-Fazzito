import { useState, useEffect } from "react";

export default function JuegoContador() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [status, setStatus] = useState("idle");
  const [countdownText, setCountdownText] = useState("");

  useEffect(() => {
    let timer;

    if (status === "go" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0 && status === "go") {
      endGame();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, status]);

  const startGame = () => {
    setStatus("preparing");
    setCountdownText("Preparados");

    setTimeout(() => {
      setCountdownText("Listos");
    }, 1000);

    setTimeout(() => {
      setCountdownText("Ya");
    }, 2000);

    setTimeout(() => {
      setStatus("go");
      setIsPlaying(true);
      setCount(0);
      setTimeLeft(5);
      setCountdownText("");
    }, 3000);
  };

  const handleClick = () => {
    if (isPlaying) {
      setCount((prev) => prev + 1);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setStatus("finished");

    if (count > maxScore) {
      setMaxScore(count);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Juego Contador</h1>

      <h2>Récord: {maxScore}</h2>

      {status === "preparing" && <h2>{countdownText}</h2>}

      {status === "go" && (
        <>
          <h2>Tiempo restante: {timeLeft}s</h2>
          <h2>Clicks: {count}</h2>
        </>
      )}

      {status === "finished" && <h2>Resultado: {count}</h2>}

      <button onClick={startGame} disabled={isPlaying || status === "preparing"}>
        Iniciar
      </button>

      <button onClick={handleClick} disabled={!isPlaying}>
        Click!
      </button>
    </div>
  );
}