const Errors = {
  ACCOUNT_EXISTS: "account_exists",
  REFRESH_TOKEN_EXPIRED: "refresh_token_expired",
  ACCESS_TOKEN_EXPIRED: "access_token_expired",
  UNKNOWN_ERROR: "unknown_error",
  RESOURCE_NOT_FOUND: "not_found",
  RESOURCE_EXISTS: "resource_exists",
};

const getResponseError = (response) => {
  if ([401, 403].includes(response.status)) return Errors.ACCESS_TOKEN_EXPIRED;
  if ([404].includes(response.status)) return Errors.RESOURCE_NOT_FOUND;
  if ([409].includes(response.status)) return Errors.RESOURCE_EXISTS;
  if (500 === response.status) return Errors.UNKNOWN_ERROR;
};

export { Errors, getResponseError };
