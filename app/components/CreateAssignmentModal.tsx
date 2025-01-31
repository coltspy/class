import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { X, Plus, Minus, AlertCircle } from 'lucide-react'

interface TestCase {
  input: string;
  expectedOutput: string;
}

export default function CreateAssignmentModal({ 
  classId, 
  onClose 
}: { 
  classId: string; 
  onClose: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: 100,
    language: 'javascript',
    starterCode: `// Write your code here
function solution(input) {
  // Your code here
  return
}`,
    testCases: [{ input: '', expectedOutput: '' }] as TestCase[]
  })

  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: '', expectedOutput: '' }]
    }))
  }

  const updateTestCase = (index: number, field: keyof TestCase, value: string) => {
    const newTestCases = [...formData.testCases]
    newTestCases[index] = { ...newTestCases[index], [field]: value }
    setFormData(prev => ({ ...prev, testCases: newTestCases }))
  }

  const removeTestCase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      await addDoc(collection(db, 'assignments'), {
        ...formData,
        classId,
        status: 'published',
        createdAt: new Date().toISOString(),
        submissions: {}
      })
      onClose()
    } catch (error) {
      setError('Failed to create assignment. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl h-[90vh] flex flex-col shadow-xl">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">Create Assignment</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6 space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                             focus:ring-teal-500 focus:border-transparent transition-colors"
                    placeholder="e.g., Build a Binary Search Function"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                             focus:ring-teal-500 focus:border-transparent transition-colors h-32"
                    placeholder="Describe the problem, requirements, and any hints..."
                    required
                  />
                </div>
              </div>

              {/* Programming Section */}
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Programming Language
                    </label>
                    <select
                      value={formData.language}
                      onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                               focus:ring-teal-500 focus:border-transparent transition-colors"
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="java">Java</option>
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Points
                    </label>
                    <input
                      type="number"
                      value={formData.points}
                      onChange={e => setFormData(prev => ({ ...prev, points: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                               focus:ring-teal-500 focus:border-transparent transition-colors"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Starter Code
                  </label>
                  <textarea
                    value={formData.starterCode}
                    onChange={e => setFormData(prev => ({ ...prev, starterCode: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                             focus:ring-teal-500 focus:border-transparent transition-colors h-40 
                             font-mono text-sm"
                  />
                </div>
              </div>

              {/* Test Cases Section */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Test Cases
                  </label>
                  <button
                    type="button"
                    onClick={addTestCase}
                    className="text-sm text-teal-600 hover:text-teal-700 font-medium 
                             flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Test Case
                  </button>
                </div>
                
                <div className="space-y-4">
                  {formData.testCases.map((testCase, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-100"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-600">
                          Test Case {index + 1}
                        </span>
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removeTestCase(index)}
                            className="p-1 text-gray-400 hover:text-red-500 rounded"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={testCase.input}
                          onChange={e => updateTestCase(index, 'input', e.target.value)}
                          placeholder="Input"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-teal-500 focus:border-transparent 
                                   transition-colors bg-white"
                        />
                        <input
                          type="text"
                          value={testCase.expectedOutput}
                          onChange={e => updateTestCase(index, 'expectedOutput', e.target.value)}
                          placeholder="Expected Output"
                          className="w-full px-3 py-2 rounded-lg border border-gray-200 
                                   focus:ring-2 focus:ring-teal-500 focus:border-transparent 
                                   transition-colors bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.dueDate}
                  onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 
                           focus:ring-teal-500 focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg 
                           transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 
                           transition-colors disabled:bg-teal-300 disabled:cursor-not-allowed
                           flex items-center gap-2"
                >
                  {isSubmitting ? 'Creating...' : 'Create Assignment'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}