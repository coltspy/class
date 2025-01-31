import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { CheckCircle, XCircle, PlayCircle } from 'lucide-react'

interface TestCase {
  input: string;
  expectedOutput: string;
}

export default function LearnCodeEditor({
  initialCode = '',
  language = 'javascript',
  testCases = []
}: {
  initialCode?: string;
  language?: string;
  testCases?: TestCase[];
}) {
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
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        return {
          passed: false,
          output: `Error: ${errorMessage}`
        }
      }
    })

    setResults(newResults)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Code Editor</h3>
          <button
            onClick={runCode}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white 
                     rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium"
          >
            <PlayCircle className="w-4 h-4" />
            Run Code
          </button>
        </div>
        <div className="h-[300px] border-b border-gray-200">
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
              wordWrap: 'on'
            }}
          />
        </div>
      </div>

      <div className="p-4 bg-gray-50">
        <h4 className="font-medium text-gray-900 mb-4">Test Results</h4>
        <div className="space-y-3">
          {results.length > 0 ? (
            results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.passed 
                    ? 'bg-green-50 border border-green-100' 
                    : 'bg-red-50 border border-red-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {result.passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <span className="font-medium">
                    Test Case {index + 1} - {result.passed ? 'Passed' : 'Failed'}
                  </span>
                </div>
                <pre className="text-sm font-mono text-gray-600 whitespace-pre-wrap">
                  {result.output}
                </pre>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">
              Click "Run Code" to test your solution
            </p>
          )}
        </div>
      </div>
    </div>
  )
}