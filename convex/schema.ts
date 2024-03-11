import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

type emos = "like" | "dislike" | "love" | "haha" | "wow" | "sad" | "angry" | "";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.string()
  }),
  messages: defineTable({
    type: v.string(),
    author: v.string(),
    body: v.string(),
    reactions: v.array(v.object({
      user_id: v.string(),
      emo: v.string()
    }))
  }),
});
