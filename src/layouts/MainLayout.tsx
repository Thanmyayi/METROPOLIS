import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  return (
    <div className="metropolis-app">
      <Sidebar />

      <main className="metropolis-main">
        <Outlet />
      </main>
    </div>
  );
}