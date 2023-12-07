import './App.css'
import { Link, Outlet } from 'react-router-dom';



function App() {

    return (
      <div className="App">
        <nav>
          <Link to={"/Traininglist"}>Training</Link>
          <Link to={"/Customerlist"}>Customerlist</Link>
        </nav>
        <Outlet />
      </div>
    );
  }

export default App
