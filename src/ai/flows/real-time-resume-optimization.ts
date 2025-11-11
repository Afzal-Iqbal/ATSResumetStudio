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
    .enum(['personalDetails', 'experience', 'education', 'skills'])
    .describe('The type of resume section being optimized.'),
});
export type OptimizeResumeSectionInput = z.infer<
  typeof OptimizeResumeSectionInputSchema
>;

const OptimizeResumeSectionOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggestions to improve the resume section.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the suggestions provided.'),
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
  prompt: `You are a resume optimization expert providing real-time feedback.

You are optimizing the following section of the resume:
Section Type: {{{sectionType}}}
Section Content: {{{resumeSection}}}

{% if jobDescription %}
You are tailoring the resume to the following job description:
{{{jobDescription}}}
{% endif %}

Provide a list of specific, actionable suggestions to improve this section of the resume to better match industry best practices and ATS requirements.
Explain the reasoning behind each suggestion.

Format your output as a JSON object with 'suggestions' (an array of strings) and 'reasoning' (a string).
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
