import { ApplicationError } from "@/protocols";

export function notFoundEnrollmentError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not found enrollment from this user",
  };
}
