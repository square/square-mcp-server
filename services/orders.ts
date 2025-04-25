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
export const OrdersMethods: { [key: string]: ApiMethodInfo } = {
  create: {
    description: "To pay for a created order, see\n[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).\n\nYou can modify open orders using the [UpdateOrder](api-endpoint:Orders-UpdateOrder) endpoint.",
    method: "post",
    path: "/v2/orders",
    pathParams: [],
    queryParams: [],
    requestType: "CreateOrderRequest",
    isMultipart: false,
    originalName: "CreateOrder",
    isWrite: true
  } as ApiMethodInfo,

  batchGet: {
    description: "If a given order ID does not exist, the ID is ignored instead of generating an error.",
    method: "post",
    path: "/v2/orders/batch-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BatchRetrieveOrdersRequest",
    isMultipart: false,
    originalName: "BatchRetrieveOrders",
    isWrite: false
  } as ApiMethodInfo,

  calculate: {
    description: "Orders CalculateOrder operation",
    method: "post",
    path: "/v2/orders/calculate",
    pathParams: [],
    queryParams: [],
    requestType: "CalculateOrderRequest",
    isMultipart: false,
    originalName: "CalculateOrder",
    isWrite: false
  } as ApiMethodInfo,

  clone: {
    description: "The newly created order has\nonly the core fields (such as line items, taxes, and discounts) copied from the original order.",
    method: "post",
    path: "/v2/orders/clone",
    pathParams: [],
    queryParams: [],
    requestType: "CloneOrderRequest",
    isMultipart: false,
    originalName: "CloneOrder",
    isWrite: true
  } as ApiMethodInfo,

  search: {
    description: "Orders include all sales,\nreturns, and exchanges regardless of how or when they entered the Square\necosystem (such as Point of Sale, Invoices, and Connect APIs).\n\n`SearchOrders` requests need to specify which locations to search and define a\n[SearchOrdersQuery](entity:SearchOrdersQuery) object that controls\nhow to sort or filter the results. Your `SearchOrdersQuery` can:\n\n  Set filter criteria.\n  Set the sort order.\n  Determine whether to return results as complete `Order` objects or as\n[OrderEntry](entity:OrderEntry) objects.\n\nNote that details for orders processed with Square Point of Sale while in\noffline mode might not be transmitted to Square for up to 72 hours. Offline\norders have a `created_at` value that reflects the time the order was created,\nnot the time it was subsequently transmitted to Square.",
    method: "post",
    path: "/v2/orders/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchOrdersRequest",
    isMultipart: false,
    originalName: "SearchOrders",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "Orders RetrieveOrder operation",
    method: "get",
    path: "/v2/orders/{order_id}",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the order to retrieve."}],
    queryParams: [],
    requestType: "RetrieveOrderRequest",
    isMultipart: false,
    originalName: "RetrieveOrder",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "Orders with a `COMPLETED` or `CANCELED` state cannot be updated.\n\nAn `UpdateOrder` request requires the following:\n\n- The `order_id` in the endpoint path, identifying the order to update.\n- The latest `version` of the order to update.\n- The [sparse order](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#sparse-order-objects)\ncontaining only the fields to update and the version to which the update is\nbeing applied.\n- If deleting fields, the [dot notation paths](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#identifying-fields-to-delete)\nidentifying the fields to clear.\n\nTo pay for an order, see\n[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).",
    method: "put",
    path: "/v2/orders/{order_id}",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the order to update."}],
    queryParams: [],
    requestType: "UpdateOrderRequest",
    isMultipart: false,
    originalName: "UpdateOrder",
    isWrite: true
  } as ApiMethodInfo,

  pay: {
    description: "The total of the `payment_ids` listed in the request must be equal to the order\ntotal. Orders with a total amount of `0` can be marked as paid by specifying an empty\narray of `payment_ids` in the request.\n\nTo be used with `PayOrder`, a payment must:\n\n- Reference the order by specifying the `order_id` when [creating the payment](api-endpoint:Payments-CreatePayment).\nAny approved payments that reference the same `order_id` not specified in the\n`payment_ids` is canceled.\n- Be approved with [delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture).\nUsing a delayed capture payment with `PayOrder` completes the approved payment.",
    method: "post",
    path: "/v2/orders/{order_id}/pay",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the order being paid."}],
    queryParams: [],
    requestType: "PayOrderRequest",
    isMultipart: false,
    originalName: "PayOrder",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const OrdersHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrdersMethods.create;
    
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

  batchGet: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrdersMethods.batchGet;
    
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

  calculate: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrdersMethods.calculate;
    
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

  clone: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrdersMethods.clone;
    
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
    const methodInfo = OrdersMethods.search;
    
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
    const methodInfo = OrdersMethods.get;
    
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
    const methodInfo = OrdersMethods.update;
    
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

  pay: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrdersMethods.pay;
    
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