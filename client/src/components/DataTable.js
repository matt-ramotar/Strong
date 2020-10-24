import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Paper, Table } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useSelector, useDispatch } from 'react-redux';
import { getExercises } from '../store/exercises';
import { Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import emojiRegex from 'emoji-regex/RGI_Emoji.js';

const columns = [
  { id: 'name', label: '🏋🏽 Exercise', minWidth: 240 },
  { id: 'muscles', label: '💪🏽 Muscles', minWidth: 170 },
  {
    id: 'equipment',
    label: '🚲 Equipment',
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

export function DataTable({ exercises, muscles, equipment }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selections, setSelections] = React.useState([]);
  const selectionEl = useRef(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelect = (e, value) => {
    setSelections(value);
  };

  if (!exercises || !muscles || !equipment) return null;

  const filter = rows => {
    const que = [...selections];

    let matches = [...rows];

    while (que.length) {
      const regex = emojiRegex();

      const curFilter = que.shift();
      const match = regex.exec(curFilter);
      const emoji = match[0];
      const target = curFilter.split(' ').slice(1).join(' ');

      const type = emoji === '💪🏽' ? 'muscles' : emoji === '🚲' ? 'equipment' : 'exercise';

      matches = rows.filter(row => row[type].includes(target));
    }

    return matches;
  };

  const filters = [...muscles, ...exercises, ...equipment].map(item => {
    return {
      name: item.name,
      type: item.type,
    };
  });

  return (
    <div className={classes.root}>
      <Paper className={classes.table}>
        <Box className={classes.tableControls}>
          <Autocomplete
            multiple
            id='tags-filled'
            options={filters.map(filter => `${filter.type} ${filter.name}`)}
            freeSolo
            ref={selectionEl}
            onChange={handleSelect}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => <Chip variant='outlined' label={option} {...getTagProps({ index })} />)
            }
            renderInput={params => (
              <TextField
                id='input'
                {...params}
                variant='filled'
                label={'Tags'}
                placeholder='Search or filter using tags ...'
              />
            )}
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
              {filter(exercises)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(exercise => {
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
          count={filter(exercises).length}
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
  const exercises = useSelector(state => state.exercises.list);
  const muscles = useSelector(state => state.muscles.list);
  const equipment = useSelector(state => state.equipment.list);
  return <DataTable exercises={exercises} muscles={muscles} equipment={equipment} />;
}
