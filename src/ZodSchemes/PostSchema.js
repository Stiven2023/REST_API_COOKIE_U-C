import { z } from "zod";

export const commentSchemaZod = z.object({
  content: z.string(),
  userId: z.string(),
});


export const PostSchemaZod = z.object({
  content: z.string().max(1000),
  image: z.string().optional(),
  userId: z.string(),
  comments: z.array(commentSchemaZod).optional(),
  likes: z.array(z.string()).optional(),
});
