import _ from 'lodash';
import { React, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { getFibonacciFromLine } from '../globalFunctions';

function Minefield(props) {
  // Default style by MUI for Tile (paper)
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '2rem',
    width: '2rem',
    lineHeight: '2rem',
    cursor: 'pointer',
  }));

  // Arguments from .env
  const { envColumns, envRows, envStrike, debug } = props;

  // mines state - { val: Num, class: [] }
  const [minesStateObj, setMinesStateObj] = useState({});
  const [clickCount, setClickCount] = useState(0);

  // checks if 5 consecutive numbers in the Fibonacci sequence are next to each other
  // if yes, these cells will briefly turn green and will be cleared
  useEffect(() => {
    debug && console.log('call useEffect');
    fibonacciCheck();
  }, [minesStateObj]);

  // user clicked some mine in the field, adding +1 on each side of the grid cross
  const clickedMine = (e) => {
    debug && console.log('call clickedMine');
    setClickCount(clickCount + 1);
    const clickedId = e.target.id;

    // clearing previous classes since every class lasts 1 click
    const changedMines = {};
    for (const [key, value] of Object.entries(minesStateObj)) {
      changedMines[key] = { val: value?.val };
    }

    // all values in the cells in the same row and column are increased by 1
    const [iStatic, yStatic] = clickedId.split('-');

    const _changeObjectToClicked = (key) => {
      const val = minesStateObj[key]?.val || 0;
      // setting css class clicked so the mine's background will be animated
      return { val: (val + 1), class: ['clicked']};
    };

    // horizontal
    for (let i = 0; i < envRows; i++) {
      const key = `${i}-${yStatic}`;
      changedMines[key] = _changeObjectToClicked(key);
    }

    // vertical
    for (let y = 0; y < envColumns; y++) {
      const key = `${iStatic}-${y}`;
      changedMines[key] = _changeObjectToClicked(key);
    }

    // change state
    setMinesStateObj({ ...minesStateObj || {}, ...changedMines });
  };

  // returns mines - react components with proper state
  const getMinesObjects = (envColumns, envRows) => {
    debug && console.log('call getMinesObjects');
    const mines = [];
    // cycle grid on columns and then by rows
    for (let i = 0; i < envRows; i++) {
      const line = [];
      for (let y = 0; y < envColumns; y++) {
        const key = `${i}-${y}`;
        line.push(
          <Item
            key={key}
            id={key}
            elevation={1} // something like border.
            className={`mine ${minesStateObj[key]?.class ? minesStateObj[key].class?.join(' ') : ''}`} // default class "mine", then some animating-color state as strike or clicked.
            onClick={(e) => clickedMine(e)}
          >
            {minesStateObj[key]?.val === 0 ? '' : minesStateObj[key]?.val}
          </Item>,
        );
      }
      mines.push(line);
    }
    return mines;
  };

  // returns array of objects to put in minesStateObj
  const getFiboChanges = (fibRes) => {
    const change = {};
    if ( fibRes.res ) {
      debug && console.log('clearing ', fibRes);
      fibRes.indexes.forEach((strikeObject) => {
        change[Object.keys(strikeObject)[0]] = { val: 0, class: ['strike']};
      });
    }
    return change;
  };

  // cycles minesStateObj, if the number is fibonacci, continues on all 4 sides if some neighbour number even exists...
  // and then checks if is next fibonnaci / next-2 fibonnaci...
  // if yes, checks whole line, then triggers strike if there are the necessary number of them (REACT_APP_FIBONACCI_STRIKE)
  const fibonacciCheck = () => {
    debug && console.log('call fibonacciCheck');
    const lines = [];
    const columns = [];


    // for each row
    for (let i = 0; i < envRows; i++) {
      // each value in column
      const line = [];
      for (let y = 0; y < envColumns; y++) {
        const key = `${i}-${y}`;
        if (minesStateObj[key]) {
          line.push({ [key]: minesStateObj[key] });
        }
      }
      lines.push(line);
    }

    // for each column
    for (let y = 0; y < envColumns; y++) {
      const column = [];
      // each value in row
      for (let i = 0; i < envRows; i++) {
        const key = `${i}-${y}`;
        // ignoring zeros
        if (minesStateObj[key]) {
          column.push({ [key]: minesStateObj[key] });
        }
      }
      columns.push(column);
    }

    // at least envstrike number neighbours
    // TODO can be optimized - no need to process all arrays but only thick cross up to down, left to right from the place of clicking
    let changedMines = {};
    lines.forEach((line) => {
      // left to right
      changedMines = { ...changedMines, ...getFiboChanges(getFibonacciFromLine(line, envStrike)) };
      // right to left
      changedMines = { ...changedMines, ...getFiboChanges(getFibonacciFromLine(line.reverse(), envStrike)) };
    });

    columns.forEach((column) => {
      // up to down
      changedMines = { ...changedMines, ...getFiboChanges(getFibonacciFromLine(column, envStrike)) };
      // down to up
      changedMines = { ...changedMines, ...getFiboChanges(getFibonacciFromLine(column.reverse(), envStrike)) };
    });
    // checking if there are some changed objects
    if (!_.isEmpty(changedMines)) {
      setMinesStateObj({ ...minesStateObj || {}, ...changedMines });
    }
  };

  debug && console.log('call rerender');
  // rendering
  return (
    <div>
      <h1>{`Fibo's minesweeper`}</h1>
      <p>{`In "Fibo's minesweeper," uncover the grid by clicking on cells to form Fibonacci sequences, with a value of 0 when nothing is revealed, and aim to achieve as many sequences as possible before losing interest.`}</p>
      <hr />
      < p > {`You clicked ${clickCount} times.`
      }</p >
      <Button variant="outlined" onClick={() => {
        setMinesStateObj({});
        setClickCount(0);
      }}>Clear</Button>
      <Grid container spacing={1} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Grid>
          <ThemeProvider theme={createTheme({ palette: { mode: 'light' }})}>
            {/* default styling by MUI */}
            <Box
              sx={{
                paddingTop: 'none',
                paddingBottom: 1,
                paddingLeft: 1,
                paddingRight: 1,
                bgcolor: 'background.default',
                display: 'block',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 1,
              }}
            >
              {
                getMinesObjects(envColumns, envRows).map((mineLine, i) => {
                  return (
                    <Box
                      key={mineLine[i].key}
                      sx={{
                        paddingTop: 'none',
                        paddingBottom: 1,
                        paddingLeft: 1,
                        paddingRight: 1,
                        bgcolor: 'background.default',
                        display: 'flex',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 1,
                      }}
                    >
                      {
                        (mineLine.map((mine) => {
                          return mine;
                        },
                        ))
                      }
                    </Box>
                  );
                })
              }
            </Box>
          </ThemeProvider>
        </Grid>
      </Grid>
      <hr />
      <p>Stay in touch. <a href='https://github.com/Firenzias/fibos-minesweeper' target="_blank" rel="noreferrer" >Firenzias@GitHub</a></p>
    </div >
  );
}

export default Minefield;
