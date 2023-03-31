import AvailableRooms from './components/AvailableRooms'
import guest from './assets/guests.json'

function App() {
  return (
    <div className="h-screen bg-white sm:pt-12 sm:pb-10 lg:pt-10 lg:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Smart Hotel
        </h1>
        <div className="my-10 flex items-baseline">
          <AvailableRooms guests={guest} />
        </div>
      </div>
    </div>
  )
}

export default App
