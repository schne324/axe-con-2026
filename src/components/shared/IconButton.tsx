import React from 'react'

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
  className?: string
}

export default function IconButton({ icon, onClick, className = 'flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors' }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {icon}
    </button>
  )
}
