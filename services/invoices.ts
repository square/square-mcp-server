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
export const InvoicesMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "The response \nis paginated. If truncated, the response includes a `cursor` that you    \nuse in a subsequent request to retrieve the next set of invoices.",
    method: "get",
    path: "/v2/invoices",
    pathParams: [],
    queryParams: [{"name":"location_id","type":"string","description":"The ID of the location for which to list invoices."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint. \nProvide this cursor to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"limit","type":"integer","description":"The maximum number of invoices to return (200 is the maximum `limit`). \nIf not provided, the server uses a default limit of 100 invoices."}],
    requestType: "ListInvoicesRequest",
    isMultipart: false,
    originalName: "ListInvoices",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "A draft invoice remains in your account and no action is taken. \nYou must publish the invoice before Square can process it (send it to the customer's email address or charge the customer’s card on file).",
    method: "post",
    path: "/v2/invoices",
    pathParams: [],
    queryParams: [],
    requestType: "CreateInvoiceRequest",
    isMultipart: false,
    originalName: "CreateInvoice",
    isWrite: true
  } as ApiMethodInfo,

  search: {
    description: "You can optionally specify customers in the filter for whom to \nretrieve invoices. In the current implementation, you can only specify one location and \noptionally one customer.\n\nThe response is paginated. If truncated, the response includes a `cursor` \nthat you use in a subsequent request to retrieve the next set of invoices.",
    method: "post",
    path: "/v2/invoices/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchInvoicesRequest",
    isMultipart: false,
    originalName: "SearchInvoices",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "When an invoice is deleted, the \nassociated order status changes to CANCELED. You can only delete a draft \ninvoice (you cannot delete a published invoice, including one that is scheduled for processing).",
    method: "delete",
    path: "/v2/invoices/{invoice_id}",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the invoice to delete."}],
    queryParams: [{"name":"version","type":"integer","description":"The version of the [invoice](entity:Invoice) to delete.\nIf you do not know the version, you can call [GetInvoice](api-endpoint:Invoices-GetInvoice) or \n[ListInvoices](api-endpoint:Invoices-ListInvoices)."}],
    requestType: "DeleteInvoiceRequest",
    isMultipart: false,
    originalName: "DeleteInvoice",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "Invoices GetInvoice operation",
    method: "get",
    path: "/v2/invoices/{invoice_id}",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the invoice to retrieve."}],
    queryParams: [],
    requestType: "GetInvoiceRequest",
    isMultipart: false,
    originalName: "GetInvoice",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "This endpoint supports sparse updates, so you only need\nto specify the fields you want to change along with the required `version` field.\nSome restrictions apply to updating invoices. For example, you cannot change the\n`order_id` or `location_id` field.",
    method: "put",
    path: "/v2/invoices/{invoice_id}",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the invoice to update."}],
    queryParams: [],
    requestType: "UpdateInvoiceRequest",
    isMultipart: false,
    originalName: "UpdateInvoice",
    isWrite: true
  } as ApiMethodInfo,

  createAttachment: {
    description: "This endpoint accepts HTTP multipart/form-data file uploads\nwith a JSON `request` part and a `file` part. The `file` part must be a `readable stream` that contains a file\nin a supported format: GIF, JPEG, PNG, TIFF, BMP, or PDF.\n\nInvoices can have up to 10 attachments with a total file size of 25 MB. Attachments can be added only to invoices\nin the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.",
    method: "post",
    path: "/v2/invoices/{invoice_id}/attachments",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the [invoice](entity:Invoice) to attach the file to."}],
    queryParams: [],
    requestType: "CreateInvoiceAttachmentRequest",
    isMultipart: false,
    originalName: "CreateInvoiceAttachment",
    isWrite: true
  } as ApiMethodInfo,

  deleteAttachment: {
    description: "Attachments can be removed only\nfrom invoices in the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.",
    method: "delete",
    path: "/v2/invoices/{invoice_id}/attachments/{attachment_id}",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the [invoice](entity:Invoice) to delete the attachment from."},{"name":"attachment_id","type":"string","description":"The ID of the [attachment](entity:InvoiceAttachment) to delete."}],
    queryParams: [],
    requestType: "DeleteInvoiceAttachmentRequest",
    isMultipart: false,
    originalName: "DeleteInvoiceAttachment",
    isWrite: true
  } as ApiMethodInfo,

  cancel: {
    description: "The seller cannot collect payments for \nthe canceled invoice.\n\nYou cannot cancel an invoice in the `DRAFT` state or in a terminal state: `PAID`, `REFUNDED`, `CANCELED`, or `FAILED`.",
    method: "post",
    path: "/v2/invoices/{invoice_id}/cancel",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the [invoice](entity:Invoice) to cancel."}],
    queryParams: [],
    requestType: "CancelInvoiceRequest",
    isMultipart: false,
    originalName: "CancelInvoice",
    isWrite: true
  } as ApiMethodInfo,

  publish: {
    description: "After an invoice is published, Square \nfollows up based on the invoice configuration. For example, Square \nsends the invoice to the customer's email address, charges the customer's card on file, or does \nnothing. Square also makes the invoice available on a Square-hosted invoice page. \n\nThe invoice `status` also changes from `DRAFT` to a status \nbased on the invoice configuration. For example, the status changes to `UNPAID` if \nSquare emails the invoice or `PARTIALLY_PAID` if Square charges a card on file for a portion of the \ninvoice amount.\n\nIn addition to the required `ORDERS_WRITE` and `INVOICES_WRITE` permissions, `CUSTOMERS_READ`\nand `PAYMENTS_WRITE` are required when publishing invoices configured for card-on-file payments.",
    method: "post",
    path: "/v2/invoices/{invoice_id}/publish",
    pathParams: [{"name":"invoice_id","type":"string","description":"The ID of the invoice to publish."}],
    queryParams: [],
    requestType: "PublishInvoiceRequest",
    isMultipart: false,
    originalName: "PublishInvoice",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const InvoicesHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = InvoicesMethods.create;
    
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
    const methodInfo = InvoicesMethods.search;
    
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
    const methodInfo = InvoicesMethods.get;
    
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
    const methodInfo = InvoicesMethods.update;
    
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

  createAttachment: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = InvoicesMethods.createAttachment;
    
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

  deleteAttachment: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = InvoicesMethods.deleteAttachment;
    
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
    const methodInfo = InvoicesMethods.cancel;
    
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

  publish: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = InvoicesMethods.publish;
    
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
    const methodInfo = InvoicesMethods.list;
    
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

  delete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = InvoicesMethods.delete;
    
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