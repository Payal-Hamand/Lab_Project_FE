import React from 'react'
// Checked Up — Footer
// Fonts: Plus Jakarta Sans (display) + Inter (body)
const linkGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Tests', href: '/tests' },
      { label: 'Packages', href: '/packages' },
      { label: 'Book a test', href: '/booking' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Partner labs', href: '/partners' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help center', href: '/help' },
      { label: 'Track a report', href: '/reports' },
      { label: 'Cancellations & refunds', href: '/refunds' },
      { label: 'FAQs', href: '/faqs' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Lab accreditation', href: '/accreditation' },
    ],
  },
]
const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Twitter', href: 'https://twitter.com' },
]
export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#172554', fontFamily: "'Inter', sans-serif" }}>
      <div
        style={{
          maxWidth: '1120px',
          margin: '0 auto',
          padding: '64px 24px 40px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr repeat(4, 1fr)',
            gap: '32px',
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 800,
                fontSize: '20px',
                color: '#FFFFFF',
                marginBottom: '12px',
              }}
            >
              Checked Up
            </div>
            <p
              style={{
                fontSize: '14px',
                lineHeight: 1.7,
                color: '#94A3B8',
                maxWidth: '260px',
                margin: '0 0 20px',
              }}
            >
              Book lab tests, arrange home sample collection, and get reports from accredited labs —
              all in one place.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#CBD5E1',
                    textDecoration: 'none',
                  }}
                >
                  {s.label.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}
              >
                {group.title}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.links.map((link) => (
                  <li key={link.label} style={{ marginBottom: '10px' }}>
                    <a
                      href={link.href}
                      style={{
                        fontSize: '14px',
                        color: '#94A3B8',
                        textDecoration: 'none',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginTop: '48px',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            © {year} Checked Up. All rights reserved.
          </span>
          <span style={{ fontSize: '13px', color: '#64748B' }}>
            Reports delivered from NABL-accredited labs only.
          </span>
        </div>
      </div>
    </footer>
  )
}
