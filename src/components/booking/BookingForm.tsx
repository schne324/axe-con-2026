import { useState } from 'react'
import TextInput from '../shared/TextInput'
import PassengerCounter from '../shared/PassengerCounter'
import IconButton from '../shared/IconButton'

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    width="18"
    height="18"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="4" y1="4" x2="16" y2="16" />
    <line x1="16" y1="4" x2="4" y2="16" />
  </svg>
)

const defaultState = {
  from: '',
  to: '',
  departure: '',
  promoCode: '',
  adults: 1,
  children: 0,
}

export default function BookingForm() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [promoCode, setPromoCode] = useState('')
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)

  const formState = { from, to, departure, promoCode, adults, children }

  function handleClear() {
    setFrom(defaultState.from)
    setTo(defaultState.to)
    setDeparture(defaultState.departure)
    setPromoCode(defaultState.promoCode)
    setAdults(defaultState.adults)
    setChildren(defaultState.children)
  }

  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-8">
      {/* Clear form button — top-right corner, no accessible name (intentional) */}
      <div className="absolute top-4 right-4 text-gray-400">
        <IconButton icon={<CloseIcon />} onClick={handleClear} />
      </div>

      {/* "Plan Your Trip" heading — div styled as h2, no heading element or role (intentional) */}
      <div className="text-2xl font-bold text-gray-900 mb-6">Plan Your Trip</div>

      <div className="flex flex-col gap-4">
        {/* From / To — no label prop (intentional) */}
        <div className="grid grid-cols-2 gap-3">
          <TextInput
            id="from"
            name="from"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <TextInput
            id="to"
            name="to"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        {/* Departure date — no label prop (intentional) */}
        <div>
          <TextInput
            id="departure"
            name="departure"
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          {/* Color contrast failure — #9ca3af on white (intentional) */}
          <p className="text-[#9ca3af] text-sm mt-1">
            Flexible dates may offer lower fares
          </p>
        </div>

        {/* Promo code — raw input, no label, no accessible name, focus ring suppressed (intentional) */}
        <input
          type="text"
          id="promo-code"
          name="promo-code"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white w-full outline-none focus:outline-none"
        />

        {/* Travelers section */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Travelers</p>
          <div className="border border-gray-200 rounded-xl px-4">
            <PassengerCounter
              label="Adults"
              count={adults}
              onIncrease={() => setAdults((n) => n + 1)}
              onDecrease={() => setAdults((n) => Math.max(0, n - 1))}
            />
            <PassengerCounter
              label="Children"
              count={children}
              onIncrease={() => setChildren((n) => n + 1)}
              onDecrease={() => setChildren((n) => Math.max(0, n - 1))}
            />
          </div>
        </div>

        {/* Submit — div masquerading as button, no role, no tabIndex, no keyboard handler (intentional) */}
        <div
          className="bg-[#1a2e4a] text-white py-3 px-6 rounded-lg cursor-pointer text-center font-semibold w-full mt-4"
          onClick={() => console.log('form submitted', formState)}
        >
          Search Trains
        </div>
      </div>
    </div>
  )
}
