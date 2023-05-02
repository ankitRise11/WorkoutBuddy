import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const UpdateData = () => {
  const { user } = useAuthContext();
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch(
        `https://workout-buddy-backend-qbz9.onrender.com/api/workouts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      setTitle(data.title);
      setLoad(data.load);
      setReps(data.reps);
    };
    fetchWorkout();
  }, [id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://workout-buddy-backend-qbz9.onrender.com/api/workouts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          title,
          load,
          reps,
        }),
      }
    );
    const json = await response.json();
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
    navigate("/");
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Update Workout for {title}</h3>

      <label>Excercise Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Number of Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Update Workout</button>
    </form>
  );
};

export default UpdateData;
