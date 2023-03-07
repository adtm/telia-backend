import { Response } from 'express'

const errors = {
  DUPLICATE_RECORD: "One or more records already exist.",
  UNEXPECTED_ERROR: "Unexpected error, please try again later.",
}

const errorToCode = (err: Error) => {
  switch (err.message) {
    case errors.DUPLICATE_RECORD:
      return 409;
    default:
      return 500;
  }
}

const sendResponseError = (err: unknown, res: Response) => {
  if (err instanceof Error) {
    return res.status(errorToCode(err)).send(err.message);
  }
  return res.status(500).send(errors.UNEXPECTED_ERROR)
}

export default {
  ...errors,
  sendResponseError
}
