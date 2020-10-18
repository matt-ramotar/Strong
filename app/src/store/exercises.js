const LIST_ALL_EXERCISES = 'exercises/LIST_ALL_EXERCISES';

export const listAllExercises = exercises => ({
  type: LIST_ALL_EXERCISES,
  exercises,
});

export const getAllExercises = () => async dispatch => {
  const res = await fetch('/api/exercises');
  if (res.ok) {
    const exercises = await res.json();
    dispatch(listAllExercises(exercises));
  }
};

export default function exercisesReducer(state = {}, action) {
  switch (action.type) {
    case LIST_ALL_EXERCISES:
      return { ...state, list: action.exercises };

    default:
      return state;
  }
}
