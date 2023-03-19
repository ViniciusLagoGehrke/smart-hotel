import React from 'react'
import { render } from '@testing-library/react'
import AvailableRooms from './AvailableRooms'
import guests from '../../assets/guests.json'

test('renders AvailableRooms', () => {
  const { getByText } = render(<AvailableRooms guests={guests} />)

  expect(getByText(/Please, enter rooms available/i)).toBeInTheDocument()
})
