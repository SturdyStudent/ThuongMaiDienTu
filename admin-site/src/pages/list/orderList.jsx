import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import OrderDatatable from "../../components/datatable/OrderDatatable"
const List = () => {
  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <OrderDatatable />
        </div>
      </div>
    </>
  )
}

export default List