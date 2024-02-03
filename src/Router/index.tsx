import { Routes, Route } from "react-router-dom"
import Home from "../Views/Home/Home"
import Clients from "../Views/Clients/Clients"
import Payments from "../Views/Payments/Payments"
import InvoicePreview from "../Views/Invoice/Invoice"
export default function RouteView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<div>SEttings</div>} />
      <Route path="/editInvoice/:id" element={<InvoicePreview />} />
      <Route path="*" element={<div>Not Found 404</div>} />
    </Routes>
  )
}
