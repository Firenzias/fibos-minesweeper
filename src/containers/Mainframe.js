import React from 'react';
import _ from 'lodash';
import Minefield from '../components/Minefield';

const Mainframe = () => {
  const envColumns = parseInt(process.env.REACT_APP_COLUMNS);
  const envRows = parseInt(process.env.REACT_APP_ROWS);

  // init check

  if (!(_.isInteger(envColumns) && _.isInteger(envRows))) {
    throw new Error('Wrong environments set. REACT_APP_COLUMNS and REACT_APP_ROWS must be Integers!');
  }

  return (
    <Minefield envColumns={envColumns} envRows={envRows} />
  );
};

export default Mainframe;
