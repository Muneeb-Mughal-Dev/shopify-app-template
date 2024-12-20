enum ResponseMessages {
    // 200 HTTP Request
    SUCCESS = 'Request successful',
    CREATED = 'Resource successfully created',
    ACCEPTED = 'Request accepted for processing',

    // 400 HTTP Client Errors
    BAD_REQUEST = 'Bad request, check your inputs',
    UNAUTHORIZED = 'Unauthorized, please log in',
    PAYMENT_REQUIRED = 'Payment required to proceed',
    FORBIDDEN = 'Access is forbidden',
    NOT_FOUND = 'Resource not found',
    METHOD_NOT_ALLOWED = 'HTTP method not allowed',
    NOT_ACCEPTABLE = 'Request format not acceptable',
    CONFLICT = 'Resource already exists',
    GONE = 'Resource no longer available',
    PRECONDITION_FAILED = 'Precondition failed for the request',
    PAYLOAD_TOO_LARGE = 'Payload size exceeds the limit',
    UNSUPPORTED_MEDIA_TYPE = 'Unsupported media type in request',
    TOO_MANY_REQUESTS = 'Rate limit exceeded, please try again later',
    PRECONDITION_REQUIRED = 'Precondition headers required',

    // 500 HTTP Server Errors
    SERVER_ERROR = 'Internal server error',
    NOT_IMPLEMENTED = 'Requested functionality not implemented',
    BAD_GATEWAY = 'Invalid response from the server',
    SERVICE_UNAVAILABLE = 'Service temporarily unavailable',
    GATEWAY_TIMEOUT = 'Upstream server timed out',
}

export default ResponseMessages
