'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight, Code2, CheckCircle, BookOpen, BrainCircuit, Lightbulb, AlertTriangle } from 'lucide-react'
import LearnCodeEditor from '@/app/components/LearnCodeEditor'
import { motion } from 'framer-motion'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function ConditionalsLesson() {
  const [activeTab, setActiveTab] = useState('learn')
  const [activeSection, setActiveSection] = useState('intro')

  const tabs = [
    { id: 'learn', label: 'Learn' },
    { id: 'practice', label: 'Practice' },
    { id: 'challenge', label: 'Challenge' }
  ]

  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'basics', label: 'Basic Conditionals' },
    { id: 'comparison', label: 'Comparison' },
    { id: 'logical', label: 'Logical Operators' },
    { id: 'advanced', label: 'Advanced Topics' }
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mastering Conditional Logic</h1>
            <p className="text-xl text-gray-600">
              Learn how to write smart, decision-making code that adapts to different situations.
            </p>
          </motion.div>
        </div>

        {/* Main Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {activeTab === 'learn' && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Table of Contents</h3>
                </div>
                <nav className="p-2">
                  {sections.map(section => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm ${
                        activeSection === section.id
                          ? 'bg-teal-50 text-teal-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {section.label}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Progress Card */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-sm border border-purple-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lesson Progress</span>
                  <span className="font-medium text-purple-600">20%</span>
                </div>
                <div className="w-full bg-white rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Tips</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  Always use === instead of == for comparisons
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  Keep conditions simple and readable
                </li>
                <li className="flex items-start gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  Test edge cases in your conditions
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'learn' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Introduction Section */}
                {activeSection === 'intro' && (
                  <>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm border border-blue-100 p-8">
                      <div className="flex items-start gap-6">
                        <div className="bg-blue-100 rounded-lg p-3">
                          <BrainCircuit className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Do We Need Conditionals?</h2>
                          <p className="text-lg text-gray-700 mb-6">
                            Imagine you're creating a game where a player can open treasure chests. Before opening a chest,
                            you need to check: Does the player have the right key? Is the chest trapped? Is the player's
                            inventory full? These are all decisions your code needs to make.
                          </p>
                          <div className="bg-white rounded-lg p-6 border border-blue-100">
                            <h3 className="font-medium text-gray-900 mb-3">Real-World Examples:</h3>
                            <ul className="space-y-2 text-gray-700">
                              <li>• E-commerce: Checking if a user is old enough to buy certain products</li>
                              <li>• Social Media: Deciding whether to show a "following" or "follow" button</li>
                              <li>• Banking Apps: Verifying if an account has sufficient funds</li>
                              <li>• Weather Apps: Choosing which icon to display based on conditions</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mental Model Section */}
<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
  <h2 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Conditionals: Real-World Examples</h2>
  
  {/* Fork in the Road Example */}
  <div className="space-y-6">
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
      <h3 className="font-medium text-gray-900 mb-4">🚶 Walking to School</h3>
      
      <div className="prose max-w-none text-gray-600 mb-4">
        <p>
          Imagine you're walking to school and it starts to rain. You have two choices:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>If it's raining, you take the covered route</li>
          <li>If it's not raining, you take the shorter uncovered route</li>
        </ul>
        <p>In code, this decision looks like:</p>
      </div>

      <div className="bg-white rounded-lg p-4">
        <code className="block text-sm font-mono text-gray-800 whitespace-pre">
{`// Real-world decision
if (isRaining) {
    takeCoveredRoute();     // Stay dry under cover
} else {
    takeShortRoute();       // Take the quicker path
}`}</code>
      </div>
    </div>

    {/* Ice Cream Example */}
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
      <h3 className="font-medium text-gray-900 mb-4">🍦 Ice Cream Shop Decisions</h3>
      
      <div className="prose max-w-none text-gray-600 mb-4">
        <p>
          When ordering ice cream, you might go through several choices:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>First, check if they have chocolate</li>
          <li>If not, maybe try vanilla</li>
          <li>If that's out too, settle for strawberry</li>
          <li>If nothing you want is available, leave without ice cream</li>
        </ul>
        <p>Here's how that looks in code:</p>
      </div>

      <div className="bg-white rounded-lg p-4">
        <code className="block text-sm font-mono text-gray-800 whitespace-pre">
{`// Ice cream decision process
if (hasChocolate) {
    orderChocolate();               // First choice
} else if (hasVanilla) {
    orderVanilla();                 // Second choice
} else if (hasStrawberry) {
    orderStrawberry();              // Third choice
} else {
    leaveWithoutIceCream();         // No good options
}`}</code>
      </div>
    </div>

    {/* Game Example */}
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
      <h3 className="font-medium text-gray-900 mb-4">🎮 Video Game Score</h3>
      
      <div className="prose max-w-none text-gray-600 mb-4">
        <p>
          In a video game, your score might determine what prize you get:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Score over 1000 = Gold trophy</li>
          <li>Score over 500 = Silver trophy</li>
          <li>Score over 100 = Bronze trophy</li>
          <li>Any lower score = Try again message</li>
        </ul>
      </div>

      <div className="bg-white rounded-lg p-4">
        <code className="block text-sm font-mono text-gray-800 whitespace-pre">
{`// Game scoring system
if (score > 1000) {
    awardGoldTrophy();              // Highest achievement
} else if (score > 500) {
    awardSilverTrophy();            // Good job!
} else if (score > 100) {
    awardBronzeTrophy();            // Not bad!
} else {
    showTryAgainMessage();          // Keep practicing!
}`}</code>
      </div>
    </div>
  </div>
</div>

                    {/* First Interactive Example */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Try It: Temperature Checker</h2>
                      <p className="text-gray-600 mb-6">
                        Let's write a simple program that gives weather advice based on temperature.
                        Complete the code to return the right message:
                      </p>
                      
                      <LearnCodeEditor
                        initialCode={`function solution(input) {
  // Convert input string to number
  const temp = Number(input);
  
  // Return "Hot!" for temperatures 90 and above
  // Return "Warm" for temperatures between 70-89
  // Return "Cool" for temperatures between 50-69
  // Return "Cold!" for temperatures below 50
}`}
                        testCases={[
                          { input: "95", expectedOutput: "Hot!" },
                          { input: "75", expectedOutput: "Warm" },
                          { input: "65", expectedOutput: "Cool" },
                          { input: "45", expectedOutput: "Cold!" }
                        ]}
                      />
                    </div>
                  </>
                )}

                {/* We'll continue with more sections in the next part... */}
              </motion.div>
            )}

            {/* Inside the Main Content div after the intro section */}

