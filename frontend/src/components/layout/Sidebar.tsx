import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Chat", to: "/chat" },
  { label: "First Aid", to: "/first-aid" },
  { label: "Symptoms", to: "/symptoms" },
  { label: "Medicines", to: "/medicines" },
];

export function Sidebar() {
  return (
    <nav
      aria-label="Main navigation"
      className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 p-3 hidden sm:block"
    >
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-info ${
                  isActive ? "bg-gray-100 dark:bg-gray-800 font-medium" : ""
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
