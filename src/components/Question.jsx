import Options from "./Options";

function Question({ currentQuestion, dispatch, answer }) {
  const { question, options, correctOption } = currentQuestion;
  return (
    <div>
      <h4>{question}</h4>
      <Options
        options={options}
        dispatch={dispatch}
        answer={answer}
        correctOption={correctOption}
      />
    </div>
  );
}

export default Question;
