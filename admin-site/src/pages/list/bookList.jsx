import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import BookDatatable from "../../components/datatable/BookDatatable"

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <BookDatatable />
            </div>
        </div>
    )
}

export default List