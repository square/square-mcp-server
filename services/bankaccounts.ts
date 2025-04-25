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
export const BankAccountsMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "BankAccounts ListBankAccounts operation",
    method: "get",
    path: "/v2/bank-accounts",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"The pagination cursor returned by a previous call to this endpoint.\nUse it in the next `ListBankAccounts` request to retrieve the next set \nof results.\n\nSee the [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination) guide for more information."},{"name":"limit","type":"integer","description":"Upper limit on the number of bank accounts to return in the response. \nCurrently, 1000 is the largest supported limit. You can specify a limit \nof up to 1000 bank accounts. This is also the default limit."},{"name":"location_id","type":"string","description":"Location ID. You can specify this optional filter \nto retrieve only the linked bank accounts belonging to a specific location."}],
    requestType: "ListBankAccountsRequest",
    isMultipart: false,
    originalName: "ListBankAccounts",
    isWrite: false
  } as ApiMethodInfo,

  getByV1Id: {
    description: "BankAccounts GetBankAccountByV1Id operation",
    method: "get",
    path: "/v2/bank-accounts/by-v1-id/{v1_bank_account_id}",
    pathParams: [{"name":"v1_bank_account_id","type":"string","description":"Connect V1 ID of the desired `BankAccount`. For more information, see \n[Retrieve a bank account by using an ID issued by V1 Bank Accounts API](https://developer.squareup.com/docs/bank-accounts-api#retrieve-a-bank-account-by-using-an-id-issued-by-v1-bank-accounts-api)."}],
    queryParams: [],
    requestType: "GetBankAccountByV1IdRequest",
    isMultipart: false,
    originalName: "GetBankAccountByV1Id",
    isWrite: false
  } as ApiMethodInfo,

  get: {
    description: "BankAccounts GetBankAccount operation",
    method: "get",
    path: "/v2/bank-accounts/{bank_account_id}",
    pathParams: [{"name":"bank_account_id","type":"string","description":"Square-issued ID of the desired `BankAccount`."}],
    queryParams: [],
    requestType: "GetBankAccountRequest",
    isMultipart: false,
    originalName: "GetBankAccount",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const BankAccountsHandlers = {
  getByV1Id: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BankAccountsMethods.getByV1Id;
    
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

  get: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = BankAccountsMethods.get;
    
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
    const methodInfo = BankAccountsMethods.list;
    
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