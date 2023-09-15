import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Product } from 'pages/Product';
import { Products } from 'pages/Products';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Products />} path="/" />
        <Route path="/products">
          <Route element={<Product />} path=":productId" />
        </Route>
        <Route element={<Button>hi</Button>} path="/about" />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
