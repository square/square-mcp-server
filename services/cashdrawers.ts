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
export const CashDrawersMethods: { [key: string]: ApiMethodInfo } = {
  listHifts: {
    description: "CashDrawers ListCashDrawerShifts operation",
    method: "get",
    path: "/v2/cash-drawers/shifts",
    pathParams: [],
    queryParams: [{"name":"location_id","type":"string","description":"The ID of the location to query for a list of cash drawer shifts."},{"name":"sort_order","type":"string","description":"The order in which cash drawer shifts are listed in the response,\nbased on their opened_at field. Default value: ASC"},{"name":"begin_time","type":"string","description":"The inclusive start time of the query on opened_at, in ISO 8601 format."},{"name":"end_time","type":"string","description":"The exclusive end date of the query on opened_at, in ISO 8601 format."},{"name":"limit","type":"integer","description":"Number of cash drawer shift events in a page of results (200 by\ndefault, 1000 max)."},{"name":"cursor","type":"string","description":"Opaque cursor for fetching the next page of results."}],
    requestType: "ListCashDrawerShiftsRequest",
    isMultipart: false,
    originalName: "ListCashDrawerShifts",
    isWrite: false
  } as ApiMethodInfo,

  getHift: {
    description: "See\n[ListCashDrawerShiftEvents](api-endpoint:CashDrawers-ListCashDrawerShiftEvents) for a list of cash drawer shift events.",
    method: "get",
    path: "/v2/cash-drawers/shifts/{shift_id}",
    pathParams: [{"name":"shift_id","type":"string","description":"The shift ID."}],
    queryParams: [{"name":"location_id","type":"string","description":"The ID of the location to retrieve cash drawer shifts from."}],
    requestType: "RetrieveCashDrawerShiftRequest",
    isMultipart: false,
    originalName: "RetrieveCashDrawerShift",
    isWrite: false
  } as ApiMethodInfo,

  listHiftEvents: {
    description: "CashDrawers ListCashDrawerShiftEvents operation",
    method: "get",
    path: "/v2/cash-drawers/shifts/{shift_id}/events",
    pathParams: [{"name":"shift_id","type":"string","description":"The shift ID."}],
    queryParams: [{"name":"location_id","type":"string","description":"The ID of the location to list cash drawer shifts for."},{"name":"limit","type":"integer","description":"Number of resources to be returned in a page of results (200 by\ndefault, 1000 max)."},{"name":"cursor","type":"string","description":"Opaque cursor for fetching the next page of results."}],
    requestType: "ListCashDrawerShiftEventsRequest",
    isMultipart: false,
    originalName: "ListCashDrawerShiftEvents",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CashDrawersHandlers = {
  listHifts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CashDrawersMethods.listHifts;
    
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

  getHift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CashDrawersMethods.getHift;
    
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

  listHiftEvents: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CashDrawersMethods.listHiftEvents;
    
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