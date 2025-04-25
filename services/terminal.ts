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
export const TerminalMethods: { [key: string]: ApiMethodInfo } = {
  createAction: {
    description: "Terminal CreateTerminalAction operation",
    method: "post",
    path: "/v2/terminals/actions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateTerminalActionRequest",
    isMultipart: false,
    originalName: "CreateTerminalAction",
    isWrite: true
  } as ApiMethodInfo,

  searchActions: {
    description: "Terminal action requests are available for 30 days.",
    method: "post",
    path: "/v2/terminals/actions/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchTerminalActionsRequest",
    isMultipart: false,
    originalName: "SearchTerminalActions",
    isWrite: false
  } as ApiMethodInfo,

  getAction: {
    description: "Terminal action requests are available for 30 days.",
    method: "get",
    path: "/v2/terminals/actions/{action_id}",
    pathParams: [{"name":"action_id","type":"string","description":"Unique ID for the desired `TerminalAction`."}],
    queryParams: [],
    requestType: "GetTerminalActionRequest",
    isMultipart: false,
    originalName: "GetTerminalAction",
    isWrite: false
  } as ApiMethodInfo,

  cancelAction: {
    description: "Terminal CancelTerminalAction operation",
    method: "post",
    path: "/v2/terminals/actions/{action_id}/cancel",
    pathParams: [{"name":"action_id","type":"string","description":"Unique ID for the desired `TerminalAction`."}],
    queryParams: [],
    requestType: "CancelTerminalActionRequest",
    isMultipart: false,
    originalName: "CancelTerminalAction",
    isWrite: true
  } as ApiMethodInfo,

  dismissAction: {
    description: "See [Link and Dismiss Actions](https://developer.squareup.com/docs/terminal-api/advanced-features/custom-workflows/link-and-dismiss-actions) for more details.",
    method: "post",
    path: "/v2/terminals/actions/{action_id}/dismiss",
    pathParams: [{"name":"action_id","type":"string","description":"Unique ID for the `TerminalAction` associated with the action to be dismissed."}],
    queryParams: [],
    requestType: "DismissTerminalActionRequest",
    isMultipart: false,
    originalName: "DismissTerminalAction",
    isWrite: true
  } as ApiMethodInfo,

  createCheckout: {
    description: "Terminal CreateTerminalCheckout operation",
    method: "post",
    path: "/v2/terminals/checkouts",
    pathParams: [],
    queryParams: [],
    requestType: "CreateTerminalCheckoutRequest",
    isMultipart: false,
    originalName: "CreateTerminalCheckout",
    isWrite: true
  } as ApiMethodInfo,

  searchCheckouts: {
    description: "Only Terminal checkout requests created for the merchant scoped to the OAuth token are returned. Terminal checkout requests are available for 30 days.",
    method: "post",
    path: "/v2/terminals/checkouts/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchTerminalCheckoutsRequest",
    isMultipart: false,
    originalName: "SearchTerminalCheckouts",
    isWrite: false
  } as ApiMethodInfo,

  getCheckout: {
    description: "Terminal checkout requests are available for 30 days.",
    method: "get",
    path: "/v2/terminals/checkouts/{checkout_id}",
    pathParams: [{"name":"checkout_id","type":"string","description":"The unique ID for the desired `TerminalCheckout`."}],
    queryParams: [],
    requestType: "GetTerminalCheckoutRequest",
    isMultipart: false,
    originalName: "GetTerminalCheckout",
    isWrite: false
  } as ApiMethodInfo,

  cancelCheckout: {
    description: "Terminal CancelTerminalCheckout operation",
    method: "post",
    path: "/v2/terminals/checkouts/{checkout_id}/cancel",
    pathParams: [{"name":"checkout_id","type":"string","description":"The unique ID for the desired `TerminalCheckout`."}],
    queryParams: [],
    requestType: "CancelTerminalCheckoutRequest",
    isMultipart: false,
    originalName: "CancelTerminalCheckout",
    isWrite: true
  } as ApiMethodInfo,

  dismissCheckout: {
    description: "Terminal DismissTerminalCheckout operation",
    method: "post",
    path: "/v2/terminals/checkouts/{checkout_id}/dismiss",
    pathParams: [{"name":"checkout_id","type":"string","description":"Unique ID for the `TerminalCheckout` associated with the checkout to be dismissed."}],
    queryParams: [],
    requestType: "DismissTerminalCheckoutRequest",
    isMultipart: false,
    originalName: "DismissTerminalCheckout",
    isWrite: true
  } as ApiMethodInfo,

  createRefund: {
    description: "Refunds for Interac payments on a Square Terminal are supported only for Interac debit cards in Canada. Other refunds for Terminal payments should use the Refunds API. For more information, see [Refunds API](api:Refunds).",
    method: "post",
    path: "/v2/terminals/refunds",
    pathParams: [],
    queryParams: [],
    requestType: "CreateTerminalRefundRequest",
    isMultipart: false,
    originalName: "CreateTerminalRefund",
    isWrite: true
  } as ApiMethodInfo,

  searchRefunds: {
    description: "Terminal refund requests are available for 30 days.",
    method: "post",
    path: "/v2/terminals/refunds/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchTerminalRefundsRequest",
    isMultipart: false,
    originalName: "SearchTerminalRefunds",
    isWrite: false
  } as ApiMethodInfo,

  getRefund: {
    description: "Terminal refund objects are available for 30 days.",
    method: "get",
    path: "/v2/terminals/refunds/{terminal_refund_id}",
    pathParams: [{"name":"terminal_refund_id","type":"string","description":"The unique ID for the desired `TerminalRefund`."}],
    queryParams: [],
    requestType: "GetTerminalRefundRequest",
    isMultipart: false,
    originalName: "GetTerminalRefund",
    isWrite: false
  } as ApiMethodInfo,

  cancelRefund: {
    description: "Terminal CancelTerminalRefund operation",
    method: "post",
    path: "/v2/terminals/refunds/{terminal_refund_id}/cancel",
    pathParams: [{"name":"terminal_refund_id","type":"string","description":"The unique ID for the desired `TerminalRefund`."}],
    queryParams: [],
    requestType: "CancelTerminalRefundRequest",
    isMultipart: false,
    originalName: "CancelTerminalRefund",
    isWrite: true
  } as ApiMethodInfo,

  dismissRefund: {
    description: "Terminal DismissTerminalRefund operation",
    method: "post",
    path: "/v2/terminals/refunds/{terminal_refund_id}/dismiss",
    pathParams: [{"name":"terminal_refund_id","type":"string","description":"Unique ID for the `TerminalRefund` associated with the refund to be dismissed."}],
    queryParams: [],
    requestType: "DismissTerminalRefundRequest",
    isMultipart: false,
    originalName: "DismissTerminalRefund",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const TerminalHandlers = {
  createAction: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.createAction;
    
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

  searchActions: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.searchActions;
    
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

  createCheckout: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.createCheckout;
    
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

  searchCheckouts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.searchCheckouts;
    
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

  createRefund: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.createRefund;
    
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

  searchRefunds: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.searchRefunds;
    
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

  getAction: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.getAction;
    
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

  cancelAction: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.cancelAction;
    
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

  dismissAction: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.dismissAction;
    
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

  getCheckout: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.getCheckout;
    
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

  cancelCheckout: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.cancelCheckout;
    
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

  dismissCheckout: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.dismissCheckout;
    
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

  getRefund: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.getRefund;
    
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

  cancelRefund: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.cancelRefund;
    
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

  dismissRefund: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TerminalMethods.dismissRefund;
    
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