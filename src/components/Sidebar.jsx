import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTools,
  FaBars,
  FaSearch,
  FaAngleDown,
  FaAngleUp,
  FaUserFriends,
  FaChartBar,
  FaCog,
  FaFileAlt,
  FaMoneyCheckAlt,
  FaCar,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("invoices");
  const [expandedSubmenu, setExpandedSubmenu] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Project menu items (route, label, icon, optional submenu)
  const menuItems = [
    {
      id: "invoices",
      title: "Invoices",
      icon: <FaFileAlt />,
      to: "/invoices",
      submenu: [],
    },
    {
      id: "vehicle-billing",
      title: "Vehicle Billing",
      icon: <FaCar />,
      to: "/vehicle-billing",
      submenu: [],
    },
    {
      id: "customers",
      title: "Customers",
      icon: <FaUserFriends />,
      to: "/customers",
      submenu: [],
    },
    {
      id: "payments",
      title: "Payments & Reconciliation",
      icon: <FaMoneyCheckAlt />,
      to: "/payments-reconciliation",
      submenu: [],
    },
    {
      id: "product",
      title: "Products",
      icon: <FaTools />,
      to: "/product-management",
      submenu: [],
    },
    {
      id: "tax",
      title: "Tax Config",
      icon: <FaChartBar />,
      to: "/tax-config",
      submenu: [],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (id) => {
    setExpandedSubmenu(expandedSubmenu === id ? "" : id);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        aria-label="Toggle Sidebar"
      >
        <FaBars className="w-6 h-6" />
      </button>

      <aside
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out 
          w-64 z-40 border-r border-gray-200 lg:translate-x-0`}
      >
        <div className="p-4 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <div key={item.id} className="space-y-1">
                {item.submenu && item.submenu.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium rounded-lg
                        text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200`}
                      aria-expanded={expandedSubmenu === item.id}
                      aria-controls={`submenu-${item.id}`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{item.icon}</span>
                        <span>{item.title}</span>
                      </div>
                      <span className="text-sm">
                        {expandedSubmenu === item.id ? (
                          <FaAngleUp />
                        ) : (
                          <FaAngleDown />
                        )}
                      </span>
                    </button>

                    <div
                      id={`submenu-${item.id}`}
                      className={`${
                        expandedSubmenu === item.id ? "max-h-40" : "max-h-0"
                      } overflow-hidden transition-all duration-300 ease-in-out pl-8`}
                    >
                      {item.submenu.map((sub) => (
                        <NavLink
                          key={sub.id}
                          to={sub.to}
                          className={({ isActive }) =>
                            `w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                              isActive
                                ? "bg-blue-500 text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-lg">{sub.icon}</span>
                          <span>{sub.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NavLink
                    to={item.to || "/"}
                    className={({ isActive }) =>
                      `w-full flex items-center justify-start px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{item.icon}</span>
                      <span>{item.title}</span>
                    </div>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
