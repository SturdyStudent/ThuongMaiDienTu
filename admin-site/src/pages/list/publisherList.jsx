import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import PublisherDatatable from "../../components/datatable/PublisherDatatable"

const List = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <PublisherDatatable />
            </div>
        </div>
    )
}

export default List