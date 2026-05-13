export async function GET() {
  return Response.json({
    time: new Date().toUTCString(),
    random: Math.floor(Math.random() * 9000) + 1000,
  });
}
