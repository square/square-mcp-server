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
export const GiftCardsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "You can specify optional filters to retrieve \na subset of the gift cards. Results are sorted by `created_at` in ascending order.",
    method: "get",
    path: "/v2/gift-cards",
    pathParams: [],
    queryParams: [{"name":"type","type":"string","description":"If a [type](entity:GiftCardType) is provided, the endpoint returns gift cards of the specified type.\nOtherwise, the endpoint returns gift cards of all types."},{"name":"state","type":"string","description":"If a [state](entity:GiftCardStatus) is provided, the endpoint returns the gift cards in the specified state.\nOtherwise, the endpoint returns the gift cards of all states."},{"name":"limit","type":"integer","description":"If a limit is provided, the endpoint returns only the specified number of results per page.\nThe maximum value is 200. The default value is 30.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"customer_id","type":"string","description":"If a customer ID is provided, the endpoint returns only the gift cards linked to the specified customer."}],
    requestType: "ListGiftCardsRequest",
    isMultipart: false,
    originalName: "ListGiftCards",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "The resulting gift card\nhas a `PENDING` state. To activate a gift card so that it can be redeemed for purchases, call\n[CreateGiftCardActivity](api-endpoint:GiftCardActivities-CreateGiftCardActivity) and create an `ACTIVATE`\nactivity with the initial balance. Alternatively, you can use [RefundPayment](api-endpoint:Refunds-RefundPayment)\nto refund a payment to the new gift card.",
    method: "post",
    path: "/v2/gift-cards",
    pathParams: [],
    queryParams: [],
    requestType: "CreateGiftCardRequest",
    isMultipart: false,
    originalName: "CreateGiftCard",
    isWrite: true
  } as ApiMethodInfo,

  getFromGAN: {
    description: "GiftCards RetrieveGiftCardFromGAN operation",
    method: "post",
    path: "/v2/gift-cards/from-gan",
    pathParams: [],
    queryParams: [],
    requestType: "RetrieveGiftCardFromGANRequest",
    isMultipart: false,
    originalName: "RetrieveGiftCardFromGAN",
    isWrite: false
  } as ApiMethodInfo,

  getFromNonce: {
    description: "GiftCards RetrieveGiftCardFromNonce operation",
    method: "post",
    path: "/v2/gift-cards/from-nonce",
    pathParams: [],
    queryParams: [],
    requestType: "RetrieveGiftCardFromNonceRequest",
    isMultipart: false,
    originalName: "RetrieveGiftCardFromNonce",
    isWrite: false
  } as ApiMethodInfo,

  linkCustomerTo: {
    description: "GiftCards LinkCustomerToGiftCard operation",
    method: "post",
    path: "/v2/gift-cards/{gift_card_id}/link-customer",
    pathParams: [{"name":"gift_card_id","type":"string","description":"The ID of the gift card to be linked."}],
    queryParams: [],
    requestType: "LinkCustomerToGiftCardRequest",
    isMultipart: false,
    originalName: "LinkCustomerToGiftCard",
    isWrite: true
  } as ApiMethodInfo,

  unlinkCustomerFrom: {
    description: "GiftCards UnlinkCustomerFromGiftCard operation",
    method: "post",
    path: "/v2/gift-cards/{gift_card_id}/unlink-customer",
    pathParams: [{"name":"gift_card_id","type":"string","description":"The ID of the gift card to be unlinked."}],
    queryParams: [],
    requestType: "UnlinkCustomerFromGiftCardRequest",
    isMultipart: false,
    originalName: "UnlinkCustomerFromGiftCard",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "GiftCards RetrieveGiftCard operation",
    method: "get",
    path: "/v2/gift-cards/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of the gift card to retrieve."}],
    queryParams: [],
    requestType: "RetrieveGiftCardRequest",
    isMultipart: false,
    originalName: "RetrieveGiftCard",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const GiftCardsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardsMethods.create;
    
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

  getFromGAN: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardsMethods.getFromGAN;
    
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

  getFromNonce: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardsMethods.getFromNonce;
    
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

  linkCustomerTo: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardsMethods.linkCustomerTo;
    
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

  unlinkCustomerFrom: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardsMethods.unlinkCustomerFrom;
    
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
    const methodInfo = GiftCardsMethods.get;
    
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
    const methodInfo = GiftCardsMethods.list;
    
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