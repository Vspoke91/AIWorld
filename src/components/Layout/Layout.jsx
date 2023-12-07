// React imports
import { Outlet } from "react-router-dom";

// Component imports
import LayoutHeader from "./LayoutHeader";
import LayoutFooter from "./LayoutFooter";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      <LayoutHeader />
      <main className="z-[1] flex-grow transition-all peer-aria-expanded/header:ml-custom_header">
        <Outlet />
      </main>
      <LayoutFooter />
    </div>
  );
};

export default Layout;
