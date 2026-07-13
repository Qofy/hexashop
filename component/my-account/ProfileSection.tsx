'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Edit2, Check, X } from 'lucide-react';

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
});

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const formik = useFormik({
    initialValues: profile,
    validationSchema,
    onSubmit: (values) => {
      localStorage.setItem('userProfile', JSON.stringify(values));
      setProfile(values);
      setIsEditing(false);
    },
    enableReinitialize: true,
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Profile Information</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            <Edit2 size={16} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">First Name</label>
              <input
                type="text"
                {...formik.getFieldProps('firstName')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter first name"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Last Name</label>
              <input
                type="text"
                {...formik.getFieldProps('lastName')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter last name"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Email</label>
              <input
                type="email"
                {...formik.getFieldProps('email')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Phone</label>
              <input
                type="tel"
                {...formik.getFieldProps('phone')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter phone number"
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
            >
              <Check size={16} />
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                formik.resetForm();
              }}
              className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm md:text-base"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">First Name</p>
              <p className="text-sm md:text-base text-gray-900 mt-1">{profile.firstName || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Last Name</p>
              <p className="text-sm md:text-base text-gray-900 mt-1">{profile.lastName || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Email</p>
              <p className="text-sm md:text-base text-gray-900 mt-1">{profile.email || 'Not set'}</p>
            </div>
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-600">Phone</p>
              <p className="text-sm md:text-base text-gray-900 mt-1">{profile.phone || 'Not set'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
