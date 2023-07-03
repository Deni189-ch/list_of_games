import { Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { GamePage } from "./pages/GamePage";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />

          <Route path="/games/:gameId/:gameName/:gameId2" element={<GamePage />}/>
        </Route>
      </Routes>
  );
}

export default App;
