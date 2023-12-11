import { Routes, Route } from "react-router-dom"
import Home from "../Views/Home/Home"
import Clients from "../Views/Clients/Clients"
export default function RouteView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/payments" element={<div>Payments Tab here to clients</div>} />
      <Route path="/settings" element={<div>SEttings</div>} />
    </Routes>
  )
}
