import React, { useState } from 'react'
import { Copy } from 'lucide-react'
import Tooltip from '@/components/ui/Tooltip'

const CopyIcon = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation()
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Tooltip content={copied ? 'Copied!' : 'Copy'} position="top">
      <button type="button" onClick={handleCopy} className={`cursor-pointer ${className}`}>
        <Copy size={12} className="text-muted-foreground hover:text-foreground shrink-0" />
      </button>
    </Tooltip>
  )
}

export default CopyIcon
