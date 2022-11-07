import { router, publicProcedure, protectedProcedure } from "@/server/trpc/trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => ctx.session),
  getSecretMessage: protectedProcedure.query(
    () => "You are logged in and can see this secret message!"
  ),
});
