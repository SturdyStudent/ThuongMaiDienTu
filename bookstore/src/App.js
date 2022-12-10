import './App.css';
import HomePage from './pages/HomePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SearchResults from './pages/SearchResults';
import BookDetail from './pages/BookDetail';
import ShopingCart from './pages/ShopingCart';
import CheckoutLogin from './pages/CheckoutLogin';
import ChangePassword from './pages/ChangePassword';
import ForgetPassword from './pages/ForgetPassword';
import BookCheckout from './pages/BookCheckout';
import CouponPage from './pages/CouponPage';
import ProductFAQ from './pages/ProductFAQ';
import Category from './pages/Category';
import OrderHistory from './pages/OrderHistory';
import OrderView from './pages/OrderView';
import VerifyOtpPage from './pages/VerifyOtpPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { baseUrl } from './baseUrl';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [stripePromise, setStripePromise] = useState();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.get(`${baseUrl}/payment/config`)
      .then(result => setStripePromise(loadStripe(result.data.publishableKey)))
  }, []);

  return (
    <div className="App" style={{ "backgroundColor": "#fffbf3" }}>
      <Router>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/checkout" element={<BookCheckout stripePromise={stripePromise} />}></Route>
          </Route>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<SearchResults />}></Route>
          <Route path="/cart" element={<ShopingCart />}></Route>
          <Route path="/details">
            <Route path='/details/:id' element={<BookDetail />} />
          </Route>
          <Route path='/order'>
              <Route path='view' element={<OrderView stripePromise={stripePromise} />}></Route>
              <Route path='history' element={<OrderHistory />}></Route>
          </Route>
          <Route path="/checkout-login" element={<CheckoutLogin />}></Route>
          <Route path="/forgot-password" element={<ForgetPassword />}></Route>
          <Route path="/change-password" element={<ChangePassword />}></Route>
          <Route path='/coupons' element={<CouponPage />}></Route>
          <Route path='/faqs' element={<ProductFAQ />}></Route>
          <Route path='/Categories'>
              <Route path='van-hoc-viet-nam' element={<SearchResults category={1} />}></Route>
              <Route path='van-hoc-nuoc-ngoai'element={<SearchResults category={2} />}></Route>
              <Route path='thieu-nhi'element={<SearchResults category={3} />}></Route>
              <Route path='kinh-te-chinh-tri' element={<SearchResults category={4} />}></Route>
              <Route path='manga-light-novel' element={<SearchResults category={5} />}></Route>
              <Route path='ngon-tinh-lang-man' element={<SearchResults category={6} />}></Route>
              <Route path='tam-linh-huyen-bi' element={<SearchResults category={7} />}></Route>
              <Route path='giao-khoa' element={<SearchResults category={8} />}></Route>
              <Route path='kinh-di' element={<SearchResults category={9} />}></Route>
          </Route>
          <Route path='/verify-otp' element={<VerifyOtpPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
