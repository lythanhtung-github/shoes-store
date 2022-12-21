import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductCreate from './components/ProductCreate/ProductCreate';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/shoes-store' element={<ProductList />} />
        <Route path='/products/create' element={<ProductCreate />} />
      </Routes>

    </>
  );
}

export default App;
