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
export const OAuthMethods: { [key: string]: ApiMethodInfo } = {
  revokeToken: {
    description: "If an account has more than one OAuth access token for your application, this\nendpoint revokes all of them, regardless of which token you specify. \n\n__Important:__ The `Authorization` header for this endpoint must have the\nfollowing format:\n\n```\nAuthorization: Client APPLICATION_SECRET\n```\n\nReplace `APPLICATION_SECRET` with the application secret on the **OAuth**\npage for your application in the Developer Dashboard.",
    method: "post",
    path: "/oauth2/revoke",
    pathParams: [],
    queryParams: [],
    requestType: "RevokeTokenRequest",
    isMultipart: false,
    originalName: "RevokeToken",
    isWrite: false
  } as ApiMethodInfo,

  obtainToken: {
    description: "The `grant_type` parameter specifies the type of OAuth request. If \n`grant_type` is `authorization_code`, you must include the authorization \ncode you received when a seller granted you authorization. If `grant_type` \nis `refresh_token`, you must provide a valid refresh token. If you're using \nan old version of the Square APIs (prior to March 13, 2019), `grant_type` \ncan be `migration_token` and you must provide a valid migration token.\n\nYou can use the `scopes` parameter to limit the set of permissions granted \nto the access token and refresh token. You can use the `short_lived` parameter \nto create an access token that expires in 24 hours.\n\n__Note:__ OAuth tokens should be encrypted and stored on a secure server. \nApplication clients should never interact directly with OAuth tokens.",
    method: "post",
    path: "/oauth2/token",
    pathParams: [],
    queryParams: [],
    requestType: "ObtainTokenRequest",
    isMultipart: false,
    originalName: "ObtainToken",
    isWrite: false
  } as ApiMethodInfo,

  getTokenStatus: {
    description: "Add the access token to the Authorization header of the request.\n\n__Important:__ The `Authorization` header you provide to this endpoint must have the following format:\n\n```\nAuthorization: Bearer ACCESS_TOKEN\n```\n\nwhere `ACCESS_TOKEN` is a\n[valid production authorization credential](https://developer.squareup.com/docs/build-basics/access-tokens).\n\nIf the access token is expired or not a valid access token, the endpoint returns an `UNAUTHORIZED` error.",
    method: "post",
    path: "/oauth2/token/status",
    pathParams: [],
    queryParams: [],
    requestType: "RetrieveTokenStatusRequest",
    isMultipart: false,
    originalName: "RetrieveTokenStatus",
    isWrite: false
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const OAuthHandlers = {
  revokeToken: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OAuthMethods.revokeToken;
    
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

  obtainToken: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OAuthMethods.obtainToken;
    
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

  getTokenStatus: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = OAuthMethods.getTokenStatus;
    
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