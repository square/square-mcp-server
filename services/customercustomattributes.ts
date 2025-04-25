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
export const CustomerCustomAttributesMethods: { [key: string]: ApiMethodInfo } = {
  listDefinitions: {
    description: "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that\nseller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/customers/custom-attribute-definitions",
    pathParams: [],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListCustomerCustomAttributeDefinitionsRequest",
    isMultipart: false,
    originalName: "ListCustomerCustomAttributeDefinitions",
    isWrite: false
  } as ApiMethodInfo,

  createDefinition: {
    description: "Use this endpoint to define a custom attribute that can be associated with customer profiles.\n\nA custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties\nfor a custom attribute. After the definition is created, you can call\n[UpsertCustomerCustomAttribute](api-endpoint:CustomerCustomAttributes-UpsertCustomerCustomAttribute) or\n[BulkUpsertCustomerCustomAttributes](api-endpoint:CustomerCustomAttributes-BulkUpsertCustomerCustomAttributes)\nto set the custom attribute for customer profiles in the seller's Customer Directory.\n\nSellers can view all custom attributes in exported customer data, including those set to\n`VISIBILITY_HIDDEN`.",
    method: "post",
    path: "/v2/customers/custom-attribute-definitions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateCustomerCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "CreateCustomerCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  deleteDefinition: {
    description: "Deleting a custom attribute definition also deletes the corresponding custom attribute from\nall customer profiles in the seller's Customer Directory.\n\nOnly the definition owner can delete a custom attribute definition.",
    method: "delete",
    path: "/v2/customers/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to delete."}],
    queryParams: [],
    requestType: "DeleteCustomerCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "DeleteCustomerCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  getDefinition: {
    description: "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/customers/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."}],
    queryParams: [{"name":"version","type":"integer","description":"The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveCustomerCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "RetrieveCustomerCustomAttributeDefinition",
    isWrite: false
  } as ApiMethodInfo,

  updateDefinition: {
    description: "Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the\n`schema` for a `Selection` data type.\n\nOnly the definition owner can update a custom attribute definition. Note that sellers can view\nall custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.",
    method: "put",
    path: "/v2/customers/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to update."}],
    queryParams: [],
    requestType: "UpdateCustomerCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "UpdateCustomerCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  bulkUpsert: {
    description: "Use this endpoint to set the value of one or more custom attributes for one or more customer profiles.\nA custom attribute is based on a custom attribute definition in a Square seller account, which is\ncreated using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.\n\nThis `BulkUpsertCustomerCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides a customer ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/customers/custom-attributes/bulk-upsert",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpsertCustomerCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkUpsertCustomerCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  list: {
    description: "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\n\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/customers/{customer_id}/custom-attributes",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the target [customer profile](entity:Customer)."}],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"with_definitions","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."}],
    requestType: "ListCustomerCustomAttributesRequest",
    isMultipart: false,
    originalName: "ListCustomerCustomAttributes",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "delete",
    path: "/v2/customers/{customer_id}/custom-attributes/{key}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the target [customer profile](entity:Customer)."},{"name":"key","type":"string","description":"The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "DeleteCustomerCustomAttributeRequest",
    isMultipart: false,
    originalName: "DeleteCustomerCustomAttribute",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\n\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/customers/{customer_id}/custom-attributes/{key}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the target [customer profile](entity:Customer)."},{"name":"key","type":"string","description":"The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [{"name":"with_definition","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."},{"name":"version","type":"integer","description":"The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveCustomerCustomAttributeRequest",
    isMultipart: false,
    originalName: "RetrieveCustomerCustomAttribute",
    isWrite: false
  } as ApiMethodInfo,

  upsert: {
    description: "Use this endpoint to set the value of a custom attribute for a specified customer profile.\nA custom attribute is based on a custom attribute definition in a Square seller account, which\nis created using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/customers/{customer_id}/custom-attributes/{key}",
    pathParams: [{"name":"customer_id","type":"string","description":"The ID of the target [customer profile](entity:Customer)."},{"name":"key","type":"string","description":"The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "UpsertCustomerCustomAttributeRequest",
    isMultipart: false,
    originalName: "UpsertCustomerCustomAttribute",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CustomerCustomAttributesHandlers = {
  createDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CustomerCustomAttributesMethods.createDefinition;
    
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
    const methodInfo = CustomerCustomAttributesMethods.bulkUpsert;
    
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
    const methodInfo = CustomerCustomAttributesMethods.deleteDefinition;
    
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
    const methodInfo = CustomerCustomAttributesMethods.updateDefinition;
    
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
    const methodInfo = CustomerCustomAttributesMethods.delete;
    
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
    const methodInfo = CustomerCustomAttributesMethods.upsert;
    
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
    const methodInfo = CustomerCustomAttributesMethods.listDefinitions;
    
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
    const methodInfo = CustomerCustomAttributesMethods.getDefinition;
    
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
    const methodInfo = CustomerCustomAttributesMethods.list;
    
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
    const methodInfo = CustomerCustomAttributesMethods.get;
    
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