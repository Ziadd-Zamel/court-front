import { submitPublicationRequest } from "@/lib/actions/publication-request";
import { PublicationRequestData } from "@/lib/schemas/validations";
import { useMutation } from "@tanstack/react-query";

export const usePublicationRequest = () => {
  return useMutation({
    mutationFn: (data: PublicationRequestData) =>
      submitPublicationRequest(data),
  });
};
