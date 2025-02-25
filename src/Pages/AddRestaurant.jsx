import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import restaurantService from '../API/restaurantService';

const AddRestaurant = () => {
  const navigate = useNavigate();
  const [businessTypes, setBusinessTypes] = useState([]);
  const [formData, setFormData] = useState({
    storeAddress: '',
    floorSuite: '',
    storeName: '',
    brandName: '',
    businessTypeId: '', // Changed from businessType to businessTypeId
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '+92',
    agreedToPrivacy: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBusinessTypes();
  }, []);

  const fetchBusinessTypes = async () => {
    try {
      const types = await restaurantService.getBusinessTypes();
      setBusinessTypes(types);
    } catch (error) {
      setError('Failed to load business types');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.storeAddress ||
      !formData.storeName ||
      !formData.brandName ||
      !formData.businessTypeId || // Changed from businessType to businessTypeId
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.agreedToPrivacy
    ) {
      setError('Please fill in all required fields');
      return false;
    }
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  if (!validateForm()) return;

  setLoading(true);
  try {
    // Validate the address
    await restaurantService.validateAddress(formData.storeAddress);

    // Prepare the data to match the backend model
    const businessData = {
      StoreAddress: formData.storeAddress,
      FloorSuite: formData.floorSuite || null,
      StoreName: formData.storeName,
      BrandName: formData.brandName,
      BusinessTypeId: parseInt(formData.businessTypeId, 10),
      FirstName: formData.firstName,
      LastName: formData.lastName,
      Email: formData.email,
      PhoneNumber: formData.phoneNumber,
      AgreedToPrivacy: formData.agreedToPrivacy,
    };

    // Send the data to the backend
    await restaurantService.addRestaurant(businessData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-xl font-medium">
          VOC
          <span className="text-sm ml-2 text-gray-400">for Merchants</span>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <span className="mr-2">EN</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <button onClick={handleLogin} className="px-4 py-2 text-sm font-medium hover:bg-gray-800 rounded">
            Log in
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left section with background image */}
        <div className="relative w-1/2 bg-gray-900">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/AddRestaurant.webp')",
              backgroundBlend: 'overlay',
            }}
          >
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 p-12 text-white">
            <h1 className="text-5xl font-bold mb-4">
              Unlock a new<br />revenue stream
            </h1>
            <p className="text-lg">
              VOC's global platform gives you the flexibility, visibility and
              customer insights you need to connect with more customers.
              Partner with us today.
            </p>
          </div>
        </div>

        {/* Right section with form */}
        <div className="w-1/2 bg-white p-12">
          <div className="max-w-md">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Get started</h2>
              <button onClick={handleLogin} className="text-sm hover:underline">
                Already have an account?
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Store address*</label>
                <input
                  type="text"
                  name="storeAddress"
                  value={formData.storeAddress}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Floor / Suite (Optional)</label>
                <input
                  type="text"
                  name="floorSuite"
                  value={formData.floorSuite}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Store name*</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  placeholder="Example: Sam's Pizza - 123 Main street"
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  This is how your store will appear in the app.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Brand name*</label>
                <input
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleInputChange}
                  placeholder="Example: Sam's Pizza"
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                />
                <p className="text-sm text-gray-600 mt-1">
                  We'll use this to help organize information that is shared across stores.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business type*</label>
                <select
                  name="businessTypeId" // Changed from businessType to businessTypeId
                  value={formData.businessTypeId}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                >
                  <option value="">Select...</option>
                  {businessTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First name*</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last name*</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-md bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Phone Number*</label>
                <div className="flex">
                  <div className="flex-shrink-0">
                    <button
                      type="button"
                      className="flex items-center px-3 py-3 bg-gray-50 border border-r-0 rounded-l-md"
                    >
                      <span className="mr-2">PK</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="flex-1 p-3 border border-l-0 rounded-r-md bg-gray-50"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="agreedToPrivacy"
                  checked={formData.agreedToPrivacy}
                  onChange={handleInputChange}
                  className="h-4 w-4"
                  required
                />
                <label className="text-sm text-gray-600">
                  By clicking "Submit", you agree to the{' '}
                  <a href="#" className="text-black hover:underline">
                    Privacy Notice
                  </a>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-black text-white rounded-md transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
                }`}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Why VOC Section */}
      <div className="bg-white py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why VOC?</h2>

          <div className="grid grid-cols-3 gap-12">
            {/* Deliver your way */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Deliver your way</h3>
              <p className="text-gray-600">
                Our offerings are flexible so you can customize them to your needs. Get started with your
                delivery people or connect with delivery people through the VOC platform.
              </p>
            </div>

            {/* Boost your visibility */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Boost your visibility</h3>
              <p className="text-gray-600">
                Stand out with in-app marketing to reach even more customers and increase sales.
              </p>
            </div>

            {/* Connect with customers */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Connect with customers</h3>
              <p className="text-gray-600">
                Turn customers into regulars with actionable data insights, respond to reviews or offer a
                loyalty program.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How VOC Works Section */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How VOC works for restaurant partners</h2>

          <div className="grid grid-cols-3 gap-12">
            {/* Customers Order */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-0 h-64 flex items-center justify-center">
                <img
                  src="/CustomersOrder.svg"
                  alt="Customer ordering food"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Customers order</h3>
              <p className="text-gray-600">
                A customer finds your restaurant and places an order through the VOC website
              </p>
            </div>

            {/* You Prepare */}
            <div className="space-y-6">
              <div className="bg-green-50 rounded-lg p-0 h-64 flex items-center justify-center">
                <img
                  src="/YouPrepare.svg"
                  alt="Restaurant preparing order"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">You prepare</h3>
              <p className="text-gray-600">
                Your restaurant accepts and prepares the order.
              </p>
            </div>

            {/* Delivery Partners Arrive */}
            <div className="space-y-6">
              <div className="bg-purple-50 rounded-lg p-0 h-64 flex items-center justify-center">
                <img
                  src="/DeliveryPeopleArrive.svg"
                  alt="Delivery partner arriving"
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Delivery partners arrive</h3>
              <p className="text-gray-600">
                Delivery people using the VOC platform pick up the order from your restaurant, then deliver it to the customer.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-black text-white py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <blockquote className="text-4xl font-bold leading-tight">
                "VOC extends our brand awareness to neighborhoods that wouldn't normally be exposed to us."
              </blockquote>
              <div className="space-y-1">
                <p className="text-lg font-medium">Yahya Arsalan</p>
                <p className="text-gray-400">Owner, Poppy + Rose, Los Angeles</p>
              </div>
            </div>

            {/* Image */}
            <div className="relative">
              <img
                src="/AddRestaurant2.webp"
                alt="Diana Yin standing in front of a yellow wings mural"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;