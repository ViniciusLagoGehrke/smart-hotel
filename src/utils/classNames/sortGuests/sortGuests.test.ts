import sortGuests from './sortGuests'

describe('sortGuests', () => {
  it('should separate willing guests into premium and economy guests', () => {
    const willingGuests = [200, 50, 150, 70, 100, 30]

    const { premiumGuests, economyGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 100])
    expect(economyGuests).toEqual([70, 50, 30])
  })

  it('should handle empty input', () => {
    const willingGuests: number[] = []

    const { premiumGuests, economyGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([])
    expect(economyGuests).toEqual([])
  })

  it('should handle input with only economy guests', () => {
    const willingGuests = [50, 30, 70]

    const { premiumGuests, economyGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([])
    expect(economyGuests).toEqual([70, 50, 30])
  })

  it('should handle input with only premium guests', () => {
    const willingGuests = [120, 150, 200]

    const { premiumGuests, economyGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 120])
    expect(economyGuests).toEqual([])
  })

  it('should handle input with duplicate prices', () => {
    const willingGuests = [200, 50, 150, 70, 120, 50]

    const { premiumGuests, economyGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 120])
    expect(economyGuests).toEqual([70, 50, 50])
  })
})
