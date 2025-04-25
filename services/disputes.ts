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
export const DisputesMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "Disputes ListDisputes operation",
    method: "get",
    path: "/v2/disputes",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"states","type":"string","description":"The dispute states used to filter the result. If not specified, the endpoint returns all disputes."},{"name":"location_id","type":"string","description":"The ID of the location for which to return a list of disputes.\nIf not specified, the endpoint returns disputes associated with all locations."}],
    requestType: "ListDisputesRequest",
    isMultipart: false,
    originalName: "ListDisputes",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "Disputes RetrieveDispute operation",
    method: "get",
    path: "/v2/disputes/{dispute_id}",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute you want more details about."}],
    queryParams: [],
    requestType: "RetrieveDisputeRequest",
    isMultipart: false,
    originalName: "RetrieveDispute",
    isWrite: false
  } as ApiMethodInfo,

  accept: {
    description: "Square returns the disputed amount to the cardholder and\nupdates the dispute state to ACCEPTED.\n\nSquare debits the disputed amount from the seller’s Square account. If the Square account\ndoes not have sufficient funds, Square debits the associated bank account.",
    method: "post",
    path: "/v2/disputes/{dispute_id}/accept",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute you want to accept."}],
    queryParams: [],
    requestType: "AcceptDisputeRequest",
    isMultipart: false,
    originalName: "AcceptDispute",
    isWrite: true
  } as ApiMethodInfo,

  listEvidence: {
    description: "Disputes ListDisputeEvidence operation",
    method: "get",
    path: "/v2/disputes/{dispute_id}/evidence",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute."}],
    queryParams: [{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListDisputeEvidenceRequest",
    isMultipart: false,
    originalName: "ListDisputeEvidence",
    isWrite: false
  } as ApiMethodInfo,

  createEvidenceFile: {
    description: "The endpoint accepts HTTP\nmultipart/form-data file uploads in HEIC, HEIF, JPEG, PDF, PNG, and TIFF formats.",
    method: "post",
    path: "/v2/disputes/{dispute_id}/evidence-files",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute for which you want to upload evidence."}],
    queryParams: [],
    requestType: "CreateDisputeEvidenceFileRequest",
    isMultipart: false,
    originalName: "CreateDisputeEvidenceFile",
    isWrite: true
  } as ApiMethodInfo,

  createEvidenceText: {
    description: "Disputes CreateDisputeEvidenceText operation",
    method: "post",
    path: "/v2/disputes/{dispute_id}/evidence-text",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute for which you want to upload evidence."}],
    queryParams: [],
    requestType: "CreateDisputeEvidenceTextRequest",
    isMultipart: false,
    originalName: "CreateDisputeEvidenceText",
    isWrite: true
  } as ApiMethodInfo,

  deleteEvidence: {
    description: "Square does not send the bank any evidence that is removed.",
    method: "delete",
    path: "/v2/disputes/{dispute_id}/evidence/{evidence_id}",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute from which you want to remove evidence."},{"name":"evidence_id","type":"string","description":"The ID of the evidence you want to remove."}],
    queryParams: [],
    requestType: "DeleteDisputeEvidenceRequest",
    isMultipart: false,
    originalName: "DeleteDisputeEvidence",
    isWrite: true
  } as ApiMethodInfo,

  getEvidence: {
    description: "You must maintain a copy of any evidence uploaded if you want to reference it later. Evidence cannot be downloaded after you upload it.",
    method: "get",
    path: "/v2/disputes/{dispute_id}/evidence/{evidence_id}",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute from which you want to retrieve evidence metadata."},{"name":"evidence_id","type":"string","description":"The ID of the evidence to retrieve."}],
    queryParams: [],
    requestType: "RetrieveDisputeEvidenceRequest",
    isMultipart: false,
    originalName: "RetrieveDisputeEvidence",
    isWrite: false
  } as ApiMethodInfo,

  submitEvidence: {
    description: "The evidence submitted by this endpoint includes evidence uploaded\nusing the [CreateDisputeEvidenceFile](api-endpoint:Disputes-CreateDisputeEvidenceFile) and\n[CreateDisputeEvidenceText](api-endpoint:Disputes-CreateDisputeEvidenceText) endpoints and\nevidence automatically provided by Square, when available. Evidence cannot be removed from\na dispute after submission.",
    method: "post",
    path: "/v2/disputes/{dispute_id}/submit-evidence",
    pathParams: [{"name":"dispute_id","type":"string","description":"The ID of the dispute for which you want to submit evidence."}],
    queryParams: [],
    requestType: "SubmitEvidenceRequest",
    isMultipart: false,
    originalName: "SubmitEvidence",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const DisputesHandlers = {
  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.get;
    
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

  accept: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.accept;
    
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

  createEvidenceFile: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.createEvidenceFile;
    
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

  createEvidenceText: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.createEvidenceText;
    
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

  deleteEvidence: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.deleteEvidence;
    
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

  getEvidence: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.getEvidence;
    
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

  submitEvidence: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.submitEvidence;
    
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
    const methodInfo = DisputesMethods.list;
    
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

  listEvidence: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = DisputesMethods.listEvidence;
    
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