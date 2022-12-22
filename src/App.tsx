import { Navbar } from './pages/components/Navbar/Navbar';
import { MainPage } from './pages/components/MainPage/MainPage';
import './App.css';
import { Route, Routes } from 'react-router';
import { Store } from './pages/components/Store/Store';
import { Services } from './pages/components/Services/Services';
import { Accessories } from './pages/components/Accessories/Accessories';
import { Support } from './pages/components/Support/Support';
import Product from './pages/components/Store/Product/Product';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' key="home" element={<MainPage />} />
        <Route path='/store' key='store' element={<Store />} />
        <Route path='/store/:categoryId' key='category' element={<Store />} />
        <Route path='/store/:categoryId/:page' key='page' element={<Store />} />
        <Route path='/store/product/:productId' key='page' element={<Product />} />
        <Route path='/services' key='services' element={<Services />} />
        <Route path='/accessories' key='accessories' element={<Accessories />} />
        <Route path='/support' key='support' element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;
