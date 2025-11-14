import { Routes, Route, Navigate } from 'react-router-dom'
import TutorLayout from '@/components/layouts/TutorLayout'
import TutorDashboardOverview from '@/pages/tutor/TutorDashboardOverview'
import LeadMarketplace from '@/pages/tutor/LeadMarketplace'
import MyApplications from '@/pages/tutor/MyApplications'
import ProfileManagement from '@/pages/tutor/ProfileManagement'
import Wallet from '@/pages/tutor/Wallet'
import TutorSupportCenter from '@/pages/tutor/TutorSupportCenter'

export default function TutorDashboard() {
  return (
    <TutorLayout>
      <Routes>
        <Route path="/" element={<TutorDashboardOverview />} />
        <Route path="/marketplace" element={<LeadMarketplace />} />
        <Route path="/applications" element={<MyApplications />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/support" element={<TutorSupportCenter />} />
        <Route path="*" element={<Navigate to="/tutor" replace />} />
      </Routes>
    </TutorLayout>
  )
}