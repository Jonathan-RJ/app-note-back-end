import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string().min(1, { message: 'Name is required' }),
  content: z.string().min(1, { message: 'Name is required' })
});