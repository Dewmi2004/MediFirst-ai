const links = [
  { label: "Dashboard", href: "#" },
  { label: "Chat", href: "#" },
  { label: "First Aid", href: "#" },
  { label: "Symptoms", href: "#" },
  { label: "Medicines", href: "#" },
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
            <a
              href={link.href}
              className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-info"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
