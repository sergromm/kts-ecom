import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { API } from 'api/products';
import { Button } from 'components/Button';
import { Header } from 'components/Header';
import { Main } from 'pages/Main';

const products = await API.getProducts();
Header;
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<Main products={products.data} />} path="/" />
        <Route element={<Button>hi</Button>} path="/about" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
