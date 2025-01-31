'use client'

import LessonTemplate from '@/app/components/LessonTemplate'
import { Box, Variable, Code2, AlertTriangle } from 'lucide-react'
import LearnCodeEditor from '@/app/components/LearnCodeEditor'

export default function VariablesLesson() {
  const lessonData = {
    lessonTitle: "JavaScript Variables: Building Blocks of Programming",
    introduction: {
      title: "Understanding Variables",
      description: "Master the fundamentals of storing and manipulating data in JavaScript using variables.",
      goals: [
        "Learn to declare variables using var",
        "Store different types of data in variables",
        "Understand variable scope",
        "Practice real-world examples",
        "Master naming conventions",
        "Debug common issues"
      ],
      tips: [
        "Always declare variables with var",
        "Use descriptive names",
        "Keep code organized and readable",
        "Comment your code"
      ],
      content: (
        <div className="space-y-6">
          <div className="bg-white rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Your First Variables</h3>
            <code className="block text-sm font-mono bg-gray-50 p-4 rounded-lg mb-4 whitespace-pre">
{`// Player Information
var playerName = "Mario";             // The player's name
var score = 0;                        // Current game score
var isGameOver = false;               // Game state tracker

// Game Statistics
var health = 100;                     // Current health points
var shields = 50;                     // Shield power level
var lives = 3;                        // Remaining lives

// Weapon System
var ammo = 100;                       // Available ammunition
var weaponType = "laser";             // Current weapon
var damage = 25;                      // Weapon damage`}</code>
          </div>
        </div>
      )
    },
    sections: [
      {
        id: 'basics',
        title: 'Variable Basics',
        content: (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Creating Variables</h2>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-lg p-6 border border-teal-100">
                  <h3 className="font-medium text-gray-900 mb-4">Basic Variables</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Basic Declarations
var playerScore;                      // Declare without value
var currentLevel = 1;                 // Declare with value
var gameName = "Super Adventure";     // String variable
var totalCoins = 100;                // Number variable

// Player Position
var playerX = 0;                      // X coordinate
var playerY = 0;                      // Y coordinate
var playerSpeed = 5;                  // Movement speed

// Game Settings
var difficulty = "normal";            // Game difficulty
var soundEnabled = true;              // Sound settings
var musicVolume = 0.8;                // Music volume`}</code>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                  <h3 className="font-medium text-gray-900 mb-4">Multiple Declarations</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Single Line Declarations
var x = 5, y = 10, z = 15;           // Position coordinates

// Multi-line Declarations
var firstName = "John",               // Player first name
    lastName = "Doe",                 // Player last name
    age = 25,                         // Player age
    isActive = true;                  // Account status

// Related Variables
var enemyX = 100,                     // Enemy X position
    enemyY = 200,                     // Enemy Y position
    enemyHealth = 50;                 // Enemy health`}</code>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Variable Types</h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Numbers</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Integer Values
var score = 100;                      // Player score
var lives = 3;                        // Remaining lives
var level = 1;                        // Current level

// Decimal Values
var speed = 5.5;                      // Movement speed
var gravity = 9.81;                   // Gravity force
var damageMultiplier = 1.5;          // Damage multiplier

// Calculated Values
var totalPoints = 1000;               // Total points
var bonusPoints = 50;                 // Bonus points
var finalScore = totalPoints + bonus; // Final score`}</code>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Text (Strings)</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Player Information
var username = "CoolPlayer123";       // Player username
var rank = "Novice";                  // Player rank
var title = "Dragon Slayer";          // Player title

// Game Messages
var welcomeMsg = "Welcome back!";     // Welcome message
var gameOverMsg = "Game Over!";       // Game over text
var victoryMsg = "You Win!";          // Victory message

// Item Descriptions
var sword = "Dragon's Bane";          // Weapon name
var armor = "Knight's Shield";        // Armor name
var potion = "Health Elixir";         // Item name`}</code>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-6">
                  <h3 className="font-medium text-gray-900 mb-4">Booleans (True/False)</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// Game States
var isGameOver = false;               // Game state
var isPaused = false;                 // Pause state
var isMuted = true;                   // Sound state

// Player States
var isJumping = false;                // Jump state
var isRunning = false;                // Movement state
var isCrouching = false;              // Crouch state

// Item States
var hasKey = false;                   // Key possession
var hasWeapon = true;                 // Weapon check
var hasShield = true;                 // Shield check`}</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Common Mistakes</h3>
                  <code className="block text-sm font-mono bg-white p-4 rounded-lg mb-4 whitespace-pre">
{`// ❌ Missing var Keyword
score = 100;                          // Wrong!
var score = 100;                      // Correct!

// ❌ Invalid Names
var 123player = "John";               // Can't start with number
var player-name = "John";             // No hyphens allowed
var player name = "John";             // No spaces allowed

// ❌ Wrong Types
var score = "100";                    // String, not number
var health = "50";                    // String, not number
var ammo = "25";                      // String, not number`}</code>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Practice Time!</h2>
              <p className="text-gray-600 mb-6">Create a scoring system that adds points to a player's score.</p>
              <LearnCodeEditor
                initialCode={`function solution(input) {
  // Initialize score
  var score = 0;                      // Starting score
  
  // Add points to score
  score = score + Number(input);      // Add input to score
  
  // Return final score
  return score;                       // Return result
}`}
                testCases={[
                  { input: "10", expectedOutput: "10" },
                  { input: "5", expectedOutput: "5" },
                  { input: "20", expectedOutput: "20" }
                ]}
              />
            </div>
          </div>
        )
      }
    ],
    challenges: [
      {
        title: "Score Calculator",
        description: "Build a scoring system that keeps track of points",
        initialCode: `function solution(input) {
  // Initialize score variable
  var score = 0;                      // Starting at zero
  
  // Add input to score
  score = score + Number(input);      // Add points
  
  // Return final score
  return score;                       // Return result
}`,
        testCases: [
          { input: "5", expectedOutput: "5" },
          { input: "10", expectedOutput: "10" }
        ]
      }
    ]
  }

  return <LessonTemplate {...lessonData} />
}