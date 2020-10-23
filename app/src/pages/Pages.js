import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import ExercisesPageContainer from './ExercisesPage';
import ExerciseDetailContainer from './ExerciseDetailPage';
import DataTable from '../components/DataTable';
import { useDispatch } from 'react-redux';
import { getExercises } from '../store/exercises';
import { getMuscles } from '../store/muscles';
import { getEquipment } from '../store/equipment';

export function Pages({ getExercisesDispatcher, getMusclesDispatcher, getEquipmentDispatcher }) {
  useEffect(() => {
    getExercisesDispatcher();
    getMusclesDispatcher();
    getEquipmentDispatcher();
  });
  return (
    <>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/exercises' component={ExercisesPageContainer}></Route>
      <Route path='/exercises/exercise/:id' component={ExerciseDetailContainer}></Route>
      <Route path='/exercises/table' component={DataTable}></Route>
    </>
  );
}

export default function PagesContainer() {
  const dispatch = useDispatch();
  const getExercisesDispatcher = () => dispatch(getExercises());
  const getMusclesDispatcher = () => dispatch(getMuscles());
  const getEquipmentDispatcher = () => dispatch(getEquipment());

  return (
    <Pages
      getExercisesDispatcher={getExercisesDispatcher}
      getMusclesDispatcher={getMusclesDispatcher}
      getEquipmentDispatcher={getEquipmentDispatcher}
    />
  );
}
