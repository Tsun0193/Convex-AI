import { query, mutation, action, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const create = mutation({
	args: {name: v.string(), email: v.string(), password: v.string()},
	handler: async (ctx, {name, email, password}) => {
		await ctx.db.insert("users", {name, email, password})
	}
})

export const readData = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, {email}) => {
    const data = await ctx.db
		  .query("users")
		  .filter((q) => q.eq(q.field("email"), email))
		  .collect();	
	return data
  },
});

export const auth = action({
	args: {email: v.string(), password: v.string()},
	handler: async (ctx, {email, password}) => {
		const data = await ctx.runQuery(internal.users.readData, {
      		email: email,
    	});
    	if (!data) return undefined
		return data[0]
	}
})

export const getInfo = query({
	args: {_id: v.id("users")},
	handler: async(ctx, {_id}) => {
		return await ctx.db.get(_id)
	}
})