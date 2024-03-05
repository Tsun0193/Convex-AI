import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("messages").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return messages.reverse();    
  },
});

export const send = mutation({
  args: { type: v.string(), body: v.string(), author: v.string(), reactions: v.array(v.object({
      user_id: v.string(),
      emo: v.string()
    })) },
  handler: async (ctx, {type, body, author, reactions }) => {
    // Send a new message.
    await ctx.db.insert("messages", {type, body, author, reactions: [] });
  },
});

export const updateReaction = mutation({
  args: { _id: v.id("messages"), user_id: v.string(), emo: v.string()},
  handler: async (ctx, {_id, user_id, emo}) => {
    const msg = await ctx.db.get(_id)
    if (msg == null) {
      console.log("hello")
      return;
    }
    const reactions = msg.reactions
    let setted = false
    reactions.forEach(item => {
      if (item.user_id == user_id) {
        item.emo = emo
        setted = true
      }
    })
    if(!setted) reactions.push({user_id: user_id, emo: emo})    
    await ctx.db.patch(_id, { reactions: reactions })
  }
})