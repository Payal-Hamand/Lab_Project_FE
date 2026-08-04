import React from 'react'
import { CheckCircle2, Clock, MapPin, Truck } from 'lucide-react'

export default function BookingSummary({ selectedItem, type }) {
  if (!selectedItem) {
    return (
      <div className="bg-card rounded-xl shadow-sm border border-border p-6 sticky top-24">
        <h2 className="font-heading font-bold text-xl text-foreground mb-4">Summary</h2>
        <div className="border border-primary border-dashed rounded-lg p-6 text-center text-muted-foreground text-sm">
          Select a test or package to view summary
        </div>
      </div>
    )
  }

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border sticky top-24 overflow-hidden">
      <div className="bg-primary px-6 py-5">
        <span className="bg-white/20 text-primary-foreground px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
          {type === 'package' ? 'Health Package' : 'Lab Test'}
        </span>
        <h3 className="font-heading font-bold text-primary-foreground text-xl leading-tight mb-2">
          {selectedItem.title}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-accent font-mono text-2xl font-bold">₹{selectedItem.price}</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">
            What to expect
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-0.5 text-primary"><CheckCircle2 size={16} /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Certified Labs</p>
                <p className="text-xs text-muted-foreground mt-0.5">Processed by NABL accredited facilities</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 text-primary"><Truck size={16} /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Free Home Collection</p>
                <p className="text-xs text-muted-foreground mt-0.5">A phlebotomist will visit your address</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="mt-0.5 text-primary"><Clock size={16} /></div>
              <div>
                <p className="text-sm font-semibold text-foreground">Fast Reports</p>
                <p className="text-xs text-muted-foreground mt-0.5">Digital reports delivered in 6-24 hours</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
