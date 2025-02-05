function StartScreen({ totalNoOfQuestions, dispatch }) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Welcome th The React Quiz!</h2>
      <h3> {totalNoOfQuestions} questions to test your React mastery</h3>
      <button className="btn " onClick={() => dispatch({ type: "START_QUIZ" })}>
        Let&lsquo;s start!
      </button>
    </div>
  );
}

export default StartScreen;
