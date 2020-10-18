import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllExercises } from '../store/exercises';
import { Redirect, NavLink, useParams } from 'react-router-dom';

const ExercisesPage = ({ getAllExercisesDispatcher }) => {
  useEffect(() => {
    getAllExercisesDispatcher();
  }, []);
  const exercises = useSelector(state => state.exercises.list);
  if (!exercises) return null;

  return (
    <ul>
      {exercises.map((exercise, i) => (
        <li key={i}>{exercise.name}</li>
      ))}
    </ul>
  );
};

export default function ExercisesPageContainer() {
  const dispatch = useDispatch();
  const getAllExercisesDispatcher = () => dispatch(getAllExercises());

  return <ExercisesPage getAllExercisesDispatcher={getAllExercisesDispatcher} />;
}