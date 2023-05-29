import React from 'react';
import _ from 'lodash';
import Minefield from '../components/Minefield';

const Mainframe = () => {
  const envColumns = parseInt(process.env.REACT_APP_COLUMNS);
  const envRows = parseInt(process.env.REACT_APP_ROWS);
  const envStrike = parseInt(process.env.REACT_APP_FIBONACCI_STRIKE);
  const debug = process.env.REACT_APP_DEBUG && process.env.REACT_APP_DEBUG === 'true' ? true : false;

  debug && console.log('debug console logs on, envs:', { envColumns, envRows, envStrike, debug });

  // init check
  if (!(_.isInteger(envColumns) && _.isInteger(envRows) && _.isInteger(envStrike))) {
    throw new Error('Wrong environments set. REACT_APP_COLUMNS, REACT_APP_ROWS and REACT_APP_FIBONACCI_STRIKE must be Integers!');
  }

  return (
    <div>
      <Minefield envColumns={envColumns} envRows={envRows} envStrike={envStrike} debug={debug} />
    </div>
  );
};

export default Mainframe;
