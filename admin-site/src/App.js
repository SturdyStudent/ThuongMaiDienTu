import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from './pages/register/register'
import List from "./pages/list/userList";
import Single from "./pages/single/Single";
import New from "./pages/users/New";
import NewVoucher from './pages/vouchers/New'
import NewRating from './pages/ratings/New'
import NewOrder from './pages/order/New'
import NewAuthor from './pages/Author/New'
import NewBook from './pages/books/New'
import NewPublisher from './pages/Publisher/New'
import NewCategory from './pages/Category/New'
import UserEdit from "./pages/users/Edit";
import VoucherEdit from './pages/vouchers/Edit'
import RatingEdit from './pages/ratings/Edit'
import OrderEdit from './pages/order/Edit'
import AuthorEdit from './pages/Author/Edit'
import BookEdit from './pages/books/Edit'
import PublisherEdit from './pages/Publisher/Edit'
import CategoryEdit from './pages/Category/Edit'
import VoucherList from "./pages/list/voucherList";
import RatingList from './pages/list/ratingList';
import OrderList from './pages/list/orderList';
import AuthorList from './pages/list/authorList'
import BookList from './pages/list/bookList'
import CategoryList from './pages/list/categoryList'
import PublisherList from './pages/list/publisherList'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import ProtectedRoute from "./ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs, authorInputs, NXBInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import NewAuthors from "./pages/authors/NewAuthors.jsx";
import EditAuthors from "./pages/authors/EditAuthors.jsx";
import Authors from "./pages/authors/authors.jsx";
import SingleAuthors from "./pages/single/SingleAuthors.jsx"
import SingleNXB from "./pages/single/SingleNXB"
import NXB from "./pages/publisher/nxb.jsx";
import EditNXB from "./pages/publisher/EditNXB.jsx"
import NewNXB from "./pages/publisher/NewNXB.jsx"
function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="authors">
            <Route index element={<Authors />} />
            <Route path=":authorsId" element={<SingleAuthors />} />
            <Route
              path="NewAuthors"
              element={<NewAuthors inputs={authorInputs} title="Thêm tác giả" />}
            />
            <Route
              path="EditAuthors"
              element={<EditAuthors inputs={authorInputs} title="Sửa thông tin tác giả" />}
            />
          </Route>
          <Route path="publisher">
            <Route index element={<NXB />} />
            <Route path=":NXBId" element={<SingleNXB />} />
            <Route
              path="NewNXB"
              element={<NewNXB inputs={NXBInputs} title="Thêm Nhà Xuất Bản" />}
            />
            <Route
              path="EditNXB"
              element={<EditNXB inputs={NXBInputs} title="Sửa thông tin nhà xuất bản" />}
            />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="users">
                <Route index element={<List />} />
                <Route path=":userId" element={<Single />} />
                <Route
                  path="new"
                  element={<New inputs={userInputs} title="Thêm người dùng" />}
                />
                <Route
                  path="edit"
                  element={<UserEdit inputs={userInputs} title="Sửa thông tin người dùng" />}
                />
              </Route>
              <Route path="vouchers">
                <Route index element={<VoucherList />} />
                <Route
                  path="new"
                  element={<NewVoucher />}
                />
                <Route
                  path="edit"
                  element={<VoucherEdit inputs={userInputs} title="Sửa thông tin voucher" />}
                />
              </Route>
              <Route path='ratings'>
                <Route index element={<RatingList />} />
                <Route
                  path="new"
                  element={<NewRating />}
                />
                <Route
                  path="edit"
                  element={<RatingEdit inputs={userInputs} title="Sửa thông tin Rating" />}
                />
              </Route>
              <Route path='orders'>
                <Route index element={<OrderList />} />
                <Route path=":orderId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewOrder />}
                />
                <Route
                  path="edit"
                  element={<OrderEdit inputs={userInputs} title="Sửa thông tin Đơn hàng" />}
                />
              </Route>
              <Route path='authors'>
                <Route index element={<AuthorList />} />
                <Route path=":authorId" element={<Single />} />
                <Route
                  path="new"
                  element={<NewAuthor />}
                />
                <Route
                  path="edit"
                  element={<AuthorEdit inputs={userInputs} title="Sửa thông tin Tác giả" />}
                />
              </Route>
              <Route path='categories'>
                <Route index element={<CategoryList />} />
                <Route
                  path="new"
                  element={<NewCategory />}
                />
                <Route
                  path="edit"
                  element={<CategoryEdit inputs={userInputs} title="Sửa thông tin Thể loại" />}
                />
              </Route>
              <Route path='books'>
                <Route index element={<BookList />} />
                <Route
                  path="new"
                  element={<NewBook />}
                />
                <Route
                  path="edit"
                  element={<BookEdit inputs={userInputs} title="Sửa thông tin Sách" />}
                />
              </Route>
              <Route path='publishers'>
                <Route index element={<PublisherList />} />
                <Route
                  path="new"
                  element={<NewPublisher />}
                />
                <Route
                  path="edit"
                  element={<PublisherEdit inputs={userInputs} title="Sửa thông tin Nhà xuất bản" />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
