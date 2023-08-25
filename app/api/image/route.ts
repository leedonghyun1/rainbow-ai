import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { auth } from "@clerk/nextjs";
import { Prompt } from "next/font/google";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST( req:Request){
  try{
    const { userId} = auth();
    const body = await req.json();
    const { prompt, amout = 10, resolution = "512x512" } = body;
    
    if(!userId){
      return new NextResponse("Unauthorized", { status:401});
    }
    if(!configuration.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status:500});
    }
    if(!prompt){
      return new NextResponse("Prompt is required", {status:400});
    }
    if(!amout){
      return new NextResponse("Amount is required", {status:400});
    }
    if(!resolution){
      return new NextResponse("resolution is required", {status:400});
    }


    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expired", {
        status: 403,
      });
    }
  
    const response = await openai.createImage({
      prompt,
      // "n" is number ( amout를 10진수로)
      n: parseInt(amout, 10),
      size: resolution,
    });
    
    if(!isPro){
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);

  } catch(error){
    console.log("[IMAGE_ERROR]",  error);
    return new NextResponse("Internal Error", {status:500});
  }
}