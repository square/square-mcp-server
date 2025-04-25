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
export const LoyaltyMethods: { [key: string]: ApiMethodInfo } = {
  createAccount: {
    description: "To create a loyalty account, you must provide the `program_id` and a `mapping` with the `phone_number` of the buyer.",
    method: "post",
    path: "/v2/loyalty/accounts",
    pathParams: [],
    queryParams: [],
    requestType: "CreateLoyaltyAccountRequest",
    isMultipart: false,
    originalName: "CreateLoyaltyAccount",
    isWrite: true
  } as ApiMethodInfo,

  searchAccounts: {
    description: "You can search for a loyalty account using the phone number or customer ID associated with the account. To return all loyalty accounts, specify an empty `query` object or omit it entirely.\n\nSearch results are sorted by `created_at` in ascending order.",
    method: "post",
    path: "/v2/loyalty/accounts/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchLoyaltyAccountsRequest",
    isMultipart: false,
    originalName: "SearchLoyaltyAccounts",
    isWrite: false
  } as ApiMethodInfo,

  getAccount: {
    description: "Loyalty RetrieveLoyaltyAccount operation",
    method: "get",
    path: "/v2/loyalty/accounts/{account_id}",
    pathParams: [{"name":"account_id","type":"string","description":"The ID of the [loyalty account](entity:LoyaltyAccount) to retrieve."}],
    queryParams: [],
    requestType: "RetrieveLoyaltyAccountRequest",
    isMultipart: false,
    originalName: "RetrieveLoyaltyAccount",
    isWrite: false
  } as ApiMethodInfo,

  accumulatePoints: {
    description: "- If you are using the Orders API to manage orders, provide the `order_id`. Square reads the order\nto compute the points earned from both the base loyalty program and an associated\n[loyalty promotion](entity:LoyaltyPromotion). For purchases that qualify for multiple accrual\nrules, Square computes points based on the accrual rule that grants the most points.\nFor purchases that qualify for multiple promotions, Square computes points based on the most\nrecently created promotion. A purchase must first qualify for program points to be eligible for promotion points.\n\n- If you are not using the Orders API to manage orders, provide `points` with the number of points to add.\nYou must first perform a client-side computation of the points earned from the loyalty program and\nloyalty promotion. For spend-based and visit-based programs, you can call [CalculateLoyaltyPoints](api-endpoint:Loyalty-CalculateLoyaltyPoints)\nto compute the points earned from the base loyalty program. For information about computing points earned from a loyalty promotion, see\n[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).",
    method: "post",
    path: "/v2/loyalty/accounts/{account_id}/accumulate",
    pathParams: [{"name":"account_id","type":"string","description":"The ID of the target [loyalty account](entity:LoyaltyAccount)."}],
    queryParams: [],
    requestType: "AccumulateLoyaltyPointsRequest",
    isMultipart: false,
    originalName: "AccumulateLoyaltyPoints",
    isWrite: true
  } as ApiMethodInfo,

  adjustPoints: {
    description: "Use this endpoint only when you need to manually adjust points. Otherwise, in your application flow, you call\n[AccumulateLoyaltyPoints](api-endpoint:Loyalty-AccumulateLoyaltyPoints)\nto add points when a buyer pays for the purchase.",
    method: "post",
    path: "/v2/loyalty/accounts/{account_id}/adjust",
    pathParams: [{"name":"account_id","type":"string","description":"The ID of the target [loyalty account](entity:LoyaltyAccount)."}],
    queryParams: [],
    requestType: "AdjustLoyaltyPointsRequest",
    isMultipart: false,
    originalName: "AdjustLoyaltyPoints",
    isWrite: true
  } as ApiMethodInfo,

  searchEvents: {
    description: "A Square loyalty program maintains a ledger of events that occur during the lifetime of a\nbuyer's loyalty account. Each change in the point balance\n(for example, points earned, points redeemed, and points expired) is\nrecorded in the ledger. Using this endpoint, you can search the ledger for events.\n\nSearch results are sorted by `created_at` in descending order.",
    method: "post",
    path: "/v2/loyalty/events/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchLoyaltyEventsRequest",
    isMultipart: false,
    originalName: "SearchLoyaltyEvents",
    isWrite: false
  } as ApiMethodInfo,

  getProgram: {
    description: "Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard. For more information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).",
    method: "get",
    path: "/v2/loyalty/programs/{program_id}",
    pathParams: [{"name":"program_id","type":"string","description":"The ID of the loyalty program or the keyword `main`. Either value can be used to retrieve the single loyalty program that belongs to the seller."}],
    queryParams: [],
    requestType: "RetrieveLoyaltyProgramRequest",
    isMultipart: false,
    originalName: "RetrieveLoyaltyProgram",
    isWrite: false
  } as ApiMethodInfo,

  calculatePoints: {
    description: "Applications might call this endpoint\nto display the points to the buyer.\n\n- If you are using the Orders API to manage orders, provide the `order_id` and (optional) `loyalty_account_id`.\nSquare reads the order to compute the points earned from the base loyalty program and an associated\n[loyalty promotion](entity:LoyaltyPromotion).\n\n- If you are not using the Orders API to manage orders, provide `transaction_amount_money` with the\npurchase amount. Square uses this amount to calculate the points earned from the base loyalty program,\nbut not points earned from a loyalty promotion. For spend-based and visit-based programs, the `tax_mode`\nsetting of the accrual rule indicates how taxes should be treated for loyalty points accrual.\nIf the purchase qualifies for program points, call\n[ListLoyaltyPromotions](api-endpoint:Loyalty-ListLoyaltyPromotions) and perform a client-side computation\nto calculate whether the purchase also qualifies for promotion points. For more information, see\n[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).",
    method: "post",
    path: "/v2/loyalty/programs/{program_id}/calculate",
    pathParams: [{"name":"program_id","type":"string","description":"The ID of the [loyalty program](entity:LoyaltyProgram), which defines the rules for accruing points."}],
    queryParams: [],
    requestType: "CalculateLoyaltyPointsRequest",
    isMultipart: false,
    originalName: "CalculateLoyaltyPoints",
    isWrite: false
  } as ApiMethodInfo,

  listPromotions: {
    description: "Results are sorted by the `created_at` date in descending order (newest to oldest).",
    method: "get",
    path: "/v2/loyalty/programs/{program_id}/promotions",
    pathParams: [{"name":"program_id","type":"string","description":"The ID of the base [loyalty program](entity:LoyaltyProgram). To get the program ID,\ncall [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram) using the `main` keyword."}],
    queryParams: [{"name":"status","type":"string","description":"The status to filter the results by. If a status is provided, only loyalty promotions\nwith the specified status are returned. Otherwise, all loyalty promotions associated with\nthe loyalty program are returned."},{"name":"cursor","type":"string","description":"The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."},{"name":"limit","type":"integer","description":"The maximum number of results to return in a single paged response.\nThe minimum value is 1 and the maximum value is 30. The default value is 30.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListLoyaltyPromotionsRequest",
    isMultipart: false,
    originalName: "ListLoyaltyPromotions",
    isWrite: false
  } as ApiMethodInfo,

  createPromotion: {
    description: "A loyalty promotion\nenables buyers to earn points in addition to those earned from the base loyalty program.\n\nThis endpoint sets the loyalty promotion to the `ACTIVE` or `SCHEDULED` status, depending on the\n`available_time` setting. A loyalty program can have a maximum of 10 loyalty promotions with an\n`ACTIVE` or `SCHEDULED` status.",
    method: "post",
    path: "/v2/loyalty/programs/{program_id}/promotions",
    pathParams: [{"name":"program_id","type":"string","description":"The ID of the [loyalty program](entity:LoyaltyProgram) to associate with the promotion.\nTo get the program ID, call [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram)\nusing the `main` keyword."}],
    queryParams: [],
    requestType: "CreateLoyaltyPromotionRequest",
    isMultipart: false,
    originalName: "CreateLoyaltyPromotion",
    isWrite: true
  } as ApiMethodInfo,

  getPromotion: {
    description: "Loyalty RetrieveLoyaltyPromotion operation",
    method: "get",
    path: "/v2/loyalty/programs/{program_id}/promotions/{promotion_id}",
    pathParams: [{"name":"promotion_id","type":"string","description":"The ID of the [loyalty promotion](entity:LoyaltyPromotion) to retrieve."},{"name":"program_id","type":"string","description":"The ID of the base [loyalty program](entity:LoyaltyProgram). To get the program ID,\ncall [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram) using the `main` keyword."}],
    queryParams: [],
    requestType: "RetrieveLoyaltyPromotionRequest",
    isMultipart: false,
    originalName: "RetrieveLoyaltyPromotion",
    isWrite: false
  } as ApiMethodInfo,

  cancelPromotion: {
    description: "Use this endpoint to cancel an `ACTIVE` promotion earlier than the\nend date, cancel an `ACTIVE` promotion when an end date is not specified, or cancel a `SCHEDULED` promotion.\nBecause updating a promotion is not supported, you can also use this endpoint to cancel a promotion before\nyou create a new one.\n\nThis endpoint sets the loyalty promotion to the `CANCELED` state",
    method: "post",
    path: "/v2/loyalty/programs/{program_id}/promotions/{promotion_id}/cancel",
    pathParams: [{"name":"promotion_id","type":"string","description":"The ID of the [loyalty promotion](entity:LoyaltyPromotion) to cancel. You can cancel a\npromotion that has an `ACTIVE` or `SCHEDULED` status."},{"name":"program_id","type":"string","description":"The ID of the base [loyalty program](entity:LoyaltyProgram)."}],
    queryParams: [],
    requestType: "CancelLoyaltyPromotionRequest",
    isMultipart: false,
    originalName: "CancelLoyaltyPromotion",
    isWrite: true
  } as ApiMethodInfo,

  createReward: {
    description: "In the process, the endpoint does following:\n\n- Uses the `reward_tier_id` in the request to determine the number of points\nto lock for this reward.\n- If the request includes `order_id`, it adds the reward and related discount to the order.\n\nAfter a reward is created, the points are locked and\nnot available for the buyer to redeem another reward.",
    method: "post",
    path: "/v2/loyalty/rewards",
    pathParams: [],
    queryParams: [],
    requestType: "CreateLoyaltyRewardRequest",
    isMultipart: false,
    originalName: "CreateLoyaltyReward",
    isWrite: true
  } as ApiMethodInfo,

  searchRewards: {
    description: "This endpoint accepts a request with no query filters and returns results for all loyalty accounts.\nIf you include a `query` object, `loyalty_account_id` is required and `status` is  optional.\n\nIf you know a reward ID, use the\n[RetrieveLoyaltyReward](api-endpoint:Loyalty-RetrieveLoyaltyReward) endpoint.\n\nSearch results are sorted by `updated_at` in descending order.",
    method: "post",
    path: "/v2/loyalty/rewards/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchLoyaltyRewardsRequest",
    isMultipart: false,
    originalName: "SearchLoyaltyRewards",
    isWrite: false
  } as ApiMethodInfo,

  deleteReward: {
    description: "- If an order ID was specified when the reward was created\n(see [CreateLoyaltyReward](api-endpoint:Loyalty-CreateLoyaltyReward)),\nit updates the order by removing the reward and related\ndiscounts.\n\nYou cannot delete a reward that has reached the terminal state (REDEEMED).",
    method: "delete",
    path: "/v2/loyalty/rewards/{reward_id}",
    pathParams: [{"name":"reward_id","type":"string","description":"The ID of the [loyalty reward](entity:LoyaltyReward) to delete."}],
    queryParams: [],
    requestType: "DeleteLoyaltyRewardRequest",
    isMultipart: false,
    originalName: "DeleteLoyaltyReward",
    isWrite: true
  } as ApiMethodInfo,

  getReward: {
    description: "Loyalty RetrieveLoyaltyReward operation",
    method: "get",
    path: "/v2/loyalty/rewards/{reward_id}",
    pathParams: [{"name":"reward_id","type":"string","description":"The ID of the [loyalty reward](entity:LoyaltyReward) to retrieve."}],
    queryParams: [],
    requestType: "RetrieveLoyaltyRewardRequest",
    isMultipart: false,
    originalName: "RetrieveLoyaltyReward",
    isWrite: false
  } as ApiMethodInfo,

  redeemReward: {
    description: "The endpoint sets the reward to the `REDEEMED` terminal state.\n\nIf you are using your own order processing system (not using the\nOrders API), you call this endpoint after the buyer paid for the\npurchase.\n\nAfter the reward reaches the terminal state, it cannot be deleted.\nIn other words, points used for the reward cannot be returned\nto the account.",
    method: "post",
    path: "/v2/loyalty/rewards/{reward_id}/redeem",
    pathParams: [{"name":"reward_id","type":"string","description":"The ID of the [loyalty reward](entity:LoyaltyReward) to redeem."}],
    queryParams: [],
    requestType: "RedeemLoyaltyRewardRequest",
    isMultipart: false,
    originalName: "RedeemLoyaltyReward",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const LoyaltyHandlers = {
  createAccount: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.createAccount;
    
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

  searchAccounts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.searchAccounts;
    
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

  searchEvents: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.searchEvents;
    
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

  createReward: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.createReward;
    
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

  searchRewards: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.searchRewards;
    
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

  getAccount: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.getAccount;
    
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

  accumulatePoints: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.accumulatePoints;
    
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

  adjustPoints: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.adjustPoints;
    
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

  getProgram: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.getProgram;
    
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

  calculatePoints: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.calculatePoints;
    
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

  createPromotion: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.createPromotion;
    
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

  getPromotion: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.getPromotion;
    
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

  cancelPromotion: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.cancelPromotion;
    
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

  deleteReward: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.deleteReward;
    
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

  getReward: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.getReward;
    
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

  redeemReward: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.redeemReward;
    
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

  listPromotions: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LoyaltyMethods.listPromotions;
    
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