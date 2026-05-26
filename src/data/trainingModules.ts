
export interface Lesson {
  id: string;
  title: string;
  content: string; // Markdown or simple text
  duration: string;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  status: "available" | "coming-soon";
  lessons: Lesson[];
}

export const trainingModules: TrainingModule[] = [
  {
    id: "resume-essentials",
    title: "Resume Essentials",
    description: "Build an aviation-specific resume that gets interviews.",
    duration: "30 min",
    lessonsCount: 4,
    status: "available",
    lessons: [
      {
        id: "resume-1",
        title: "Understanding ATS (Applicant Tracking Systems)",
        duration: "5 min",
        content: `
### What is an ATS?
Most airlines and large MROs use Applicant Tracking Systems to filter resumes before a human ever sees them.

**Key Optimization Tips:**
*   Use standard headings (Experience, Education, Skills).
*   Avoid graphics, columns, and tables that can confuse the parser.
*   Include keywords from the job description exactly as they appear.
        `
      },
      {
        id: "resume-2",
        title: "Structuring Your Aviation Resume",
        duration: "10 min",
        content: `
### The Gold Standard Structure
1.  **Header:** Name, License # (if applicable), Contact Info.
2.  **Professional Summary:** 2-3 lines highlighting your total experience and key ratings.
3.  **Licenses & Certifications:** List your Transport Canada / FAA licenses early.
4.  **Technical Skills:** Airframe types, engines, avionics systems, tools.
5.  **Work Experience:** Reverse chronological order. Focus on *accomplishments*, not just duties.
        `
      },
      {
        id: "resume-3",
        title: "Quantifying Your Achievements",
        duration: "10 min",
        content: `
### Don't Just List Duties
Instead of "Performed maintenance," say:
> "Completed 50+ turnaround inspections on B737NG aircraft with 100% on-time release rate."

**Formula:** Action Verb + Task + Result/Metric.
        `
      },
      {
        id: "resume-4",
        title: "Cover Letters: Do You Need One?",
        duration: "5 min",
        content: `
### The Verdict
Yes, especially for junior roles. It's your chance to explain *why* you want to work for *this specific airline*.

*   Keep it under 1 page.
*   Address the Chief Inspector or Maintenance Manager by name if possible.
*   Show passion for safety and reliability.
        `
      }
    ]
  },
  {
    id: "interview-prep",
    title: "Interview Prep",
    description: "Practice common AME interview questions and nail your answers.",
    duration: "45 min",
    lessonsCount: 6,
    status: "available",
    lessons: [
      {
        id: "interview-1",
        title: "The STAR Method",
        duration: "10 min",
        content: `
### Situation, Task, Action, Result
Use this framework for behavioral questions like "Tell me about a time you made a mistake."

*   **S:** Describe the context.
*   **T:** What was your responsibility?
*   **A:** What specific steps did you take?
*   **R:** What was the outcome? (Safety preserved, delay prevented, etc.)
        `
      },
      {
        id: "interview-2",
        title: "Common Safety Questions",
        duration: "10 min",
        content: `
### "Have you ever felt pressured to sign off an unsafe aircraft?"
This is a test of integrity.

**Correct approach:**
Acknowledge the commercial pressure but emphasize that safety compliant with the MOM (Maintenance Organization Manual) and CARs (Canadian Aviation Regulations) is non-negotiable.
        `
      },
       {
        id: "interview-3",
        title: "Technical Scenarios",
        duration: "10 min",
        content: `
### Troubleshooting Logic
Interviewers want to see your thought process, not just the right answer.

*   Verify the fault.
*   Consult the MEL (Minimum Equipment List).
*   Check the FIM (Fault Isolation Manual).
*   Start with the simplest/cheapest solution first (e.g., reset breaker vs. change pump).
        `
      }
    ]
  },
  {
    id: "engine-fundamentals",
    title: "Technical Refresher — Engines",
    description: "Brush up on turbine engine fundamentals before your interview.",
    duration: "60 min",
    lessonsCount: 8,
    status: "available",
    lessons: [
       {
        id: "engine-1",
        title: "Brayton Cycle Basics",
        duration: "10 min",
        content: `
### Suck, Squeeze, Bang, Blow
The continuous combustion cycle:
1.  **Intake:** Air enters.
2.  **Compression:** Pressure increases, volume decreases.
3.  **Combustion:** Fuel added and ignited at constant pressure.
4.  **Exhaust:** Expansion through turbine extracts work.
        `
      },
      {
        id: "engine-2",
        title: "Compressor Stall vs. Surge",
        duration: "15 min",
        content: `
### Know the Difference
*   **Stall:** Localized disruption of airflow over compressor blades (getting too close to critical angle of attack). May hear a rumble or popping.
*   **Surge:** Complete reversal of airflow through the compressor. Violent loud bang, loss of thrust, high EGT.

**Response:** Retard throttle immediately.
        `
      }
    ]
  },
  {
    id: "safety-culture",
    title: "Workplace Safety Culture",
    description: "Understand safety expectations on the hangar floor from day one.",
    duration: "25 min",
    lessonsCount: 3,
    status: "available",
    lessons: [
      {
        id: "safety-1",
        title: "SMS (Safety Management Systems) 101",
        duration: "10 min",
        content: `
### It's not just a binder.
SMS is a systematic approach to managing safety, including organizational structures, accountabilities, policies, and procedures.

**Your role:** Report hazards *before* they cause an incident. Use the anonymous reporting system if needed.
        `
      },
      {
        id: "safety-2",
        title: "The Dirty Dozen",
        duration: "10 min",
        content: `
### Human Factors
12 key precursors to human error in aviation maintenance:
1. Lack of Communication
2. Complacency
3. Lack of Knowledge
4. Distraction
5. Lack of Teamwork
6. Fatigue
7. Lack of Resources
8. Pressure
9. Lack of Assertiveness
10. Stress
11. Lack of Awareness
12. Norms
        `
      }
    ]
  },
   {
    id: "networking-introverts",
    title: "Networking for Introverts",
    description: "Practical strategies for making connections — even if networking isn't your thing.",
    duration: "20 min",
    lessonsCount: 3,
    status: "coming-soon",
    lessons: []
  },
  {
    id: "first-90-days",
    title: "First 90 Days on the Job",
    description: "What to expect, how to impress, and common mistakes to avoid.",
    duration: "35 min",
    lessonsCount: 5,
    status: "coming-soon",
    lessons: []
  },
];
