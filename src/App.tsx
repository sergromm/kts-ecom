import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Button } from 'components/Button';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<Button>hi</Button>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
