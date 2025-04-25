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
export const LocationsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "Locations are listed alphabetically by `name`.",
    method: "get",
    path: "/v2/locations",
    pathParams: [],
    queryParams: [],
    requestType: "ListLocationsRequest",
    isMultipart: false,
    originalName: "ListLocations",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "Creating new locations allows for separate configuration of receipt layouts, item prices,\nand sales reports. Developers can use locations to separate sales activity through applications\nthat integrate with Square from sales activity elsewhere in a seller's account.\nLocations created programmatically with the Locations API last forever and\nare visible to the seller for their own management. Therefore, ensure that\neach location has a sensible and unique name.",
    method: "post",
    path: "/v2/locations",
    pathParams: [],
    queryParams: [],
    requestType: "CreateLocationRequest",
    isMultipart: false,
    originalName: "CreateLocation",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "Specify \"main\"\nas the location ID to retrieve details of the [main location](https://developer.squareup.com/docs/locations-api#about-the-main-location).",
    method: "get",
    path: "/v2/locations/{location_id}",
    pathParams: [{"name":"location_id","type":"string","description":"The ID of the location to retrieve. Specify the string\n\"main\" to return the main location."}],
    queryParams: [],
    requestType: "RetrieveLocationRequest",
    isMultipart: false,
    originalName: "RetrieveLocation",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "Locations UpdateLocation operation",
    method: "put",
    path: "/v2/locations/{location_id}",
    pathParams: [{"name":"location_id","type":"string","description":"The ID of the location to update."}],
    queryParams: [],
    requestType: "UpdateLocationRequest",
    isMultipart: false,
    originalName: "UpdateLocation",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const LocationsHandlers = {
  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LocationsMethods.list;
    
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

  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LocationsMethods.create;
    
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
    const methodInfo = LocationsMethods.get;
    
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
    const methodInfo = LocationsMethods.update;
    
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
  }
};