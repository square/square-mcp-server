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
export const CheckoutMethods: { [key: string]: ApiMethodInfo } = {
  getLocationSettings: {
    description: "Checkout RetrieveLocationSettings operation",
    method: "get",
    path: "/v2/online-checkout/location-settings/{location_id}",
    pathParams: [{"name":"location_id","type":"string","description":"The ID of the location for which to retrieve settings."}],
    queryParams: [],
    requestType: "RetrieveLocationSettingsRequest",
    isMultipart: false,
    originalName: "RetrieveLocationSettings",
    isWrite: false
  } as ApiMethodInfo,

  updateLocationSettings: {
    description: "Checkout UpdateLocationSettings operation",
    method: "put",
    path: "/v2/online-checkout/location-settings/{location_id}",
    pathParams: [{"name":"location_id","type":"string","description":"The ID of the location for which to retrieve settings."}],
    queryParams: [],
    requestType: "UpdateLocationSettingsRequest",
    isMultipart: false,
    originalName: "UpdateLocationSettings",
    isWrite: true
  } as ApiMethodInfo,

  getMerchantSettings: {
    description: "Checkout RetrieveMerchantSettings operation",
    method: "get",
    path: "/v2/online-checkout/merchant-settings",
    pathParams: [],
    queryParams: [],
    requestType: "RetrieveMerchantSettingsRequest",
    isMultipart: false,
    originalName: "RetrieveMerchantSettings",
    isWrite: false
  } as ApiMethodInfo,

  updateMerchantSettings: {
    description: "Checkout UpdateMerchantSettings operation",
    method: "put",
    path: "/v2/online-checkout/merchant-settings",
    pathParams: [],
    queryParams: [],
    requestType: "UpdateMerchantSettingsRequest",
    isMultipart: false,
    originalName: "UpdateMerchantSettings",
    isWrite: true
  } as ApiMethodInfo,

  listPaymentLinks: {
    description: "Checkout ListPaymentLinks operation",
    method: "get",
    path: "/v2/online-checkout/payment-links",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results.\nFor more  information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"limit","type":"integer","description":"A limit on the number of results to return per page. The limit is advisory and\nthe implementation might return more or less results. If the supplied limit is negative, zero, or\ngreater than the maximum limit of 1000, it is ignored.\n\nDefault value: `100`"}],
    requestType: "ListPaymentLinksRequest",
    isMultipart: false,
    originalName: "ListPaymentLinks",
    isWrite: false
  } as ApiMethodInfo,

  createPaymentLink: {
    description: "Applications can share the resulting payment link with their buyer to pay for goods and services.",
    method: "post",
    path: "/v2/online-checkout/payment-links",
    pathParams: [],
    queryParams: [],
    requestType: "CreatePaymentLinkRequest",
    isMultipart: false,
    originalName: "CreatePaymentLink",
    isWrite: true
  } as ApiMethodInfo,

  deletePaymentLink: {
    description: "Checkout DeletePaymentLink operation",
    method: "delete",
    path: "/v2/online-checkout/payment-links/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of the payment link to delete."}],
    queryParams: [],
    requestType: "DeletePaymentLinkRequest",
    isMultipart: false,
    originalName: "DeletePaymentLink",
    isWrite: true
  } as ApiMethodInfo,

  getPaymentLink: {
    description: "Checkout RetrievePaymentLink operation",
    method: "get",
    path: "/v2/online-checkout/payment-links/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of link to retrieve."}],
    queryParams: [],
    requestType: "RetrievePaymentLinkRequest",
    isMultipart: false,
    originalName: "RetrievePaymentLink",
    isWrite: false
  } as ApiMethodInfo,

  updatePaymentLink: {
    description: "You can update the `payment_link` fields such as\n`description`, `checkout_options`, and  `pre_populated_data`.\nYou cannot update other fields such as the `order_id`, `version`, `URL`, or `timestamp` field.",
    method: "put",
    path: "/v2/online-checkout/payment-links/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of the payment link to update."}],
    queryParams: [],
    requestType: "UpdatePaymentLinkRequest",
    isMultipart: false,
    originalName: "UpdatePaymentLink",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CheckoutHandlers = {
  getMerchantSettings: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.getMerchantSettings;
    
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

  updateMerchantSettings: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.updateMerchantSettings;
    
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

  createPaymentLink: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.createPaymentLink;
    
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

  getLocationSettings: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.getLocationSettings;
    
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

  updateLocationSettings: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.updateLocationSettings;
    
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

  deletePaymentLink: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.deletePaymentLink;
    
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

  getPaymentLink: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.getPaymentLink;
    
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

  updatePaymentLink: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.updatePaymentLink;
    
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

  listPaymentLinks: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CheckoutMethods.listPaymentLinks;
    
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