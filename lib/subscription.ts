import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";


// 유저 구독 확인.

const DAY_IN_MS=86_400_000;

export const checkSubscription =  async () => {
  const { userId} = auth();
  if(!userId){
    return false;
  }
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId
    },
    select:{
      stripeSubscriptionId:true,
      stripeCurrentPeriodEnd:true,
      stripeCustomerId:true,
      stripePriceId:true,
    }
  });

  if(!userSubscription){
    return false;
  }
  const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()

  //isValid를 boolean으로 반환
  return !!isValid;
}