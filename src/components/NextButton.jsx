function NextButton({ dispatch, answer, index, totalNoOfQuestions }) {
  if (answer === null) return null;

  if (index < totalNoOfQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "NEXT_QUESTION" })}
      >
        Next
      </button>
    );

  if (index === totalNoOfQuestions - 1)
    return (
      <button
        className="btn"
        onClick={() => dispatch({ type: "QUIZ_FINISHED" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
