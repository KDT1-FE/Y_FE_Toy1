import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Main from 'pages/Main';
import { ROUTES } from 'constants/routes';
import Gallery from 'pages/Gallery';
import Wiki from 'pages/Wiki';
import Header from 'components/Header';
import Login from 'pages/Login';
import { auth } from 'apis/firebase';
// import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from 'components/Common/Loading';
import { useEffect, useState } from 'react';

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  });

  if (loading || showLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>알 수 없는 error 가 발생했습니다</div>;
  }
  return (
    <Router>
      {user && <Header></Header>}
      <Routes>
        <Route
          path={ROUTES.MAIN}
          element={user ? <Main /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path={ROUTES.GALLERY}
          element={user ? <Gallery /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path={ROUTES.WIKI}
          element={user ? <Wiki /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path={ROUTES.LOGIN}
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
