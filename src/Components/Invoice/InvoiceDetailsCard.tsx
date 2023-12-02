import "./InvoiceDetailsCard.scss"
import { InvoiceType } from "../Types/Invoice"

interface InvoiceProps {
  invoice: InvoiceType | null
}

export default function InvoiceDetailsCard({ invoice }: InvoiceProps) {
  if (invoice === null)
    return (
      <div className="containerDetails">
        {" "}
        <div className="invoiceDetails" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          Select an invoice
        </div>
      </div>
    )

  return (
    <div className="containerDetails">
      <div className="invoiceDetails">
        <div className="statusSide">
          <span>Status : Sent</span> <button>Export</button>
        </div>
        <div className="detailsSide">
          <div className="invoice">
            <h4>Invoice : {invoice.id}</h4>
            <div className="labelValue">
              <label className="gray-text">Invoice Number</label>
              {invoice.name}
            </div>
            <div className="labelValue">
              <label className="gray-text">Issue Date</label>
              {invoice.date_created}
            </div>
          </div>
          <div className="client">
            <h4>{invoice.client}</h4>
            <p className="gray-text">244 W Ashland Ave Street, Test Louiseville, new Year station 245, by the bridges</p>
          </div>
        </div>
        <div className="bottomDetails">
          <div>
            <div className="gray-text">Client</div>
            <h4>Digital Electron</h4>
            <p className="gray-text">Thomas Edison</p>
            <div className="address gray-text">Address of actual client here, with more details</div>
          </div>
          <div>
            <div>
              <div className="gray-text">Total Amountd</div>
              <p>$ 2.240.00</p>
            </div>
            <div>
              <div className="gray-text">Amount Paid</div>
              <p>$ 0.00</p>
            </div>
          </div>
          <div>
            <div>
              <div className="gray-text">Ballance Due</div>
              <p>$ 2.240.00</p>
            </div>
            <div>
              <div className="gray-text">Due Date</div>
              <p>30/12/2023</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
