import { useReducer } from 'react'

enum ACTION {
  SET_ROOMS = 'SET_ROOMS',
  BOOK_PREMIUM_GUEST = 'BOOK_PREMIUM_GUEST',
  BOOK_ECONOMIC_GUEST = 'BOOK_ECONOMIC_GUEST,'
}

interface HotelState {
  availablePremiumRooms: number
  availableEconomicRooms: number
  numberOfPremiumGuests: number
  numberOfEconomicGuests: number
  occupiedPremiumRooms: number
  occupiedEconomicRooms: number
  revenue: number
}

type HotelAction =
  | {
      type: ACTION.SET_ROOMS
      payload: { initialState: HotelState; premium: number; economic: number }
    }
  | { type: ACTION.BOOK_PREMIUM_GUEST; price: number }
  | { type: ACTION.BOOK_ECONOMIC_GUEST; price: number }

export const occupancyReducer = (
  state: HotelState,
  action: HotelAction
): HotelState => {
  switch (action.type) {
    case ACTION.SET_ROOMS:
      return {
        ...action.payload.initialState,
        availablePremiumRooms: action.payload.premium,
        availableEconomicRooms: action.payload.economic
      }
    case ACTION.BOOK_PREMIUM_GUEST:
      if (state.availablePremiumRooms > 0) {
        return {
          ...state,
          availablePremiumRooms: state.availablePremiumRooms - 1,
          occupiedPremiumRooms: state.occupiedPremiumRooms + 1,
          numberOfPremiumGuests: state.numberOfPremiumGuests - 1,
          revenue: state.revenue + action.price
        }
      } else {
        return state
      }
    case ACTION.BOOK_ECONOMIC_GUEST:
      if (
        state.availablePremiumRooms > 0 &&
        // If there are PremiumRooms available
        state.availableEconomicRooms < state.numberOfEconomicGuests
        // And all the Economic rooms will be booked
      ) {
        // Upgrade Economic Guest for a Premium Room
        return {
          ...state,
          availablePremiumRooms: state.availablePremiumRooms - 1,
          occupiedPremiumRooms: state.occupiedPremiumRooms + 1,
          numberOfEconomicGuests: state.numberOfEconomicGuests - 1,
          revenue: state.revenue + action.price
        }
      } else if (state.availableEconomicRooms > 0) {
        return {
          ...state,
          availableEconomicRooms: state.availableEconomicRooms - 1,
          occupiedEconomicRooms: state.occupiedEconomicRooms + 1,
          numberOfEconomicGuests: state.numberOfEconomicGuests - 1,
          revenue: state.revenue + action.price
        }
      } else {
        return state
      }
    default:
      return state
  }
}

interface useHotelProps {
  premiumGuests: number[]
  economicGuests: number[]
}

interface setRoomProps {
  premium?: number
  economic?: number
}

type useHotelReturn = [
  {
    occupiedPremiumRooms: number
    occupiedEconomicRooms: number
    revenue: number
  },
  {
    setRooms: ({ premium, economic }: setRoomProps) => void
    calculateTotalRevenue: () => void
  }
]

export default function useOccupancy({
  premiumGuests,
  economicGuests
}: useHotelProps): useHotelReturn {
  const initialState = {
    availablePremiumRooms: 0,
    availableEconomicRooms: 0,
    numberOfPremiumGuests: premiumGuests.length,
    numberOfEconomicGuests: economicGuests.length,
    occupiedPremiumRooms: 0,
    occupiedEconomicRooms: 0,
    revenue: 0
  }

  const [state, dispatch] = useReducer(occupancyReducer, initialState)

  const calculatePremiumGuests = () => {
    premiumGuests?.forEach((price) => {
      dispatch({ type: ACTION.BOOK_PREMIUM_GUEST, price })
    })
  }

  const calculateEconomicGuests = () => {
    economicGuests?.forEach((price) => {
      dispatch({ type: ACTION.BOOK_ECONOMIC_GUEST, price })
    })
  }

  const calculateTotalRevenue = () => {
    calculatePremiumGuests()
    calculateEconomicGuests()
  }

  const setRooms = ({ premium = 0, economic = 0 }: setRoomProps) => {
    dispatch({
      type: ACTION.SET_ROOMS,
      payload: { initialState, premium, economic }
    })
  }

  return [
    {
      occupiedPremiumRooms: state.occupiedPremiumRooms,
      occupiedEconomicRooms: state.occupiedEconomicRooms,
      revenue: state.revenue
    },
    {
      setRooms,
      calculateTotalRevenue
    }
  ]
}
