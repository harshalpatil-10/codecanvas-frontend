import React from 'react'
import LandingNavbar from '../../components/landing/LandingNavbar.jsx'
import Hero from '../../components/landing/Hero.jsx'
import FeatureGrid from '../../components/landing/FeatureGrid.jsx'
import AiHighlight from '../../components/landing/AiHighlight.jsx'
import HowItWorks from '../../components/landing/HowItWorks.jsx'
import CTASection from '../../components/landing/CTASection.jsx'
import LandingFooter from '../../components/landing/LandingFooter.jsx'

export default function Landing() {
  return (
    <div>
      <LandingNavbar />
      <Hero />
      <FeatureGrid />
      <AiHighlight />
      <HowItWorks />
      <CTASection />
      <LandingFooter />
    </div>
  )
}
