import "./ItemsInvoice.scss"
import { IoCloseSharp } from "react-icons/io5"

type ItemsInvoiceProps = {
  close: () => void
}
export default function ItemsInvoice({ close }: ItemsInvoiceProps) {
  console.log("invoices List")
  return (
    <div className="itemsInvoice">
      <IoCloseSharp className="close-icon" onClick={close} />
      <p>Items added so far</p>
      <div className="list-items-invoice">
        <div className="row-item-invoice header-item-invoice">
          <div>Name</div>
          <div>Description</div>
          <div>Quantity</div>
          <div>Price</div>
        </div>
        <div className="body-items-invoice">
          <div className="row-item-invoice">
            <div>Internet Bill</div>
            <div>Monthly payment for the internet bill.</div>
            <div>1</div>
            <div>34.50 $</div>
          </div>
          <div className="row-item-invoice">
            <div>Cable Internet Plus</div>
            <div>Monthly payment for the internet cable plus.</div>
            <div>1</div>
            <div>10.50 $</div>
          </div>
          <div className="row-item-invoice">
            <div>Router Rent</div>
            <div>Payment for renting the Router for 3 months.</div>
            <div>1</div>
            <div>45.99 $</div>
          </div>
        </div>
      </div>
      <div>Here will be the form for add</div>
    </div>
  )
}
