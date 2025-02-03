import { Menu, Search, Clock, ChevronDown, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// API service functions

const api = {
  async searchAddress(query){
    try{
      const response = await fetch(`/api/addresses/search?q=${encodedURIComponent(query)}`)
      if(!response.ok) throw new Error('Failed to search addresses')
        return await response.json()
    } catch(error){
      console.error('Error searching addresses:', error);
      throw error
    }
  },
  async scheduleDelivery(dateTime){
    try{
      const response = await fetch('/api/delveries/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dateTime)
      })
      if(!response.ok) throw new Error('Failed to schedule delivery')
        return await response.json()
    } catch(error){
      console.error('Error scheduling delivery:', error)
      throw error
    }
  },
  async getSavedAddresses(){
    try{
      const response = await fetch('/api/user/addresses', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      })
      if(!response.ok) throw new Error('Failed to fetch saved addresses')
        return await response.json()
    } catch(error){
      console.error('Error fetching saved addresses:', error);
      throw error
    }
  },
  async createDeliveryRequest(data) {
    try {
      const response = await fetch('/api/deliveries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create delivery request')
      return await response.json()
    } catch (error) {
      console.error('Error creating delivery request:', error)
      throw error
    }
  }
}

export default function Home() {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const [deliveryTime, setDeliveryTime] = useState('now')
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false)
  const [showSchedulePopup, setShowSchedulePopup] = useState(false)
  const [addressQuery, setAddressQuery] = useState('')
  const [addressResults, setAddressResults] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)
  const [savedAddresses, setSavedAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: ''
  })


  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token){
      fetchSavedAddresses()
    }
  }, [])

  const fetchSavedAddresses = async () => {
    try{
      const addresses = await api.getSavedAddresses()
      setSavedAddresses(addresses)
    } catch(error){
      setError('Failed to fetch saved addresses')
    }
  }

  const handleAddressSearch = async (query) => {
    setAddressQuery(query)
    if(query.length < 3) return

    try{
      setIsLoading(true)
      const results = await api.searchAddress(query)
      setAddressResults(results)
    } catch(error){
      setError('Failed to search addresses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleScheduleSubmit = async () => {
    try{
      setIsLoading(true)
      const {date, time} = scheduleData
      const scheduledDateTime = new Date(`${date}T${time}`)

      await api.scheduleDelivery({
        scheduledFor: scheduledDateTime.toISOString(),
        address: selectedAddress
      })

      setShowSchedulePopup(false)
      setDeliveryTime('schedule')
    } catch(error){
      setError('Failed to schedule Delivery')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSubmit = async () => {
    if(!selectedAddress){
      setError('Please select a delivery address')
      return
    }
    try{
      setIsLoading(true)
      const deliveryData = {
        address: selectedAddress,
        scheduledFor: deliveryTime === 'schedule' ? scheduleData : 'now',
      }

      await api.createDeliveryRequest(deliveryData)
      // Navigate to results or confirmation page
      navigate('/delivery/confirmation')
    } catch(error){
      setError('Failed to create delivery request')
    } finally {
      setIsLoading(false)
    }
  }

  
  
  const handleLogin = () => {
    navigate('/login')
  }
  

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center gap-4">
          <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu className="h-6 w-6" />
          </button>
          <div className="text-black font-bold text-xl">
            Voice Of Customer
          </div>
          <button 
            className="px-4 py-2 bg-black text-white rounded-3xl hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 flex items-center space-x-2"
            onClick={() => setIsAddressModalOpen(true)}
          >
            <span>Enter delivery address</span>
            <ChevronDown size={16} />
          </button>
        </div>
        <div>
        <button onClick={handleLogin} className="px-4 py-2 hover:bg-gray-100 rounded-lg font-medium">
          Log in
        </button>
        <button onClick={handleLogin} className='px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90 font-medium'>
          Sign up
        </button>
        </div>
      </nav>

      {/* Address Modal */}
      {isAddressModalOpen && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white w-full max-w-[550px] rounded-lg shadow-lg'>
              <div className='p-4 relative'>
                  <button
                  onClick={() => setIsAddressModalOpen(false)}
                  className='absolute right-4 top-4 p-1 hover:bg-gray-100 rounded-full'
                  >
                    <X className='h-6 w-6' />
                  </button>
                  <h2 className='text-xl font-semibold mb-4'>Entry delivery address</h2>
                  <div className='relative'>
                      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                      <input
                      type='text'
                      value={addressQuery}
                      onChange={(e) => handleAddressSearch(e.target.value)}
                      placeholder='Search for an address'
                      className='w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent'
                      />
                  </div>
              </div>
            </div>
        </div>
      )}
      {/* Address Search Results */}
      {isLoading ? (
        <div className='mt-4 text-center'>Loading...</div>
      ) : (
        <div className='mt-4 max-h-60 overflow-y-auto'>
          {addressResults.map((address, index) => (
            <button
            key={index}
            className='w-full p-3 text-left hover:bg-gray-100 rounded-lg'
            onClick={() => {
              setSelectedAddress(address)
              setIsAddressModalOpen(false)
            }}
            >
              {address.formatted_address}
            </button>
          ))}
        </div>
      )}
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && (
        <div className='mt-4'>
          <h3 className='font-medium mb-2'>Saved Addresses</h3>
          {savedAddresses.map((address, index) => (
            <button
            key={index}
            className='w-full text-left hover:bg-gray-100 rounded-lg'
            onClick={() => {
              setSelectedAddress(address)
              setIsAddressModalOpen(false)
            }}
            >
              {address.formatted_address}
            </button>
          ))}
        </div>
      )}
      {/* Schedule Popup Modal */}
      {showSchedulePopup && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg w-full max-w-md'>
            <h2 className='text-2xl font-bold mb-4'>Schedule for later</h2>
            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium mb-1'>Delivery Date</label>
                <input
                type='date'
                className='w-full p-2 border rounded-lg'
                min={new Date().toISOString().split('T')[0]}
                value={scheduleData.date}
                onChange={(e) => setScheduleData(prev => ({...prev, date: e.target.value}))}
                />
              </div>
              <div>
                <label className='block text-sm font-medium mb-1'>Delivery Time</label>
                <input
                type='time'
                className='w-full p-2 border rounded-lg'
                value={scheduleData.time}
                onChange={(e) => setScheduleData(prev => ({...prev, time: e.target.value}))}
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button
              onClick={() => setShowSchedulePopup(false)}
              className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
              >
                Cancel
              </button>
              <button
              onClick={() => setShowSchedulePopup(false)}
              disabled={isLoading}
              className='px-4 py-2 bg-black text-white rounded-lg hover:bg-black/90'
              >
                {isLoading ? 'Scheduling...' : 'Confirm Schedule'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Error Display */}
      {error && (
        <div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded'>
          <span className='block sm:inline'>{error}</span>
          <button
          className='absolute top-0 bottom-0 right-0 px-4 py-3'
          onClick={() => setError(null)}
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-start">
        <img
          src="Home1.jpg"
          alt="Food background"
          className="absolute w-full h-full object-cover"
        />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
            Order delivery near you
          </h1>
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input 
                type="text"
                value={selectedAddress?.formatted_address || ''}
                onClick={() => setIsAddressModalOpen(true)}
                readOnly
                placeholder="Enter delivery address" 
                className="w-full h-14 px-11 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            
            {/* Custom Select */}
            <div className="relative">
              <button 
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="w-[160px] h-14 px-4 bg-white border border-gray-300 rounded-lg flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  <span>{deliveryTime === 'now' ? 'Deliver now' : 'Schedule for later'}</span>
                </div>
              </button>
              
              {isSelectOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                  <button 
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setDeliveryTime('now')
                      setIsSelectOpen(false)
                    }}
                  >
                    Deliever now
                  </button>
                  <button 
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setDeliveryTime('schedule')
                      setIsSelectOpen(false)
                      setShowSchedulePopup(true)
                    }}
                  >
                    Schedule for later
                  </button>
                </div>
              )}
            </div>

            <button className="h-14 px-8 bg-black text-white rounded-lg hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  onClick={handleSearchSubmit}
                  disabled={isLoading || !selectedAddress}
            >
              {isLoading ? 'Searching...' : 'Search here'}
            </button>
          </div>
          <div className="mt-4">
            <button onClick={handleLogin} className="text-black underline p-0 hover:text-gray-700">
              Sign in
            </button>
            <span className="text-gray-600 mx-2">for saved addresses</span>
          </div>
        </div>
      </div>

      {/* Features  */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 p-8'>
        <div className='flex flex-col items-center'>
            <img src='restaurant.webp' alt='Your restaurant, delivered' className='mb-4 rounded-lg' />
            <h3 className='text-lg font-bold'>Your restuarant, delivered</h3>
            <Link to='#' className='text-black underline'>
                Add your restaurant
            </Link>
        </div>
        <div className='flex flex-col items-center'>
            <img src='delivery.jpg' alt='Deliver with voice of customer' className='mb-4 rounded-lg' />
            <h3 className='text-lg font-bold'>Deliver with voice of customer</h3>
            <Link to='#' className='text-black underline'>
                SignUp to deliver
            </Link>
        </div>
        <div className='flex flex-col items-center'>
            <img src='employees.webp' alt='Feed your employees' className='mb-4 rounded-lg' />
            <h3 className='text-lg font-bold'>Feed your employees</h3>
            <Link to='/home/businessAccount' className='text-black underline'>
              Create a business account
            </Link>
        </div>
      </div>
      
    </div>
  )
}