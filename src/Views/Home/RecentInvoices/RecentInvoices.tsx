import "./RecentInvoices.scss"
import InvoicesList from "./InvoicesList"
import InvoiceDetailsCard from "../../../Components/Invoice/InvoiceDetailsCard"
import FilterInvoice from "./FilterInvoice"
import { InvoiceType } from "../../../Components/Types/Invoice"
import { useEffect, useMemo, useState } from "react"

export default function RecentInvoices() {
  const [selectInvoice, setSelectInvoice] = useState<null | InvoiceType>(null)

  const InvoicesArray: InvoiceType[] = useMemo(() => {
    return [
      { id: 1, name: "Electricity  Bill", client: "Electron Plus", amount: 2500, date_created: "23/12/2023" },
      { id: 2, name: "Invoice 245", client: "Bill Bro", amount: 1200, date_created: "15/11/2023" },
      { id: 3, name: "Water Bill", client: "Water Well", amount: 1750, date_created: "29/08/2023" },
      { id: 4, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 5, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 6, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
      { id: 7, name: "Internet Bill", client: "Internet Univ LTD", amount: 50, date_created: "23/08/2023" },
    ]
  }, [])

  useEffect(() => {
    const initialInvoice = InvoicesArray[0]
    setSelectInvoice(initialInvoice)
  }, [InvoicesArray])

  const selectInvoiceFunction = (value: InvoiceType) => {
    setSelectInvoice(value)
  }

  return (
    <>
      <div className="recentInvoices">
        <div>
          <FilterInvoice />
          <InvoicesList invoices={InvoicesArray} selectInvoice={selectInvoiceFunction} />
        </div>
        <InvoiceDetailsCard invoice={selectInvoice} />
      </div>
    </>
  )
}
