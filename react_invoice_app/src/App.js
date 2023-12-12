import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportsHome from './components/reportComponent/Reports';
import Login from "./components/Login";
import Home from "./components/homeComponent/Home";
import InvoiceForm from "./components/generateInvoiceComponent/InvoiceForm";
import InventoryHome from "./components/inventoryComponents/InventoryHome";
import GST1Report from "./components/reportComponent/GSTReport1"
import GST2Report from "./components/reportComponent/GSTReport2"
import GSTPurchase from "./components/reportComponent/GSTPurchase"
import GSTSales
 from "./components/reportComponent/GSTSales";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/invoice-gen" element={<InvoiceForm />} />
        <Route path="/reports" element={<ReportsHome />} />
        <Route path="/inventory" element={<InventoryHome />} />
        <Route path="/GST1Report" element={<GST1Report />} />
        <Route path="/GST2Report" element={<GST2Report />} />
        <Route path="/GSTPurchase" element={<GSTPurchase />} />
        <Route path="/GSTSales" element={<GSTSales />} />
        
      </Routes>
    </Router>
  );
}

export default App;