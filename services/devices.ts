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
export const DevicesMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "Currently, only Terminal API\ndevices are supported.",
    method: "get",
    path: "/v2/devices",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."},{"name":"sort_order","type":"string","description":"The order in which results are listed.\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."},{"name":"limit","type":"integer","description":"The number of results to return in a single page."},{"name":"location_id","type":"string","description":"If present, only returns devices at the target location."}],
    requestType: "ListDevicesRequest",
    isMultipart: false,
    originalName: "ListDevices",
    isWrite: false
  } as ApiMethodInfo,

  listCodes: {
    description: "Devices ListDeviceCodes operation",
    method: "get",
    path: "/v2/devices/codes",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nSee [Paginating results](https://developer.squareup.com/docs/working-with-apis/pagination) for more information."},{"name":"location_id","type":"string","description":"If specified, only returns DeviceCodes of the specified location.\nReturns DeviceCodes of all locations if empty."},{"name":"product_type","type":"string","description":"If specified, only returns DeviceCodes targeting the specified product type.\nReturns DeviceCodes of all product types if empty."},{"name":"status","type":"string","description":"If specified, returns DeviceCodes with the specified statuses.\nReturns DeviceCodes of status `PAIRED` and `UNPAIRED` if empty."}],
    requestType: "ListDeviceCodesRequest",
    isMultipart: false,
    originalName: "ListDeviceCodes",
    isWrite: false
  } as ApiMethodInfo,

  createCode: {
    description: "Devices CreateDeviceCode operation",
    method: "post",
    path: "/v2/devices/codes",
    pathParams: [],
    queryParams: [],
    requestType: "CreateDeviceCodeRequest",
    isMultipart: false,
    originalName: "CreateDeviceCode",
    isWrite: true
  } as ApiMethodInfo,

  getCode: {
    description: "Devices GetDeviceCode operation",
    method: "get",
    path: "/v2/devices/codes/{id}",
    pathParams: [{"name":"id","type":"string","description":"The unique identifier for the device code."}],
    queryParams: [],
    requestType: "GetDeviceCodeRequest",
    isMultipart: false,
    originalName: "GetDeviceCode",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "Devices GetDevice operation",
    method: "get",
    path: "/v2/devices/{device_id}",
    pathParams: [{"name":"device_id","type":"string","description":"The unique ID for the desired `Device`."}],
    queryParams: [],
    requestType: "GetDeviceRequest",
    isMultipart: false,
    originalName: "GetDevice",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const DevicesHandlers = {
  createCode: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DevicesMethods.createCode;
    
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

  getCode: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DevicesMethods.getCode;
    
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
    const methodInfo = DevicesMethods.get;
    
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
    const methodInfo = DevicesMethods.list;
    
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

  listCodes: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DevicesMethods.listCodes;
    
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