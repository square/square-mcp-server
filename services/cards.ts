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
export const CardsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "A max of 25 cards will be returned.",
    method: "get",
    path: "/v2/cards",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."},{"name":"customer_id","type":"string","description":"Limit results to cards associated with the customer supplied.\nBy default, all cards owned by the merchant are returned."},{"name":"include_disabled","type":"boolean","description":"Includes disabled cards.\nBy default, all enabled cards owned by the merchant are returned."},{"name":"reference_id","type":"string","description":"Limit results to cards associated with the reference_id supplied."},{"name":"sort_order","type":"string","description":"Sorts the returned list by when the card was created with the specified order.\nThis field defaults to ASC."}],
    requestType: "ListCardsRequest",
    isMultipart: false,
    originalName: "ListCards",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "Cards CreateCard operation",
    method: "post",
    path: "/v2/cards",
    pathParams: [],
    queryParams: [],
    requestType: "CreateCardRequest",
    isMultipart: false,
    originalName: "CreateCard",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "Cards RetrieveCard operation",
    method: "get",
    path: "/v2/cards/{card_id}",
    pathParams: [{"name":"card_id","type":"string","description":"Unique ID for the desired Card."}],
    queryParams: [],
    requestType: "RetrieveCardRequest",
    isMultipart: false,
    originalName: "RetrieveCard",
    isWrite: false
  } as ApiMethodInfo,

  disable: {
    description: "Disabling an already disabled card is allowed but has no effect.",
    method: "post",
    path: "/v2/cards/{card_id}/disable",
    pathParams: [{"name":"card_id","type":"string","description":"Unique ID for the desired Card."}],
    queryParams: [],
    requestType: "DisableCardRequest",
    isMultipart: false,
    originalName: "DisableCard",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CardsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CardsMethods.create;
    
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

  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CardsMethods.get;
    
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

  disable: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CardsMethods.disable;
    
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
    const methodInfo = CardsMethods.list;
    
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