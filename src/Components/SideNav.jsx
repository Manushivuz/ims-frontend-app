import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate, useLocation } from "react-router-dom";

const SideNav = () => {
  const { dashboard, setDashboard } = useAppContext();
  const [activeItem, setActiveItem] = useState(dashboard);
  const [content, setContent] = useState("Content for Home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const location = useLocation();

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mainContent = document.getElementById("mainContent");
    const sidebar = document.getElementById("sidebar");

    // Sidebar hover effect - only on desktop
    const handleMouseEnter = () => {
      if (windowWidth >= 1024) { // lg breakpoint
        setIsExpanded(true);
        if (mainContent) mainContent.style.marginLeft = "16rem";
      }
    };

    const handleMouseLeave = () => {
      if (windowWidth >= 1024) { // lg breakpoint
        setIsExpanded(false);
        if (mainContent) mainContent.style.marginLeft = "4rem";
      }
    };

    if (sidebar && window.innerWidth >= 1024) {
      sidebar.addEventListener("mouseenter", handleMouseEnter);
      sidebar.addEventListener("mouseleave", handleMouseLeave);
    }

    // Set active item based on current path
    const currentPath = location.pathname.substring(1);
    const matchedItem = menuItems.find(
      (item) => redirectURLs[item.id] === currentPath
    );
    if (matchedItem) {
      setActiveItem(matchedItem.name);
      setDashboard(matchedItem.name);
    }

    // Cleanup event listeners
    return () => {
      if (sidebar) {
        sidebar.removeEventListener("mouseenter", handleMouseEnter);
        sidebar.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [location.pathname, setDashboard]);

  // Menu items
  const menuItems = [
    {
      id: "home",
      name: "Home",
      icon: <Home className="w-5 h-5" />,
      path: "/",
      mobileIcon: <Home className="w-5 h-5" />,
    },
    {
      id: "projects",
      name: "Projects",
      icon: "bi-people",
      path: "/projects",
      mobileIcon: "bi-people",
    },
    {
      id: "rankings",
      name: "Rankings",
      icon: "bi-trophy",
      path: "/intern-rankings",
      mobileIcon: "bi-trophy",
    },
    {
      id: "setting",
      name: "Setting",
      icon: "bi-gear",
      path: "/Setting",
      mobileIcon: "bi-gear",
    },
    {
      id: "help",
      name: "Help",
      icon: "bi-question-circle",
      path: "/help",
      mobileIcon: "bi-question-circle",
    }
  ];

  const redirectURLs = ["", "projects", "intern-rankings", "Setting", "help"];

  const footerItems = [{ name: "Log Out", icon: "bi-box-arrow-left" }];

  // Handle menu click
  const handleMenuClick = (item) => {
    setActiveItem(item);
    setDashboard(item);
    setContent(`Content for ${item}`);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  const handleLogOut = () => {
    navigate("/logout");
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex sidenavbar">
      {/* Desktop SideNav */}
      <div
        id="sidebar"
        className={`bg-gradient-to-b from-blue-600 to-blue-700 h-screen fixed sidenav-container hidden lg:flex ${isExpanded ? "w-64" : "w-16"
          } duration-300 text-white flex-col justify-between shadow-lg z-50`}
      >
        {/* Logo/Brand section */}
        <div className="mt-4 sm:mt-6 mb-6 sm:mb-8 flex justify-center">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm">
            <i className="bi bi-layers text-lg sm:text-xl text-white"></i>
          </div>
        </div>

        {/* SideNav Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="px-1 sm:px-2 space-y-1">
            {menuItems.map((item) => {
              const isActive = activeItem === item.name;
              return (
                <li
                  key={item.name}
                  onClick={() => {
                    handleMenuClick(item.name);
                    navigate(`/${redirectURLs[item.id]}`);
                  }}
                  className={`flex items-center py-2 sm:py-3 px-2 sm:px-3 cursor-pointer rounded-lg transition-all duration-200 ${isActive
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-blue-100 hover:bg-white/5"
                    }`}
                >
                  <div className="relative flex items-center">
                    {isActive && (
                      <div className="absolute -left-2 sm:-left-3 w-1 h-5 sm:h-6 bg-white rounded-full"></div>
                    )}
                    <i
                      className={`bi ${item.icon} text-base sm:text-lg ${isActive ? "text-white" : "text-blue-100"
                        }`}
                    ></i>
                    <span
                      className={`ml-3 sm:ml-4 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${isExpanded
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-10 hidden"
                        }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Divider */}
        <div
          className={`mx-2 sm:mx-4 my-3 sm:my-4 border-t border-blue-400/30 ${isExpanded ? "block" : "hidden"
            }`}
        ></div>

        {/* Footer Items */}
        <div className="mb-4 sm:mb-6 px-1 sm:px-2">
          <ul className="space-y-1">
            {footerItems.map((item) => (
              <li
                key={item.name}
                onClick={
                  item.name === "Log Out"
                    ? handleLogOut
                    : () => handleMenuClick(item.name)
                }
                className="flex items-center py-2 sm:py-3 px-2 sm:px-3 hover:bg-white/5 cursor-pointer rounded-lg transition-all duration-200 text-blue-100 hover:text-white"
              >
                <i className={`bi ${item.icon} text-base sm:text-lg`}></i>
                <span
                  className={`ml-3 sm:ml-4 text-xs sm:text-sm whitespace-nowrap transition-all duration-200 ${isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-10 hidden"
                    }`}
                >
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
            {/* Mobile Header */}
            <div className="p-4 border-b border-blue-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <i className="bi bi-layers text-lg text-white"></i>
                  </div>
                  <span className="text-lg font-semibold">Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 transition-colors"
                >
                  <i className="bi bi-x text-xl"></i>
                </button>
              </div>
            </div>

            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <ul className="px-4 space-y-2">
                {menuItems.map((item) => {
                  const isActive = activeItem === item.name;
                  return (
                    <li
                      key={item.name}
                      onClick={() => {
                        handleMenuClick(item.name);
                        navigate(`/${redirectURLs[item.id]}`);
                      }}
                      className={`flex items-center py-3 px-4 cursor-pointer rounded-lg transition-all duration-200 ${isActive
                          ? "bg-white/10 text-white shadow-sm"
                          : "text-blue-100 hover:bg-white/5"
                        }`}
                    >
                      <div className="relative flex items-center">
                        {isActive && (
                          <div className="absolute -left-4 w-1 h-6 bg-white rounded-full"></div>
                        )}
                        <i
                          className={`bi ${item.icon} text-lg ${isActive ? "text-white" : "text-blue-100"
                            }`}
                        ></i>
                        <span className="ml-4 text-sm font-medium">
                          {item.name}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Footer */}
            <div className="p-4 border-t border-blue-500/30">
              <ul className="space-y-2">
                {footerItems.map((item) => (
                  <li
                    key={item.name}
                    onClick={
                      item.name === "Log Out"
                        ? handleLogOut
                        : () => handleMenuClick(item.name)
                    }
                    className="flex items-center py-3 px-4 hover:bg-white/5 cursor-pointer rounded-lg transition-all duration-200 text-blue-100 hover:text-white"
                  >
                    <i className={`bi ${item.icon} text-lg`}></i>
                    <span className="ml-4 text-sm">
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Button - Visible only on small screens */}
      <button
        className="fixed bottom-4 right-4 lg:hidden z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <i className={`bi ${isMobileMenuOpen ? "bi-x" : "bi-list"} text-xl`}></i>
      </button>
    </div>
  );
};

export default SideNav;
