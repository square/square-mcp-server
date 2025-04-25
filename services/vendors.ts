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
export const VendorsMethods: { [key: string]: ApiMethodInfo } = {
  bulkCreate: {
    description: "Vendors BulkCreateVendors operation",
    method: "post",
    path: "/v2/vendors/bulk-create",
    pathParams: [],
    queryParams: [],
    requestType: "BulkCreateVendorsRequest",
    isMultipart: false,
    originalName: "BulkCreateVendors",
    isWrite: true
  } as ApiMethodInfo,

  bulkGet: {
    description: "Vendors BulkRetrieveVendors operation",
    method: "post",
    path: "/v2/vendors/bulk-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BulkRetrieveVendorsRequest",
    isMultipart: false,
    originalName: "BulkRetrieveVendors",
    isWrite: false
  } as ApiMethodInfo,

  bulkUpdate: {
    description: "Vendors BulkUpdateVendors operation",
    method: "put",
    path: "/v2/vendors/bulk-update",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpdateVendorsRequest",
    isMultipart: false,
    originalName: "BulkUpdateVendors",
    isWrite: true
  } as ApiMethodInfo,

  create: {
    description: "Vendors CreateVendor operation",
    method: "post",
    path: "/v2/vendors/create",
    pathParams: [],
    queryParams: [],
    requestType: "CreateVendorRequest",
    isMultipart: false,
    originalName: "CreateVendor",
    isWrite: true
  } as ApiMethodInfo,

  search: {
    description: "Vendors SearchVendors operation",
    method: "post",
    path: "/v2/vendors/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchVendorsRequest",
    isMultipart: false,
    originalName: "SearchVendors",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "Vendors RetrieveVendor operation",
    method: "get",
    path: "/v2/vendors/{vendor_id}",
    pathParams: [{"name":"vendor_id","type":"string","description":"ID of the [Vendor](entity:Vendor) to retrieve."}],
    queryParams: [],
    requestType: "RetrieveVendorRequest",
    isMultipart: false,
    originalName: "RetrieveVendor",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "Vendors UpdateVendor operation",
    method: "put",
    path: "/v2/vendors/{vendor_id}",
    pathParams: [],
    queryParams: [],
    requestType: "UpdateVendorRequest",
    isMultipart: false,
    originalName: "UpdateVendor",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const VendorsHandlers = {
  bulkCreate: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = VendorsMethods.bulkCreate;
    
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
    const methodInfo = VendorsMethods.bulkGet;
    
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

  bulkUpdate: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = VendorsMethods.bulkUpdate;
    
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
    const methodInfo = VendorsMethods.create;
    
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

  search: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = VendorsMethods.search;
    
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

  update: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = VendorsMethods.update;
    
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
    const methodInfo = VendorsMethods.get;
    
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