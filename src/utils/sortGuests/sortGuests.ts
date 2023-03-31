const sortGuests = (
  willingGuests: number[]
): {
  premiumGuests: number[]
  economicGuests: number[]
} => {
  const premiumGuests: number[] = []
  const economicGuests: number[] = []

  willingGuests
    .sort((a, b) => b - a)
    .forEach((price) =>
      price >= 100 ? premiumGuests.push(price) : economicGuests.push(price)
    )

  return {
    premiumGuests,
    economicGuests
  }
}

export default sortGuests
