import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExercise } from '../store/exercises';
import { Redirect, NavLink, useParams } from 'react-router-dom';

const ExercisesPage = ({ getExerciseDispatcher }) => {
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    console.log('use effect');
    getExerciseDispatcher(id);
    console.log('after get');
  }, [id]);

  const exercise = useSelector(state => state.exercises.current);
  if (!exercise) return null;

  return (
    <div>
      <h1>{exercise.name}</h1>
    </div>
  );
};

export default function ExercisesPageContainer() {
  const dispatch = useDispatch();
  const getExerciseDispatcher = id => dispatch(getExercise(id));

  return <ExercisesPage getExerciseDispatcher={getExerciseDispatcher} />;
}
