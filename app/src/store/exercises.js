const LOAD_ALL_EXERCISES = 'exercises/LOAD_ALL_EXERCISES';
const LOAD_EXERCISE = 'exercises/LOAD_EXERCISE';

export const loadAllExercises = exercises => ({
  type: LOAD_ALL_EXERCISES,
  exercises,
});

export const loadExercise = exercise => ({
  type: LOAD_EXERCISE,
  exercise,
});

export const getAllExercises = () => async dispatch => {
  const res = await fetch('/api/exercises');
  if (res.ok) {
    const exercises = await res.json();
    dispatch(loadAllExercises(exercises['data']));
  }
};

export const getExercise = id => async dispatch => {
  console.log('getExercise');
  const res = await fetch(`/api/exercises/exercise/${id}`);
  if (res.ok) {
    const exercise = await res.json();
    dispatch(loadExercise(await exercise.data));
  }
};

export default function exercisesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALL_EXERCISES:
      return { ...state, list: action.exercises };
    case LOAD_EXERCISE:
      return { ...state, current: action.exercise };
    default:
      return state;
  }
}
