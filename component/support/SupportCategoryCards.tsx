import Link from 'next/link';
import { Package, RotateCcw, Truck, CreditCard, Shield, Clock } from 'lucide-react';

export default function SupportCategoryCards() {
  const categories = [
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Learn about delivery times and shipping options',
      href: '/support#shipping',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: RotateCcw,
      title: 'Returns & Exchanges',
      description: 'Easy returns and exchange process',
      href: '/returns',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Package,
      title: 'Track Order',
      description: 'Check your order status in real-time',
      href: '/tracking',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Accepted payment options and security',
      href: '/support#payment',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Shield,
      title: 'Security & Privacy',
      description: 'Your data is safe and secure',
      href: '/support#security',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Clock,
      title: 'Account Issues',
      description: 'Help with login and account settings',
      href: '/support#account',
      color: 'from-indigo-500 to-indigo-600',
    },
  ];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 md:mb-8">Quick Help</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <Link key={category.title} href={category.href}>
              <div className={`bg-gradient-to-br ${category.color} rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow h-full`}>
                <div className="flex items-start gap-4">
                  <Icon size={32} className="text-white flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white">{category.title}</h3>
                    <p className="text-xs md:text-sm text-blue-100 mt-1">{category.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
