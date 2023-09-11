import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from 'pages/Main';
import Header from 'components/Header';

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
