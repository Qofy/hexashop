'use client';

import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Lock, LogOut, Check, X, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const passwordValidationSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SettingsSection() {
  const router = useRouter();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidationSchema,
    onSubmit: (values) => {
      // In a real app, this would verify current password with backend
      // For now, we'll just save to localStorage
      const savedPassword = localStorage.getItem('userPassword') || '';

      if (values.currentPassword === savedPassword || (!savedPassword && values.currentPassword === 'test')) {
        localStorage.setItem('userPassword', values.newPassword);
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        passwordFormik.resetForm();
        setIsChangingPassword(false);
        setTimeout(() => setPasswordMessage(null), 3000);
      } else {
        setPasswordMessage({ type: 'error', text: 'Current password is incorrect' });
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userAddresses');
    router.push('/');
  };

  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
        <div className="flex items-center gap-3 mb-6 md:mb-8">
          <Lock size={24} className="text-gray-900" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Change Password</h2>
        </div>

        {passwordMessage && (
          <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg flex items-center gap-2 ${
            passwordMessage.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            <AlertCircle size={16} />
            <p className="text-xs md:text-sm">{passwordMessage.text}</p>
          </div>
        )}

        {!isChangingPassword ? (
          <button
            onClick={() => setIsChangingPassword(true)}
            className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
          >
            Change Password
          </button>
        ) : (
          <form onSubmit={passwordFormik.handleSubmit} className="space-y-4 md:space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Current Password</label>
              <input
                type="password"
                {...passwordFormik.getFieldProps('currentPassword')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter current password"
              />
              {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{passwordFormik.errors.currentPassword}</p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">New Password</label>
              <input
                type="password"
                {...passwordFormik.getFieldProps('newPassword')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter new password"
              />
              {passwordFormik.touched.newPassword && passwordFormik.errors.newPassword && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{passwordFormik.errors.newPassword}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Confirm New Password</label>
              <input
                type="password"
                {...passwordFormik.getFieldProps('confirmPassword')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Confirm new password"
              />
              {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{passwordFormik.errors.confirmPassword}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
              >
                <Check size={16} />
                Save Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsChangingPassword(false);
                  passwordFormik.resetForm();
                  setPasswordMessage(null);
                }}
                className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm md:text-base"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Logout */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <LogOut size={24} className="text-gray-900" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Logout</h2>
        </div>
        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">Log out from your account and return to the home page.</p>
        <button
          onClick={handleLogout}
          className="px-4 md:px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
