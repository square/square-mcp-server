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
export const ApplePayMethods: { [key: string]: ApiMethodInfo } = {
  registerDomain: {
    description: "A validation\nis performed on this domain by Apple to ensure that it is properly set up as\nan Apple Pay enabled domain.\n\nThis endpoint provides an easy way for platform developers to bulk activate\nApple Pay on the Web with Square for merchants using their platform.\n\nNote: You will need to host a valid domain verification file on your domain to support Apple Pay.  The\ncurrent version of this file is always available at https://app.squareup.com/digital-wallets/apple-pay/apple-developer-merchantid-domain-association,\nand should be hosted at `.well_known/apple-developer-merchantid-domain-association` on your\ndomain.  This file is subject to change; we strongly recommend checking for updates regularly and avoiding\nlong-lived caches that might not keep in sync with the correct file version.\n\nTo learn more about the Web Payments SDK and how to add Apple Pay, see [Take an Apple Pay Payment](https://developer.squareup.com/docs/web-payments/apple-pay).",
    method: "post",
    path: "/v2/apple-pay/domains",
    pathParams: [],
    queryParams: [],
    requestType: "RegisterDomainRequest",
    isMultipart: false,
    originalName: "RegisterDomain",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const ApplePayHandlers = {
  registerDomain: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = ApplePayMethods.registerDomain;
    
    // Simple endpoint with no path or query parameters
    const url = methodInfo.path;

    // Make regular JSON request
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: getRequestHeaders(accessToken),
      ...(Object.keys(args).length > 0 && ['post', 'put', 'patch'].includes(methodInfo.method.toLowerCase()) && { body: JSON.stringify(args) })
    });
    return await handleResponse(response)
  }
};