'use server';

/**
 * @fileOverview A real-time resume optimization AI agent.
 *
 * - optimizeResumeSection - A function that provides real-time suggestions for improving a resume section.
 * - OptimizeResumeSectionInput - The input type for the optimizeResumeSection function.
 * - OptimizeResumeSectionOutput - The return type for the optimizeResumeSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeResumeSectionInputSchema = z.object({
  resumeSection: z
    .string()
    .describe('The current content of the resume section to be optimized.'),
  jobDescription: z
    .string()
    .optional()
    .describe('The job description for which the resume is being tailored.'),
  sectionType: z
    .enum(['personalDetails', 'experience', 'education', 'skills', 'summary'])
    .describe('The type of resume section being optimized.'),
});
export type OptimizeResumeSectionInput = z.infer<
  typeof OptimizeResumeSectionInputSchema
>;

const OptimizeResumeSectionOutputSchema = z.object({
  strengths: z
    .array(z.string())
    .describe(
      'A list of what the user is doing well in the provided resume section.'
    ),
  improvements: z
    .array(z.string())
    .describe(
      'A list of actionable suggestions to improve the resume section.'
    ),
  overallFeedback: z
    .string()
    .describe('A brief, overall summary of the feedback.'),
});
export type OptimizeResumeSectionOutput = z.infer<
  typeof OptimizeResumeSectionOutputSchema
>;

export async function optimizeResumeSection(
  input: OptimizeResumeSectionInput
): Promise<OptimizeResumeSectionOutput> {
  return optimizeResumeSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeResumeSectionPrompt',
  input: {schema: OptimizeResumeSectionInputSchema},
  output: {schema: OptimizeResumeSectionOutputSchema},
  prompt: `You are a world-class resume optimization expert and career coach. Your goal is to provide concise, actionable, and encouraging feedback in real-time.

You are currently optimizing the '{{{sectionType}}}' section of a user's resume.
Here is the content:
'''
{{{resumeSection}}}
'''

{{#if jobDescription}}
The user is targeting the following job description:
'''
{{{jobDescription}}}
'''
{{/if}}

Please analyze the section and provide feedback.
1.  **Strengths**: Identify specific things the user has done well. Be positive and encouraging.
2.  **Areas for Improvement**: Provide a list of specific, actionable suggestions to improve the section. Focus on clarity, impact, and alignment with industry best practices and ATS-friendliness. If a job description is provided, tailor the suggestions to it.
3.  **Overall Feedback**: Write a brief, one-sentence summary of your analysis.

Format your output as a JSON object with 'strengths' (an array of strings), 'improvements' (an array of strings), and 'overallFeedback' (a string).
`,
});

const optimizeResumeSectionFlow = ai.defineFlow(
  {
    name: 'optimizeResumeSectionFlow',
    inputSchema: OptimizeResumeSectionInputSchema,
    outputSchema: OptimizeResumeSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
