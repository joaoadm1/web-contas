import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { BillPaymentList } from "../pages/Bills/BillPaymentList";

export function Router (){
    return(
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/listar/contas" element={<BillPaymentList />} />

        </Routes>
    )
}