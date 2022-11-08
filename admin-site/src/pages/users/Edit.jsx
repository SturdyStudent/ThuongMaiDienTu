import "./new.scss";
import New from "./New";
import { useLocation } from "react-router-dom";

const Edit = () => {
  const location = useLocation();
  let id = null;
  try {
    id = location.state.id;
  } catch (err) {
    console.log(err);
  }
  return (
    <div className="new"><New title={"Sửa thông tin người dùng"} id={id} /></div>
  );
};

export default Edit;
