import { render, screen, fireEvent } from '@testing-library/react'
import AvailableRooms from './AvailableRooms'
import guests from '../../assets/guests.json'

describe('AvailableRooms', () => {
  it('renders correctly', () => {
    render(<AvailableRooms guests={guests} />)

    expect(
      screen.getByText('Please, enter rooms available')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Premium Rooms:')).toBeInTheDocument()
    expect(screen.getByLabelText('Economic Rooms:')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAccessibleName('Calculate Revenue')
  })

  it('updates the available rooms when input values change', async () => {
    render(<AvailableRooms guests={guests} />)
    const premiumInput = screen.getByLabelText(
      'Premium Rooms:'
    ) as HTMLInputElement
    const economicInput = screen.getByLabelText(
      'Economic Rooms:'
    ) as HTMLInputElement

    expect(premiumInput).toHaveDisplayValue('0')
    expect(economicInput).toHaveDisplayValue('0')

    fireEvent.change(premiumInput, { target: { value: '3' } })
    fireEvent.change(economicInput, { target: { value: '5' } })

    expect(premiumInput).toHaveDisplayValue('3')
    expect(economicInput).toHaveDisplayValue('5')
  })

  it('calculates the total revenue and displays it on submission', async () => {
    render(<AvailableRooms guests={guests} />)
    const premiumInput = screen.getByLabelText(
      'Premium Rooms:'
    ) as HTMLInputElement
    const economicInput = screen.getByLabelText(
      'Economic Rooms:'
    ) as HTMLInputElement
    const submitButton = screen.getByText('Calculate Revenue')

    expect(screen.getByTestId('premium-rooms')).toHaveTextContent('0')
    expect(screen.getByTestId('economic-rooms')).toHaveTextContent('0')
    expect(screen.getByTestId('revenue')).toHaveTextContent('0')

    fireEvent.change(premiumInput, { target: { value: '3' } })
    fireEvent.change(economicInput, { target: { value: '5' } })
    fireEvent.click(submitButton)

    expect(premiumInput).toHaveDisplayValue('3')
    expect(economicInput).toHaveDisplayValue('5')
  })
})
