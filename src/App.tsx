import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Main } from 'pages/Main';
import { ProductPage } from 'pages/Product';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Main />} path="/" />
        <Route path="/products">
          <Route element={<ProductPage />} path=":productId" />
        </Route>
        <Route element={<Button>hi</Button>} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
