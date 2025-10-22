import { CohereClientV2 } from "cohere-ai";

const cohere = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message || !message.trim()) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    if (!process.env.COHERE_API_KEY) {
      console.error("COHERE_API_KEY is not set");
      return Response.json({ error: "API key not configured" }, { status: 500 });
    }

    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        {
          role: "system",
          content: "You are a friendly and knowledgeable health assistant. You can explain health conditions, symptoms, nutrition tips, and fitness advice. You must not diagnose, prescribe medication, or replace professional medical consultation.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.message.content[0].text;
    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: error.message || "Failed to process request" },
      { status: 500 }
    );
  }
}