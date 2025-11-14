import { useState } from 'react'
import { Send, Bot, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant for Celoris Connect. I can help you analyze platform data and answer questions. What would you like to know?'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user' as const,
      content: input
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Simulate AI response for now
      // In production, this would call the Gemini API
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          type: 'assistant' as const,
          content: `I understand you're asking about "${input}". This is a simulated response. In the actual implementation, this would connect to Gemini AI to provide intelligent analysis of your platform data.`
        }
        setMessages(prev => [...prev, aiResponse])
        setLoading(false)
      }, 1500)
    } catch (error) {
      toast.error('Failed to get AI response')
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">AI Assistant</h1>
        <p className="text-gray-600">Ask questions about your platform data and get intelligent insights</p>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-lg shadow-lg flex flex-col h-96">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-primary-600' 
                    : 'bg-gray-100'
                }`}>
                  {message.type === 'user' ? (
                    <span className="text-white text-sm font-medium">U</span>
                  ) : (
                    <Bot className="h-4 w-4 text-gray-600" />
                  )}
                </div>
                <div className={`px-4 py-2 rounded-lg text-sm ${
                  message.type === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-gray-600" />
                </div>
                <div className="px-4 py-2 rounded-lg bg-gray-100">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your platform data, user analytics, or request content generation..."
              className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !input.trim()}
              className="btn btn-primary px-4 py-2"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="mt-6 bg-blue-50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Suggested Questions:</h3>
        <div className="space-y-2">
          <button 
            onClick={() => setInput('What are the most popular subjects among tutors in Delhi?')}
            className="block w-full text-left text-sm text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded"
          >
            • What are the most popular subjects among tutors in Delhi?
          </button>
          <button 
            onClick={() => setInput('Generate a welcome email template for newly approved tutors')}
            className="block w-full text-left text-sm text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded"
          >
            • Generate a welcome email template for newly approved tutors
          </button>
          <button 
            onClick={() => setInput('Show me the monthly revenue trends and predictions')}
            className="block w-full text-left text-sm text-blue-800 hover:text-blue-900 hover:bg-blue-100 px-2 py-1 rounded"
          >
            • Show me the monthly revenue trends and predictions
          </button>
        </div>
      </div>
    </div>
  )
}