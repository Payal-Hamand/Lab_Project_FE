import React from 'react'
import { Home, CircleCheckBig, Clock, Headphones } from 'lucide-react'
const FeatureCard = ({ item }) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-primary-foreground mb-4">
        {item.icon}
      </div>
      <h3 className="font-heading font-bold text-base text-foreground mb-1">{item.title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
    </div>
  )
}

const Features = () => {
  const data = [
    {
      icon: <Home size={18} />,
      title: 'Free Home Collection',
      desc: 'On orders above ₹999',
    },
    {
      icon: <CircleCheckBig size={18} />,
      title: 'Accurate Reports',
      desc: 'NABL Certified Labs',
    },
    {
      icon: <Clock size={18} />,
      title: 'Fast Reports',
      desc: 'Reports in 6-24 Hours',
    },
    {
      icon: <Headphones size={18} />,
      title: '24/7 Support',
      desc: 'We are always available',
    },
  ]

  return (
    <section className="bg-card py-16 border-b border-border">
      <div className="enterprise-container">
        {/* Section label */}
        <p className="text-sm text-primary font-bold tracking-wider uppercase mb-3">
          Why Choose Us
        </p>
        <h2 className="font-heading font-bold text-3xl text-foreground mb-10">Diagnostics Built on Trust</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <FeatureCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
