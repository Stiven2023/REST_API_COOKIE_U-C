import { z } from "zod";

export const userSchemaZod = z.object({
  userId:z.string(),
  name: z.string(),
  nickName: z.string(),
  image: z.string().optional(),
});

export const commentSchemaZod = z.object({
  content: z.string(),
  user: userSchemaZod,
});

export const likeSchemaZod = z.object({
  user: userSchemaZod,
});

export const PostSchemaZod = z.object({
  content: z.string().max(1000),
  image: z.string().optional(),
  user: userSchemaZod,
  comments: z.array(commentSchemaZod).optional(),
  likes: z.array(likeSchemaZod).optional(),
});
