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
export const GiftCardActivitiesMethods: { [key: string]: ApiMethodInfo } = {
  list: {
    description: "By default, you get gift card activities for all\ngift cards in the seller's account. You can optionally specify query parameters to\nfilter the list. For example, you can get a list of gift card activities for a gift card,\nfor all gift cards in a specific region, or for activities within a time window.",
    method: "get",
    path: "/v2/gift-cards/activities",
    pathParams: [],
    queryParams: [{"name":"gift_card_id","type":"string","description":"If a gift card ID is provided, the endpoint returns activities related \nto the specified gift card. Otherwise, the endpoint returns all gift card activities for \nthe seller."},{"name":"type","type":"string","description":"If a [type](entity:GiftCardActivityType) is provided, the endpoint returns gift card activities of the specified type. \nOtherwise, the endpoint returns all types of gift card activities."},{"name":"location_id","type":"string","description":"If a location ID is provided, the endpoint returns gift card activities for the specified location. \nOtherwise, the endpoint returns gift card activities for all locations."},{"name":"begin_time","type":"string","description":"The timestamp for the beginning of the reporting period, in RFC 3339 format.\nThis start time is inclusive. The default value is the current time minus one year.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"end_time","type":"string","description":"The timestamp for the end of the reporting period, in RFC 3339 format.\nThis end time is inclusive. The default value is the current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"},{"name":"limit","type":"integer","description":"If a limit is provided, the endpoint returns the specified number \nof results (or fewer) per page. The maximum value is 100. The default value is 50.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"cursor","type":"string","description":"A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."},{"name":"sort_order","type":"string","description":"The order in which the endpoint returns the activities, based on `created_at`.\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."}],
    requestType: "ListGiftCardActivitiesRequest",
    isMultipart: false,
    originalName: "ListGiftCardActivities",
    isWrite: false
  } as ApiMethodInfo,

  createGiftCardActivity: {
    description: "For example, create an `ACTIVATE` activity to activate a gift card with an initial balance before first use.",
    method: "post",
    path: "/v2/gift-cards/activities",
    pathParams: [],
    queryParams: [],
    requestType: "CreateGiftCardActivityRequest",
    isMultipart: false,
    originalName: "CreateGiftCardActivity",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const GiftCardActivitiesHandlers = {
  createGiftCardActivity: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardActivitiesMethods.createGiftCardActivity;
    
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

  list: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = GiftCardActivitiesMethods.list;
    
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