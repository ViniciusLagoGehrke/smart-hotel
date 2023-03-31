import { renderHook } from '@testing-library/react'
import useOccupancy, { occupancyReducer } from './useOccupancy'
import guest from '../../assets/guests.json'
import sortGuests from '../../utils/sortGuests'

const { premiumGuests, economicGuests } = sortGuests(guest)

const initialState = {
  premiumGuests,
  economicGuests
}

describe('useOccupancy', () => {
  it('should book the one customer for each room available', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 1,
      economic: 1
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(1)
    expect(state.occupiedEconomicRooms).toBe(1)
    expect(state.revenue).toBe(374 + 99)
  })

  it('should book the highest paying customers for each room category', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 3,
      economic: 3
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(3)
    // 374+209+155
    expect(state.occupiedEconomicRooms).toBe(3)
    // 99+45+23
    expect(state.revenue).toBe(738 + 167)
  })

  it('should not upgrade Economic guests when there is available Economic Rooms', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 7,
      economic: 5
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(6)
    // 374+209+155+115+101+100
    expect(state.occupiedEconomicRooms).toBe(4)
    // 99+45+23+22
    expect(state.revenue).toBe(1054 + 189)
  })

  it('should not book Premium Guests into Economic Rooms', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 2,
      economic: 7
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(2)
    // 374+209
    expect(state.occupiedEconomicRooms).toBe(4)
    // 99+45+23+22
    expect(state.revenue).toBe(583 + 189)
  })

  it('should upgrade Economic Guests when all Economic Rooms are booked', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 7,
      economic: 1
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(7)
    // 374+209+155+115+101+100 + 99
    expect(state.occupiedEconomicRooms).toBe(1)
    // 45
    expect(state.revenue).toBe(1153 + 45)
  })

  it('should not book Premium Guests into Economic Rooms with', () => {
    const { result, rerender } = renderHook(() => useOccupancy(initialState))

    const actions = result.current[1]

    actions.setRooms({
      premium: 5,
      economic: 5
    })
    actions.calculateTotalRevenue()
    rerender()

    const state = result.current[0]

    expect(state.occupiedPremiumRooms).toBe(5)
    // 374+209+155+115+101
    expect(state.occupiedEconomicRooms).toBe(4)
    // 99+45+23+22
    expect(state.revenue).toBe(954 + 189)
  })

  describe('occupancyReducer', () => {
    const initialState = {
      availablePremiumRooms: 0,
      availableEconomicRooms: 0,
      numberOfPremiumGuests: premiumGuests.length,
      numberOfEconomicGuests: economicGuests.length,
      occupiedPremiumRooms: 0,
      occupiedEconomicRooms: 0,
      revenue: 0
    }
    enum ACTION {
      SET_ROOMS = 'SET_ROOMS',
      BOOK_PREMIUM_GUEST = 'BOOK_PREMIUM_GUEST',
      BOOK_ECONOMIC_GUEST = 'BOOK_ECONOMIC_GUEST,'
    }

    it('should set room occupancy for each type', () => {
      const state = occupancyReducer(initialState, {
        type: ACTION.SET_ROOMS,
        payload: { initialState: initialState, premium: 3, economic: 5 }
      })

      expect(state.availablePremiumRooms).toEqual(3)
      expect(state.availableEconomicRooms).toEqual(5)
      expect(state.numberOfPremiumGuests).toEqual(6)
      expect(state.numberOfEconomicGuests).toEqual(4)
      expect(state.occupiedPremiumRooms).toEqual(0)
      expect(state.occupiedEconomicRooms).toEqual(0)
      expect(state.revenue).toEqual(0)
    })

    it('should book premium guests', () => {
      const availablePremiumRooms = occupancyReducer(initialState, {
        type: ACTION.SET_ROOMS,
        payload: { initialState: initialState, premium: 3, economic: 5 }
      })
      const state = occupancyReducer(availablePremiumRooms, {
        type: ACTION.BOOK_PREMIUM_GUEST,
        price: 374
      })

      expect(state.availablePremiumRooms).toEqual(2)
      expect(state.availableEconomicRooms).toEqual(5)
      expect(state.numberOfPremiumGuests).toEqual(5)
      expect(state.numberOfEconomicGuests).toEqual(4)
      expect(state.occupiedPremiumRooms).toEqual(1)
      expect(state.occupiedEconomicRooms).toEqual(0)
      expect(state.revenue).toEqual(374)
    })

    it('should book economic guests', () => {
      const availableEconomicRooms = occupancyReducer(initialState, {
        type: ACTION.SET_ROOMS,
        payload: { initialState: initialState, premium: 3, economic: 5 }
      })
      const state = occupancyReducer(availableEconomicRooms, {
        type: ACTION.BOOK_ECONOMIC_GUEST,
        price: 99
      })

      expect(state.availablePremiumRooms).toEqual(3)
      expect(state.availableEconomicRooms).toEqual(4)
      expect(state.numberOfPremiumGuests).toEqual(6)
      expect(state.numberOfEconomicGuests).toEqual(3)
      expect(state.occupiedPremiumRooms).toEqual(0)
      expect(state.occupiedEconomicRooms).toEqual(1)
      expect(state.revenue).toEqual(99)
    })
  })
})
