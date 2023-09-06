import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Main } from 'pages/Main';

Header;
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Main />} path="/" />
        <Route element={<Button>hi</Button>} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
