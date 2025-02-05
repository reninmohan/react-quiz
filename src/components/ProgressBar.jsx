function ProgressBar({ totalNoOfQuestions, maxScore, index, points, answer }) {
  return (
    <header className="progress">
      <progress max={totalNoOfQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong> / {totalNoOfQuestions}
      </p>
      <p>
        <strong>{points}</strong>/ {maxScore} points
      </p>
    </header>
  );
}

export default ProgressBar;
