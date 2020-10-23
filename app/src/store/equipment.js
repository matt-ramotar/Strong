const LOAD_EQUIPMENT = 'equipment/LOAD_EQUIPMENT';

export const loadEquipment = equipment => ({
  type: LOAD_EQUIPMENT,
  equipment,
});

export const getEquipment = () => async dispatch => {
  const res = await fetch('/api/equipment');
  if (res.ok) {
    const equipment = await res.json();
    dispatch(loadEquipment(equipment.data));
  }
};

export default function equipmentReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_EQUIPMENT:
      return { ...state, list: action.equipment };
    default:
      return state;
  }
}
