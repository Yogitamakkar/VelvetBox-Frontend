
import { Button, ThemeProvider } from '@mui/material'
import Navbar from './customer/components/navbar/Navbar'
import customTheme from './theme/CustomTheme'
import Home from './customer/pages/home/Home'
import ProductsPage from './customer/pages/product/ProductsPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ProductDetails from './customer/pages/product/ProductDetails'
import ProductReviewPage from './customer/pages/product/ProductReviewPage'
import CartPage from './customer/pages/cart/CartPage'
import Checkout from './customer/pages/checkout/Checkout'
import ProfileOrdersComponent from './customer/components/account/ProfileOrdersComponent'
import AccountPage from './customer/pages/account/AccountPage'



function App() {
  return (
    <ThemeProvider theme={customTheme}>
      {/* <Navbar/> */}
        {/* <Home/> */}
        {/* <BrowserRouter>
          <ProductsPage/>
        </BrowserRouter> */}

        {/* <ProductDetails/>
        <ProductReviewPage/>
        <CartPage/> */}
        {/* <Checkout/> */}

        {/* <ProfileOrdersComponent/> */}
        <Navbar/>
        <Routes>
          <Route path='*' element={<Home/>} />
          <Route path='/products/:category' element={<ProductsPage/>} />
          <Route path='/reviews/:productId' element={<ProductReviewPage/>}/>
          <Route path='/product-details/:categoryId/:name/:productId' element={<ProductDetails/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='/account/*' element={<AccountPage/>}/>

        </Routes>

    </ThemeProvider>
  )
}

export default App
