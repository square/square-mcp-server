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
export const MerchantCustomAttributesMethods: { [key: string]: ApiMethodInfo } = {
  listDefinitions: {
    description: "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/merchants/custom-attribute-definitions",
    pathParams: [],
    queryParams: [{"name":"visibility_filter","type":"string","description":"Filters the `CustomAttributeDefinition` results by their `visibility` values."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListMerchantCustomAttributeDefinitionsRequest",
    isMultipart: false,
    originalName: "ListMerchantCustomAttributeDefinitions",
    isWrite: false
  } as ApiMethodInfo,

  createDefinition: {
    description: "Use this endpoint to define a custom attribute that can be associated with a merchant connecting to your application.\nA custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties\nfor a custom attribute. After the definition is created, you can call\n[UpsertMerchantCustomAttribute](api-endpoint:MerchantCustomAttributes-UpsertMerchantCustomAttribute) or\n[BulkUpsertMerchantCustomAttributes](api-endpoint:MerchantCustomAttributes-BulkUpsertMerchantCustomAttributes)\nto set the custom attribute for a merchant.",
    method: "post",
    path: "/v2/merchants/custom-attribute-definitions",
    pathParams: [],
    queryParams: [],
    requestType: "CreateMerchantCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "CreateMerchantCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  deleteDefinition: {
    description: "Deleting a custom attribute definition also deletes the corresponding custom attribute from\nthe merchant.\nOnly the definition owner can delete a custom attribute definition.",
    method: "delete",
    path: "/v2/merchants/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to delete."}],
    queryParams: [],
    requestType: "DeleteMerchantCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "DeleteMerchantCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  getDefinition: {
    description: "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/merchants/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."}],
    queryParams: [{"name":"version","type":"integer","description":"The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveMerchantCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "RetrieveMerchantCustomAttributeDefinition",
    isWrite: false
  } as ApiMethodInfo,

  updateDefinition: {
    description: "Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the\n`schema` for a `Selection` data type.\nOnly the definition owner can update a custom attribute definition.",
    method: "put",
    path: "/v2/merchants/custom-attribute-definitions/{key}",
    pathParams: [{"name":"key","type":"string","description":"The key of the custom attribute definition to update."}],
    queryParams: [],
    requestType: "UpdateMerchantCustomAttributeDefinitionRequest",
    isMultipart: false,
    originalName: "UpdateMerchantCustomAttributeDefinition",
    isWrite: true
  } as ApiMethodInfo,

  bulkDelete: {
    description: "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/merchants/custom-attributes/bulk-delete",
    pathParams: [],
    queryParams: [],
    requestType: "BulkDeleteMerchantCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkDeleteMerchantCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  bulkUpsert: {
    description: "Use this endpoint to set the value of one or more custom attributes for a merchant.\nA custom attribute is based on a custom attribute definition in a Square seller account, which is\ncreated using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.\nThis `BulkUpsertMerchantCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides a merchant ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/merchants/custom-attributes/bulk-upsert",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpsertMerchantCustomAttributesRequest",
    isMultipart: false,
    originalName: "BulkUpsertMerchantCustomAttributes",
    isWrite: true
  } as ApiMethodInfo,

  list: {
    description: "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/merchants/{merchant_id}/custom-attributes",
    pathParams: [{"name":"merchant_id","type":"string","description":"The ID of the target [merchant](entity:Merchant)."}],
    queryParams: [{"name":"visibility_filter","type":"string","description":"Filters the `CustomAttributeDefinition` results by their `visibility` values."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"with_definitions","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."}],
    requestType: "ListMerchantCustomAttributesRequest",
    isMultipart: false,
    originalName: "ListMerchantCustomAttributes",
    isWrite: false
  } as ApiMethodInfo,

  delete: {
    description: "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
    method: "delete",
    path: "/v2/merchants/{merchant_id}/custom-attributes/{key}",
    pathParams: [{"name":"merchant_id","type":"string","description":"The ID of the target [merchant](entity:Merchant)."},{"name":"key","type":"string","description":"The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "DeleteMerchantCustomAttributeRequest",
    isMultipart: false,
    originalName: "DeleteMerchantCustomAttribute",
    isWrite: true
  } as ApiMethodInfo,

  get: {
    description: "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
    method: "get",
    path: "/v2/merchants/{merchant_id}/custom-attributes/{key}",
    pathParams: [{"name":"merchant_id","type":"string","description":"The ID of the target [merchant](entity:Merchant)."},{"name":"key","type":"string","description":"The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."}],
    queryParams: [{"name":"with_definition","type":"boolean","description":"Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."},{"name":"version","type":"integer","description":"The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."}],
    requestType: "RetrieveMerchantCustomAttributeRequest",
    isMultipart: false,
    originalName: "RetrieveMerchantCustomAttribute",
    isWrite: false
  } as ApiMethodInfo,

  upsert: {
    description: "Use this endpoint to set the value of a custom attribute for a specified merchant.\nA custom attribute is based on a custom attribute definition in a Square seller account, which\nis created using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
    method: "post",
    path: "/v2/merchants/{merchant_id}/custom-attributes/{key}",
    pathParams: [{"name":"merchant_id","type":"string","description":"The ID of the target [merchant](entity:Merchant)."},{"name":"key","type":"string","description":"The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."}],
    queryParams: [],
    requestType: "UpsertMerchantCustomAttributeRequest",
    isMultipart: false,
    originalName: "UpsertMerchantCustomAttribute",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const MerchantCustomAttributesHandlers = {
  createDefinition: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = MerchantCustomAttributesMethods.createDefinition;
    
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
    const methodInfo = MerchantCustomAttributesMethods.bulkDelete;
    
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
    const methodInfo = MerchantCustomAttributesMethods.bulkUpsert;
    
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
    const methodInfo = MerchantCustomAttributesMethods.deleteDefinition;
    
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
    const methodInfo = MerchantCustomAttributesMethods.updateDefinition;
    
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
    const methodInfo = MerchantCustomAttributesMethods.delete;
    
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
    const methodInfo = MerchantCustomAttributesMethods.upsert;
    
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
    const methodInfo = MerchantCustomAttributesMethods.listDefinitions;
    
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
    const methodInfo = MerchantCustomAttributesMethods.getDefinition;
    
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
    const methodInfo = MerchantCustomAttributesMethods.list;
    
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
    const methodInfo = MerchantCustomAttributesMethods.get;
    
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