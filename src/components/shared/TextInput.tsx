import React from 'react'

interface TextInputProps {
  id: string
  name: string
  label?: string
  placeholder?: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TextInput({
  id,
  name,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#1a2e4a] focus:border-transparent w-full"
      />
    </div>
  )
}
