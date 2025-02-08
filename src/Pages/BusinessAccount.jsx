import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Headphones, ClipboardList } from "lucide-react"

export default function BusinessAccount() {
  const [activeTab, setActiveTab] = useState('Employees or individuals')
  const [activeDropDown, setActiveDropDown] = useState(null)

  const handleDropdownClick = (dropdown) => {
    if (activeDropDown === dropdown){
      setActiveDropDown(null)
    } else {
      setActiveDropDown(dropdown)
    }
  }
  const renderOverviewDropdown = () => {
    if (activeDropDown !== 'overview') return null;
    
    return (
      <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* About Us Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-red-600 mr-2">📋</span> About us
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">The platform</h4>
                  <p className="text-sm text-gray-600">Get the best of VOC, for business—including improved cost controls and compliance.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Expense integrations</h4>
                  <p className="text-sm text-gray-600">Save time with automatic expense reconciliation</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sustainability</h4>
                  <p className="text-sm text-gray-600">Get clear climate metrics such as total low-emission trips and average CO₂ per mile.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Safety</h4>
                  <p className="text-sm text-gray-600">We make your health and safety top priorities.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employee benefits</h4>
                  <p className="text-sm text-gray-600">All the advantages of VOC your employees already love, for business.</p>
                </div>
              </div>
            </div>
            
            {/* Products Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-blue-600 mr-2">⊞</span> Products
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">The dashboard</h4>
                  <p className="text-sm text-gray-600">It all starts here - manage travel and meal programs with easy to set cost controls and more.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Business profiles</h4>
                  <p className="text-sm text-gray-600">Help your employees connect with your company's VOC for Business account.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Delegate booking</h4>
                  <p className="text-sm text-gray-600">Enable executive assistants to arrange work transportation for executives with a delegate profile.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Central</h4>
                  <p className="text-sm text-gray-600">Request rides and deliveries on behalf of customers.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Gift cards</h4>
                  <p className="text-sm text-gray-600">Purchase VOC gift cards in bulk for simplified giving.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">VOC Health</h4>
                  <p className="text-sm text-gray-600">Reimagine the way patients access care.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">VOC One</h4>
                  <p className="text-sm text-gray-600">Offer business-class perks with an VOC One company membership.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Vouchers</h4>
                  <p className="text-sm text-gray-600">Cover the cost of rides and meals, and pay only when used.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSolutionsDropdown = () => {
    if (activeDropDown !== 'solutions') return null;
    
    return (
      <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 gap-8">
            {/* By use case Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-orange-600 mr-2">★</span> By use case
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Business travel</h4>
                  <p className="text-sm text-gray-600">Oversee your travel program with the flexibility and reporting you need.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employee commute</h4>
                  <p className="text-sm text-gray-600">Set up a stress-free commute program for your employees.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Event transport</h4>
                  <p className="text-sm text-gray-600">Get attendees to and from your next event.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Courtesy rides</h4>
                  <p className="text-sm text-gray-600">Request rides for customers and guests with ease, even if they don't have the VOC site.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Meal programs</h4>
                  <p className="text-sm text-gray-600">One platform gives you the control to provide meals in multiple ways.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employee benefits</h4>
                  <p className="text-sm text-gray-600">Recruit, retain, and reward your employees with VOC perks they want.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Corporate gifting</h4>
                  <p className="text-sm text-gray-600">Purchase VOC gift cards in bulk for simplified giving.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Exec management</h4>
                  <p className="text-sm text-gray-600">Request rides and meals for leaders.</p>
                </div>
              </div>
            </div>
            
            {/* By industry Column */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="text-gray-600 mr-2">🏛</span> By industry
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Automotive</h4>
                  <p className="text-sm text-gray-600">Elevate customer service with on-demand rides.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Healthcare</h4>
                  <p className="text-sm text-gray-600">Improve health outcomes and the patient experience by enabling better access to care.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Hospitality</h4>
                  <p className="text-sm text-gray-600">Delight your guests with rides and meals.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Consulting and financial</h4>
                  <p className="text-sm text-gray-600">Keep your employees moving and your clients happy.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Government</h4>
                  <p className="text-sm text-gray-600">Offer rides and meals to employees and constituents.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCustomerSupportDropdown = () => {
    if (activeDropDown !== 'support') return null;
    
    return (
      <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <Headphones className="w-6 h-6 mr-2 text-blue-600" /> Support
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Help Center</h4>
                <p className="text-sm text-gray-600">For admins and coordinators to browse tips and topics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderResourcesDropdown = () => {
    if (activeDropDown !== 'resources') return null;
    
    return (
      <div className="absolute top-full left-0 w-full bg-white text-black shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <ClipboardList className="w-6 h-6 mr-2 text-blue-600" /> Learn
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">Learning hub</h4>
                <p className="text-sm text-gray-600">Explore product education, case studies, and industry insights.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customer stories</h4>
                <p className="text-sm text-gray-600">See how innovative companies work with us.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Blog</h4>
                <p className="text-sm text-gray-600">Get the latest news from VOC for Business.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a className="text-xl font-bold">
                VOC<br />
                for Business
              </a>
              <div className="hidden md:flex ml-10 space-x-8">
                <button 
                  className="flex items-center text-sm font-medium hover:text-gray-300"
                  onClick={() => handleDropdownClick('overview')}
                >
                  Overview <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${activeDropDown === 'overview' ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  className="flex items-center text-sm font-medium hover:text-gray-300"
                  onClick={() => handleDropdownClick('solutions')}
                >
                  Solutions <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${activeDropDown === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                <a href="/pricing" className="text-sm font-medium hover:text-gray-300">
                  Pricing
                </a>
                <button 
                  className="flex items-center text-sm font-medium hover:text-gray-300"
                  onClick={() => handleDropdownClick('support')}
                >
                  Customer support <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${activeDropDown === 'support' ? 'rotate-180' : ''}`} />
                </button>
                <button 
                  className="flex items-center text-sm font-medium hover:text-gray-300"
                  onClick={() => handleDropdownClick('resources')}
                >
                  Resources <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${activeDropDown === 'resources' ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/contact" className="text-sm font-medium hover:text-gray-300">
                Contact us
              </a>
              <a href="/login" className="text-sm font-medium hover:text-gray-300">
                Log in
              </a>
              <a
                href="/get-started"
                className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
        {renderOverviewDropdown()}
        {renderSolutionsDropdown()}
        {renderCustomerSupportDropdown()}
        {renderResourcesDropdown()}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/public/Capture.jpg')",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              backgroundBlendMode: "overlay",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Fuel your business with great food</h1>
            <p className="text-lg md:text-xl text-white mb-8 max-w-xl">
              Treat employees and clients to corporate meals. Simplify food delivery that's customizable to your
              business, whether you want to provide meals in the office, for remote workers, or at a customer meeting.
            </p>
            <a
              href="/get-started-now"
              className="inline-block bg-white text-black px-6 py-3 rounded-md text-base font-medium hover:bg-gray-100"
            >
              Get started now
            </a>
          </div>
        </div>
      </div>

      {/* Business Meals Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Business meals are great for any occasion</h2>
        <p className="text-lg text-gray-600 mb-8">
          Offering food is an effective way to reward employees and engage customers.
        </p>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {['Employees or individuals', 'Groups and teams', 'Clients or customers'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`border-b-2 py-4 px-1 text-sm font-medium ${
                  activeTab === tab 
                    ? 'border-black' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Conditional Rendering of Meal Options */}
        {activeTab === 'Employees or individuals' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col">
              <div className="mb-4">
                <img
                  src="/meals in office.webp"
                  alt="Meals in the office"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meals in the office</h3>
              <p className="text-gray-600">
                Treat employees to in-office lunches. Let employees choose a delicious meal while they stay within budget and policy.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <img
                  src="/meals after hours.webp"
                  alt="Meals after hours"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meals after hours</h3>
              <p className="text-gray-600">
                Keep your late-night employees fueled with their favorite meals. Set time, day, budget, and item restrictions with a meal program or provide vouchers to employees.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="mb-4">
                <img
                  src="/meals at home.webp"
                  alt="Meals at home"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meals at home</h3>
              <p className="text-gray-600">
                Offer stipends for remote employees, or encourage virtual event attendance with meal vouchers. You can set rules based on location, time, and much more.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Groups and teams' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col">
              <div className="mb-4">
                <img
                src='/meals in the office2.jpg'
                alt='Meals in the office'
                className='w-full h-64 object-cover rounded-lg'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Meals in the office</h3>
              <p className='text-gray-600'>
                Elevate team meals with an automated in-office meal plan. Set up recurring group orders, use auto-checkout, and send daily reminders for easy customization by employees.
              </p>
            </div>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <img
                  src='/meals for celebration.webp'
                  alt='Meals for celebration'
                  className='w-full h-64 object-cover rounded-lg'
                 />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Meals for celebration</h3>
              <p className='text-gray-600'>
              Arrange boxed catering for special occasions like welcoming a new team member, acknowledging work anniversaries, or celebrating holidays. Group orders allow everyone to choose their favorite items, while enjoying together. VOC can help make any celebration memorable.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'Clients or customers' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col">
              <div className="mb-4">
                <img
                src='/meals for events.webp'
                alt='Meals for events'
                className='w-full h-64 object-cover rounded-lg'
                />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Meals for events and conferences</h3>
              <p className='text-gray-600'>
              Provide vouchers and gift cards to encourage in-person or virtual attendance among clients, customers, and partners.
              </p>
            </div>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <img
                  src='/meals as an incentive.webp'
                  alt='Meals as an incentive'
                  className='w-full h-64 object-cover rounded-lg'
                 />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Meals as an incentive</h3>
              <p className='text-gray-600'>
              Cover the cost of lunch by sending vouchers to your top sales prospects. Food always helps to get the conversation started.
              </p>
            </div>
            <div className='flex flex-col'>
              <div className='mb-4'>
                <img
                  src='/meals as a reward.webp'
                  alt='Meals as a reward'
                  className='w-full h-64 object-cover rounded-lg'
                 />
              </div>
              <h3 className='text-xl font-semibold mb-2'>Meals as a reward</h3>
              <p className='text-gray-600'>
              Show your appreciation for their business with a voucher or an VOC gift card* they can use to get tasty treats delivered right to them.
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Platform Control Section */}
<div className='bg-gray-50'>
  <div className='max-w-7xl mx-auto px-4 sm:px-6 py-16'>
    <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-6'>
      One platform gives you the control to provide meals in multiple ways
    </h2>
    <p className='text-lg text-gray-600 mb-8 max-w-3xl'>
      Whether you want to give employees a monthly meal stipend or cover the cost of a single meal, our flexible suite of solutions has you covered.
    </p>

    <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
      {/* Meals Programs */}
      <div className='flex flex-col'>
        <div className='mb-4'>
          <div className='h-20 w-20 rounded-full'>
            <img src='/public/meal programs.svg' alt='icon' />
          </div>
        </div>
        <h3 className='text-xl font-semibold mb-2'>Meal Programs</h3>
        <p className='text-gray-600'>
         Create weekly or monthly meal stipends<br />
         for your employees, who can then order<br />
         on VOC. It's easy to set restrictions<br />
         for time of day, location, and meal budget.
        </p>
      </div>
      {/* Meal Planning */}
      <div className='flex flex-col'>
        <div className='mb-4'>
          <div className='h-20 w-20 rounded-full'>
            <img src='/public/meal planning.webp' alt='icon' />
          </div>
        </div>
        <h3 className='text-xl font-semibold mb-2'>Meal Planning</h3>
        <p className='text-gray-600'>
          Put in-office meals on autopilot for your<br />
          whole team. Use the meal planning<br />
          feature on VOC to schedule<br />
          recurring group orders and have your<br />
          employees add their favorite options<br />
          through daily reminders.
        </p>
      </div>
      {/* Gift Cards */}
      <div className='flex flex-col'>
        <div className='mb-4'>
          <div className='h-20 w-20 rounded-full'>
            <img src='/public/gift cards.svg' alt='icon' />
          </div>
        </div>
        <h3 className='text-xl font-semibold mb-2'>Gift Cards</h3>
        <p className='text-gray-600'>
          Show your appreciation for clients and<br />
          employees with VOC gift cards for rides<br />
          and meals that will never expire.
        </p>
      </div>
      {/* Vouchers */}
      <div className='flex flex-col'>
        <div className='mb-4'>
          <div className='h-20 w-20 rounded-full'>
            <img src='/public/Vouchers.svg' alt='icon' />
          </div>
        </div>
        <h3 className='text-xl font-semibold mb-2'>Vouchers</h3>
        <p className='text-gray-600'>
          Cover the cost of a single meal by sending employees or clients a meal voucher to be redeemed on VOC. You only pay for what is used.
        </p>
      </div>
    </div>
  </div>
 </div>
 {/* Why VOC Section */}
<div className="bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
      Why VOC for Business? The proof is in the platform
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Available Globally */}
      <div className="flex flex-col">
        <div className='mb-4'>
          <div className='h-50 w-50 rounded-full'>
            <img src='/public/Available globally.svg' alt='icon' />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Available globally</h3>
        <p className="text-gray-600">
          VOC for Business is available in 4 cities across Pakistan, making it easy to scale employee meal solutions to current national offices, or as you grow.
        </p>
      </div>

      {/* Sustainability */}
      <div className="flex flex-col">
        <div className='mb-4'>
          <div className='h-50 w-50 rounded-full'>
            <img src='/public/focused on sustainability.svg' alt='icon' />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">Focused on sustainability</h3>
        <p className="text-gray-600">
          Whether it's multimodal delivery to cut down on emissions, utensil opt-in to reduce plastic waste, or group orders to improve efficiency, we operate with sustainability in mind.
        </p>
      </div>

      {/* Unified Platform */}
      <div className="flex flex-col">
        <div className='mb-4'>
          <div className='h-50 w-50 rounded-full'>
            <img src='/public/one platform.svg' alt='icon' />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">One platform for meals and rides</h3>
        <p className="text-gray-600">
          Easily manage employee rides and eats on one intuitive platform and avoid dealing with multiple billing systems, vendor invoices, and more.
        </p>
      </div>

      {/* Savings */}
      <div className="flex flex-col">
        <div className='mb-4'>
          <div className='h-50 w-50 rounded-full'>
            <img src='/public/more ways to save.svg' alt='icon' />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">More ways to save</h3>
        <p className="text-gray-600">
          Set spending limits on meal programs or offer vouchers (you pay only for the amount used). Plus, order by group size to avoid bulk orders. Additionally, sign up for VOC One for added discounts.
        </p>
      </div>
    </div>
  </div>
</div>
{/* Final CTA Section */}
<div className="bg-black text-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        Start fueling your business with great food
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
        <a
          href="/get-started"
          className="bg-white text-black px-6 py-3 rounded-md text-base font-medium hover:bg-gray-300 transition-colors"
        >
          Get started now
        </a>
        <a
          href="/contact-sales"
          className="bg-gray-700 text-white px-6 py-3 rounded-md text-base font-medium border-2 border-black hover:bg-gray-500 transition-colors"
        >
          Contact sales
        </a>
      </div>
    </div>
  </div>
</div>
{/* Testimonial Section */}
<div className="bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Image Column - Left */}
      <div className="order-1 md:order-1">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
          <img 
            src="/public/betterhelp.webp" 
            alt="Betterhelp team" 
            className="w-100 h-100 object-cover"
          />
            </div>
        </div>
      </div>

      {/* Text Column - Right */}
      <div className="order-2 md:order-2 flex flex-col items-start space-y-6">
        
        {/* Quote */}
        <blockquote className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
          "Being able to add one corporate card was a huge relief, not only for the employees but also for people approving"
        </blockquote>
      </div>
    </div>
  </div>
</div>
</div>
  )
}