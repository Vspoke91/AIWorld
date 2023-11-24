// React imports
import { Outlet } from "react-router-dom";

// Component imports
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <LayoutHeader />
      <main className="flex-grow">
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
