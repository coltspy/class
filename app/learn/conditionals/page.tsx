'use client'

import LessonTemplate from '@/app/components/LessonTemplate'
import { AlertTriangle, GitBranch, Binary } from 'lucide-react'
import LearnCodeEditor from '@/app/components/LearnCodeEditor'

export default function ConditionalsLesson() {
  const lessonData = {
    lessonTitle: "JavaScript Conditionals: Making Decisions in Code",
    introduction: {
      title: "Understanding Conditional Logic",
      description: "Master the art of making your code adapt and respond to different situations.",
      goals: [
        "Write effective if/else statements",
        "Use == and === for comparisons",
        "Handle multiple conditions with else if",
        "Master logical operators (&&, ||)",
        "Implement switch statements",
        "Create clean conditional logic"
      ],
      tips: [
        "Choose == when type doesn't matter",
        "Use === for strict type checking",
        "Keep conditions readable",
        "Consider all possible cases"
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Basic If Statement</h3>
            <code className="block text-sm font-mono bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre">
{`// Simple game status check
var score = 100;
var gameOver = false;
var lives = 3;

// Basic condition
if (score > 50) {
    console.log("Good score!");
}

// With else clause
if (lives <= 0) {
    console.log("Game Over!");
} else {
    console.log("Still playing!");
}

// Multiple conditions
if (score >= 100) {
    console.log("Perfect score!");
} else if (score >= 75) {
    console.log("Great job!");
} else if (score >= 50) {
    console.log("Keep trying!");
} else {
    console.log("Practice more!");
}`}</code>
          </div>
        </div>
      )
    },
    sections: [
      {
        id: 'comparison',
        title: 'Comparison Operators',
        content: (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Making Comparisons</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
                  <h3 className="font-medium text-gray-900 mb-4">Regular vs Strict Equality</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Regular Equality (==)
if (score == "100") {           // Works with different types
    console.log("High score!");
}

// Regular Inequality (!=)
if (level != "1") {             // Type conversion happens
    console.log("Not a beginner!");
}

// Strict Equality (===)
if (health === 100) {           // Same type required
    console.log("Full health!");
}

// Strict Inequality (!==)
if (lives !== 3) {             // No type conversion
    console.log("Lives changed!");
}

// Examples of == behavior
console.log(5 == "5")          // true
console.log(0 == false)        // true
console.log("" == false)       // true
console.log(null == undefined) // true

// Examples of === behavior
console.log(5 === "5")         // false
console.log(0 === false)       // false
console.log("" === false)      // false
console.log(null === undefined)// false`}</code>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <h3 className="font-medium text-gray-900 mb-4">Advanced Comparisons</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Multiple conditions
if (score == 100 && lives > 0) {
    console.log("Perfect and alive!");
}

// Mixed comparisons
if (level >= 10 || powerups > 0) {
    console.log("Strong enough!");
}

// Complex conditions
if ((health == 100 && shield > 50) || 
    (powerMode == true && energy > 75)) {
    console.log("Ready for boss!");
}

// Common patterns
if (coins != null && coins != undefined) {
    // Safe to use coins
}

// Shorthand using ==
if (coins != null) {  // Also checks undefined
    // Safe to use coins
}

// Truthy/Falsy checks
if (username) {       // Checks if not empty
    console.log("Has username!");
}

// Number comparisons
if (score > highScore) {
    console.log("New record!");
} else if (score == highScore) {
    console.log("Tied record!");
}`}</code>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg p-6 border border-orange-100">
                  <h3 className="font-medium text-gray-900 mb-4">Switch Statements</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Switch with break
switch (powerup) {
    case "star":
        console.log("Invincible!");
        break;
    case "mushroom":
        console.log("Super size!");
        break;
    case "flower":
        console.log("Fire power!");
        break;
    default:
        console.log("No powerup!");
}

// Switch without break (falls through)
switch (level) {
    case 3:
        unlockWeapon();
    case 2:
        unlockShield();
    case 1:
        unlockBasics();
        break;
    default:
        console.log("Invalid level");
}`}</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Patterns</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Guard Clauses</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Instead of nested if
function processGame(game) {
    if (game) {
        if (game.active) {
            if (game.score > 0) {
                // Process score
            }
        }
    }
}

// Better with guard clauses
function processGame(game) {
    if (!game) return;
    if (!game.active) return;
    if (game.score <= 0) return;
    // Process score
}`}</code>
                </div>

                <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Common Gotchas</h3>
                      <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// = vs == vs ===
if (score = 100) {}   // Assignment! Always true
if (score == 100) {}  // Comparison with type conversion
if (score === 100) {} // Strict comparison

// Truthy/Falsy surprises
if ("0") {}           // true! Non-empty string
if (0) {}            // false
if ([]) {}           // true! Empty array
if ({}) {}           // true! Empty object

// Missing breaks in switch
switch(type) {
    case "A":        // Falls through to B!
    case "B":
        doSomething();
}`}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Practice Time!</h2>
              <p className="text-gray-600 mb-6">Create a game power-up system:</p>
              <LearnCodeEditor
                initialCode={`function solution(input) {
  // input format: "health,powerup"
  // health: number
  // powerup: string ("health", "shield", "none")
  
  const [health, powerup] = input.split(',');
  
  // Return:
  // "Super Charge!" if health == 100 and powerup == "shield"
  // "Healing!" if health < 50 and powerup == "health"
  // "Powered Up!" if powerup != "none"
  // "Normal" for all other cases
}`}
                testCases={[
                  { input: "100,shield", expectedOutput: "Super Charge!" },
                  { input: "30,health", expectedOutput: "Healing!" },
                  { input: "100,health", expectedOutput: "Powered Up!" },
                  { input: "100,none", expectedOutput: "Normal" }
                ]}
              />
            </div>
          </div>
        )
      }
    ],
    challenges: [
      {
        title: "Power-Up System",
        description: "Build a game power-up system that handles different states and bonuses",
        initialCode: `function solution(input) {
  const [health, powerup] = input.split(',');
  // Your code here
  return "";
}`,
        testCases: [
          { input: "100,shield", expectedOutput: "Super Charge!" },
          { input: "30,health", expectedOutput: "Healing!" },
          { input: "100,health", expectedOutput: "Powered Up!" },
          { input: "100,none", expectedOutput: "Normal" }
        ]
      }
    ]
  }

  return <LessonTemplate {...lessonData} />
}


// continue with more lessons


