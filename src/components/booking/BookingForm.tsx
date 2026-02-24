import { useState } from "react";
import TextInput from "../shared/TextInput";

const ResetIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Counterclockwise arc ~270°, starting from top-right */}
    <path d="M3 12a9 9 0 1 0 9-9c-2.39 0-4.68.94-6.36 2.64L3 8" />
    {/* Arrow corner pointing left-down */}
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

const defaultState = {
  from: "",
  to: "",
  departure: "",
  promoCode: "",
  adults: 1,
  children: 0,
};

export default function BookingForm() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const formState = { from, to, departure, promoCode, adults, children };

  function handleClear() {
    setFrom(defaultState.from);
    setTo(defaultState.to);
    setDeparture(defaultState.departure);
    setPromoCode(defaultState.promoCode);
    setAdults(defaultState.adults);
    setChildren(defaultState.children);
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-br from-[#1a2e4a]/20 to-transparent px-8 pt-8 pb-6">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          Plan Your Trip
        </div>
        <p className="text-gray-500 text-sm">
          Enter the below details to book your trip today!
        </p>
      </div>

      <div className="flex flex-col gap-4 px-8 pb-8 mt-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">From</label>
            <TextInput
              id="from"
              name="from"
              placeholder="City or station"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">To</label>
            <TextInput
              id="to"
              name="to"
              placeholder="City or station"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Departure Date
          </label>
          <TextInput
            id="departure"
            name="departure"
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
          <p className="text-[#9ca3af] text-sm mt-1">
            Flexible dates may offer lower fares
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Promo Code
          </label>
          <input
            type="text"
            name="promo-code"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white w-full"
          />
        </div>

        {/* Travelers section */}
        <div>
          {/* <p className="text-sm font-medium text-gray-700 mb-2">Travelers</p> */}
          <div className="border border-gray-200 rounded-xl px-4"></div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center justify-center py-3 px-4 rounded-lg border-2 border-gray-300 text-[#1a2e4a] hover:bg-[#1a2e4a]/5 transition-colors"
          >
            <ResetIcon />
          </button>

          <div
            className="bg-[#1a2e4a] text-white py-3 px-6 rounded-lg cursor-pointer text-center font-semibold flex-1"
            onClick={() => console.log("form submitted", formState)}
          >
            Search Trains
          </div>
        </div>
      </div>
    </div>
  );
}
