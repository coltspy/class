// app/lib/types.ts
export interface User {
    uid: string;
    email: string;
    name?: string;
    role: 'student' | 'teacher';
    enrolledClasses: string[];
    teachingClasses?: string[];
  }