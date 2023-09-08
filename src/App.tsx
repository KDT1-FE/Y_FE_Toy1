import { RecoilRoot } from 'recoil';
import Home from './pages/Home';

function App() {
  return (
    <RecoilRoot>
      {/* 아래에 각각의 페이지 */}
      <Home />
    </RecoilRoot>
  );
}

export default App;
