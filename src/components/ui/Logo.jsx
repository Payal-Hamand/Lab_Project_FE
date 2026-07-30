import React from 'react'
import { Link } from 'react-router-dom'
import { FlaskConical } from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const Logo = ({ variant = 'default', className = '' }) => {
  const isWhite = variant === 'white'
  
  return (
    <Link to={ROUTES.HOME} className={`flex items-center gap-2.5 flex-shrink-0 ${className}`}>
      <div className={`w-9 h-9 ${isWhite ? 'bg-white' : 'bg-primary'} rounded-lg flex items-center justify-center flex-shrink-0`}>
        <FlaskConical size={18} className={isWhite ? 'text-primary' : 'text-white'} />
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-heading font-bold text-lg leading-tight ${isWhite ? 'text-white' : 'text-foreground'}`}>
          Checked <span className={isWhite ? 'text-primary' : 'text-primary'}>Up</span>
        </span>
        <span className={`text-[9px] font-semibold tracking-wider uppercase ${isWhite ? 'text-primary' : 'text-primary'}`}>
          LAB TESTS
        </span>
      </div>
    </Link>
  )
}

export default Logo
