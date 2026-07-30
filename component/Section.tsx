import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  padding?: 'sm' | 'md' | 'lg';
}

export default function Section({
  children,
  className = '',
  bgColor = 'bg-white',
  padding = 'lg'
}: SectionProps) {
  const paddingMap = {
    sm: 'px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10',
    md: 'px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16',
    lg: 'px-8 md:px-12 lg:px-16 py-10 md:py-16 lg:py-16',
  };

  return (
    <section className={`${bgColor} ${paddingMap[padding]} ${className}`}>
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
}
