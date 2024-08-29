import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/goals/goalSlice";
import { getGoals } from "../redux/goals/goalSlice";

import Spinner from "../components/Spinner";
import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userToken } = useSelector((state) => state.auth);

  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!userToken) {
      navigate("/login");
    } else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [userToken, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto px-4">
      <section className="mb-4 rounded-lg bg-primary p-6 text-button-text shadow-lg">
        <h1 className="text-3xl font-bold">
          Welcome {userToken && userToken.name}
        </h1>
        <p className="text-secondary">Dashboard</p>
      </section>

      <GoalForm />

      <section className="mb-6 mt-6">
        {goals.length > 0 ? (
          <div className="space-y-4">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3 className="text-text">You have not set any goals yet.</h3>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
