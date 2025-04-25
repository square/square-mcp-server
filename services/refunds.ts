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
export const RefundsMethods: { [key: string]: ApiMethodInfo } = {
  listPayment: {
    description: "Results are eventually consistent, and new refunds or changes to refunds might take several\nseconds to appear.\n\nThe maximum results per page is 100.",
    method: "get",
    path: "/v2/refunds",
    pathParams: [],
    queryParams: [{"name":"begin_time","type":"string","description":"Indicates the start of the time range to retrieve each `PaymentRefund` for, in RFC 3339 \nformat.  The range is determined using the `created_at` field for each `PaymentRefund`. \n\nDefault: The current time minus one year."},{"name":"end_time","type":"string","description":"Indicates the end of the time range to retrieve each `PaymentRefund` for, in RFC 3339 \nformat.  The range is determined using the `created_at` field for each `PaymentRefund`.\n\nDefault: The current time."},{"name":"sort_order","type":"string","description":"The order in which results are listed by `PaymentRefund.created_at`:\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"location_id","type":"string","description":"Limit results to the location supplied. By default, results are returned\nfor all locations associated with the seller."},{"name":"status","type":"string","description":"If provided, only refunds with the given status are returned.\nFor a list of refund status values, see [PaymentRefund](entity:PaymentRefund).\n\nDefault: If omitted, refunds are returned regardless of their status."},{"name":"source_type","type":"string","description":"If provided, only returns refunds whose payments have the indicated source type.\nCurrent values include `CARD`, `BANK_ACCOUNT`, `WALLET`, `CASH`, and `EXTERNAL`.\nFor information about these payment source types, see\n[Take Payments](https://developer.squareup.com/docs/payments-api/take-payments).\n\nDefault: If omitted, refunds are returned regardless of the source type."},{"name":"limit","type":"integer","description":"The maximum number of results to be returned in a single page.\n\nIt is possible to receive fewer results than the specified limit on a given page.\n\nIf the supplied value is greater than 100, no more than 100 results are returned.\n\nDefault: 100"},{"name":"updated_at_begin_time","type":"string","description":"Indicates the start of the time range to retrieve each `PaymentRefund` for, in RFC 3339\nformat.  The range is determined using the `updated_at` field for each `PaymentRefund`.\n\nDefault: If omitted, the time range starts at `begin_time`."},{"name":"updated_at_end_time","type":"string","description":"Indicates the end of the time range to retrieve each `PaymentRefund` for, in RFC 3339\nformat.  The range is determined using the `updated_at` field for each `PaymentRefund`.\n\nDefault: The current time."},{"name":"sort_field","type":"string","description":"The field used to sort results by. The default is `CREATED_AT`."}],
    requestType: "ListPaymentRefundsRequest",
    isMultipart: false,
    originalName: "ListPaymentRefunds",
    isWrite: false
  } as ApiMethodInfo,

  payment: {
    description: "You can refund the entire payment amount or a\nportion of it. You can use this endpoint to refund a card payment or record a \nrefund of a cash or external payment. For more information, see\n[Refund Payment](https://developer.squareup.com/docs/payments-api/refund-payments).",
    method: "post",
    path: "/v2/refunds",
    pathParams: [],
    queryParams: [],
    requestType: "RefundPaymentRequest",
    isMultipart: false,
    originalName: "RefundPayment",
    isWrite: false
  } as ApiMethodInfo,

  getPayment: {
    description: "Refunds GetPaymentRefund operation",
    method: "get",
    path: "/v2/refunds/{refund_id}",
    pathParams: [{"name":"refund_id","type":"string","description":"The unique ID for the desired `PaymentRefund`."}],
    queryParams: [],
    requestType: "GetPaymentRefundRequest",
    isMultipart: false,
    originalName: "GetPaymentRefund",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const RefundsHandlers = {
  payment: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = RefundsMethods.payment;
    
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

  getPayment: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = RefundsMethods.getPayment;
    
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

  listPayment: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = RefundsMethods.listPayment;
    
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