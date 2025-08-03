export const HTTP_STATUS = {
	// ✅ Success responses
	OK: 200,                  // Request was successful
	CREATED: 201,             // Resource created successfully
	ACCEPTED: 202,            // Request accepted for processing
	NO_CONTENT: 204,          // Successful but no content

	// ⚠️ Client error responses
	BAD_REQUEST: 400,         // Invalid request (e.g., missing data, wrong format)
	UNAUTHORIZED: 401,        // Not authenticated
	FORBIDDEN: 403,           // Authenticated but not authorized
	NOT_FOUND: 404,           // Resource not found
	CONFLICT: 409,            // Conflict (e.g., duplicate user/email)

	// 🔥 Server error responses
	INTERNAL_SERVER_ERROR: 500, // General server error
};
