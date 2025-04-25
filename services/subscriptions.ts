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
export const SubscriptionsMethods: { [key: string]: ApiMethodInfo } = {
  create: {
    description: "If you provide a card on file in the request, Square charges the card for\nthe subscription. Otherwise, Square sends an invoice to the customer's email\naddress. The subscription starts immediately, unless the request includes\nthe optional `start_date`. Each individual subscription is associated with a particular location.\n\nFor more information, see [Create a subscription](https://developer.squareup.com/docs/subscriptions-api/manage-subscriptions#create-a-subscription).",
    method: "post",
    path: "/v2/subscriptions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateSubscriptionRequest",
    isMultipart: false,
    originalName: "CreateSubscription",
    isWrite: true
  } as ApiMethodInfo,

  bulkSwapplan: {
    description: "For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).",
    method: "post",
    path: "/v2/subscriptions/bulk-swap-plan",
    pathParams: [],
    queryParams: [],
    requestType: "BulkSwapPlanRequest",
    isMultipart: false,
    originalName: "BulkSwapPlan",
    isWrite: true
  } as ApiMethodInfo,

  search: {
    description: "Results are ordered chronologically by subscription creation date. If\nthe request specifies more than one location ID,\nthe endpoint orders the result\nby location ID, and then by creation date within each location. If no locations are given\nin the query, all locations are searched.\n\nYou can also optionally specify `customer_ids` to search by customer.\nIf left unset, all customers\nassociated with the specified locations are returned.\nIf the request specifies customer IDs, the endpoint orders results\nfirst by location, within location by customer ID, and within\ncustomer by subscription creation date.",
    method: "post",
    path: "/v2/subscriptions/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchSubscriptionsRequest",
    isMultipart: false,
    originalName: "SearchSubscriptions",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "Subscriptions RetrieveSubscription operation",
    method: "get",
    path: "/v2/subscriptions/{subscription_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to retrieve."}],
    queryParams: [{"name":"include","type":"string","description":"A query parameter to specify related information to be included in the response. \n\nThe supported query parameter values are: \n\n- `actions`: to include scheduled actions on the targeted subscription."}],
    requestType: "RetrieveSubscriptionRequest",
    isMultipart: false,
    originalName: "RetrieveSubscription",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "To clear a field, set its value to `null`.",
    method: "put",
    path: "/v2/subscriptions/{subscription_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to update."}],
    queryParams: [],
    requestType: "UpdateSubscriptionRequest",
    isMultipart: false,
    originalName: "UpdateSubscription",
    isWrite: true
  } as ApiMethodInfo,

  deleteAction: {
    description: "Subscriptions DeleteSubscriptionAction operation",
    method: "delete",
    path: "/v2/subscriptions/{subscription_id}/actions/{action_id}",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription the targeted action is to act upon."},{"name":"action_id","type":"string","description":"The ID of the targeted action to be deleted."}],
    queryParams: [],
    requestType: "DeleteSubscriptionActionRequest",
    isMultipart: false,
    originalName: "DeleteSubscriptionAction",
    isWrite: true
  } as ApiMethodInfo,

  changeBillingAnchorDate: {
    description: "Subscriptions ChangeBillingAnchorDate operation",
    method: "post",
    path: "/v2/subscriptions/{subscription_id}/billing-anchor",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to update the billing anchor date."}],
    queryParams: [],
    requestType: "ChangeBillingAnchorDateRequest",
    isMultipart: false,
    originalName: "ChangeBillingAnchorDate",
    isWrite: false
  } as ApiMethodInfo,

  cancel: {
    description: "This \nsets the `canceled_date` field to the end of the active billing period. After this date, \nthe subscription status changes from ACTIVE to CANCELED.",
    method: "post",
    path: "/v2/subscriptions/{subscription_id}/cancel",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to cancel."}],
    queryParams: [],
    requestType: "CancelSubscriptionRequest",
    isMultipart: false,
    originalName: "CancelSubscription",
    isWrite: true
  } as ApiMethodInfo,

  listEvents: {
    description: "Subscriptions ListSubscriptionEvents operation",
    method: "get",
    path: "/v2/subscriptions/{subscription_id}/events",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to retrieve the events for."}],
    queryParams: [{"name":"cursor","type":"string","description":"When the total number of resulting subscription events exceeds the limit of a paged response, \nspecify the cursor returned from a preceding response here to fetch the next set of results.\nIf the cursor is unset, the response contains the last page of the results.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"limit","type":"integer","description":"The upper limit on the number of subscription events to return\nin a paged response."}],
    requestType: "ListSubscriptionEventsRequest",
    isMultipart: false,
    originalName: "ListSubscriptionEvents",
    isWrite: false
  } as ApiMethodInfo,

  pause: {
    description: "Subscriptions PauseSubscription operation",
    method: "post",
    path: "/v2/subscriptions/{subscription_id}/pause",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to pause."}],
    queryParams: [],
    requestType: "PauseSubscriptionRequest",
    isMultipart: false,
    originalName: "PauseSubscription",
    isWrite: true
  } as ApiMethodInfo,

  resume: {
    description: "Subscriptions ResumeSubscription operation",
    method: "post",
    path: "/v2/subscriptions/{subscription_id}/resume",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to resume."}],
    queryParams: [],
    requestType: "ResumeSubscriptionRequest",
    isMultipart: false,
    originalName: "ResumeSubscription",
    isWrite: true
  } as ApiMethodInfo,

  swapPlan: {
    description: "For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).",
    method: "post",
    path: "/v2/subscriptions/{subscription_id}/swap-plan",
    pathParams: [{"name":"subscription_id","type":"string","description":"The ID of the subscription to swap the subscription plan for."}],
    queryParams: [],
    requestType: "SwapPlanRequest",
    isMultipart: false,
    originalName: "SwapPlan",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const SubscriptionsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.create;
    
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

  bulkSwapplan: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.bulkSwapplan;
    
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
    const methodInfo = SubscriptionsMethods.search;
    
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
    const methodInfo = SubscriptionsMethods.update;
    
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

  deleteAction: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.deleteAction;
    
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

  changeBillingAnchorDate: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.changeBillingAnchorDate;
    
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

  cancel: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.cancel;
    
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

  pause: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.pause;
    
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

  resume: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.resume;
    
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

  swapPlan: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.swapPlan;
    
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
    const methodInfo = SubscriptionsMethods.get;
    
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

  listEvents: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = SubscriptionsMethods.listEvents;
    
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