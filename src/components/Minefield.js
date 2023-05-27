import { React, useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

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

  // eslint-disable-next-line no-unused-vars
  const [minesValues, setMinesValues] = useState({});
  const [clickCount, setClickCount] = useState(0);

  // checks if 5 consecutive numbers in the Fibonacci sequence are next to each other
  // if yes, these cells will briefly turn green and will be cleared
  useEffect(() => {
    // TODO
  }, [clickCount]);

  const clickedMine = (e) => {
    setClickCount(clickCount + 1);
    const clickedId = e.target.id;
    console.log('e.target.id', clickedId);
    console.log('minesValues', minesValues);

    const changedObjects = {};

    // all values in the cells in the same row and column are increased by 1
    const [iStatic, yStatic] = clickedId.split('-');

    for (let i = 0; i < envColumns; i++) {
      const key = `${i}-${yStatic}`;
      const val = minesValues[key] || 0;
      changedObjects[key] = (val + 1);
    }

    for (let y = 0; y < envColumns; y++) {
      const key = `${iStatic}-${y}`;
      const val = minesValues[key] || 0;
      changedObjects[key] = (val + 1);
    }


    setMinesValues({ ...minesValues || {}, ...changedObjects });
  };

  const getMinesObjects = (envColumns, envRows) => {
    console.log('getting mines objects');
    const mines = [];
    for (let i = 0; i < envColumns; i++) {
      const line = [];
      for (let y = 0; y < envRows; y++) {
        const key = `${i}-${y}`;
        line.push(
          <Item key={key} id={key} elevation={1} onClick={(e) => clickedMine(e)}>
            {minesValues[key]}
          </Item>,
        );
      }
      mines.push(line);
    }
    return mines;
  };


  // eslint-disable-next-line no-unused-vars
  const { envColumns, envRows } = props;

  // eslint-disable-next-line no-unused-vars
  const minesGrid = getMinesObjects(envColumns, envRows);

  return (
    <div>
      <h1>{`Fibo's minesweeper`}</h1>
      <p>{`You clicked: ${clickCount} times.`}</p>
      <Button variant="outlined" onClick={() => {
        setMinesValues({});
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
