import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Paper, Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { getAllExercises } from '../store/exercises';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const columns = [
  { id: 'name', label: 'Name', minWidth: 240 },
  { id: 'muscles', label: 'Muscles', minWidth: 170 },
  {
    id: 'equipment',
    label: 'Equipment',
    minWidth: 170,
  },
];

function createData(name, muscle, equipment) {
  return { name, muscle, equipment };
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  table: {
    width: '66.67%',
    'margin-top': '5%',
  },
  container: {
    maxHeight: 600,
  },
});

export function DataTable({ getAllExercisesDispatcher }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getAllExercisesDispatcher();
  });

  const exercises = useSelector(state => state.exercises.list);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if (!exercises) return null;

  return (
    <div className={classes.root}>
      <Paper className={classes.table}>
        <Box className={classes.tableControls}>
          <Typography>Table Controls</Typography>
          <Autocomplete
            multiple
            id='tags-filled'
            // options={top100Films.map(option => option.title)}
            // defaultValue={[top100Films[13].title]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
            }
            renderInput={params => <TextField {...params} variant='filled' label='freeSolo' placeholder='Favorites' />}
          />
        </Box>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {exercises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(exercise => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={exercise.name}>
                    {columns.map(column => {
                      const value = exercise[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={exercises.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default function DataTableContainer() {
  const dispatch = useDispatch();
  const getAllExercisesDispatcher = () => dispatch(getAllExercises());

  return <DataTable getAllExercisesDispatcher={getAllExercisesDispatcher} />;
}
