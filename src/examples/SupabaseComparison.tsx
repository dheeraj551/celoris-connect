import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface Lead {
  id: string
  subject: string
  grade: string
  location: string
  cost_per_lead: number
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  created_at: string
  profiles?: {
    name: string
    email: string
  }
  applications?: {
    id: string
    status: string
  }[]
}

// =============================================
// EXAMPLE: LEAD MANAGEMENT - Appwrite vs Supabase
// =============================================

// OLD - Appwrite Style
export function AppwriteLeadService() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      // Complex Appwrite query with multiple constraints
      const { documents, total } = await databases.listDocuments('celoris_connect', 'leads', [
        Query.notEqual('status', 'rejected'),
        Query.orderDesc('createdAt'),
        Query.limit(50)
      ])
      
      setLeads(documents as Lead[])
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    try {
      const document = await databases.createDocument('celoris_connect', 'leads', {
        ...leadData,
        createdAt: new Date().toISOString()
      })
      
      // Manual real-time update needed
      setLeads(prev => [document, ...prev])
      toast.success('Lead created successfully')
    } catch (error) {
      console.error('Error creating lead:', error)
      toast.error('Failed to create lead')
    }
  }

  // No built-in real-time subscriptions
  useEffect(() => {
    fetchLeads()
  }, [])

  return { leads, loading, createLead }
}

// NEW - Supabase Style
export function SupabaseLeadService() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  const fetchLeads = async () => {
    try {
      setLoading(true)
      
      // Simple, SQL-like query with joins
      const { data, error } = await supabase
        .from('leads')
        .select(`
          *,
          profiles!leads_created_by_fkey(name, email),
          applications(count)
        `)
        .neq('status', 'rejected')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      
      setLeads(data || [])
    } catch (error) {
      console.error('Error fetching leads:', error)
      toast.error('Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const createLead = async (leadData: Omit<Lead, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert({
          ...leadData,
          created_by: (await supabase.auth.getUser()).data.user?.id
        })
        .select()
        .single()

      if (error) throw error

      // UI automatically updates via real-time subscription
      toast.success('Lead created successfully')
      return data
    } catch (error) {
      console.error('Error creating lead:', error)
      toast.error('Failed to create lead')
    }
  }

  // Built-in real-time subscriptions
  useEffect(() => {
    fetchLeads()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('leads-changes')
      .on('postgres_changes', {
        event: '*', // INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'leads'
      }, (payload) => {
        console.log('Real-time update:', payload)
        
        if (payload.eventType === 'INSERT') {
          setLeads(prev => [payload.new, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setLeads(prev => prev.map(lead => 
            lead.id === payload.new.id ? payload.new : lead
          ))
        } else if (payload.eventType === 'DELETE') {
          setLeads(prev => prev.filter(lead => lead.id !== payload.old.id))
        }
      })
      .subscribe()

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { leads, loading, createLead }
}

// =============================================
// EXAMPLE: REAL-TIME NOTIFICATIONS
// =============================================

export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<string[]>([])

  useEffect(() => {
    // Subscribe to new applications for tutors
    const { data: { user } } = supabase.auth.getUser()
    if (!user) return

    const subscription = supabase
      .channel('tutor-notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'applications',
        filter: `tutor_id=eq.${user.id}`
      }, (payload) => {
        const message = `New application for lead: ${payload.new.lead_id}`
        setNotifications(prev => [...prev, message])
        toast.success(message)
      })
      .subscribe()

    return () => subscription.unsubscribe()
  }, [])
}

// =============================================
// EXAMPLE: COMPLEX QUERIES MADE SIMPLE
// =============================================

export async function getDashboardStats(userId: string) {
  // Complex query with multiple joins and aggregations
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      leads:applications!applications_tutor_id_fkey(
        *,
        lead:leads!applications_lead_id_fkey(
          *,
          applications!applications_lead_id_fkey(count)
        )
      ),
      transactions(
        amount,
        type,
        date
      ),
      support_tickets!support_tickets_user_id_fkey(
        id,
        status,
        created_at
      )
    `)
    .eq('id', userId)
    .single()

  if (error) throw error

  // Calculate statistics
  const stats = {
    totalLeads: data.leads?.length || 0,
    approvedApplications: data.leads?.filter(l => l.status === 'approved').length || 0,
    totalEarnings: data.transactions
      ?.filter(t => t.type === 'credit')
      ?.reduce((sum, t) => sum + t.amount, 0) || 0,
    pendingTickets: data.support_tickets?.filter(t => t.status === 'open').length || 0
  }

  return { userData: data, stats }
}

// =============================================
// BENEFITS SUMMARY
// =============================================

/*
REAL-TIME FEATURES:
✅ Instant UI updates when data changes
✅ Live notifications for new applications
✅ Collaborative features (multiple users seeing same data)
✅ Real-time statistics and dashboards

DEVELOPMENT SPEED:
✅ Hot reloading - instant code changes
✅ Built-in query builder - no complex API calls
✅ Auto-generated TypeScript types
✅ Visual database browser

SECURITY:
✅ Row Level Security policies
✅ Automatic data filtering
✅ No client-side data manipulation needed

PERFORMANCE:
✅ PostgreSQL with proper indexing
✅ Optimized queries with joins
✅ Real-time subscriptions via WebSocket
✅ CDN for file storage
*/