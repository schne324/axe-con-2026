interface PassengerCounterProps {
  label: string
  count: number
  onIncrease: () => void
  onDecrease: () => void
}

export default function PassengerCounter({
  label,
  count,
  onIncrease,
  onDecrease,
}: PassengerCounterProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
      </div>
      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Decrease"
          onClick={onDecrease}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 hover:text-gray-900 transition-colors text-lg leading-none"
        >
          −
        </button>
        <span className="w-5 text-center text-sm font-semibold text-gray-800">
          {count}
        </span>
        <button
          type="button"
          aria-label="Increase"
          onClick={onIncrease}
          className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 hover:border-gray-700 hover:text-gray-900 transition-colors text-lg leading-none"
        >
          +
        </button>
      </div>
    </div>
  )
}
