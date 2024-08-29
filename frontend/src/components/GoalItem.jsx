import { useDispatch } from "react-redux";
import { deleteGoal } from "../redux/goals/goalSlice";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative rounded-lg bg-secondary p-4 shadow-lg">
      <div className="text-sm text-gray-400">
        {new Date(goal.createdAt).toLocaleString("en-US")}
      </div>
      <h2 className="mt-2 text-xl text-text">{goal.text}</h2>
      <button
        onClick={() => dispatch(deleteGoal(goal._id))}
        className="absolute right-2 top-2 rounded-full bg-accent p-1 text-button-text transition duration-200 hover:bg-red-600"
      >
        <span className="text-xl">×</span>
      </button>
    </div>
  );
};

export default GoalItem;
