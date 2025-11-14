import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { databases, COLLECTIONS } from '@/lib/appwrite'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  Target,
  FileText,
  Wallet,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react'

interface TutorStats {
  totalApplications: number
  approvedApplications: number
  pendingApplications: number
  rejectedApplications: number
  walletBalance: number
  totalEarnings: number
}

export default function TutorDashboardOverview() {
  const { user } = useAuth()
  const [stats, setStats] = useState<TutorStats>({
    totalApplications: 0,
    approvedApplications: 0,
    pendingApplications: 0,
    rejectedApplications: 0,
    walletBalance: 0,
    totalEarnings: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTutorStats()
  }, [])

  const loadTutorStats = async () => {
    try {
      // Load applications for this tutor
      const applicationsResponse = await databases.listDocuments(
        COLLECTIONS.APPLICATIONS, 
        [`userId=${user?.$id}`], 
        0
      )

      const applications = applicationsResponse.documents || []
      
      setStats({
        totalApplications: applications.length,
        approvedApplications: applications.filter(app => app.status === 'approved').length,
        pendingApplications: applications.filter(app => app.status === 'pending').length,
        rejectedApplications: applications.filter(app => app.status === 'rejected').length,
        walletBalance: 0, // Will be loaded from user preferences
        totalEarnings: 0 // Will be calculated from approved applications
      })
    } catch (error) {
      console.error('Error loading tutor stats:', error)
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
      name: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'blue'
    },
    {
      name: 'Approved',
      value: stats.approvedApplications,
      icon: CheckCircle,
      color: 'green'
    },
    {
      name: 'Pending',
      value: stats.pendingApplications,
      icon: Clock,
      color: 'yellow'
    },
    {
      name: 'Rejected',
      value: stats.rejectedApplications,
      icon: XCircle,
      color: 'red'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's your tutoring dashboard overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {statCards.map((card) => (
          <div key={card.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <card.icon className={`h-8 w-8 text-${card.color}-600`} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Current Balance</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Earnings</p>
              <p className="text-2xl font-semibold text-gray-900">${stats.totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Target className="h-5 w-5 mr-2" />
            Browse Leads
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <FileText className="h-5 w-5 mr-2" />
            View Applications
          </button>
          <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <User className="h-5 w-5 mr-2" />
            Update Profile
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm text-gray-600">Application for "Mathematics Grade 10" pending review</p>
            <span className="text-xs text-gray-400">2 hours ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <p className="text-sm text-gray-600">Application for "Physics Grade 11" approved</p>
            <span className="text-xs text-gray-400">1 day ago</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <p className="text-sm text-gray-600">Profile updated successfully</p>
            <span className="text-xs text-gray-400">3 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}