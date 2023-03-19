const sortGuests = (
  willingGuests: number[]
): {
  premiumGuests: number[]
  economyGuests: number[]
} => {
  const premiumGuests: number[] = []
  const economyGuests: number[] = []

  willingGuests
    .sort((a, b) => b - a)
    .map((price) =>
      price >= 100 ? premiumGuests.push(price) : economyGuests.push(price)
    )

  return {
    premiumGuests,
    economyGuests
  }
}

export default sortGuests
