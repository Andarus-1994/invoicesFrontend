import BoxesDetails from "./BoxesDetails"
import "./Payments.scss"
import Transactions from "./Transactions"

export default function Payments() {
  return (
    <div className="payments">
      <BoxesDetails />
      <Transactions />
    </div>
  )
}
