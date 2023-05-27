import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const getMinesObjects = (envColumns, envRows) => {
  console.log([envColumns, envRows]);
  const mines = [];
  for (let i = 0; i < envColumns; i++) {
    const line = [];
    for (let y = 0; y < envRows; y++) {
      line.push(y);
    }
    mines.push(line);
  }

  console.log(mines);

  return mines;
};

function Minefield(props) {
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '2rem',
    width: '2rem',
    lineHeight: '2rem',
  }));


  // eslint-disable-next-line no-unused-vars
  const { envColumns, envRows } = props;
  console.log('envColumns, envRows', props);

  // eslint-disable-next-line no-unused-vars
  const minesGrid = getMinesObjects(envColumns, envRows);

  return (
    <div>
      <h1>{`Fibo's minesweeper`}</h1>
      <Grid container spacing={1}>
        <Grid>
          <ThemeProvider theme={createTheme({ palette: { mode: 'light' }})}>
            <Box
              sx={{
                p: 1,
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
                        p: 1,
                        bgcolor: 'background.default',
                        display: 'flex',
                        gridTemplateColumns: { md: '1fr 1fr' },
                        gap: 1,
                      }}
                    >
                      {
                        (mineLine.map((mine, y) => {
                          return (
                            <Item key={`${y}-${i}`} elevation={2}>
                              {'2'}
                            </Item>
                          );
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
    </div>
  );
}

export default Minefield;
