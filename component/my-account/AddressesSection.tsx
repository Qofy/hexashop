'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';

type Address = {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

const validationSchema = Yup.object().shape({
  label: Yup.string().required('Address label is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string().required('Zip code is required'),
  country: Yup.string().required('Country is required'),
});

export default function AddressesSection() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const savedAddresses = localStorage.getItem('userAddresses');
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses));
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      label: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (editingId) {
        setAddresses(addresses.map(addr => (addr.id === editingId ? { ...values, id: editingId } : addr)));
        setEditingId(null);
      } else {
        setAddresses([...addresses, { ...values, id: Date.now().toString() }]);
      }
      formik.resetForm();
      setIsAdding(false);
      localStorage.setItem('userAddresses', JSON.stringify(addresses));
    },
  });

  const handleEdit = (address: Address) => {
    formik.setValues(address);
    setEditingId(address.id);
    setIsAdding(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    localStorage.setItem('userAddresses', JSON.stringify(addresses.filter(addr => addr.id !== id)));
  };

  return (
    <div className="space-y-6">
      {/* Add Address Button */}
      {!isAdding && (
        <button
          onClick={() => {
            setIsAdding(true);
            formik.resetForm();
            setEditingId(null);
          }}
          className="flex items-center gap-2 px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base"
        >
          <Plus size={16} />
          Add Address
        </button>
      )}

      {/* Add/Edit Form */}
      {isAdding && (
        <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
            {editingId ? 'Edit Address' : 'Add New Address'}
          </h3>
          <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
            {/* Label */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Address Label (e.g., Home, Work)</label>
              <input
                type="text"
                {...formik.getFieldProps('label')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="e.g., Home"
              />
              {formik.touched.label && formik.errors.label && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.label}</p>
              )}
            </div>

            {/* Street */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Street Address</label>
              <input
                type="text"
                {...formik.getFieldProps('street')}
                className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                placeholder="Enter street address"
              />
              {formik.touched.street && formik.errors.street && (
                <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.street}</p>
              )}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">City</label>
                <input
                  type="text"
                  {...formik.getFieldProps('city')}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                  placeholder="Enter city"
                />
                {formik.touched.city && formik.errors.city && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.city}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">State</label>
                <input
                  type="text"
                  {...formik.getFieldProps('state')}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                  placeholder="Enter state"
                />
                {formik.touched.state && formik.errors.state && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.state}</p>
                )}
              </div>
            </div>

            {/* Zip Code & Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Zip Code</label>
                <input
                  type="text"
                  {...formik.getFieldProps('zipCode')}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                  placeholder="Enter zip code"
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.zipCode}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 md:mb-2">Country</label>
                <input
                  type="text"
                  {...formik.getFieldProps('country')}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 text-sm md:text-base"
                  placeholder="Enter country"
                />
                {formik.touched.country && formik.errors.country && (
                  <p className="text-red-500 text-xs md:text-sm mt-1">{formik.errors.country}</p>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 md:px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm md:text-base"
              >
                <Check size={16} />
                {editingId ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAdding(false);
                  setEditingId(null);
                  formik.resetForm();
                }}
                className="flex items-center gap-2 px-4 md:px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors text-sm md:text-base"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      <div className="space-y-3 md:space-y-4">
        {addresses.length === 0 && !isAdding && (
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8 text-center">
            <p className="text-gray-600 text-sm md:text-base">No addresses saved yet. Add one to get started!</p>
          </div>
        )}

        {addresses.map(address => (
          <div key={address.id} className="bg-white rounded-lg shadow-md p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-sm md:text-base">{address.label}</h3>
                <p className="text-xs md:text-sm text-gray-600 mt-2">{address.street}</p>
                <p className="text-xs md:text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-xs md:text-sm text-gray-600">{address.country}</p>
              </div>
              <div className="flex gap-2 md:gap-3 ml-4">
                <button
                  onClick={() => handleEdit(address)}
                  className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                  aria-label="Edit address"
                >
                  <Edit2 size={16} className="text-blue-600" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  aria-label="Delete address"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
