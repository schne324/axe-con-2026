import React from 'react'

interface IconButtonProps {
  icon: React.ReactNode
  onClick?: () => void
}

export default function IconButton({ icon, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors"
    >
      {icon}
    </button>
  )
}
