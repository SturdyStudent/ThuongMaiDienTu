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

function App() {
  return (
    <div className="App" style={{ "backgroundColor": "#fffbf3" }}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<SearchResults />}></Route>
          <Route path="/details" element={<BookDetail />}></Route>
          <Route path="/cart" element={<ShopingCart />}></Route>
          <Route path="/checkout-login" element={<CheckoutLogin />}></Route>
          <Route path="/checkout" element={<BookCheckout />}></Route>
          <Route path="/checkout-payment" element={<CheckoutLogin />}></Route>
          <Route path="/checkout-review" element={<CheckoutLogin />}></Route>
          <Route path='/coupons' element={<CouponPage />}></Route>
          <Route path='/faqs' element={<ProductFAQ />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
