import { Routes, Route } from "react-router-dom"
import Home from "../Views/Home/Home"
export default function RouteView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contacts" element={<div>Contacts</div>} />
      <Route path="/payments" element={<div>Payments Tab here to clients</div>} />
      <Route path="/settings" element={<div>SEttings</div>} />
    </Routes>
  )
}
