import { Routes, Route } from "react-router-dom"
import Home from "../Views/Home/Home"
import Clients from "../Views/Clients/Clients"
import Payments from "../Views/Payments/Payments"
export default function RouteView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/settings" element={<div>SEttings</div>} />
    </Routes>
  )
}
