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
    [key: string]: {
      code: string;
      submittedAt: string;
      status: 'submitted' | 'graded';
      grade?: number;
    };
  };
}

export interface ClassData {
  id: string;
  name: string;
  teacherId: string;
  studentIds: string[];
  code: string;
}