import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from "lucide-react"

export default function BusinessAccount() {
  const [activeTab, setActiveTab] = useState('Employees or individuals');

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
                <button className="flex items-center text-sm font-medium hover:text-gray-300">
                  Overview <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <button className="flex items-center text-sm font-medium hover:text-gray-300">
                  Solutions <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <a href="/pricing" className="text-sm font-medium hover:text-gray-300">
                  Pricing
                </a>
                <button className="flex items-center text-sm font-medium hover:text-gray-300">
                  Customer support <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <button className="flex items-center text-sm font-medium hover:text-gray-300">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
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