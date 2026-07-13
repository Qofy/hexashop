import { User, MapPin, Settings } from 'lucide-react';

type Section = 'profile' | 'addresses' | 'settings';

type Props = {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
};

export default function MyAccountNav({ activeSection, setActiveSection }: Props) {
  const sections = [
    { id: 'profile' as Section, label: 'Profile', icon: User },
    { id: 'addresses' as Section, label: 'Addresses', icon: MapPin },
    { id: 'settings' as Section, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex gap-2 md:gap-6 border-b border-gray-200 overflow-x-auto">
      {sections.map(section => {
        const Icon = section.icon;
        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center gap-2 px-3 md:px-6 py-3 md:py-4 whitespace-nowrap text-sm md:text-base font-medium transition-colors border-b-2 ${
              activeSection === section.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon size={18} className="md:w-5 md:h-5" />
            {section.label}
          </button>
        );
      })}
    </div>
  );
}
