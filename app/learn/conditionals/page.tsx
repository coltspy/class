'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Code2, ChevronRight } from 'lucide-react'
import SplitCodeEditor from '@/app/components/SplitCodeEditor'

export default function ConditionalsLesson() {
  const [code, setCode] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-8 py-6">
        <Link 
          href="/learn"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Lessons
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Conditionals in JavaScript</h1>
        <p className="text-lg text-gray-600 mb-8">
          Learn how to make decisions in your code using if statements and logical operations.
        </p>

        {/* Introduction */}
        <div className="prose max-w-none text-gray-600 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What are Conditionals?</h2>
            <p>
              Conditionals are like decision-makers in your code. Just like how we make decisions in real life
              based on certain conditions, our code can do the same. Think of them as "if-then" statements:
              IF something is true, THEN do this; OTHERWISE, do that.
            </p>
          </section>

          {/* Basic If Statement */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Basic If Statement</h2>
            <p className="mb-4">
              The simplest form of a conditional is an if statement. It runs code only when a condition is true.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-4">
              <code className="block text-sm whitespace-pre font-mono text-gray-800">
{`if (condition) {
    // code to run if condition is true
}`}
              </code>
            </div>
            <p className="mt-4">Let's look at a real example:</p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-4">
              <code className="block text-sm whitespace-pre font-mono text-gray-800">
{`const age = 18;

if (age >= 18) {
    console.log("You can vote!");
}`}
              </code>
            </div>
          </section>

          {/* If-Else */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">If-Else Statements</h2>
            <p>
              Often, you want to do one thing if a condition is true, and something else if it's false.
              That's where if-else comes in.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-4">
              <code className="block text-sm whitespace-pre font-mono text-gray-800">
{`const age = 16;

if (age >= 18) {
    console.log("You can vote!");
} else {
    console.log("Sorry, you're too young to vote.");
}`}
              </code>
            </div>
          </section>

          {/* Else If */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Else If Statements</h2>
            <p>
              Sometimes you need to check multiple conditions. That's where else if comes in handy.
            </p>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 my-4">
              <code className="block text-sm whitespace-pre font-mono text-gray-800">
{`const score = 85;

if (score >= 90) {
    console.log("A grade");
} else if (score >= 80) {
    console.log("B grade");
} else if (score >= 70) {
    console.log("C grade");
} else {
    console.log("Study more!");
}`}
              </code>
            </div>
          </section>

          {/* Comparison Operators */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comparison Operators</h2>
            <p>Here are the main operators you can use in conditions:</p>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">==</code>
                <p className="text-sm text-gray-600 mt-1">Equal to (value)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">===</code>
                <p className="text-sm text-gray-600 mt-1">Equal to (value and type)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">!=</code>
                <p className="text-sm text-gray-600 mt-1">Not equal to (value)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">!==</code>
                <p className="text-sm text-gray-600 mt-1">Not equal to (value and type)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">{'>'}</code>
                <p className="text-sm text-gray-600 mt-1">Greater than</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">{'<'}</code>
                <p className="text-sm text-gray-600 mt-1">Less than</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">{'>'}=</code>
                <p className="text-sm text-gray-600 mt-1">Greater than or equal to</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <code className="font-mono text-gray-800">{'<='}</code>
                <p className="text-sm text-gray-600 mt-1">Less than or equal to</p>
              </div>
            </div>
          </section>

          {/* Logical Operators */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Logical Operators</h2>
            <p>
              Sometimes you need to combine multiple conditions. That's where logical operators come in:
            </p>
            <div className="space-y-4 my-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">AND (&&)</h3>
                <p className="text-gray-600 mb-3">Both conditions must be true</p>
                <code className="block text-sm whitespace-pre font-mono text-gray-800 bg-gray-50 p-4 rounded">
{`if (age >= 18 && hasID) {
    console.log("You can enter the venue");
}`}
                </code>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">OR (||)</h3>
                <p className="text-gray-600 mb-3">At least one condition must be true</p>
                <code className="block text-sm whitespace-pre font-mono text-gray-800 bg-gray-50 p-4 rounded">
{`if (isMember || hasGuestPass) {
    console.log("Welcome to the club");
}`}
                </code>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">NOT (!)</h3>
                <p className="text-gray-600 mb-3">Inverts a condition</p>
                <code className="block text-sm whitespace-pre font-mono text-gray-800 bg-gray-50 p-4 rounded">
{`if (!isClosed) {
    console.log("The store is open");
}`}
                </code>
              </div>
            </div>
          </section>

          {/* Practice Section */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Practice Time!</h2>
            <p className="mb-6">
              Let's try writing a function that determines if a number is positive, negative, or zero.
            </p>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <SplitCodeEditor
                code={`function checkNumber(num) {
  // Write your code here
  // Return "positive" if num is greater than 0
  // Return "negative" if num is less than 0
  // Return "zero" if num equals 0
}`}
                onChange={setCode}
                language="javascript"
                testCases={[
                  { input: "5", expectedOutput: "positive" },
                  { input: "-3", expectedOutput: "negative" },
                  { input: "0", expectedOutput: "zero" }
                ]}
              />
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Using = Instead of ==</h3>
                <p className="text-gray-600">
                  The single = is for assignment, while == and === are for comparison.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Forgetting Curly Braces</h3>
                <p className="text-gray-600">
                  Always use curly braces for clarity, even for single-line statements.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Not Understanding Truthy/Falsy Values</h3>
                <p className="text-gray-600">
                  Remember that values like 0, "", null, and undefined are considered falsy.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Next Steps */}
        <section className="mt-12 bg-teal-50 rounded-xl p-6 border border-teal-100">
          <h2 className="text-xl font-semibold text-teal-900 mb-2">Ready to Continue?</h2>
          <p className="text-teal-700 mb-4">
            Now that you understand conditionals, you're ready to learn about loops!
          </p>
          <Link 
            href="/learn/loops"
            className="inline-flex items-center text-teal-700 font-medium hover:text-teal-800"
          >
            Go to Loops
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  )
}