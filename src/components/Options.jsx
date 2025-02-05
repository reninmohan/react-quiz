function Options({ options, dispatch, answer, correctOption }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          } `}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "SUBMIT_ANSWER", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
