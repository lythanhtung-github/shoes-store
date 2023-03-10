import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import ProductCreate from './components/ProductCreate/ProductCreate';
import ProductView from './components/ProductView/ProductView';
import ProductEdit from './components/ProductEdit/ProductEdit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} theme="colored"/>
      <Header />
      <Routes>
        <Route path='/shoes-store' element={<ProductList />} />
        <Route path='/shoes-store/products/create' element={<ProductCreate />} />
        <Route path='/shoes-store/products/view/:productId' element={<ProductView />} />
        <Route path='/shoes-store/products/edit/:productId' element={<ProductEdit />} />
      </Routes>
    </>
  );
}

export default App;
