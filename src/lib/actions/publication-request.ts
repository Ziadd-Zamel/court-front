import {
  PublicationRequestData,
  publicationRequestSchema,
} from "../schemas/validations";

export async function submitPublicationRequest(data: PublicationRequestData) {
  try {
    // Validate the data
    const validatedData = publicationRequestSchema.parse(data);

    // Send to your API
    const response = await fetch(
      `http://M.Dirbal.ly/api/publication-requests`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...validatedData,
          phone: "+218912345268",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Publication request submission error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
    };
  }
}
