
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterScreen from './screens/RegisterScreen'
import ReportScreen from './screens/ReportScreen'

function App() {
  return (
    <div className="App">
      
    <Router>
        
        <Routes>
          <Route exact path="/" element={<RegisterScreen/>} />
          <Route path="/reports" element={<ReportScreen/>} />

        </Routes>
    </Router>
      
    </div>
  );
}

export default App;
