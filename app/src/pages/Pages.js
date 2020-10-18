import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from './HomePage';
import ExercisesPageContainer from './ExercisesPage';
import ExerciseDetailContainer from './ExerciseDetailPage';

export default function Pages() {
  return (
    <>
      <Route exact path='/' component={HomePage}></Route>
      <Route exact path='/exercises' component={ExercisesPageContainer}></Route>
      <Route path='/exercises/exercise/:id' component={ExerciseDetailContainer}></Route>
    </>
  );
}
