import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

type emos = "like" | "dislike" | "love" | "haha" | "wow" | "sad" | "angry";

export default defineSchema({
  messages: defineTable({
    author: v.string(),
    body: v.string(),
  }),
  reaction: defineTable({
    messageId: v.id("messages"),
    reactor: v.string(),
    type: v.string()
  }),
});
