import "./InvoiceDetailsCard.scss"
import { InvoiceType } from "../Types/Invoice"
import { formatDate } from "../../Utils/DateFormat"
import { RiSecurePaymentLine } from "react-icons/ri"
import { SVGInvoiceSelect } from "./svgInvoiceSelect"
import { formatCurrency } from "../../Utils/CurrencyFormat"
import { NavLink } from "react-router-dom"
import { FaTrash } from "react-icons/fa6"
import { makeAPIcall } from "../../Utils/API"

interface InvoiceProps {
  invoice: InvoiceType | null
  refreshInvoices?: () => void
}

export default function InvoiceDetailsCard({ invoice, refreshInvoices }: InvoiceProps) {
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

  const deleteInvoice = async () => {
    const postData = {
      id: invoice.id,
    }
    const response = await makeAPIcall("/invoices/remove", "POST", postData)

    if (refreshInvoices && !response.error) refreshInvoices()
  }

  return (
    <div className="containerDetails" key={invoice.id}>
      <div className="invoiceDetails">
        <FaTrash className="deleteInvoice" onClick={deleteInvoice} />
        <div className="statusSide">
          <span>Status : {invoice.status}</span> <button>Export</button>
        </div>
        <div className="detailsSide">
          <div className="invoice">
            <h4> Invoice : {invoice.id}</h4>
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
          <NavLink className="edit" to={"/editInvoice/" + invoice.id}>
            Click Here to Edit Invoice
          </NavLink>
          <div className="edit"></div>
        </div>
      </div>
      <div className="footerContainerInvoiceDetails">
        {Number(invoice.amount) - Number(invoice.amount_paid) !== 0 && invoice.status === "In process" && (
          <button key={invoice.id}>
            {formatCurrency(Number(invoice.amount) - Number(invoice.amount_paid))} - Pay <RiSecurePaymentLine />
          </button>
        )}
      </div>
      <div className="invoicePaymentDetails">
        <h3>{invoice.name} (Details)</h3>
        <div className="flexInvoicePaymentDetails">
          {invoice.items?.map((itemInvoice) => {
            return (
              <div className="row" key={itemInvoice.id}>
                {itemInvoice.name} - {formatCurrency(itemInvoice.price)} <span>({itemInvoice.description})</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
