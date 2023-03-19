import type React from 'react'

interface AvailableRoomsProps {
  guests: number[]
}

const AvailableRooms: React.FC<AvailableRoomsProps> = ({ guests }) => {
  return (
    <>
      <form>
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
              type="number"
              name="premium"
              required
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
              type="number"
              name="economic"
              required
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
              <span className="font-bold">occupiedPremiumRooms</span>
            </p>
            <p className="mt-4 text-lg text-gray-900">
              Economic Rooms:{' '}
              <span className="font-bold">occupiedEconomicRooms</span>
            </p>
            <p className="mt-4 text-lg text-gray-900">
              Total possible Revenue: <span className="font-bold">revenue</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default AvailableRooms
