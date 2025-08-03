import { useState } from 'react';
import {Routes,  Route} from "react-router-dom";
import Navbar from './components/navbar';
import Homepage from './pages/homepage';
import ProductPage from './pages/product-page';
import { useThemeStore } from './store/use-theme-store';
import {Toaster} from 'react-hot-toast';



function App() {
  const {theme} = useThemeStore();

  return (
      <div className='min-h-screen bg-base-200 transition-colors duration-300' data-theme="dark">
        <Navbar />  
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/product/:id" element={<ProductPage />}/>

        </Routes>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
  )
}

export default App
