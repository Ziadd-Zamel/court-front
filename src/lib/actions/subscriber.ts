import { SubscriberFormData, subscriberSchema } from "../schemas/validations";

export async function submitSubscriber(data: SubscriberFormData) {
  try {
    const validatedData = subscriberSchema.parse(data);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API}subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Subscriber submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    };
  }
}
