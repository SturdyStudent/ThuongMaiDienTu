import './App.css';
import HomePage from './pages/HomePage';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import SearchResults from './pages/SearchResults';
import BookDetail from './pages/BookDetail';
import ShopingCart from './pages/ShopingCart';
import CheckoutLogin from './pages/CheckoutLogin';
import BookCheckout from './pages/BookCheckout';
import CouponPage from './pages/CouponPage';
import ProductFAQ from './pages/ProductFAQ';
import OrderHistory from './pages/OrderHistory';
import OrderView from './pages/OrderView';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { baseUrl } from './baseUrl';
import Categories from './components/Categories';

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
          <Route path="/Categories" element={<Categories />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<SearchResults />}></Route>
          <Route path="/details">
            <Route path='/details/:id' element={<BookDetail />} />
          </Route>
          <Route path="/cart" element={<ShopingCart />}></Route>
          <Route path="/checkout-login" element={<CheckoutLogin />}></Route>
          <Route path="/checkout" element={<BookCheckout stripePromise={stripePromise} />}></Route>
          <Route path="/checkout-payment" element={<CheckoutLogin />}></Route>
          <Route path='/coupons' element={<CouponPage />}></Route>
          <Route path='/faqs' element={<ProductFAQ />}></Route>
          <Route path='/order'>
            <Route path='view' element={<OrderView stripePromise={stripePromise} />}></Route>
            <Route path='history' element={<OrderHistory />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
