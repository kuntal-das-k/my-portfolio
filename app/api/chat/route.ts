export async function POST(req: Request) {
  try {
    // Validate API key
    if (!process.env.GROQ_API_KEY) {
      return Response.json(
        { reply: "Server error: API key not configured" },
        { status: 500 }
      );
    }

    const { message } = await req.json();

    // Input validation
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json(
        { reply: "Please provide a valid message" },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return Response.json(
        { reply: "Message too long (max 5000 characters)" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an AI assistant for Kuntal Das.

Context about Kuntal:
- CSE student
- Skills: Python, C, Java, Next.js, FastAPI
- Projects: Aura, Paper Generator, YouTube AI API
- Open to internships

Be helpful, concise, and professional. Answer questions about Kuntal's background and skills.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: message,
          },
        ],
        max_tokens: 1024,
        temperature: 0.7,
        top_p: 0.9,
      }),
    });

    const data = await response.json();

    // Log for debugging
    console.log("Groq API Status:", response.status);
    console.log("Groq response:", data);

    // Handle API errors
    if (!response.ok) {
      console.error("Groq API error:", data);

      // Rate limit error
      if (response.status === 429) {
        return Response.json(
          { reply: "Too many requests. Please try again in a moment." },
          { status: 429 }
        );
      }

      // Authentication error
      if (response.status === 401) {
        return Response.json(
          { reply: "Server error: Authentication failed" },
          { status: 500 }
        );
      }

      // Generic error
      return Response.json(
        { reply: "Error generating response. Please try again." },
        { status: response.status }
      );
    }

    // Extract response safely
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return Response.json(
        { reply: "No response generated. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({
      reply,
      timestamp: new Date().toISOString(),
      model: "llama-3.3-70b-versatile",
    });

  } catch (error) {
    console.error("Server error:", error);

    // Network error
    if (error instanceof TypeError) {
      return Response.json(
        { reply: "Network error. Please check your connection." },
        { status: 500 }
      );
    }

    // JSON parsing error
    if (error instanceof SyntaxError) {
      return Response.json(
        { reply: "Invalid request format" },
        { status: 400 }
      );
    }

    return Response.json(
      { reply: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}