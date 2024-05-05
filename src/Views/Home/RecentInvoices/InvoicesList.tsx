import "./InvoicesList.scss"
import { InvoiceType } from "../../../Components/Types/Invoice"
import { formatDate } from "../../../Utils/DateFormat"
import LoadingSpinner from "../../../Components/Loading/Loading"
import { FaCheckCircle } from "react-icons/fa"
import { PiSealWarningBold } from "react-icons/pi"
import moment from "moment"
import { formatCurrency } from "../../../Utils/CurrencyFormat"
import { Reorder } from "framer-motion"
import { useState } from "react"
import { MdDragIndicator } from "react-icons/md"

interface InvoicesListProps {
  invoices: InvoiceType[]
  loading: boolean
  selectInvoice: (invoice: InvoiceType) => void
}

export default function InvoicesList({ invoices, loading, selectInvoice }: InvoicesListProps) {
  const [currentListInvoices, setCurrentListInvoices] = useState(invoices)

  const checkInvoiceExpiration = (invoiceParam: InvoiceType) => {
    if (Number(invoiceParam.amount) - Number(invoiceParam.amount_paid) === 0) return false
    if (invoiceParam.status === "Sent") return false
    const today = moment()
    const dueDate = moment(invoiceParam.due_date)

    if (today.isAfter(dueDate, "day")) return true

    return false
  }

  return (
    <>
      <div className="invoicesList">
        <div style={{ display: "flex", alignItems: "center" }}>
          <MdDragIndicator /> Drag them to reorder
        </div>

        {loading && <LoadingSpinner />}
        <div className="scrollbar">
          <Reorder.Group axis="y" values={currentListInvoices} onReorder={setCurrentListInvoices}>
            {currentListInvoices.length ? (
              currentListInvoices.map((invoice) => {
                return (
                  <Reorder.Item value={invoice} className="invoiceItem" key={invoice.id}>
                    <div className="client">
                      <span onClick={() => selectInvoice(invoice)}>
                        {invoice.name} {invoice.status === "Sent" && <FaCheckCircle />}
                        {checkInvoiceExpiration(invoice) && (
                          <span className="expired">
                            <PiSealWarningBold />
                            {"Expired "}
                          </span>
                        )}
                      </span>{" "}
                      <span> {formatCurrency(invoice.amount)}</span>
                    </div>
                    <div className="details">
                      <span>INV-{invoice.id}</span>
                      <span>{formatDate(invoice.issue_date)}</span> <span> {invoice.status}</span>
                    </div>
                  </Reorder.Item>
                )
              })
            ) : (
              <div className="invoiceItem empty">No Invoices Found</div>
            )}
          </Reorder.Group>
        </div>
      </div>
    </>
  )
}
