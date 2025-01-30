// app/components/SplitCodeEditor.tsx
'use client'

import { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'
import { CheckCircle, XCircle } from 'lucide-react'

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface SplitCodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  testCases?: TestCase[];
  onSubmit?: () => void;
}

export default function SplitCodeEditor({
  code,
  onChange,
  language = 'javascript',
  readOnly = false,
  testCases = [],
  onSubmit
}: SplitCodeEditorProps) {
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[]>([])
  const [allTestsPassed, setAllTestsPassed] = useState(false)

  const executeTest = useCallback((testCase: TestCase, code: string): { passed: boolean; output: string } => {
    try {
      const executableCode = `
        ${code}
        const result = solution(${testCase.input});
        return result;
      `
      const testFunction = new Function(executableCode)
      const result = testFunction()
      const passed = String(result) === testCase.expectedOutput
      
      return {
        passed,
        output: `Result: ${result}\nExpected: ${testCase.expectedOutput}\nTest ${passed ? 'PASSED ✓' : 'FAILED ✗'}`
      }
    } catch (error) {
      return {
        passed: false,
        output: `Error: ${error}`
      }
    }
  }, [])

  const runAllTests = useCallback(() => {
    setConsoleOutput([])
    const results = testCases.map(testCase => executeTest(testCase, code))
    setTestResults(results)
    setAllTestsPassed(results.every(result => result.passed))
    setConsoleOutput(results.map(r => r.output))
  }, [code, testCases, executeTest])

  return (
    <div className="grid grid-cols-2 gap-6 min-h-[600px]">
      {/* Code Editor */}
      <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-gray-700">Solution</span>
          <button
            onClick={runAllTests}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors"
          >
            Run Tests
          </button>
        </div>
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={(value) => onChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            readOnly: readOnly,
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Panel */}
      <div className="flex flex-col rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <span className="font-medium text-gray-700">Test Results</span>
          {onSubmit && (
            <button
              onClick={onSubmit}
              disabled={!allTestsPassed}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                allTestsPassed 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Submit Solution
            </button>
          )}
        </div>
        <div className="flex-1 bg-gray-50 p-6 overflow-auto">
          <div className="space-y-4">
            {testResults.length > 0 ? (
              testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    result.passed 
                      ? 'bg-green-50 border border-green-100' 
                      : 'bg-red-50 border border-red-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">Test Case {index + 1}</span>
                    {result.passed ? (
                      <CheckCircle className="text-green-600" size={18} />
                    ) : (
                      <XCircle className="text-red-600" size={18} />
                    )}
                  </div>
                  <pre className="whitespace-pre-wrap text-sm font-mono text-gray-600">
                    {result.output}
                  </pre>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Click "Run Tests" to check your solution
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}