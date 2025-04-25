import fetch from 'node-fetch';
import { ApiMethodInfo, ApiParameter } from '../api-types.js';
import FormData from 'form-data';
import { baseUrl, apiVersion, getRequestHeaders, handleResponse } from '../config.js';
import * as fs from 'fs';
import * as path from 'path';
import { typeMap } from '../utils/type-map.js';

/**
 * Method information for each API endpoint
 */
export const BookingCustomAttributesMethods: { [key: string]: ApiMethodInfo } = {
  listDefinitions: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings/custom-attribute-definitions",
    pathParams: [],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListBookingCustomAttributeDefinitionsRequest",
    isMultipart: false,
    originalName: "ListBookingCustomAttributeDefinitions",
    isWrite: false
  } as ApiMethodInfo,

  createDefinition: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "post",
    path: "/v2/bookings/custom-attribute-definitions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateBookingCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "CreateBookingCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  deleteDefinition: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "delete",
    path: "/v2/bookings/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to delete."}],
    queryParams: [],
    requestType: "DeleteBookingCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "DeleteBookingCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  getDefinition: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."}],
    queryParams: [{"name":"version","type":"integer","description":"The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveBookingCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "RetrieveBookingCustomAttributeDefinition",
    isWrite: false
  } as ApiMethodInfo,

  updateDefinition: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "put",
    path: "/v2/bookings/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to update."}],
    queryParams: [],
    requestType: "UpdateBookingCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "UpdateBookingCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  bulkDelete: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "post",
    path: "/v2/bookings/custom-attributes/bulk-delete",
    pathParams: [],
    queryParams: [],
    requestType: "BulkDeleteBookingCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkDeleteBookingCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  bulkUpsert: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "post",
    path: "/v2/bookings/custom-attributes/bulk-upsert",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpsertBookingCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkUpsertBookingCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  list: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings/{booking_id}/custom-attributes",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the target [booking](entity:Booking)."}],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"with_definitions","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."}],
    requestType: "ListBookingCustomAttributesRequest",
    isMultipart: false,
    originalName: "ListBookingCustomAttributes",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "delete",
    path: "/v2/bookings/{booking_id}/custom-attributes/{key}",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the target [booking](entity:Booking)."},{"name":"key","type":"string","description":"The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "DeleteBookingCustomAttributeRequest",
    isMultipart: false,
    originalName: "DeleteBookingCustomAttribute",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings/{booking_id}/custom-attributes/{key}",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the target [booking](entity:Booking)."},{"name":"key","type":"string","description":"The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [{"name":"with_definition","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."},{"name":"version","type":"integer","description":"The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveBookingCustomAttributeRequest",
    isMultipart: false,
    originalName: "RetrieveBookingCustomAttribute",
    isWrite: false
  } as ApiMethodInfo,

  upsert: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "put",
    path: "/v2/bookings/{booking_id}/custom-attributes/{key}",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the target [booking](entity:Booking)."},{"name":"key","type":"string","description":"The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "UpsertBookingCustomAttributeRequest",
    isMultipart: false,
    originalName: "UpsertBookingCustomAttribute",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const BookingCustomAttributesHandlers = {
  createDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.createDefinition;
    
    // Simple endpoint with no path or query parameters
    const url = methodInfo.path;

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  bulkDelete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.bulkDelete;
    
    // Simple endpoint with no path or query parameters
    const url = methodInfo.path;

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  bulkUpsert: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.bulkUpsert;
    
    // Simple endpoint with no path or query parameters
    const url = methodInfo.path;

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  deleteDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.deleteDefinition;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Build URL with path parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  updateDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.updateDefinition;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Build URL with path parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  delete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.delete;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Build URL with path parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  upsert: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.upsert;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Build URL with path parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  listDefinitions: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.listDefinitions;
    
    // Extract query parameters
    const queryParams: Record<string, string> = {};
    methodInfo.queryParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        queryParams[param.name] = String(value);
        delete args[param.name];
      }
    });

    // Build URL with query parameters
    let url = methodInfo.path;
    
    // Add query parameters
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  getDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.getDefinition;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Extract query parameters
    const queryParams: Record<string, string> = {};
    methodInfo.queryParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        queryParams[param.name] = String(value);
        delete args[param.name];
      }
    });

    // Build URL with path and query parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Add query parameters
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.list;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Extract query parameters
    const queryParams: Record<string, string> = {};
    methodInfo.queryParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        queryParams[param.name] = String(value);
        delete args[param.name];
      }
    });

    // Build URL with path and query parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Add query parameters
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  },

  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingCustomAttributesMethods.get;
    
    // Extract path parameters
    const pathParams: Record<string, string> = {};
    methodInfo.pathParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        pathParams[param.name] = String(value);
        delete args[param.name];
      } else if (param.required) {
        throw new Error(`Missing required path parameter: ${param.name}`);
      }
    });

    // Extract query parameters
    const queryParams: Record<string, string> = {};
    methodInfo.queryParams.forEach(param => {
      const value = args[param.name];
      if (value !== undefined) {
        queryParams[param.name] = String(value);
        delete args[param.name];
      }
    });

    // Build URL with path and query parameters
    let url = methodInfo.path;
    
    // Replace path parameters
    Object.entries(pathParams).forEach(([key, value]) => {
      url = url.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Add query parameters
    const queryString = Object.entries(queryParams)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    if (queryString) {
      url = `${url}?${queryString}`;
    }

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  }
};