import { useState } from "react"
import "./InvoiceDetails.scss"

export default function InvoiceDetails() {
  const [invoice] = useState(14120)
  return (
    <>
      <div className="invoiceDetails">
        <div className="statusSide">
          <span>Status : Sent</span> <button>Export</button>
        </div>
        <div className="detailsSide">
          <div className="invoice">
            <h4>Invoice : {invoice}</h4>
            <div className="labelValue">
              <label>Invoice Number</label>
              {invoice}
            </div>
            <div className="labelValue">
              <label>Issue Date</label>
              24 / 12 / 2023
            </div>
          </div>
          <div className="client">
            <h4>Client Electron</h4>
            <p>244 W Ashland Ave Street, Test Louiseville, new Year station 245, by the bridges</p>
          </div>
        </div>
        <div>More info will be here</div>
      </div>
    </>
  )
}
