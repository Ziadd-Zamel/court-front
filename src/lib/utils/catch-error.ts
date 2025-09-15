/**
 * Type guard to check if the response is an ErrorResponse
 */
function isErrorResponse<T>(
  response: APIResponse<T>
): response is ErrorResponse {
  return "success" in response && response.success === false;
}

/**
 * Executes an asynchronous callback function and catches any errors.
 * If successful, returns the payload with a `null` error.
 * If there's an error, returns `null` payload and the error message.
 *
 * @template T - The type of data expected in the API response payload.
 * @param callback - An async function that returns a Promise of type `APIResponse<T>`.
 * @returns A tuple containing either the successful payload and `null`, or `null` and the error message.
 */
export default async function catchError<T>(
  callback: () => Promise<APIResponse<T>>
): Promise<[SuccessfulResponse<T>, null] | [null, string]> {
  try {
    // Execute the callback function to get the payload
    const payload = await callback();

    // Check if the response is an error response
    if (isErrorResponse(payload)) {
      throw new Error(payload.message);
    }

    // At this point, TypeScript knows payload is SuccessfulResponse<T>
    return [payload, null];
  } catch (error) {
    // If an error occurs during execution, return `null` payload and the error message
    return [null, (error as Error).message];
  }
}
