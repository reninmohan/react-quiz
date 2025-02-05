import { useEffect } from "react";
import { useReducer } from "react";
import "./index.css";

import Main from "./components/Main";
import Header from "./components/Header";
import Error from "./components/Error";
import Loader from "./components/Loader";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import ProgressBar from "./components/ProgressBar";
import FinishScreen from "./components/FinishScreen";
import RestartButton from "./components/RestartButton";
import Timer from "./components/Timer";
import Footer from "./components/Footer";

const SECONDPERQUESTION = 30;

const initialState = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  currentQuestion: 0,
  points: 0,
  answer: null,
  highScore: 0,
  secondsRemaing: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "DATA_RECEIVED":
      return { ...state, questions: action.payload, status: "ready" };

    case "DATA_RECEIVED_FAILED":
      return { ...state, status: "error" };

    case "START_QUIZ":
      return { ...state, status: "active", secondsRemaing: state.questions.length * SECONDPERQUESTION };

    case "SUBMIT_ANSWER": {
      const question = state.questions.at(state.currentQuestion);

      return {
        ...state,
        answer: action.payload,
        points: question.correctOption === action.payload ? state.points + question.points : state.points,
      };
    }

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        answer: null,
      };

    case "QUIZ_FINISHED": {
      const hasMadeHighScore = state.points > state.highScore;
      console.log(hasMadeHighScore);
      return {
        ...state,
        status: "finished",
        highScore: hasMadeHighScore ? state.points : state.highScore,
      };
    }

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore,
        question: state.questions,
        status: "ready",
      };

    case "DECREMENT_TIMER":
      return {
        ...state,
        secondsRemaing: state.secondsRemaing - 1,
        status: state.secondsRemaing === 0 ? "finished" : "active",
      };

    default:
      throw new Error("Unknown action type.");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, currentQuestion: index, answer, points, highScore, secondsRemaing } = state;
  const totalNoOfQuestions = questions.length;
  const maxScore = questions.reduce((acc, question) => question.points + acc, 0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/questions");
        if (!response.ok) {
          throw new Error("Unable to fetch question, check if the serve is running.");
        }
        const questions = await response.json();
        dispatch({ type: "DATA_RECEIVED", payload: questions });
      } catch (err) {
        dispatch({ type: "DATA_RECEIVED_FAILED" });
        console.error("Error fetching questions", err);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen totalNoOfQuestions={totalNoOfQuestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <ProgressBar
              totalNoOfQuestions={totalNoOfQuestions}
              maxScore={maxScore}
              index={index}
              points={points}
              answer={answer}
            />
            <Question currentQuestion={questions[index]} dispatch={dispatch} answer={answer} />
            <Footer>
              <Timer secondsRemaing={secondsRemaing} dispatch={dispatch} />
              <NextButton dispatch={dispatch} answer={answer} index={index} totalNoOfQuestions={totalNoOfQuestions} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxScore={maxScore}
              index={index}
              totalNoOfQuestions={totalNoOfQuestions}
              highScore={highScore}
            />
            <RestartButton dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
