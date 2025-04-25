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
export const PaymentsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "Results are eventually consistent, and new payments or changes to payments might take several\nseconds to appear.\n\nThe maximum results per page is 100.",
    method: "get",
    path: "/v2/payments",
    pathParams: [],
    queryParams: [{"name":"begin_time","type":"string","description":"Indicates the start of the time range to retrieve payments for, in RFC 3339 format.  \nThe range is determined using the `created_at` field for each Payment.\nInclusive. Default: The current time minus one year."},{"name":"end_time","type":"string","description":"Indicates the end of the time range to retrieve payments for, in RFC 3339 format.  The \nrange is determined using the `created_at` field for each Payment.\n\nDefault: The current time."},{"name":"sort_order","type":"string","description":"The order in which results are listed by `ListPaymentsRequest.sort_field`:\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"location_id","type":"string","description":"Limit results to the location supplied. By default, results are returned\nfor the default (main) location associated with the seller."},{"name":"total","type":"integer","description":"The exact amount in the `total_money` for a payment."},{"name":"last_4","type":"string","description":"The last four digits of a payment card."},{"name":"card_brand","type":"string","description":"The brand of the payment card (for example, VISA)."},{"name":"limit","type":"integer","description":"The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\n\nThe default value of 100 is also the maximum allowed value. If the provided value is \ngreater than 100, it is ignored and the default value is used instead.\n\nDefault: `100`"},{"name":"is_offline_payment","type":"boolean","description":"Whether the payment was taken offline or not."},{"name":"offline_begin_time","type":"string","description":"Indicates the start of the time range for which to retrieve offline payments, in RFC 3339\nformat for timestamps. The range is determined using the\n`offline_payment_details.client_created_at` field for each Payment. If set, payments without a\nvalue set in `offline_payment_details.client_created_at` will not be returned.\n\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"offline_end_time","type":"string","description":"Indicates the end of the time range for which to retrieve offline payments, in RFC 3339\nformat for timestamps. The range is determined using the\n`offline_payment_details.client_created_at` field for each Payment. If set, payments without a\nvalue set in `offline_payment_details.client_created_at` will not be returned.\n\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"updated_at_begin_time","type":"string","description":"Indicates the start of the time range to retrieve payments for, in RFC 3339 format.  The\nrange is determined using the `updated_at` field for each Payment."},{"name":"updated_at_end_time","type":"string","description":"Indicates the end of the time range to retrieve payments for, in RFC 3339 format.  The\nrange is determined using the `updated_at` field for each Payment."},{"name":"sort_field","type":"string","description":"The field used to sort results by. The default is `CREATED_AT`."}],
    requestType: "ListPaymentsRequest",
    isMultipart: false,
    originalName: "ListPayments",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "You can use this endpoint \nto charge a card (credit/debit card or    \nSquare gift card) or record a payment that the seller received outside of Square \n(cash payment from a buyer or a payment that an external entity \nprocessed on behalf of the seller).\n\nThe endpoint creates a \n`Payment` object and returns it in the response.",
    method: "post",
    path: "/v2/payments",
    pathParams: [],
    queryParams: [],
    requestType: "CreatePaymentRequest",
    isMultipart: false,
    originalName: "CreatePayment",
    isWrite: true
  } as ApiMethodInfo,

  cancelByIdempotencyKey: {
    description: "Use this method when the status of a `CreatePayment` request is unknown (for example, after you send a\n`CreatePayment` request, a network error occurs and you do not get a response). In this case, you can\ndirect Square to cancel the payment using this endpoint. In the request, you provide the same\nidempotency key that you provided in your `CreatePayment` request that you want to cancel. After\ncanceling the payment, you can submit your `CreatePayment` request again.\n\nNote that if no payment with the specified idempotency key is found, no action is taken and the endpoint\nreturns successfully.",
    method: "post",
    path: "/v2/payments/cancel",
    pathParams: [],
    queryParams: [],
    requestType: "CancelPaymentByIdempotencyKeyRequest",
    isMultipart: false,
    originalName: "CancelPaymentByIdempotencyKey",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "Payments GetPayment operation",
    method: "get",
    path: "/v2/payments/{payment_id}",
    pathParams: [{"name":"payment_id","type":"string","description":"A unique ID for the desired payment."}],
    queryParams: [],
    requestType: "GetPaymentRequest",
    isMultipart: false,
    originalName: "GetPayment",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "You can update the `amount_money` and `tip_money` using this endpoint.",
    method: "put",
    path: "/v2/payments/{payment_id}",
    pathParams: [{"name":"payment_id","type":"string","description":"The ID of the payment to update."}],
    queryParams: [],
    requestType: "UpdatePaymentRequest",
    isMultipart: false,
    originalName: "UpdatePayment",
    isWrite: true
  } as ApiMethodInfo,

  cancel: {
    description: "You can use this endpoint to cancel a payment with \nthe APPROVED `status`.",
    method: "post",
    path: "/v2/payments/{payment_id}/cancel",
    pathParams: [{"name":"payment_id","type":"string","description":"The ID of the payment to cancel."}],
    queryParams: [],
    requestType: "CancelPaymentRequest",
    isMultipart: false,
    originalName: "CancelPayment",
    isWrite: true
  } as ApiMethodInfo,

  complete: {
    description: "By default, payments are set to complete immediately after they are created.\n\nYou can use this endpoint to complete a payment with the APPROVED `status`.",
    method: "post",
    path: "/v2/payments/{payment_id}/complete",
    pathParams: [{"name":"payment_id","type":"string","description":"The unique ID identifying the payment to be completed."}],
    queryParams: [],
    requestType: "CompletePaymentRequest",
    isMultipart: false,
    originalName: "CompletePayment",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const PaymentsHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = PaymentsMethods.create;
    
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

  cancelByIdempotencyKey: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = PaymentsMethods.cancelByIdempotencyKey;
    
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
    const methodInfo = PaymentsMethods.get;
    
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
    const methodInfo = PaymentsMethods.update;
    
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
    const methodInfo = PaymentsMethods.cancel;
    
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

  complete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = PaymentsMethods.complete;
    
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
    const methodInfo = PaymentsMethods.list;
    
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