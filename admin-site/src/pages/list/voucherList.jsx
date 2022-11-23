import React from 'react'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import VoucherDatatable from "../../components/datatable/VoucherDatatable"
function voucherList() {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <VoucherDatatable objectName={"Voucher"} />
      </div>
    </div>
  )
}

export default voucherList