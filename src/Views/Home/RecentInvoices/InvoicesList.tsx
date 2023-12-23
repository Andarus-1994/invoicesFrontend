import "./InvoicesList.scss"
import { InvoiceType } from "../../../Components/Types/Invoice"
import { formatDate } from "../../../Utils/DateFormat"
import LoadingSpinner from "../../../Components/Loading/Loading"
import { FaCheckCircle } from "react-icons/fa"
import { PiSealWarningBold } from "react-icons/pi"
import moment from "moment"

interface InvoicesListProps {
  invoices: InvoiceType[]
  loading: boolean
  selectInvoice: (invoice: InvoiceType) => void
}

export default function InvoicesList({ invoices, loading, selectInvoice }: InvoicesListProps) {
  const formatCurrency = (number: string | number) => {
    let numberType = number

    if (!isNaN(Number(number))) {
      numberType = parseFloat(String(number))
    }

    return numberType.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const checkInvoiceExpiration = (invoiceParam: InvoiceType) => {
    if (Number(invoiceParam.amount) - Number(invoiceParam.amount_paid) === 0) return false
    if (invoiceParam.status === "Sent") return false
    const today = moment()
    const dueDate = moment(invoiceParam.due_date, "DD-MM-YYYY")
    if (today.diff(dueDate) > 0) return true
  }

  return (
    <>
      <div className="invoicesList">
        {loading && <LoadingSpinner />}
        <div className="scrollbar">
          {invoices.length ? (
            invoices.map((invoice) => {
              return (
                <div className="invoiceItem" key={invoice.id}>
                  <div className="client">
                    <span onClick={() => selectInvoice(invoice)}>
                      {invoice.client} {invoice.status === "Sent" && <FaCheckCircle />}
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
                </div>
              )
            })
          ) : (
            <div className="invoiceItem empty">No Invoices Found</div>
          )}
        </div>
      </div>
    </>
  )
}
