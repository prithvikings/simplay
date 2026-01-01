import { z } from "zod";

export const importCourseSchema = z.object({
  body: z.object({
    playlistUrl: z.string().url("Invalid playlist URL"),
    title: z.string().min(1).max(100),
  }),
});

export const updateProgressSchema = z.object({
  body: z.object({
    videoId: z.string().min(1),
    completed: z.boolean(),
  }),
});

export const courseIdParamSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid course ID"),
  }),
});

export const saveNoteSchema = z.object({
  body: z.object({
    videoId: z.string().min(1, "Video ID is required"),
    note: z.string().optional(), // Note is optional (can be empty string to clear it)
  }),
});
