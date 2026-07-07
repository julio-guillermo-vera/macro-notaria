export async function onRequest() {
  return Response.json({ ok: true, service: "Protocolo Cloud", version: "1.0.0" });
}
