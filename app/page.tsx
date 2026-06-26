// src/app/page.tsx
// Add each import as you copy the component from Lovable
import HeroSection     from '../src/components/Hero'
import StackSphere     from '../src/components/StackSection'
import SkillsAnalytics from '../src/components/SkillsSection'
import ProjectsBento   from '../src/components/ProjectsSection'
import JourneyTimeline from '../src/components/JourneySection'
import ServicesGrid    from '../src/components/ServicesSection'
import ContactSection  from '../src/components/ContactSection'
import Navbar from '../src/components/Navbar'

export default function Home() {
  return (
    <main className="bg-[#0F0E0D] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StackSphere />
      <SkillsAnalytics />
      <ProjectsBento />
      <JourneyTimeline />
      <ServicesGrid />
      <ContactSection />
    </main>
  )
}