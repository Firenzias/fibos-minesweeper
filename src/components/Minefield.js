import { React, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
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

  const clickedMine = (e) => {
    const id = e.target.id;
    console.log('e.target.id', id);
    let val = minesValues[id] || 0;
    console.log('val', val);
    console.log('minesValues', minesValues);
    setMinesValues( { ...minesValues || {}, [id]: ++val });
  };

  const getMinesObjects = (envColumns, envRows) => {
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
      <Grid container spacing={1}>
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
                          return ( mine );
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
