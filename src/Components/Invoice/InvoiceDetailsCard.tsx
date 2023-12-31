import "./InvoiceDetailsCard.scss"
import { InvoiceType } from "../Types/Invoice"
import { formatDate } from "../../Utils/DateFormat"
import { RiSecurePaymentLine } from "react-icons/ri"
import { SVGInvoiceSelect } from "./svgInvoiceSelect"
import { formatCurrency } from "../../Utils/CurrencyFormat"

interface InvoiceProps {
  invoice: InvoiceType | null
}

export default function InvoiceDetailsCard({ invoice }: InvoiceProps) {
  if (invoice === null)
    return (
      <div className="containerDetails">
        {" "}
        <div className="invoiceDetails" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px" }}>
          <SVGInvoiceSelect />
          Select an invoice
        </div>
      </div>
    )

  return (
    <div className="containerDetails" key={invoice.id}>
      <div className="invoiceDetails">
        <div className="statusSide">
          <span>Status : {invoice.status}</span> <button>Export</button>
        </div>
        <div className="detailsSide">
          <div className="invoice">
            <h4>Invoice : {invoice.id}</h4>
            <div className="labelValue">
              <label className="gray-text">Invoice Number</label>
              {invoice.id}
            </div>
            <div className="labelValue">
              <label className="gray-text">Issue Date</label>
              {formatDate(invoice.issue_date)}
            </div>
          </div>
          <div className="client">
            <h4>{invoice.company_name}</h4>
            <p className="gray-text">{invoice.company_address}</p>
          </div>
        </div>
        <div className="bottomDetails">
          <div>
            <div className="gray-text">Client</div>
            <h4>{invoice.client}</h4>
            <p className="gray-text">{invoice.name}</p>
            <div className="address gray-text">{invoice.address}</div>
          </div>
          <div>
            <div>
              <div className="gray-text">Total Amount</div>
              <p>{formatCurrency(invoice.amount)}</p>
            </div>
            <div>
              <div className="gray-text">Amount Paid</div>
              <p>{formatCurrency(invoice.amount_paid)}</p>
            </div>
          </div>
          <div>
            <div>
              <div className="gray-text">Ballance Due</div>
              <p> {formatCurrency(Number(invoice.amount) - Number(invoice.amount_paid))}</p>
            </div>
            <div>
              <div className="gray-text">Due Date</div>
              <p>{formatDate(invoice.due_date)}</p>
            </div>
          </div>
        </div>
      </div>
      {Number(invoice.amount) - Number(invoice.amount_paid) !== 0 && invoice.status === "In process" && (
        <button key={invoice.id}>
          {formatCurrency(Number(invoice.amount) - Number(invoice.amount_paid))} - Pay <RiSecurePaymentLine />
        </button>
      )}
    </div>
  )
}
