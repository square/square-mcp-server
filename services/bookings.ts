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
export const BookingsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings",
    pathParams: [],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results per page to return in a paged response."},{"name":"cursor","type":"string","description":"The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."},{"name":"customer_id","type":"string","description":"The [customer](entity:Customer) for whom to retrieve bookings. If this is not set, bookings for all customers are retrieved."},{"name":"team_member_id","type":"string","description":"The team member for whom to retrieve bookings. If this is not set, bookings of all members are retrieved."},{"name":"location_id","type":"string","description":"The location for which to retrieve bookings. If this is not set, all locations' bookings are retrieved."},{"name":"start_at_min","type":"string","description":"The RFC 3339 timestamp specifying the earliest of the start time. If this is not set, the current time is used.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"start_at_max","type":"string","description":"The RFC 3339 timestamp specifying the latest of the start time. If this is not set, the time of 31 days after `start_at_min` is used.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"}],
    requestType: "ListBookingsRequest",
    isMultipart: false,
    originalName: "ListBookings",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "The required input must include the following:\n- `Booking.location_id`\n- `Booking.start_at`\n- `Booking.AppointmentSegment.team_member_id`\n- `Booking.AppointmentSegment.service_variation_id`\n- `Booking.AppointmentSegment.service_variation_version`\n\nTo call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "post",
    path: "/v2/bookings",
    pathParams: [],
    queryParams: [],
    requestType: "CreateBookingRequest",
    isMultipart: false,
    originalName: "CreateBooking",
    isWrite: true
  } as ApiMethodInfo,

  searchAvailability: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "post",
    path: "/v2/bookings/availability/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchAvailabilityRequest",
    isMultipart: false,
    originalName: "SearchAvailability",
    isWrite: false
  } as ApiMethodInfo,

  bulkGet: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "post",
    path: "/v2/bookings/bulk-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BulkRetrieveBookingsRequest",
    isMultipart: false,
    originalName: "BulkRetrieveBookings",
    isWrite: false
  } as ApiMethodInfo,

  getBusinessProfile: {
    description: "Bookings RetrieveBusinessBookingProfile operation",
    method: "get",
    path: "/v2/bookings/business-booking-profile",
    pathParams: [],
    queryParams: [],
    requestType: "RetrieveBusinessBookingProfileRequest",
    isMultipart: false,
    originalName: "RetrieveBusinessBookingProfile",
    isWrite: false
  } as ApiMethodInfo,

  listLocationProfiles: {
    description: "Bookings ListLocationBookingProfiles operation",
    method: "get",
    path: "/v2/bookings/location-booking-profiles",
    pathParams: [],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results to return in a paged response."},{"name":"cursor","type":"string","description":"The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."}],
    requestType: "ListLocationBookingProfilesRequest",
    isMultipart: false,
    originalName: "ListLocationBookingProfiles",
    isWrite: false
  } as ApiMethodInfo,

  getLocationProfile: {
    description: "Bookings RetrieveLocationBookingProfile operation",
    method: "get",
    path: "/v2/bookings/location-booking-profiles/{location_id}",
    pathParams: [{"name":"location_id","type":"string","description":"The ID of the location to retrieve the booking profile."}],
    queryParams: [],
    requestType: "RetrieveLocationBookingProfileRequest",
    isMultipart: false,
    originalName: "RetrieveLocationBookingProfile",
    isWrite: false
  } as ApiMethodInfo,

  listTeamMemberProfiles: {
    description: "Bookings ListTeamMemberBookingProfiles operation",
    method: "get",
    path: "/v2/bookings/team-member-booking-profiles",
    pathParams: [],
    queryParams: [{"name":"bookable_only","type":"boolean","description":"Indicates whether to include only bookable team members in the returned result (`true`) or not (`false`)."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a paged response."},{"name":"cursor","type":"string","description":"The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."},{"name":"location_id","type":"string","description":"Indicates whether to include only team members enabled at the given location in the returned result."}],
    requestType: "ListTeamMemberBookingProfilesRequest",
    isMultipart: false,
    originalName: "ListTeamMemberBookingProfiles",
    isWrite: false
  } as ApiMethodInfo,

  bulkGetteamMemberProfiles: {
    description: "Bookings BulkRetrieveTeamMemberBookingProfiles operation",
    method: "post",
    path: "/v2/bookings/team-member-booking-profiles/bulk-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BulkRetrieveTeamMemberBookingProfilesRequest",
    isMultipart: false,
    originalName: "BulkRetrieveTeamMemberBookingProfiles",
    isWrite: false
  } as ApiMethodInfo,

  getTeamMemberProfile: {
    description: "Bookings RetrieveTeamMemberBookingProfile operation",
    method: "get",
    path: "/v2/bookings/team-member-booking-profiles/{team_member_id}",
    pathParams: [{"name":"team_member_id","type":"string","description":"The ID of the team member to retrieve."}],
    queryParams: [],
    requestType: "RetrieveTeamMemberBookingProfileRequest",
    isMultipart: false,
    originalName: "RetrieveTeamMemberBookingProfile",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/bookings/{booking_id}",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the [Booking](entity:Booking) object representing the to-be-retrieved booking."}],
    queryParams: [],
    requestType: "RetrieveBookingRequest",
    isMultipart: false,
    originalName: "RetrieveBooking",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "put",
    path: "/v2/bookings/{booking_id}",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the [Booking](entity:Booking) object representing the to-be-updated booking."}],
    queryParams: [],
    requestType: "UpdateBookingRequest",
    isMultipart: false,
    originalName: "UpdateBooking",
    isWrite: true
  } as ApiMethodInfo,

  cancel: {
    description: "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
    method: "post",
    path: "/v2/bookings/{booking_id}/cancel",
    pathParams: [{"name":"booking_id","type":"string","description":"The ID of the [Booking](entity:Booking) object representing the to-be-cancelled booking."}],
    queryParams: [],
    requestType: "CancelBookingRequest",
    isMultipart: false,
    originalName: "CancelBooking",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const BookingsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.create;
    
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

  searchAvailability: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.searchAvailability;
    
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

  bulkGet: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.bulkGet;
    
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

  getBusinessProfile: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.getBusinessProfile;
    
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

  bulkGetteamMemberProfiles: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.bulkGetteamMemberProfiles;
    
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

  getLocationProfile: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.getLocationProfile;
    
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

  getTeamMemberProfile: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.getTeamMemberProfile;
    
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

  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.get;
    
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

  update: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.update;
    
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

  cancel: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.cancel;
    
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

  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.list;
    
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

  listLocationProfiles: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.listLocationProfiles;
    
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

  listTeamMemberProfiles: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BookingsMethods.listTeamMemberProfiles;
    
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
  }
};