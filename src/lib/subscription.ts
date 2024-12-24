import { cache } from "react";
import prisma from "./prisma";

export type SubscriptionLevel = "free" | "pro" | "pro_plus";

export const getUserSubscriptionLevel = cache(
  async (userId: string): Promise<SubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "free";
    }

    if (
      subscription.stripePriceId === process.env.NEXT_PUBLIC_STRIPE_PRO
    ) {
      return "pro";
    }

    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRO_MAX
    ) {
      return "pro_plus";
    }

    throw new Error("Invalid subscription");
  },
);