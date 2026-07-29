import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download } from 'lucide-react'

export default function ReportViewerModal({ isOpen, onClose, reportUrl }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[85vh] overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#0A2240] text-white">
              <h3 className="font-serif text-lg tracking-wide">Test Report</h3>
              <div className="flex items-center gap-3">
                <a href={reportUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-[#5BB8FF] hover:text-white transition">
                  <Download size={14} /> Download PDF
                </a>
                <div className="w-px h-4 bg-white/20" />
                <button onClick={onClose} className="text-white/60 hover:text-white transition">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-[#EEF6FF] p-2 sm:p-4">
              <iframe 
                src={reportUrl} 
                className="w-full h-full rounded-lg shadow-inner bg-white" 
                title="PDF Report" 
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
