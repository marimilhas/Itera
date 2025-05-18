import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Inicio } from "./components/Inicio";
import { Pdca } from "./components/pdca/Pdca";
import { Proyectos } from "./components/proyectos/Proyectos";
import { Ciclos } from "./components/ciclos/Ciclos";
import { ModalDialog } from "./components/ModalDialog";
import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog />
        <Menu />
        <div className="divBody">
          <Routes>
            <Route path="/inicio" element={<Inicio />} />
            <Route
              path="/pdca"
              element={
                <Pdca />
              }
            />
            <Route
              path="/proyectos"
              element={
                <RequireAuth>
                  <Proyectos />
                </RequireAuth>
              }
            />
            <Route
              path="/ciclos"
              element={
                <RequireAuth>
                  <Ciclos />
                </RequireAuth>
              }
            />
            <Route path="/login/:componentFrom" element={<Login />} />
            <Route path="*" element={<Navigate to="/inicio" replace />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

