// app/components/CreateAssignmentModal.tsx
'use client'

import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '@/app/lib/firebase'
import { X, Plus, Minus } from 'lucide-react'

interface TestCase {
  input: string;
  expectedOutput: string;
}

export default function CreateAssignmentModal({ classId, onClose }: { classId: string; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    points: 100,
    language: 'javascript',
    starterCode: `// Write your solution here
function solution(input) {
  // Your code here
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
      console.error('Error creating assignment:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Create Coding Assignment</h2>
          <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Calculate Fibonacci Sequence"
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
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              placeholder="Write the problem description, requirements, and any hints..."
              required
            />
          </div>

          {/* Programming Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Programming Language
            </label>
            <select
              value={formData.language}
              onChange={e => setFormData(prev => ({ ...prev, language: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Starter Code
            </label>
            <textarea
              value={formData.starterCode}
              onChange={e => setFormData(prev => ({ ...prev, starterCode: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-40 font-mono"
            />
          </div>

          {/* Test Cases */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Test Cases
              </label>
              <button
                type="button"
                onClick={addTestCase}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Add Test Case
              </button>
            </div>
            <div className="space-y-4">
              {formData.testCases.map((testCase, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={testCase.input}
                      onChange={e => updateTestCase(index, 'input', e.target.value)}
                      placeholder="Input"
                      className="w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                      type="text"
                      value={testCase.expectedOutput}
                      onChange={e => updateTestCase(index, 'expectedOutput', e.target.value)}
                      placeholder="Expected Output"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Minus size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Due Date and Points */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Points
              </label>
              <input
                type="number"
                value={formData.points}
                onChange={e => setFormData(prev => ({ ...prev, points: Number(e.target.value) }))}
                className="w-full p-2 border rounded-lg"
                min="0"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}