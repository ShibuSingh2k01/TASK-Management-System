import { useState } from "react";
import { useDispatch } from "react-redux";
import { createGoal } from "../redux/goals/goalSlice";

const GoalForm = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // Make sure you're passing the correct structure
    dispatch(createGoal({ text }));
    setText("");
  };

  return (
    <section className="mt-6 rounded-lg bg-secondary p-6 shadow-lg">
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="text"
            className="mb-2 block text-lg font-semibold text-text"
          >
            Goal
          </label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-lg border border-gray-500 bg-background p-3 text-text focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Enter your goal"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-accent p-3 text-button-text transition duration-200 hover:bg-green-600"
        >
          Add Goal
        </button>
      </form>
    </section>
  );
};

export default GoalForm;
