// app/components/LearnCodeEditor.tsx
import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { CheckCircle, XCircle, PlayCircle } from 'lucide-react'

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface LearnCodeEditorProps {
  initialCode?: string;
  language?: string;
  testCases?: TestCase[];
}

export default function LearnCodeEditor({
  initialCode = '',
  language = 'javascript',
  testCases = []
}: LearnCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [results, setResults] = useState<Array<{ passed: boolean; output: string }>>([])

  const runCode = () => {
    const newResults = testCases.map(test => {
      try {
        // Execute the code in a controlled environment
        const executableCode = `
          ${code}
          return solution(${test.input});
        `
        const result = new Function(executableCode)()
        const passed = String(result) === test.expectedOutput
        
        return {
          passed,
          output: `Input: ${test.input}\nOutput: ${result}\nExpected: ${test.expectedOutput}`
        }
      } catch (error) {
        return {
          passed: false,
          output: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      }
    })

    setResults(newResults)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200">
        {/* Header */}
        <div className="px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-700 flex justify-between items-center">
          <h3 className="font-medium text-white">Code Playground</h3>
          <button
            onClick={runCode}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 
                     text-white rounded-lg transition-colors text-sm font-medium"
          >
            <PlayCircle className="w-4 h-4" />
            Run Code
          </button>
        </div>

        {/* Editor */}
        <div className="h-[300px]">
          <Editor
            height="100%"
            defaultLanguage={language}
            value={code}
            onChange={value => setCode(value || '')}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 16, bottom: 16 }
            }}
          />
        </div>
      </div>

      {/* Test Results */}
      <div className="p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-4">Test Results</h4>
        <div className="space-y-3">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.passed 
                    ? 'bg-teal-50 border border-teal-100' 
                    : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium text-gray-900">
                    Test Case {index + 1} - {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <pre className="text-sm font-mono text-gray-600 whitespace-pre-wrap bg-white rounded-lg p-3 border border-gray-100">
                  {result.output}
                </pre>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <PlayCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              Click "Run Code" to test your solution
            </div>
          )}
        </div>
      </div>
    </div>
  )
}