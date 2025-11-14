import { Client, Account, Databases, Storage } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_PUBLIC_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)

// Appwrite Collections (will be configured in Appwrite dashboard)
// These are the document IDs we'll use throughout the app
export const COLLECTIONS = {
  USERS: 'users',
  LEADS: 'leads', 
  APPLICATIONS: 'applications',
  TRANSACTIONS: 'transactions',
  SUPPORT_TICKETS: 'support_tickets',
} as const

// Database configurations
export const DATABASE_ID = 'celoris_connect'

// Storage buckets
export const BUCKETS = {
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
} as const

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TUTOR: 'tutor',
} as const

// Lead statuses
export const LEAD_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved', 
  REJECTED: 'rejected',
  COMPLETED: 'completed',
} as const

// Application statuses  
export const APPLICATION_STATUSES = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const

export default client