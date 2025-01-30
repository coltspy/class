// app/lib/types.ts
export interface User {
  uid: string;
  email: string;
  name?: string;
  role: 'student' | 'teacher';
  enrolledClasses: string[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface TestResult {
  passed: boolean;
  output: string;
}

export interface Submission {
  code: string;
  submittedAt: string;
  status: 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  testResults?: TestResult[];
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  language: string;
  starterCode?: string;
  classId: string;
  testCases: TestCase[];
  submissions: {
    [userId: string]: Submission;
  };
}

export interface ClassData {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  studentIds: string[];
}