{activeSection === 'basics' && (
  <>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Basic Conditional Structures</h2>

      {/* Simple If */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">The Simple If Statement</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4">
{`if (condition) {
  // code to run
}`}</code>
            <p className="text-gray-600">Only executes code when condition is true</p>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Example:</p>
              <code className="block text-sm font-mono text-gray-800">
{`const isLoggedIn = true;

if (isLoggedIn) {
  showDashboard();
}`}</code>
            </div>
          </div>
        </div>
      </div>

      {/* If/Else */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">If/Else: Handling Two Possibilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4">
{`if (condition) {
  // run if true
} else {
  // run if false
}`}</code>
            <p className="text-gray-600">Handles both true and false cases</p>
          </div>
          <div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Example:</p>
              <code className="block text-sm font-mono text-gray-800">
{`const hasPermission = false;

if (hasPermission) {
  allowAccess();
} else {
  showError();
}`}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Else If */}
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
        <h3 className="font-medium text-gray-900 mb-4">Else If: Multiple Conditions</h3>
        <div className="space-y-4">
          <code className="block text-sm font-mono bg-white p-4 rounded-lg">
{`if (condition1) {
  // first case
} else if (condition2) {
  // second case
} else if (condition3) {
  // third case
} else {
  // default case
}`}</code>
          
          <div className="bg-white p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Real Example:</p>
            <code className="block text-sm font-mono text-gray-800">
{`const userRole = 'admin';

if (userRole === 'admin') {
  showAllControls();
} else if (userRole === 'editor') {
  showEditControls();
} else if (userRole === 'viewer') {
  showViewControls();
} else {
  showBasicControls();
}`}</code>
          </div>
        </div>
      </div>

      {/* Practice Exercise */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
        <h3 className="font-medium text-gray-900 mb-4">Quick Practice</h3>
        <p className="text-gray-600 mb-4">
          Create a movie rating system that returns different messages based on age:
        </p>
        <LearnCodeEditor
          initialCode={`function solution(input) {
  const age = Number(input);
  // Return "G - Suitable for all ages" if age < 13
  // Return "PG-13 - Parental guidance" if age is 13-17
  // Return "R - Restricted" if age >= 18
}`}
          testCases={[
            { input: "10", expectedOutput: "G - Suitable for all ages" },
            { input: "15", expectedOutput: "PG-13 - Parental guidance" },
            { input: "18", expectedOutput: "R - Restricted" }
          ]}
        />
      </div>
    </div>
  </>
)}

{activeSection === 'comparison' && (
  <>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Comparison Operators</h2>
      
      {/* Comparison Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">===</code>
          <p className="text-sm text-gray-600 mt-2">Strict equality (type & value)</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">5 === 5 // true</code>
            <br />
            <code className="font-mono">"5" === 5 // false</code>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">!==</code>
          <p className="text-sm text-gray-600 mt-2">Strict inequality</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">5 !== "5" // true</code>
            <br />
            <code className="font-mono">5 !== 5 // false</code>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">{'>='}</code>
          <p className="text-sm text-gray-600 mt-2">Greater than or equal</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">10 {'>'}= 5 // true</code>
            <br />
            <code className="font-mono">5 {'>'}= 5 // true</code>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">{'<='}</code>
          <p className="text-sm text-gray-600 mt-2">Less than or equal</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">5 {'<='} 10 // true</code>
            <br />
            <code className="font-mono">5 {'<='} 5 // true</code>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">{'>'}</code>
          <p className="text-sm text-gray-600 mt-2">Greater than</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">10 {'>'} 5 // true</code>
            <br />
            <code className="font-mono">5 {'>'} 5 // false</code>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <code className="font-mono text-lg">{'<'}</code>
          <p className="text-sm text-gray-600 mt-2">Less than</p>
          <div className="mt-2 bg-white rounded p-2 text-sm">
            <code className="font-mono">5 {'<'} 10 // true</code>
            <br />
            <code className="font-mono">5 {'<'} 5 // false</code>
          </div>
        </div>
      </div>

      {/* Common Pitfalls */}
      <div className="bg-amber-50 rounded-lg p-6 border border-amber-100">
        <h3 className="font-medium text-gray-900 mb-4">Watch Out!</h3>
        <div className="space-y-4">
          <div className="bg-white rounded p-4">
            <p className="text-sm text-red-600 mb-2">❌ Using == instead of ===</p>
            <code className="block text-sm font-mono">
{`"5" == 5   // true (converts types)
"5" === 5  // false (strict comparison)`}</code>
          </div>
          <div className="bg-white rounded p-4">
            <p className="text-sm text-red-600 mb-2">❌ Comparing objects directly</p>
            <code className="block text-sm font-mono">
{`{} === {}  // false (different references)
[] === []  // false (different references)`}</code>
          </div>
        </div>
      </div>

      {/* Practice Exercise */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
        <h3 className="font-medium text-gray-900 mb-4">Practice: Price Checker</h3>
        <p className="text-gray-600 mb-4">
          Create a function that checks if a price is within budget:
        </p>
        <LearnCodeEditor
          initialCode={`function solution(input) {
  const price = Number(input);
  // Return "Too expensive" if price > 100
  // Return "Just right" if price is between 50-100
  // Return "Great deal!" if price < 50
}`}
          testCases={[
            { input: "120", expectedOutput: "Too expensive" },
            { input: "75", expectedOutput: "Just right" },
            { input: "30", expectedOutput: "Great deal!" }
          ]}
        />
      </div>
    </div>
  </>
)}

{activeSection === 'logical' && (
  <>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Logical Operators</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-3">AND (&&)</h3>
          <div className="bg-white rounded p-4 mb-4">
            <code className="block text-sm font-mono">
{`true && true    // true
true && false   // false
false && true   // false
false && false  // false`}</code>
          </div>
          <p className="text-sm text-gray-600">Both conditions must be true</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-3">OR (||)</h3>
          <div className="bg-white rounded p-4 mb-4">
            <code className="block text-sm font-mono">
{`true || true    // true
true || false   // true
false || true   // true
false || false  // false`}</code>
          </div>
          <p className="text-sm text-gray-600">At least one must be true</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-medium text-gray-900 mb-3">NOT (!)</h3>
          <div className="bg-white rounded p-4 mb-4">
            <code className="block text-sm font-mono">
{`!true   // false
!false  // true
!!true  // true`}</code>
          </div>
          <p className="text-sm text-gray-600">Inverts the boolean value</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
        <h3 className="font-medium text-gray-900 mb-4">Real-World Examples</h3>
        <div className="space-y-4">
          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">User Authentication:</p>
            <code className="block text-sm font-mono">
{`if (isLoggedIn && hasPermission) {
  allowAccess();
}`}</code>
          </div>

          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">Form Validation:</p>
            <code className="block text-sm font-mono">
{`if (!username || !password) {
  showError("Both fields required");
}`}</code>
          </div>

          <div className="bg-white rounded p-4">
            <p className="text-sm text-gray-600 mb-2">Complex Conditions:</p>
            <code className="block text-sm font-mono">
{`if ((isAdmin || isModerator) && !isBanned) {
  showModTools();
}`}</code>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
        <h3 className="font-medium text-gray-900 mb-4">Practice: Game Access</h3>
        <p className="text-gray-600 mb-4">
          Create a function that checks if a player can access a game level:
        </p>
        <LearnCodeEditor
          initialCode={`function solution(input) {
  const [level, age, hasPurchased] = input.split(',');
  // Player needs to:
  // - Be 13 or older for levels > 5
  // - Have purchased the game for levels > 10
  // Return "Access granted" or "Access denied"
}`}
          testCases={[
            { input: "4,12,false", expectedOutput: "Access granted" },
            { input: "7,12,false", expectedOutput: "Access denied" },
            { input: "11,15,true", expectedOutput: "Access granted" },
            { input: "11,15,false", expectedOutput: "Access denied" }
          ]}
        />
      </div>
    </div>
  </>
)}

{activeSection === 'advanced' && (
  <>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Advanced Conditional Patterns</h2>

      {/* Ternary Operator */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">The Ternary Operator</h3>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">A shorthand way to write simple if/else statements:</p>
              <code className="block text-sm font-mono bg-white p-4 rounded-lg">
{`condition ? valueIfTrue : valueIfFalse`}</code>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Example:</p>
              <code className="block text-sm font-mono">
{`const status = online 
  ? "Available" 
  : "Offline";

const role = userType === "admin"
  ? "Administrator"
  : "Regular User";`}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Switch Statements */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Switch Statements</h3>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 mb-4">
            Useful when comparing a value against multiple options:
          </p>
          <div className="bg-white rounded-lg p-4">
            <code className="block text-sm font-mono">
{`switch (fruit) {
  case "apple":
    console.log("Selected apple");
    break;
  case "banana":
    console.log("Selected banana");
    break;
  case "orange":
    console.log("Selected orange");
    break;
  default:
    console.log("Unknown fruit");
}`}</code>
          </div>
        </div>
      </div>

      {/* Pattern Matching */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Object Lookup Pattern</h3>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 mb-4">
            An alternative to long if/else chains using objects:
          </p>
          <div className="bg-white rounded-lg p-4">
            <code className="block text-sm font-mono">
{`const responses = {
  success: () => "Operation successful",
  error: () => "An error occurred",
  pending: () => "Please wait"
};

const getMessage = (status) => 
  responses[status]?.() || "Unknown status";`}</code>
          </div>
        </div>
      </div>

      {/* Guard Clauses */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-gray-900">Guard Clauses</h3>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <p className="text-gray-600 mb-4">
            Early returns to reduce nesting and improve readability:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-red-600 mb-2">❌ Deeply nested:</p>
              <code className="block text-sm font-mono">
{`function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // Do something
      }
    }
  }
}`}</code>
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-green-600 mb-2">✓ With guard clauses:</p>
              <code className="block text-sm font-mono">
{`function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;
  // Do something
}`}</code>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Challenge */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-100">
        <h3 className="font-medium text-gray-900 mb-4">Advanced Challenge: State Machine</h3>
        <p className="text-gray-600 mb-4">
          Create a function that implements a simple state machine for a traffic light:
        </p>
        <LearnCodeEditor
          initialCode={`function solution(input) {
  // Input format: "currentColor,timeElapsed"
  // Rules:
  // - Green for 30 seconds
  // - Yellow for 5 seconds
  // - Red for 40 seconds
  // Return the current light color
}`}
          testCases={[
            { input: "green,15", expectedOutput: "green" },
            { input: "green,31", expectedOutput: "yellow" },
            { input: "yellow,6", expectedOutput: "red" },
            { input: "red,41", expectedOutput: "green" }
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