import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from 'pages/Main';
import Gallery from 'pages/Gallery';
import Header from 'components/Header';

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/gallery/*" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
