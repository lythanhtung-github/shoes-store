import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<ProductList />} />
      </Routes>

    </>
  );
}

export default App;
