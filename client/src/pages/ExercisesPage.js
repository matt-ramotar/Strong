import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExercises } from '../store/exercises';
import { Redirect, NavLink, useParams } from 'react-router-dom';

const ExercisesPage = ({ getExercisesDispatcher }) => {
  useEffect(() => {
    getExercisesDispatcher();
  }, []);
  const exercises = useSelector(state => state.exercises.list);
  if (!exercises) return null;
  console.log(exercises);

  return (
    <ul>
      {exercises.map((exercise, i) => (
        <>
          <h1 key={i}>
            <a href={`/exercises/exercise/${exercise.id}`}>{exercise.name}</a>
          </h1>
          <ul>
            <li>{exercise.bbPageUrl}</li>
            <li>{exercise.muscles[0]}</li>
            <div>
              {exercise.instructions.map((instruction, i) => (
                <li>{instruction}</li>
              ))}
            </div>
          </ul>
        </>
      ))}
    </ul>
  );
};

export default function ExercisesPageContainer() {
  const dispatch = useDispatch();
  const getExercisesDispatcher = () => dispatch(getExercises());

  return <ExercisesPage getExercisesDispatcher={getExercisesDispatcher} />;
}
