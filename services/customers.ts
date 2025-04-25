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
export const CustomersMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "Under normal operating conditions, newly created or updated customer profiles become available\nfor the listing operation in well under 30 seconds. Occasionally, propagation of the new or updated\nprofiles can take closer to one minute or longer, especially during network incidents and outages.",
    method: "get",
    path: "/v2/customers",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single page. This limit is advisory. The response might contain more or fewer results.\nIf the specified limit is less than 1 or greater than 100, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The default value is 100.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"sort_field","type":"string","description":"Indicates how customers should be sorted.\n\nThe default value is `DEFAULT`."},{"name":"sort_order","type":"string","description":"Indicates whether customers should be sorted in ascending (`ASC`) or\ndescending (`DESC`) order.\n\nThe default value is `ASC`."},{"name":"count","type":"boolean","description":"Indicates whether to return the total count of customers in the `count` field of the response.\n\nThe default value is `false`."}],
    requestType: "ListCustomersRequest",
    isMultipart: false,
    originalName: "ListCustomers",
    isWrite: false
  } as ApiMethodInfo,

  create: {
    description: "You must provide at least one of the following values in your request to this\nendpoint:\n\n- `given_name`\n- `family_name`\n- `company_name`\n- `email_address`\n- `phone_number`",
    method: "post",
    path: "/v2/customers",
    pathParams: [],
    queryParams: [],
    requestType: "CreateCustomerRequest",
    isMultipart: false,
    originalName: "CreateCustomer",
    isWrite: true
  } as ApiMethodInfo,

  bulkCreate: {
    description: "This endpoint takes a map of individual create requests and returns a map of responses.\n\nYou must provide at least one of the following values in each create request:\n\n- `given_name`\n- `family_name`\n- `company_name`\n- `email_address`\n- `phone_number`",
    method: "post",
    path: "/v2/customers/bulk-create",
    pathParams: [],
    queryParams: [],
    requestType: "BulkCreateCustomersRequest",
    isMultipart: false,
    originalName: "BulkCreateCustomers",
    isWrite: true
  } as ApiMethodInfo,

  bulkDelete: {
    description: "The endpoint takes a list of customer IDs and returns a map of responses.",
    method: "post",
    path: "/v2/customers/bulk-delete",
    pathParams: [],
    queryParams: [],
    requestType: "BulkDeleteCustomersRequest",
    isMultipart: false,
    originalName: "BulkDeleteCustomers",
    isWrite: true
  } as ApiMethodInfo,

  bulkGet: {
    description: "This endpoint takes a list of customer IDs and returns a map of responses.",
    method: "post",
    path: "/v2/customers/bulk-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BulkRetrieveCustomersRequest",
    isMultipart: false,
    originalName: "BulkRetrieveCustomers",
    isWrite: false
  } as ApiMethodInfo,

  bulkUpdate: {
    description: "This endpoint takes a map of individual update requests and returns a map of responses.",
    method: "post",
    path: "/v2/customers/bulk-update",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpdateCustomersRequest",
    isMultipart: false,
    originalName: "BulkUpdateCustomers",
    isWrite: true
  } as ApiMethodInfo,

  search: {
    description: "Calling `SearchCustomers` without any explicit query filter returns all\ncustomer profiles ordered alphabetically based on `given_name` and\n`family_name`.\n\nUnder normal operating conditions, newly created or updated customer profiles become available\nfor the search operation in well under 30 seconds. Occasionally, propagation of the new or updated\nprofiles can take closer to one minute or longer, especially during network incidents and outages.",
    method: "post",
    path: "/v2/customers/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchCustomersRequest",
    isMultipart: false,
    originalName: "SearchCustomers",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "To delete a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.",
    method: "delete",
    path: "/v2/customers/{customer_id}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the customer to delete."}],
    queryParams: [{"name":"version","type":"integer","description":"The current version of the customer profile.\n\nAs a best practice, you should include this parameter to enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency) control.  For more information, see [Delete a customer profile](https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#delete-customer-profile)."}],
    requestType: "DeleteCustomerRequest",
    isMultipart: false,
    originalName: "DeleteCustomer",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "Customers RetrieveCustomer operation",
    method: "get",
    path: "/v2/customers/{customer_id}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the customer to retrieve."}],
    queryParams: [],
    requestType: "RetrieveCustomerRequest",
    isMultipart: false,
    originalName: "RetrieveCustomer",
    isWrite: false
  } as ApiMethodInfo,

  update: {
    description: "This endpoint supports sparse updates, so only new or changed fields are required in the request.\nTo add or update a field, specify the new value. To remove a field, specify `null`.\n\nTo update a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.",
    method: "put",
    path: "/v2/customers/{customer_id}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the customer to update."}],
    queryParams: [],
    requestType: "UpdateCustomerRequest",
    isMultipart: false,
    originalName: "UpdateCustomer",
    isWrite: true
  } as ApiMethodInfo,

  removeGroupFrom: {
    description: "The customer is identified by the `customer_id` value\nand the customer group is identified by the `group_id` value.",
    method: "delete",
    path: "/v2/customers/{customer_id}/groups/{group_id}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the customer to remove from the group."},{"name":"group_id","type":"string","description":"The ID of the customer group to remove the customer from."}],
    queryParams: [],
    requestType: "RemoveGroupFromCustomerRequest",
    isMultipart: false,
    originalName: "RemoveGroupFromCustomer",
    isWrite: false
  } as ApiMethodInfo,

  addGroupTo: {
    description: "The customer is identified by the `customer_id` value\nand the customer group is identified by the `group_id` value.",
    method: "put",
    path: "/v2/customers/{customer_id}/groups/{group_id}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the customer to add to a group."},{"name":"group_id","type":"string","description":"The ID of the customer group to add the customer to."}],
    queryParams: [],
    requestType: "AddGroupToCustomerRequest",
    isMultipart: false,
    originalName: "AddGroupToCustomer",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CustomersHandlers = {
  create: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomersMethods.create;
    
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

  bulkCreate: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomersMethods.bulkCreate;
    
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

  bulkDelete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomersMethods.bulkDelete;
    
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
    const methodInfo = CustomersMethods.bulkGet;
    
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
    const methodInfo = CustomersMethods.bulkUpdate;
    
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
    const methodInfo = CustomersMethods.search;
    
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
    const methodInfo = CustomersMethods.get;
    
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
    const methodInfo = CustomersMethods.update;
    
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

  removeGroupFrom: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomersMethods.removeGroupFrom;
    
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

  addGroupTo: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomersMethods.addGroupTo;
    
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
    const methodInfo = CustomersMethods.list;
    
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
    const methodInfo = CustomersMethods.delete;
    
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