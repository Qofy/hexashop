'use client';

import { useState } from 'react';
import MyAccountHeader from './MyAccountHeader';
import MyAccountNav from './MyAccountNav';
import ProfileSection from './ProfileSection';
import AddressesSection from './AddressesSection';
import SettingsSection from './SettingsSection';

type Section = 'profile' | 'addresses' | 'settings';

export default function MyAccountClient() {
  const [activeSection, setActiveSection] = useState<Section>('profile');

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <MyAccountHeader />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12">
        <MyAccountNav activeSection={activeSection} setActiveSection={setActiveSection} />

        <div className="mt-8">
          {activeSection === 'profile' && <ProfileSection />}
          {activeSection === 'addresses' && <AddressesSection />}
          {activeSection === 'settings' && <SettingsSection />}
        </div>
      </div>
    </div>
  );
}
