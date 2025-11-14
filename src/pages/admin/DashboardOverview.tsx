import { useEffect, useState } from 'react'
import { databases, COLLECTIONS } from '@/lib/appwrite'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  Users,
  Target,
  CheckCircle,
  Headphones,
  CreditCard,
  TrendingUp,
  Calendar,
  DollarSign
} from 'lucide-react'

interface DashboardStats {
  totalTutors: number
  activeLeads: number
  pendingApprovals: number
  supportTickets: number
  totalRevenue: number
  monthlyGrowth: number
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTutors: 0,
    activeLeads: 0,
    pendingApprovals: 0,
    supportTickets: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardStats()
  }, [])

  const loadDashboardStats = async () => {
    try {
      // Load various statistics from Appwrite
      const [
        usersResponse,
        leadsResponse,
        applicationsResponse,
        ticketsResponse
      ] = await Promise.all([
        databases.listDocuments(COLLECTIONS.USERS, [], 0),
        databases.listDocuments(COLLECTIONS.LEADS, [], 0),
        databases.listDocuments(COLLECTIONS.APPLICATIONS, [], 0),
        databases.listDocuments(COLLECTIONS.SUPPORT_TICKETS, [], 0)
      ])

      const tutors = usersResponse.documents.filter(user => user.role === 'tutor')
      const activeLeads = leadsResponse.documents.filter(lead => lead.status === 'active')
      const pendingApprovals = applicationsResponse.documents.filter(app => app.status === 'pending')
      const supportTickets = ticketsResponse.documents.filter(ticket => ticket.status === 'open')

      setStats({
        totalTutors: tutors.length,
        activeLeads: activeLeads.length,
        pendingApprovals: pendingApprovals.length,
        supportTickets: supportTickets.length,
        totalRevenue: 0, // Calculate from transactions
        monthlyGrowth: 12.5 // Mock data
      })
    } catch (error) {
      console.error('Error loading dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  const statCards = [
    {
      name: 'Total Tutors',
      value: stats.totalTutors,
      icon: Users,
      change: '+8.2%',
      changeType: 'increase'
    },
    {
      name: 'Active Leads',
      value: stats.activeLeads,
      icon: Target,
      change: '+12.5%',
      changeType: 'increase'
    },
    {
      name: 'Pending Approvals',
      value: stats.pendingApprovals,
      icon: CheckCircle,
      change: '-3.1%',
      changeType: 'decrease'
    },
    {
      name: 'Support Tickets',
      value: stats.supportTickets,
      icon: Headphones,
      change: '+2.3%',
      changeType: 'increase'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <card.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
                  <p className={`ml-2 text-sm font-medium ${
                    card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue and Growth */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">$12,480</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Monthly Growth</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.monthlyGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Target className="h-5 w-5 mr-2" />
            Create New Lead
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <CheckCircle className="h-5 w-5 mr-2" />
            Review Approvals
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Calendar className="h-5 w-5 mr-2" />
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  )
}