import React from 'react'
import { ShieldCheck, Home, FileCheck, DollarSign, Headphones } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: <ShieldCheck size={24} />,
      title: 'NABL Accredited Labs',
      desc: 'Certified labs across India',
    },
    {
      icon: <Home size={24} />,
      title: 'Free Home Collection',
      desc: 'On orders above ₹999',
    },
    {
      icon: <FileCheck size={24} />,
      title: 'Accurate Reports',
      desc: 'NABL Certified Labs',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Fast Reports',
      desc: 'Reports in 6-24 Hours',
    },
    {
      icon: <Headphones size={24} />,
      title: '24/7 Support',
      desc: 'We are always available',
    },
  ]

  return (
    <section className="bg-white py-8 border-b border-border">
      <div className="enterprise-container">
        <div className="flex flex-wrap justify-center lg:justify-between gap-6 lg:gap-8">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="text-primary flex-shrink-0">
                {React.cloneElement(item.icon, { size: 32 })}
              </div>
              <div>
                <p className="text-base font-semibold text-foreground leading-tight">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
