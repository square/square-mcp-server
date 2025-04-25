/**
 * API parameter information
 */
export interface ApiParameter {
  /** Parameter name */
  name: string;
  /** Parameter type */
  type: string;
  /** Parameter description */
  description?: string;
  /** Whether the parameter is required */
  required?: boolean;
}

/**
 * API method information
 */
export interface ApiMethodInfo {
  /** Method description */
  description: string;
  /** HTTP method (get, post, etc) */
  method: string;
  /** API endpoint path */
  path: string;
  /** Path parameters */
  pathParams: ApiParameter[];
  /** Query parameters */
  queryParams: ApiParameter[];
  /** Request type name */
  requestType: string;
  /** Whether this is a multipart request */
  isMultipart: boolean;
  /** Original method name */
  originalName: string;
  /** Whether this method modifies data */
  isWrite: boolean;
}

/**
 * API category information
 */
export interface ApiCategory {
  /** API name */
  name: string;
  /** API description */
  description?: string;
}

/**
 * API endpoint information
 */
export interface ApiEndpoint {
  /** Endpoint name */
  name: string;
  /** HTTP method */
  method: string;
  /** Endpoint path */
  path: string;
  /** Endpoint description */
  description?: string;
  /** Path parameters */
  pathParameters?: ApiParameter[];
  /** Query parameters */
  queryParameters?: ApiParameter[];
  /** Whether this is a multipart request */
  isMultipart?: boolean;
  /** Release status */
  releaseStatus?: string;
  /** Whether this method modifies data */
  isWrite?: boolean;
}

/**
 * API information structure
 */
export interface ApiInfo {
  /** API category information */
  api: ApiCategory;
  /** API endpoint information */
  endpoint: ApiEndpoint;
}