// app/components/SplitCodeEditor.tsx
'use client'

import { useState, useCallback } from 'react'
import Editor from '@monaco-editor/react'

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
}

export default function SplitCodeEditor({
  code,
  onChange,
  language = 'javascript',
  readOnly = false,
  testCases = []
}: SplitCodeEditorProps) {
  const [output, setOutput] = useState<string>('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [activeTest, setActiveTest] = useState<number | null>(null)

  const customConsole = {
    log: (...args: any[]) => {
      setConsoleOutput(prev => [...prev, args.map(arg => String(arg)).join(' ')])
    },
    error: (...args: any[]) => {
      setConsoleOutput(prev => [...prev, `Error: ${args.map(arg => String(arg)).join(' ')}`])
    }
  }

  const executeCode = useCallback((codeToRun: string) => {
    try {
      // Create a safe function execution environment
      const executeFunction = new Function('console', codeToRun)
      executeFunction(customConsole)
    } catch (error) {
      customConsole.error(error)
    }
  }, [])

  const runCode = useCallback(() => {
    setConsoleOutput([])
    executeCode(code)
  }, [code, executeCode])

  const runTestCase = useCallback((testCase: TestCase, index: number) => {
    setActiveTest(index)
    setConsoleOutput([])
    
    const testCode = `
      ${code}
      const result = solution(${testCase.input});
      console.log('Result:', result);
      console.log('Expected:', ${testCase.expectedOutput});
      console.log('Test ' + (result === ${testCase.expectedOutput} ? 'PASSED ✓' : 'FAILED ✗'));
    `
    
    executeCode(testCode)
  }, [code, executeCode])

  return (
    <div className="grid grid-cols-2 gap-4 h-[600px]">
      <div className="flex flex-col border rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-sm flex justify-between items-center">
          <span>Code Editor</span>
          <button
            onClick={runCode}
            className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            Run Code
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

      <div className="flex flex-col border rounded-lg overflow-hidden">
        <div className="bg-gray-800 text-white px-4 py-2 text-sm">
          Output
        </div>
        <div className="flex-1 bg-gray-900 text-white p-4 font-mono text-sm overflow-auto">
          {testCases.length > 0 && (
            <div className="mb-4">
              <h3 className="text-gray-400 mb-2">Test Cases:</h3>
              <div className="space-y-2">
                {testCases.map((test, index) => (
                  <button
                    key={index}
                    onClick={() => runTestCase(test, index)}
                    className={`w-full text-left p-2 rounded ${
                      activeTest === index ? 'bg-gray-700' : 'bg-gray-800'
                    } hover:bg-gray-700`}
                  >
                    <div>Input: {test.input}</div>
                    <div>Expected: {test.expectedOutput}</div>
                  </button>
                ))}
              </div>
              <hr className="my-4 border-gray-700" />
            </div>
          )}

          <div className="space-y-1">
            {consoleOutput.map((line, index) => (
              <div key={index} className="text-gray-300">
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}