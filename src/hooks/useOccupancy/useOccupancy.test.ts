import { renderHook } from '@testing-library/react'
import useOccupancy from './useOccupancy'
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
})
