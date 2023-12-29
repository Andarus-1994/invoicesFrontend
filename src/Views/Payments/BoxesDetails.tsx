import { formatCurrency } from "../../Utils/CurrencyFormat"
import "./BoxesDetails.scss"
import { IoPeopleSharp, IoDocumentAttach } from "react-icons/io5"
import { GiReceiveMoney } from "react-icons/gi"
import { GrDocumentTime } from "react-icons/gr"

export default function BoxesDetails() {
  return (
    <div className="wrapperInvoicesBoxes">
      <div className="invoicesBoxData">
        <IoPeopleSharp />
        <p>Clients</p>
        <h3>24</h3>
      </div>
      <div className="invoicesBoxData">
        <IoDocumentAttach />
        <p>Invoices</p>
        <h3>109</h3>
      </div>
      <div className="invoicesBoxData">
        {" "}
        <GiReceiveMoney />
        <p>Paid</p>
        <h3>{formatCurrency(23445)}</h3>
      </div>
      <div className="invoicesBoxData">
        {" "}
        <GrDocumentTime />
        <p>In progress</p>
        <h3>6</h3>
      </div>
    </div>
  )
}
