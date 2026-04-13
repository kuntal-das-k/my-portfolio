export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbw3z7YlijsgREFc6go3qqyv8Z8Glx4POBuTEIsZzgu-XIL3_ue17VGN7-J0y0FKVTDg9g/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      }
    );

    const result = await response.text();

    console.log("Google Script Response:", result);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false });
  }
}