import { useEffect, useState } from 'react'
import { databases, COLLECTIONS } from '@/lib/appwrite'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Search, Filter, MapPin, BookOpen, Calendar, DollarSign, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

interface Lead {
  $id: string
  title: string
  subject: string
  grade: string
  location: string
  cpl: number
  description: string
  status: string
  createdAt: string
  requirements?: string[]
  schedule?: string
}

export default function LeadMarketplace() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('all')
  const [selectedLocation, setSelectedLocation] = useState('all')

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = async () => {
    try {
      const response = await databases.listDocuments(COLLECTIONS.LEADS, [], 0)
      const activeLeads = response.documents.filter(lead => lead.status === 'active')
      setLeads(activeLeads as Lead[])
    } catch (error) {
      console.error('Error loading leads:', error)
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const applyForLead = async (leadId: string, cpl: number) => {
    try {
      // Create application record
      await databases.createDocument(COLLECTIONS.APPLICATIONS, {
        leadId,
        userId: 'current-user-id', // Replace with actual user ID from auth
        status: 'pending',
        cpl: cpl,
        appliedAt: new Date().toISOString()
      })
      
      toast.success('Application submitted successfully!')
    } catch (error) {
      console.error('Error applying for lead:', error)
      toast.error('Failed to submit application')
    }
  }

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === 'all' || lead.subject === selectedSubject
    const matchesLocation = selectedLocation === 'all' || lead.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    return matchesSearch && matchesSubject && matchesLocation
  })

  const subjects = ['all', ...Array.from(new Set(leads.map(lead => lead.subject)))]
  const locations = ['all', ...Array.from(new Set(leads.map(lead => lead.location)))]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" text="Loading leads..." />
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Lead Marketplace</h1>
        <p className="text-gray-600">Find student leads that match your expertise</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 input"
            />
          </div>
          
          {/* Subject Filter */}
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
          
          {/* Location Filter */}
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="input"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location === 'all' ? 'All Locations' : location}
              </option>
            ))}
          </select>
          
          <button className="btn btn-outline">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredLeads.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No leads found matching your criteria</p>
          </div>
        ) : (
          filteredLeads.map((lead) => (
            <div key={lead.$id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{lead.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {lead.subject} - {lead.grade}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      {lead.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-lg font-semibold text-green-600">
                      <DollarSign className="h-5 w-5" />
                      {lead.cpl}
                    </div>
                    <p className="text-xs text-gray-500">per lead</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{lead.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    Posted {new Date(lead.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => applyForLead(lead.$id, lead.cpl)}
                    className="btn btn-primary px-6 py-2"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}