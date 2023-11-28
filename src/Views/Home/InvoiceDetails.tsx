import { useState } from "react"
import "./InvoiceDetails.scss"

export default function InvoiceDetails() {
  const [invoice] = useState(14120)
  return (
    <div className="containerDetails">
      <div className="invoiceDetails">
        <div className="statusSide">
          <span>Status : Sent</span> <button>Export</button>
        </div>
        <div className="detailsSide">
          <div className="invoice">
            <h4>Invoice : {invoice}</h4>
            <div className="labelValue">
              <label className="gray-text">Invoice Number</label>
              {invoice}
            </div>
            <div className="labelValue">
              <label className="gray-text">Issue Date</label>
              24/12/2023
            </div>
          </div>
          <div className="client">
            <h4>Client Electron</h4>
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
      <div>A table should be here</div>
    </div>
  )
}
