import sortGuests from './sortGuests'

describe('sortGuests', () => {
  it('should separate willing guests into premium and economic guests', () => {
    const willingGuests = [200, 50, 150, 70, 100, 30]

    const { premiumGuests, economicGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 100])
    expect(economicGuests).toEqual([70, 50, 30])
  })

  it('should handle empty input', () => {
    const willingGuests: number[] = []

    const { premiumGuests, economicGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([])
    expect(economicGuests).toEqual([])
  })

  it('should handle input with only economic guests', () => {
    const willingGuests = [50, 30, 70]

    const { premiumGuests, economicGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([])
    expect(economicGuests).toEqual([70, 50, 30])
  })

  it('should handle input with only premium guests', () => {
    const willingGuests = [120, 150, 200]

    const { premiumGuests, economicGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 120])
    expect(economicGuests).toEqual([])
  })

  it('should handle input with duplicate prices', () => {
    const willingGuests = [200, 50, 150, 70, 120, 50]

    const { premiumGuests, economicGuests } = sortGuests(willingGuests)

    expect(premiumGuests).toEqual([200, 150, 120])
    expect(economicGuests).toEqual([70, 50, 50])
  })
})
