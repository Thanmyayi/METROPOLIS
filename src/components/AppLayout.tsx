import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-area">
        <div className="main-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}