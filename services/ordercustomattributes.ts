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
export const OrderCustomAttributesMethods: { [key: string]: ApiMethodInfo } = {
  listDefinitions: {
    description: "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that\nseller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/orders/custom-attribute-definitions",
    pathParams: [],
    queryParams: [{"name":"visibility_filter","type":"string","description":"Requests that all of the custom attributes be returned, or only those that are read-only or read-write."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint. \nProvide this cursor to retrieve the next page of results for your original request. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory. \nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100. \nThe default value is 20.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."}],
    requestType: "ListOrderCustomAttributeDefinitionsRequest",
    isMultipart: false,
    originalName: "ListOrderCustomAttributeDefinitions",
    isWrite: false
  } as ApiMethodInfo,

  createDefinition: {
    description: "Use this endpoint to\ndefine a custom attribute that can be associated with orders.\n\nAfter creating a custom attribute definition, you can set the custom attribute for orders\nin the Square seller account.",
    method: "post",
    path: "/v2/orders/custom-attribute-definitions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateOrderCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "CreateOrderCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  deleteDefinition: {
    description: "Only the definition owner can delete a custom attribute definition.",
    method: "delete",
    path: "/v2/orders/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to delete."}],
    queryParams: [],
    requestType: "DeleteOrderCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "DeleteOrderCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  getDefinition: {
    description: "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/orders/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to retrieve."}],
    queryParams: [{"name":"version","type":"integer","description":"To enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency)\ncontrol, include this optional field and specify the current version of the custom attribute."}],
    requestType: "RetrieveOrderCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "RetrieveOrderCustomAttributeDefinition",
    isWrite: false
  } as ApiMethodInfo,

  updateDefinition: {
    description: "Only the definition owner can update a custom attribute definition. Note that sellers can view all custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.",
    method: "put",
    path: "/v2/orders/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to update."}],
    queryParams: [],
    requestType: "UpdateOrderCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "UpdateOrderCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  bulkDelete: {
    description: "Use this endpoint to delete one or more custom attributes from one or more orders.\nA custom attribute is based on a custom attribute definition in a Square seller account.  (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nThis `BulkDeleteOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual delete\nrequests and returns a map of individual delete responses. Each delete request has a unique ID\nand provides an order ID and custom attribute. Each delete response is returned with the ID\nof the corresponding request.\n\nTo delete a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/orders/custom-attributes/bulk-delete",
    pathParams: [],
    queryParams: [],
    requestType: "BulkDeleteOrderCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkDeleteOrderCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  bulkUpsert: {
    description: "Use this endpoint to delete one or more custom attributes from one or more orders.\nA custom attribute is based on a custom attribute definition in a Square seller account.  (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nThis `BulkUpsertOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides an order ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/orders/custom-attributes/bulk-upsert",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpsertOrderCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkUpsertOrderCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  list: {
    description: "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\n\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/orders/{order_id}/custom-attributes",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the target [order](entity:Order)."}],
    queryParams: [{"name":"visibility_filter","type":"string","description":"Requests that all of the custom attributes be returned, or only those that are read-only or read-write."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint. \nProvide this cursor to retrieve the next page of results for your original request. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory. \nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100. \nThe default value is 20.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"with_definitions","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom attribute, \ninformation about the data type, or other definition details. The default value is `false`."}],
    requestType: "ListOrderCustomAttributesRequest",
    isMultipart: false,
    originalName: "ListOrderCustomAttributes",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "delete",
    path: "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the target [order](entity:Order)."},{"name":"custom_attribute_key","type":"string","description":"The key of the custom attribute to delete.  This key must match the key of an\nexisting custom attribute definition."}],
    queryParams: [],
    requestType: "DeleteOrderCustomAttributeRequest",
    isMultipart: false,
    originalName: "DeleteOrderCustomAttribute",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\n\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\nalso known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the target [order](entity:Order)."},{"name":"custom_attribute_key","type":"string","description":"The key of the custom attribute to retrieve.  This key must match the key of an\nexisting custom attribute definition."}],
    queryParams: [{"name":"version","type":"integer","description":"To enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency)\ncontrol, include this optional field and specify the current version of the custom attribute."},{"name":"with_definition","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each \ncustom attribute. Set this parameter to `true` to get the name and description of each custom attribute, \ninformation about the data type, or other definition details. The default value is `false`."}],
    requestType: "RetrieveOrderCustomAttributeRequest",
    isMultipart: false,
    originalName: "RetrieveOrderCustomAttribute",
    isWrite: false
  } as ApiMethodInfo,

  upsert: {
    description: "Use this endpoint to set the value of a custom attribute for a specific order.\nA custom attribute is based on a custom attribute definition in a Square seller account. (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
    pathParams: [{"name":"order_id","type":"string","description":"The ID of the target [order](entity:Order)."},{"name":"custom_attribute_key","type":"string","description":"The key of the custom attribute to create or update.  This key must match the key \nof an existing custom attribute definition."}],
    queryParams: [],
    requestType: "UpsertOrderCustomAttributeRequest",
    isMultipart: false,
    originalName: "UpsertOrderCustomAttribute",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const OrderCustomAttributesHandlers = {
  createDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.createDefinition;
    
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
    const methodInfo = OrderCustomAttributesMethods.bulkDelete;
    
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

  bulkUpsert: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.bulkUpsert;
    
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

  deleteDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.deleteDefinition;
    
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

  updateDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.updateDefinition;
    
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

  delete: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.delete;
    
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

  upsert: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.upsert;
    
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

  listDefinitions: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.listDefinitions;
    
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

  getDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.getDefinition;
    
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

  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.list;
    
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

  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OrderCustomAttributesMethods.get;
    
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