import React from 'react'
import PublicLayout from '@/components/layout/PublicLayout'
import Packages from '@/components/Packages'

export default function PackagesPage() {
  return (
    <PublicLayout>
      <div className="bg-card py-16 border-b border-border">
        <div className="enterprise-container relative z-10 text-center">
          <p className="text-sm text-primary font-bold tracking-wider uppercase mb-3">
            Health Checkups
          </p>
          <h1 className="font-heading font-bold text-4xl text-foreground">Health Packages</h1>
          <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">Explore complete health checkup packages curated by our experts.</p>
        </div>
      </div>
      {/* Packages */}
      <Packages showAllPackages={true} />
    </PublicLayout>
  )
}
