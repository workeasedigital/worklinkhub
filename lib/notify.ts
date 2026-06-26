export async function sendNotification(
  title: string,
  message: string
) {
  await fetch(
    "https://ntfy.sh/worklinkhub-admin",
    {
      method: "POST",
      headers: {
        Title: title,
      },
      body: message,
    }
  );
}