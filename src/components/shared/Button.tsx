import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-[#1a2e4a] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#243d60] transition-colors ${className}`}
    >
      {children}
    </button>
  )
}
