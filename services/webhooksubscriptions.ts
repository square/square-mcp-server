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
export const WebhookSubscriptionsMethods: { [key: string]: ApiMethodInfo } = {
  listWebhookEventTypes: {
    description: "WebhookSubscriptions ListWebhookEventTypes operation",
    method: "get",
    path: "/v2/webhooks/event-types",
    pathParams: [],
    queryParams: [{"name":"api_version","type":"string","description":"The API version for which to list event types. Setting this field overrides the default version used by the application."}],
    requestType: "ListWebhookEventTypesRequest",
    isMultipart: false,
    originalName: "ListWebhookEventTypes",
    isWrite: false
  } as ApiMethodInfo,

  list: {
    description: "WebhookSubscriptions ListWebhookSubscriptions operation",
    method: "get",
    path: "/v2/webhooks/subscriptions",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"include_disabled","type":"boolean","description":"Includes disabled [Subscription](entity:WebhookSubscription)s.\nBy default, all enabled [Subscription](entity:WebhookSubscription)s are returned."},{"name":"sort_order","type":"string","description":"Sorts the returned list by when the [Subscription](entity:WebhookSubscription) was created with the specified order.\nThis field defaults to ASC."},{"name":"limit","type":"integer","description":"The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value.\n\nDefault: 100"}],
    requestType: "ListWebhookSubscriptionsRequest",
    isMultipart: false,
    originalName: "ListWebhookSubscriptions",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "WebhookSubscriptions CreateWebhookSubscription operation",
    method: "post",
    path: "/v2/webhooks/subscriptions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateWebhookSubscriptionRequest",
    isMultipart: false,
    originalName: "CreateWebhookSubscription",
    isWrite: true
  } as ApiMethodInfo,

  delete: {
    description: "WebhookSubscriptions DeleteWebhookSubscription operation",
    method: "delete",
    path: "/v2/webhooks/subscriptions/{subscription_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to delete."}],
    queryParams: [],
    requestType: "DeleteWebhookSubscriptionRequest",
    isMultipart: false,
    originalName: "DeleteWebhookSubscription",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "WebhookSubscriptions RetrieveWebhookSubscription operation",
    method: "get",
    path: "/v2/webhooks/subscriptions/{subscription_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to retrieve."}],
    queryParams: [],
    requestType: "RetrieveWebhookSubscriptionRequest",
    isMultipart: false,
    originalName: "RetrieveWebhookSubscription",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "WebhookSubscriptions UpdateWebhookSubscription operation",
    method: "put",
    path: "/v2/webhooks/subscriptions/{subscription_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to update."}],
    queryParams: [],
    requestType: "UpdateWebhookSubscriptionRequest",
    isMultipart: false,
    originalName: "UpdateWebhookSubscription",
    isWrite: true
  } as ApiMethodInfo,

  updateSignatureKey: {
    description: "WebhookSubscriptions UpdateWebhookSubscriptionSignatureKey operation",
    method: "post",
    path: "/v2/webhooks/subscriptions/{subscription_id}/signature-key",
    pathParams: [{"name":"subscription_id","type":"string","description":"[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to update."}],
    queryParams: [],
    requestType: "UpdateWebhookSubscriptionSignatureKeyRequest",
    isMultipart: false,
    originalName: "UpdateWebhookSubscriptionSignatureKey",
    isWrite: true
  } as ApiMethodInfo,

  test: {
    description: "WebhookSubscriptions TestWebhookSubscription operation",
    method: "post",
    path: "/v2/webhooks/subscriptions/{subscription_id}/test",
    pathParams: [{"name":"subscription_id","type":"string","description":"[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to test."}],
    queryParams: [],
    requestType: "TestWebhookSubscriptionRequest",
    isMultipart: false,
    originalName: "TestWebhookSubscription",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const WebhookSubscriptionsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.create;
    
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

  delete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.delete;
    
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
    const methodInfo = WebhookSubscriptionsMethods.get;
    
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
    const methodInfo = WebhookSubscriptionsMethods.update;
    
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

  updateSignatureKey: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.updateSignatureKey;
    
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

  test: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.test;
    
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

  listWebhookEventTypes: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.listWebhookEventTypes;
    
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

  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = WebhookSubscriptionsMethods.list;
    
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