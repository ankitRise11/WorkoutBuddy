import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  const atSymbolIndex = user.email.indexOf("@");
  const username = user.email.slice(0, atSymbolIndex);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:3500/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        <h2>Hello, {username}</h2>
        <h3>Here are your saved workouts:</h3>
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
