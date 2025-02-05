function FinishScreen({ points, maxScore, highScore }) {
  const percentage = ((points / maxScore) * 100).toFixed(2);

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage > 0 && percentage < 50) emoji = "🥲";
  if (percentage === 0) emoji = "🙅";

  return (
    <div>
      <p className="result">
        <span>{emoji}</span> You have scored <strong>{points}</strong> points
        out of {maxScore} ({percentage} %)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
    </div>
  );
}

export default FinishScreen;
