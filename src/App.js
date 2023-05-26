import './App.css';
import Mainframe from './containers/Mainframe'

function App() {
  console.log('process.env.REACT_APP_COLUMNS', process.env.REACT_APP_COLUMNS)
  console.log('process.env.REACT_APP_ROWS', process.env.REACT_APP_ROWS)
  return (
    <Mainframe />
  );
}

export default App;
