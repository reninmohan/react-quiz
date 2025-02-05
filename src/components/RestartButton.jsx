function RestartButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "RESTART_QUIZ" })}
    >
      Restart Quiz
    </button>
  );
}

export default RestartButton;
