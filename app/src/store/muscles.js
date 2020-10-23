const LOAD_MUSCLES = 'muscles/LOAD_MUSCLES';

export const loadMuscles = muscles => ({
  type: LOAD_MUSCLES,
  muscles,
});

export const getMuscles = () => async dispatch => {
  const res = await fetch('/api/muscles');
  if (res.ok) {
    const muscles = await res.json();
    dispatch(loadMuscles(muscles.data));
  }
};

export default function musclesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_MUSCLES:
      return { ...state, list: action.muscles };
    default:
      return state;
  }
}
