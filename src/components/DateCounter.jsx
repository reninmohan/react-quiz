import { useReducer } from "react";

const initialState = {
  count: 0,
  step: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT_COUNT":
      return { ...state, count: state.count + state.step };

    case "DECREMENT_COUNT":
      return { ...state, count: state.count - state.step };

    case "DEFINE_COUNT":
      return { ...state, count: action.payload };

    case "DEFINE_STEP":
      return { ...state, step: action.payload };

    case "RESET":
      return { ...initialState };

    default:
      throw new Error("Unknown action type");
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "DECREMENT_COUNT" });
  };

  const inc = function () {
    dispatch({ type: "INCREMENT_COUNT" });
  };

  const defineCount = function (e) {
    dispatch({ type: "DEFINE_COUNT", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "DEFINE_STEP", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="counter">
      <div style={{ display: "flex", gap: "2px" }}>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
