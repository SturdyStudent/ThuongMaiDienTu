import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TransportDatatable from "../../components/datatable/TransportDatatable"
const List = () => {
  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <TransportDatatable />
        </div>
      </div>
    </>
  )
}

export default List