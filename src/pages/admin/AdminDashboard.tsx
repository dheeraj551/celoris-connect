import { Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from '@/components/layouts/AdminLayout'
import DashboardOverview from '@/pages/admin/DashboardOverview'
import UserManagement from '@/pages/admin/UserManagement'
import LeadManagement from '@/pages/admin/LeadManagement'
import TutorApprovals from '@/pages/admin/TutorApprovals'
import TransactionMonitoring from '@/pages/admin/TransactionMonitoring'
import SupportCenter from '@/pages/admin/SupportCenter'
import AIAssistant from '@/pages/admin/AIAssistant'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/leads" element={<LeadManagement />} />
        <Route path="/approvals" element={<TutorApprovals />} />
        <Route path="/transactions" element={<TransactionMonitoring />} />
        <Route path="/support" element={<SupportCenter />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminLayout>
  )
}