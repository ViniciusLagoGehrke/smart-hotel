import { useState } from 'react'
import useOccupancy from '../../hooks/useOccupancy/useOccupancy'
import sortGuests from '../../utils/sortGuests'

interface AvailableRoomsProps {
  guests: number[]
}

interface AvailableRoomsState {
  premium: number
  economic: number
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ guests }) => {
  const [availableRooms, setAvailableRooms] = useState<AvailableRoomsState>({
    premium: 0,
    economic: 0
  })
  const { premiumGuests, economicGuests } = sortGuests(guests)
  const [
    { occupiedPremiumRooms, occupiedEconomicRooms, revenue },
    { setRooms, calculateTotalRevenue }
  ] = useOccupancy({
    premiumGuests,
    economicGuests
  })

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAvailableRooms((prevState) => {
      return {
        ...prevState,
        [name]: value
      }
    })
  }

  const handleSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRooms(availableRooms)
    calculateTotalRevenue()
  }

  return (
    <>
      <form onSubmit={handleSubmission}>
        <h2 className="mt-4 text-lg font-bold text-gray-900">
          Please, enter rooms available
        </h2>
        <div>
          <label className="text-lg text-gray-900">
            Premium Rooms:
            <input
              className="mt-1 ml-2 w-16 rounded-md border border-slate-300 bg-white p-2 text-sm shadow-sm placeholder:text-slate-400 invalid:border-pink-500
              invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1
              focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              autoFocus
              required
              type="number"
              name="premium"
              min={0}
              value={availableRooms.premium}
              onFocus={(e) => e.target.select()}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label className="mt-4 text-lg text-gray-900">
            Economic Rooms:
            <input
              className="mt-1 ml-2 w-16 rounded-md border border-slate-300 bg-white p-2 text-sm shadow-sm placeholder:text-slate-400 invalid:border-pink-500
              invalid:text-pink-600 focus:border-sky-500 focus:outline-none focus:ring-1
              focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              required
              type="number"
              name="economic"
              min={0}
              value={availableRooms.economic}
              onFocus={(e) => e.target.select()}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
          </label>
        </div>
        <div className="my-4">
          <button
            type="submit"
            className="inline-block rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-center font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-offset-2"
          >
            Calculate Revenue
          </button>
        </div>
      </form>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div>
          <h4 className="text-lg font-bold text-gray-900">
            Possible to be booked
          </h4>
          <div className="text-lg text-gray-500">
            <p className="mt-4 text-lg text-gray-900">
              Premium Rooms:{' '}
              <span data-testid="premium-rooms" className="font-bold">
                {occupiedPremiumRooms}
              </span>
            </p>
            <p className="mt-4 text-lg text-gray-900">
              Economic Rooms:{' '}
              <span data-testid="economic-rooms" className="font-bold">
                {occupiedEconomicRooms}
              </span>
            </p>
            <p className="mt-4 text-lg text-gray-900">
              Total possible Revenue:{' '}
              <span data-testid="revenue" className="font-bold">
                {revenue}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvailableRooms
