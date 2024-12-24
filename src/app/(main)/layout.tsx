import PremiumModal from "@/components/primium/PermiumModel";
import Header from "./Header";
import { auth } from "@clerk/nextjs/server";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import SubscriptionLevelProvider from "./SubscriptionLevelProvider";

const Page = async({children}:{children: React.ReactNode}) => {

    const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const userSubscriptionLevel = await getUserSubscriptionLevel(userId);

    return (
        <SubscriptionLevelProvider userSubscriptionLevel={userSubscriptionLevel}>
        <div>
            <Header />
            {children}
            <PremiumModal />
        </div>
        </SubscriptionLevelProvider>
    )
}

export default Page;