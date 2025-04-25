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
export const EventsMethods: { [key: string]: ApiMethodInfo } = {
  search: {
    description: "Events SearchEvents operation",
    method: "post",
    path: "/v2/events",
    pathParams: [],
    queryParams: [],
    requestType: "SearchEventsRequest",
    isMultipart: false,
    originalName: "SearchEvents",
    isWrite: false
  } as ApiMethodInfo,

  disable: {
    description: "All events are disabled by default. You must enable events to make them searchable.\nDisabling events for a specific time period prevents them from being searchable, even if you re-enable them later.",
    method: "put",
    path: "/v2/events/disable",
    pathParams: [],
    queryParams: [],
    requestType: "DisableEventsRequest",
    isMultipart: false,
    originalName: "DisableEvents",
    isWrite: true
  } as ApiMethodInfo,

  enable: {
    description: "Only events that occur while in the enabled state are searchable.",
    method: "put",
    path: "/v2/events/enable",
    pathParams: [],
    queryParams: [],
    requestType: "EnableEventsRequest",
    isMultipart: false,
    originalName: "EnableEvents",
    isWrite: true
  } as ApiMethodInfo,

  listTypes: {
    description: "Events ListEventTypes operation",
    method: "get",
    path: "/v2/events/types",
    pathParams: [],
    queryParams: [{"name":"api_version","type":"string","description":"The API version for which to list event types. Setting this field overrides the default version used by the application."}],
    requestType: "ListEventTypesRequest",
    isMultipart: false,
    originalName: "ListEventTypes",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const EventsHandlers = {
  search: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = EventsMethods.search;
    
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

  disable: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = EventsMethods.disable;
    
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

  enable: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = EventsMethods.enable;
    
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

  listTypes: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = EventsMethods.listTypes;
    
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