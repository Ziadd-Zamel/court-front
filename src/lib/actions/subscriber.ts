import { SubscriberFormData, subscriberSchema } from "../schemas/validations";

type ApiErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

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

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      const errorBody = result as ApiErrorResponse | null;
      return {
        success: false as const,
        message: errorBody?.message ?? "حدث خطأ غير متوقع",
        fieldErrors: errorBody?.errors,
      };
    }

    return { success: true as const, data: result };
  } catch (error) {
    console.error("Subscriber submission error:", error);
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    };
  }
}
