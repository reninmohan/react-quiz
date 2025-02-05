import { useEffect } from "react";
function Timer({ secondsRemaing, dispatch }) {
  const min = Math.floor(secondsRemaing / 60);
  const seconds = secondsRemaing % 60;
  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: "DECREMENT_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 && 0}
      {min}:{seconds < 10 && 0}
      {seconds}
    </div>
  );
}

export default Timer;
