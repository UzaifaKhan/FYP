import React, { useState } from 'react';
import restaurantService from '../API/restaurantService';

const Restaurant = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedRestaurant, setSubmittedRestaurant] = useState(null);

  const [restaurantDetails, setRestaurantDetails] = useState({
    name: '',
    picture: ''
  });

  const [menuItems, setMenuItems] = useState([]);
  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    picture: '',
    price: ''
  });

  const [review, setReview] = useState({
    text: '',
    rating: '1',
    waiterName: '',
    tableNumber: '',
    orderPrice: ''
  });

  const handleRestaurantChange = (e) => {
    const { name, value } = e.target;
    setRestaurantDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded restaurant image file to base64 string
  const handleRestaurantImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRestaurantDetails((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewMenuItemChange = (e) => {
    const { name, value } = e.target;
    setNewMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  // Convert uploaded menu item image file to base64 string
  const handleNewMenuItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMenuItem((prev) => ({ ...prev, picture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const addMenuItem = () => {
    if (!newMenuItem.name || !newMenuItem.picture || !newMenuItem.price) {
      setError('Please fill in all menu item fields');
      return;
    }
    setMenuItems([...menuItems, newMenuItem]);
    setNewMenuItem({ name: '', picture: '', price: '' });
    setError('');
  };

  const nextStep = () => {
    if (step === 1 && (!restaurantDetails.name || !restaurantDetails.picture)) {
      setError('Please fill in all restaurant details');
      return;
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  // Submit the restaurant and its menu items
  const handleRestaurantSubmit = async () => {
    if (menuItems.length === 0) {
      setError('Please add at least one menu item');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...restaurantDetails,
        menuItems
      };
      const data = await restaurantService.addRestaurant(payload);
      setSubmittedRestaurant(data);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Failed to submit restaurant');
    } finally {
      setLoading(false);
    }
  };

  // Submit a review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!review.text || !review.waiterName || !review.tableNumber || !review.orderPrice) {
      setError('Please fill in all review fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const payload = {
        ...review,
        restaurantId: submittedRestaurant?.id
      };
      await restaurantService.submitReview(payload);
      alert('Review submitted successfully!');
    } catch (err) {
      setError(err.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-black text-white p-4 flex justify-between items-center">
        <div className="text-xl font-medium">
          VOC <span className="text-sm ml-2 text-gray-400">for Restaurants</span>
        </div>
      </nav>

      <div className="flex flex-1 items-center justify-center p-8">
        {step === 1 && (
          <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Restaurant Details</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Restaurant Name*</label>
              <input
                type="text"
                name="name"
                value={restaurantDetails.name}
                onChange={handleRestaurantChange}
                className="w-full p-3 border rounded-md bg-gray-50"
                placeholder="Enter restaurant name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Restaurant Picture*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleRestaurantImageChange}
                className="w-full p-3 border rounded-md bg-gray-50"
                required
              />
            </div>
            <div className="flex justify-end">
              <button onClick={nextStep} className="px-4 py-2 bg-black text-white rounded">
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Add Menu Items</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Item Name*</label>
              <input
                type="text"
                name="name"
                value={newMenuItem.name}
                onChange={handleNewMenuItemChange}
                className="w-full p-3 border rounded-md bg-gray-50"
                placeholder="Enter item name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Item Picture*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleNewMenuItemImageChange}
                className="w-full p-3 border rounded-md bg-gray-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Price*</label>
              <input
                type="number"
                name="price"
                value={newMenuItem.price}
                onChange={handleNewMenuItemChange}
                className="w-full p-3 border rounded-md bg-gray-50"
                placeholder="Enter price"
              />
            </div>
            <div className="flex justify-between items-center">
              <button onClick={prevStep} className="px-4 py-2 bg-gray-300 text-black rounded">
                Back
              </button>
              <button onClick={addMenuItem} className="px-4 py-2 bg-blue-500 text-white rounded">
                Add Item
              </button>
              <button onClick={nextStep} className="px-4 py-2 bg-black text-white rounded">
                Next
              </button>
            </div>
            {menuItems.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Menu Items Added:</h3>
                <ul>
                  {menuItems.map((item, index) => (
                    <li key={index} className="mb-2 flex items-center space-x-4">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">${item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="w-full max-w-3xl bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Restaurant Overview</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold">{restaurantDetails.name}</h3>
              {restaurantDetails.picture && (
                <img
                  src={restaurantDetails.picture}
                  alt={restaurantDetails.name}
                  className="w-full h-64 object-cover rounded mt-4"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Menu Items</h3>
              {menuItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.map((item, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <img
                        src={item.picture}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded"
                      />
                      <h4 className="mt-2 font-medium">{item.name}</h4>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No menu items added yet.</p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button onClick={prevStep} className="px-4 py-2 bg-gray-300 text-black rounded">
                Back
              </button>
              <button
                onClick={handleRestaurantSubmit}
                className="px-4 py-2 bg-black text-white rounded"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Restaurant'}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="w-full max-w-md bg-white p-8 shadow-md rounded">
            <h2 className="text-2xl font-bold mb-4">Submit a Review</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Review Text*</label>
                <textarea
                  name="text"
                  value={review.text}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  placeholder="Enter your review"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rating (1 to 5)*</label>
                <select
                  name="rating"
                  value={review.rating}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  required
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Waiter Name*</label>
                <input
                  type="text"
                  name="waiterName"
                  value={review.waiterName}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  placeholder="Enter waiter name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Table Number*</label>
                <input
                  type="text"
                  name="tableNumber"
                  value={review.tableNumber}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  placeholder="Enter table number"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Order Price*</label>
                <input
                  type="number"
                  name="orderPrice"
                  value={review.orderPrice}
                  onChange={handleReviewChange}
                  className="w-full p-3 border rounded-md bg-gray-50"
                  placeholder="Enter order price"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 bg-gray-300 text-black rounded"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
