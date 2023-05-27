import { React, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { getFibonacciFromLine } from '../globalFunctions';

function Minefield(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '2rem',
    width: '2rem',
    lineHeight: '2rem',
    cursor: 'pointer',
  }));

  // Init mines values with 0
  const initMinesValues = () => {
    const values = {};
    for (let i = 0; i < envRows; i++) {
      for (let y = 0; y < envColumns; y++) {
        const key = `${i}-${y}`;
        values[key] = 0;
      }
    }
    return values;
  };

  const { envColumns, envRows, envStrike } = props;
  const [minesValues, setMinesValues] = useState(initMinesValues());
  const [clickCount, setClickCount] = useState(0);

  // checks if 5 consecutive numbers in the Fibonacci sequence are next to each other
  // if yes, these cells will briefly turn green and will be cleared
  useEffect(() => {
    fibonacciCheck();
  }, [minesValues]);


  const clickedMine = (e) => {
    setClickCount(clickCount + 1);
    const clickedId = e.target.id;

    const changedObjects = {};

    // all values in the cells in the same row and column are increased by 1
    const [iStatic, yStatic] = clickedId.split('-');

    for (let i = 0; i < envRows; i++) {
      const key = `${i}-${yStatic}`;
      const val = minesValues[key];
      changedObjects[key] = (val + 1);
    }

    for (let y = 0; y < envColumns; y++) {
      const key = `${iStatic}-${y}`;
      const val = minesValues[key];
      changedObjects[key] = (val + 1);
    }

    setMinesValues({ ...minesValues || {}, ...changedObjects });
  };

  const clearFibonacisRow = (indexObjects) => {
    const changedObjects = {};
    indexObjects.forEach((indexObject) => {
      changedObjects[Object.keys(indexObject)[0]] = 0;
    });
    setMinesValues({ ...minesValues || {}, ...changedObjects });
  };

  const getMinesObjects = (envColumns, envRows) => {
    console.log('getMinesObjects');
    const mines = [];
    for (let i = 0; i < envRows; i++) {
      const line = [];
      for (let y = 0; y < envColumns; y++) {
        const key = `${i}-${y}`;
        line.push(
          <Item key={key} id={key} elevation={1} onClick={(e) => clickedMine(e)}>
            {minesValues[key] === 0 ? '' : minesValues[key]}
          </Item>,
        );
      }
      mines.push(line);
    }
    return mines;
  };


  // eslint-disable-next-line no-unused-vars
  const minesGrid = getMinesObjects(envColumns, envRows);

  // cycles minesValues, if the number is fibonacci, continues on all 4 sides if some neighbour number even exists... and then checks if is next fibonnaci / next-2 fibonnaci...
  // if yes, checks whole line, then triggers strike if there are the necessary number of them (REACT_APP_FIBONACCI_STRIKE)
  const fibonacciCheck = () => {
    const lines = [];
    const columns = [];


    // for each row
    for (let i = 0; i < envRows; i++) {
      // each value in column
      const line = [];
      for (let y = 0; y < envColumns; y++) {
        const key = `${i}-${y}`;
        if (minesValues[key]) {
          line.push({ [key]: minesValues[key] });
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
        if (minesValues[key]) {
          column.push({ [key]: minesValues[key] });
        }
      }
      columns.push(column);
    }

    // at least envstrike number neighbours
    // TODO can be optimized

    // console.log('lines', lines);
    columns.forEach((column) => {
      // right to left (and since lines contains also columns instead of rows so also down to up)
      const resL = getFibonacciFromLine(column, envStrike);
      const resR = getFibonacciFromLine(column.reverse(), envStrike);

      if (resL.res === true) {
        console.log('clearing top to bottom', resL);
        clearFibonacisRow(resL.indexes);
      }
      if (resR.res === true) {
        console.log('clearing bottom to top', resR);
        clearFibonacisRow(resR.indexes);
      }
    });


    // console.log('lines', lines);
    lines.forEach((line) => {
      // right to left (and since lines contains also columns instead of rows so also down to up)
      const resL = getFibonacciFromLine(line, envStrike);
      const resR = getFibonacciFromLine(line.reverse(), envStrike);

      if (resL.res === true) {
        console.log('clearing left to right', resL);
        clearFibonacisRow(resL.indexes);
      }
      if (resR.res === true) {
        console.log('clearing right to left', resR);
        clearFibonacisRow(resR.indexes);
      }
    });
  };

  return (
    <div>
      <h1>{`Fibo's minesweeper`}</h1>
      < p > {`You clicked ${clickCount} times.`
      }</p >
      <Button variant="outlined" onClick={() => {
        setMinesValues(initMinesValues());
        setClickCount(0);
      }}>Clear</Button>
      <Grid container spacing={1} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <Grid>
          <ThemeProvider theme={createTheme({ palette: { mode: 'light' }})}>
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
                minesGrid.map((mineLine, i) => {
                  return (
                    <Box
                      key={i}
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
                        (mineLine.map((mine, y) => {
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
    </div >
  );
}

export default Minefield;
