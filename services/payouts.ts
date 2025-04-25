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
export const PayoutsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "You can filter payouts by location ID, status, time range, and order them in ascending or descending order.\nTo call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/payouts",
    pathParams: [],
    queryParams: [{"name":"location_id","type":"string","description":"The ID of the location for which to list the payouts.\nBy default, payouts are returned for the default (main) location associated with the seller."},{"name":"status","type":"string","description":"If provided, only payouts with the given status are returned."},{"name":"begin_time","type":"string","description":"The timestamp for the beginning of the payout creation time, in RFC 3339 format.\nInclusive. Default: The current time minus one year.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"end_time","type":"string","description":"The timestamp for the end of the payout creation time, in RFC 3339 format.\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"sort_order","type":"string","description":"The order in which payouts are listed."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination).\nIf request parameters change between requests, subsequent results may contain duplicates or missing records."},{"name":"limit","type":"integer","description":"The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value. If the provided value is\ngreater than 100, it is ignored and the default value is used instead.\nDefault: `100`"}],
    requestType: "ListPayoutsRequest",
    isMultipart: false,
    originalName: "ListPayouts",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/payouts/{payout_id}",
    pathParams: [{"name":"payout_id","type":"string","description":"The ID of the payout to retrieve the information for."}],
    queryParams: [],
    requestType: "GetPayoutRequest",
    isMultipart: false,
    originalName: "GetPayout",
    isWrite: false
  } as ApiMethodInfo,

  listEntries: {
    description: "To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
    method: "get",
    path: "/v2/payouts/{payout_id}/payout-entries",
    pathParams: [{"name":"payout_id","type":"string","description":"The ID of the payout to retrieve the information for."}],
    queryParams: [{"name":"sort_order","type":"string","description":"The order in which payout entries are listed."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination).\nIf request parameters change between requests, subsequent results may contain duplicates or missing records."},{"name":"limit","type":"integer","description":"The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value. If the provided value is\ngreater than 100, it is ignored and the default value is used instead.\nDefault: `100`"}],
    requestType: "ListPayoutEntriesRequest",
    isMultipart: false,
    originalName: "ListPayoutEntries",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const PayoutsHandlers = {
  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = PayoutsMethods.get;
    
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
    const methodInfo = PayoutsMethods.list;
    
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

  listEntries: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = PayoutsMethods.listEntries;
    
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