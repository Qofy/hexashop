'use client';

import { Metadata } from "next";
import { content } from '@/data/componentDatas/content_context';
import { Phone, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: "Contact Us - HexaShop",
  description: "Get in touch with HexaShop's customer support team. Find contact information, phone numbers, and reach out to us with your inquiries.",
};

export default function ContactUs() {
  const contactContent = content.ContactUs;

  return (
    <div className="min-h-screen bg-gray-800 bg-cover bg-center pt-20" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-5xl font-bold text-center text-white mb-16">
          {contactContent?.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white p-10 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex justify-center mb-6">
              <Phone className="w-16 h-16 text-gray-800" strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              {contactContent?.salesTitle}
            </h2>

            <p className="text-gray-700 text-center mb-6 leading-relaxed">
              {contactContent?.salesDescription}
            </p>

            <div className="text-center">
              <a href="/sales" className="text-gray-800 font-semibold hover:text-blue-600 transition-colors underline">
                {contactContent?.salesLinkText}
              </a>
            </div>
          </div>

          <div className="bg-white p-10 rounded-lg shadow-xl hover:shadow-2xl transition-shadow">
            <div className="flex justify-center mb-6">
              <Headphones className="w-16 h-16 text-gray-800" strokeWidth={1.5} />
            </div>

            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
              {contactContent?.supportTitle}
            </h2>

            <p className="text-gray-700 text-center mb-8 leading-relaxed">
              {contactContent?.supportDescription}
            </p>

            <div className="text-center">
              <button className="px-8 py-3 border-2 border-gray-800 text-gray-800 font-bold rounded hover:bg-gray-800 hover:text-white transition-all duration-300">
                {contactContent?.supportButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
