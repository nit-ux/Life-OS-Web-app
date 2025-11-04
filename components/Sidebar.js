import Link from 'next/link';

// We will add icons later. For now, we use simple text.
const menuItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Transactions', path: '#' }, // Will create these pages later
  { name: 'Settings', path: '/settings' },
  { name: 'Analytics', path: '/analytics' },
];

export default function Sidebar() {
  return (
    <div className="h-screen bg-white shadow-lg w-64 flex-shrink-0 p-4">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">Life-OS</h1>
      </div>
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path} legacyBehavior>
                <a className="flex items-center p-3 my-2 text-gray-700 rounded-lg hover:bg-indigo-100 font-medium">
                  {item.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
