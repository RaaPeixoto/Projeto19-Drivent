import { ApplicationError } from "@/protocols";

export function notTicketIdError(): ApplicationError {
  return {
    name: "CannotEnrollBeforeStartDateError",
    message: "No ticketId",
  };
}

export function notFoundTicketIdError(): ApplicationError {
  return {
    name: "NotFoundError",
    message: "Not found ticketId",
  };
}

export function notUserTicketError(): ApplicationError {
  return {
    name: "UnauthorizedError",
    message: "The ticket does not belong to the user",
  };
}
