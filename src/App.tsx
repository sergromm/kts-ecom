import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { routerPaths } from 'config/routerPaths';
import { Product } from 'pages/Product';
import { Products } from 'pages/Products';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Products />} path={routerPaths.root} />
        <Route path={routerPaths.products}>
          <Route element={<Product />} path={routerPaths.productId} />
        </Route>
        <Route element={<Button>hi</Button>} path={routerPaths.about} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
