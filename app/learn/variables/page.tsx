'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Box, Variable, Code2, Terminal, AlertTriangle } from 'lucide-react'
import LearnCodeEditor from '@/app/components/LearnCodeEditor'
import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function VariablesLesson() {
  const [activeTab, setActiveTab] = useState('learn')
  const [activeSection, setActiveSection] = useState('intro')

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' }
  ]

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'types', label: 'Data Types' },
    { id: 'naming', label: 'Naming Rules' },
    { id: 'practice', label: 'Practice' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="py-6">
          <Link href="/learn" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft size={16} className="mr-1" />
            Back to Lessons
          </Link>
        </div>

        {/* Header */}
        <div className="py-8">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="max-w-4xl"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Understanding Variables</h1>
            <p className="text-xl text-gray-600">
              Learn how to store and manage data in your programs using variables - the building blocks of programming.
            </p>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Quick Tips</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Box className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  Use meaningful variable names
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Variable className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  JavaScript is case-sensitive
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <Terminal className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Always declare variables before using
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'intro' && (
              <>
                {/* Box Storage Analogy */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Think of Variables as Boxes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="prose">
                      <p className="text-gray-700">
                        Imagine you have different boxes to store different things:
                      </p>
                      <ul className="space-y-2 text-gray-700">
                        <li>A box for your name (text)</li>
                        <li>A box for your age (number)</li>
                        <li>A box for your shopping list (array)</li>
                      </ul>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <code className="block text-sm font-mono text-gray-800 whitespace-pre">
{`// Creating boxes (variables)
let name = "Alex";
let age = 25;
let items = ["milk", "bread"];`}</code>
                    </div>
                  </div>
                </div>

                {/* Basic Examples */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Creating Variables</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">Using let</h3>
                      <div className="bg-white rounded-lg p-4">
                        <code className="block text-sm font-mono text-gray-800">
{`let score = 0;          // Start with zero
score = 100;           // Change it later
score = score + 50;    // Update using current value`}</code>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        Use let when your value might change later
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-medium text-gray-900 mb-4">Using const</h3>
                      <div className="bg-white rounded-lg p-4">
                        <code className="block text-sm font-mono text-gray-800">
{`const pi = 3.14159;     // Never changes
const daysInWeek = 7;   // Always stays 7
const name = "Alex";    // Name won't change`}</code>
                      </div>
                      <p className="mt-3 text-sm text-gray-600">
                        Use const when your value should never change
                      </p>
                    </div>
                  </div>
                </div>

                {/* Practice Exercise */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Try It: Temperature Converter</h2>
                  <p className="text-gray-600 mb-6">
                    Create a variable to store a temperature in Fahrenheit, then convert it to Celsius.
                  </p>
                  <LearnCodeEditor
                    initialCode={`function solution(input) {
  // Create a variable for Fahrenheit using the input
  // Convert to Celsius: (F - 32) * 5/9
  // Return the Celsius temperature
}`}
                    testCases={[
                      { input: "32", expectedOutput: "0" },
                      { input: "212", expectedOutput: "100" },
                      { input: "98.6", expectedOutput: "37" }
                    ]}
                  />
                </div>
              </>
            )}

{activeSection === 'types' && (
  <>
    <div className="space-y-8">
      {/* Numbers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Numbers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Integers</h3>
            <div className="bg-white rounded-lg p-4">
              <code className="block text-sm font-mono text-gray-800">
{`let age = 25;
let temperature = -5;
let score = 100;`}</code>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Whole numbers, positive or negative
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Decimals</h3>
            <div className="bg-white rounded-lg p-4">
              <code className="block text-sm font-mono text-gray-800">
{`let price = 19.99;
let pi = 3.14159;
let discount = 0.25;`}</code>
            </div>
            <p className="mt-3 text-sm text-gray-600">
              Numbers with decimal points
            </p>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Watch Out!</h3>
              <p className="text-gray-700">
                Be careful with decimal calculations:
              </p>
              <div className="bg-white rounded-lg p-4 mt-2">
                <code className="block text-sm font-mono text-gray-800">
{`0.1 + 0.2 // Returns 0.30000000000000004
// Use toFixed() for money:
let total = (0.1 + 0.2).toFixed(2); // "0.30"`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Strings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Strings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Basic Strings</h3>
            <div className="bg-white rounded-lg p-4">
              <code className="block text-sm font-mono text-gray-800">
{`let name = "Alex";
let message = 'Hello!';
let text = \`Hi \${name}\`;  // Template literal`}</code>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">String Operations</h3>
            <div className="bg-white rounded-lg p-4">
              <code className="block text-sm font-mono text-gray-800">
{`let firstName = "Alex";
let lastName = "Smith";
let fullName = firstName + " " + lastName;
// Result: "Alex Smith"`}</code>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h3 className="font-medium text-gray-900 mb-4">Cool String Features</h3>
          <div className="bg-white rounded-lg p-4">
            <code className="block text-sm font-mono text-gray-800">
{`let message = "Hello World";

message.length        // 11
message.toUpperCase() // "HELLO WORLD"
message.toLowerCase() // "hello world"
message.split(" ")    // ["Hello", "World"]`}</code>
          </div>
        </div>
      </div>

      {/* Booleans */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booleans</h2>
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">True or False</h3>
            <div className="bg-white rounded-lg p-4">
              <code className="block text-sm font-mono text-gray-800">
{`let isLoggedIn = true;
let hasPermission = false;
let isAdult = age >= 18;  // true or false based on age`}</code>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-100">
            <h3 className="font-medium text-gray-900 mb-4">Common Uses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Game States:</p>
                <code className="block text-sm font-mono text-gray-800">
{`let isGameOver = false;
let isPlaying = true;
let hasWon = false;`}</code>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-2">Form Validation:</p>
                <code className="block text-sm font-mono text-gray-800">
{`let isValid = true;
let hasError = false;
let isComplete = true;`}</code>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Exercise */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Practice: User Profile</h2>
        <p className="text-gray-600 mb-6">
          Create variables to store user information and combine them into a profile message.
        </p>
        <LearnCodeEditor
          initialCode={`function solution(input) {
  // input format: "Alex,25,true"
  // Create variables for name, age, and isPremium
  // Return format: "Name: Alex, Age: 25, Premium: Yes"
}`}
          testCases={[
            { input: "Alex,25,true", expectedOutput: "Name: Alex, Age: 25, Premium: Yes" },
            { input: "Emma,30,false", expectedOutput: "Name: Emma, Age: 30, Premium: No" }
          ]}
        />
      </div>
    </div>
  </>
)}
          </div>
        </div>
      </div>
    </div>
  )
}