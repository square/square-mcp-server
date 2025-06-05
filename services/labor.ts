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
export const LaborMethods: { [key: string]: ApiMethodInfo } = {
  listBreakTypes: {
    description: "Labor ListBreakTypes operation",
    method: "get",
    path: "/v2/labor/break-types",
    pathParams: [],
    queryParams: [{"name":"location_id","type":"string","description":"Filter the returned `BreakType` results to only those that are associated with the\nspecified location."},{"name":"limit","type":"integer","description":"The maximum number of `BreakType` results to return per page. The number can range between 1\nand 200. The default is 200."},{"name":"cursor","type":"string","description":"A pointer to the next page of `BreakType` results to fetch."}],
    requestType: "ListBreakTypesRequest",
    isMultipart: false,
    originalName: "ListBreakTypes",
    isWrite: false
  } as ApiMethodInfo,

  createBreakType: {
    description: "A `BreakType` is a template for creating `Break` objects.\nYou must provide the following values in your request to this\nendpoint:\n\n- `location_id`\n- `break_name`\n- `expected_duration`\n- `is_paid`\n\nYou can only have three `BreakType` instances per location. If you attempt to add a fourth\n`BreakType` for a location, an `INVALID_REQUEST_ERROR` \"Exceeded limit of 3 breaks per location.\"\nis returned.",
    method: "post",
    path: "/v2/labor/break-types",
    pathParams: [],
    queryParams: [],
    requestType: "CreateBreakTypeRequest",
    isMultipart: false,
    originalName: "CreateBreakType",
    isWrite: true
  } as ApiMethodInfo,

  deleteBreakType: {
    description: "A `BreakType` can be deleted even if it is referenced from a `Shift`.",
    method: "delete",
    path: "/v2/labor/break-types/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `BreakType` being deleted."}],
    queryParams: [],
    requestType: "DeleteBreakTypeRequest",
    isMultipart: false,
    originalName: "DeleteBreakType",
    isWrite: true
  } as ApiMethodInfo,

  getBreakType: {
    description: "Labor GetBreakType operation",
    method: "get",
    path: "/v2/labor/break-types/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `BreakType` being retrieved."}],
    queryParams: [],
    requestType: "GetBreakTypeRequest",
    isMultipart: false,
    originalName: "GetBreakType",
    isWrite: false
  } as ApiMethodInfo,

  updateBreakType: {
    description: "Labor UpdateBreakType operation",
    method: "put",
    path: "/v2/labor/break-types/{id}",
    pathParams: [{"name":"id","type":"string","description":" The UUID for the `BreakType` being updated."}],
    queryParams: [],
    requestType: "UpdateBreakTypeRequest",
    isMultipart: false,
    originalName: "UpdateBreakType",
    isWrite: true
  } as ApiMethodInfo,

  createShift: {
    description: "A `Shift` represents a complete workday for a single team member.\nYou must provide the following values in your request to this\nendpoint:\n\n- `location_id`\n- `team_member_id`\n- `start_at`\n\nAn attempt to create a new `Shift` can result in a `BAD_REQUEST` error when:\n- The `status` of the new `Shift` is `OPEN` and the team member has another\nshift with an `OPEN` status.\n- The `start_at` date is in the future.\n- The `start_at` or `end_at` date overlaps another shift for the same team member.\n- The `Break` instances are set in the request and a break `start_at`\nis before the `Shift.start_at`, a break `end_at` is after\nthe `Shift.end_at`, or both.",
    method: "post",
    path: "/v2/labor/shifts",
    pathParams: [],
    queryParams: [],
    requestType: "CreateShiftRequest",
    isMultipart: false,
    originalName: "CreateShift",
    isWrite: true
  } as ApiMethodInfo,

  searchShifts: {
    description: "The list to be returned can be filtered by:\n- Location IDs\n- Team member IDs\n- Shift status (`OPEN` or `CLOSED`)\n- Shift start\n- Shift end\n- Workday details\n\nThe list can be sorted by:\n- `START_AT`\n- `END_AT`\n- `CREATED_AT`\n- `UPDATED_AT`",
    method: "post",
    path: "/v2/labor/shifts/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchShiftsRequest",
    isMultipart: false,
    originalName: "SearchShifts",
    isWrite: false
  } as ApiMethodInfo,

  deleteShift: {
    description: "Labor DeleteShift operation",
    method: "delete",
    path: "/v2/labor/shifts/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `Shift` being deleted."}],
    queryParams: [],
    requestType: "DeleteShiftRequest",
    isMultipart: false,
    originalName: "DeleteShift",
    isWrite: true
  } as ApiMethodInfo,

  getShift: {
    description: "Labor GetShift operation",
    method: "get",
    path: "/v2/labor/shifts/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `Shift` being retrieved."}],
    queryParams: [],
    requestType: "GetShiftRequest",
    isMultipart: false,
    originalName: "GetShift",
    isWrite: false
  } as ApiMethodInfo,

  updateShift: {
    description: "When adding a `Break` to a `Shift`, any earlier `Break` instances in the `Shift` have\nthe `end_at` property set to a valid RFC-3339 datetime string.\n\nWhen closing a `Shift`, all `Break` instances in the `Shift` must be complete with `end_at`\nset on each `Break`.",
    method: "put",
    path: "/v2/labor/shifts/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of the object being updated."}],
    queryParams: [],
    requestType: "UpdateShiftRequest",
    isMultipart: false,
    originalName: "UpdateShift",
    isWrite: true
  } as ApiMethodInfo,

  listTeamMemberWages: {
    description: "Labor ListTeamMemberWages operation",
    method: "get",
    path: "/v2/labor/team-member-wages",
    pathParams: [],
    queryParams: [{"name":"team_member_id","type":"string","description":"Filter the returned wages to only those that are associated with the\nspecified team member."},{"name":"limit","type":"integer","description":"The maximum number of `TeamMemberWage` results to return per page. The number can range between\n1 and 200. The default is 200."},{"name":"cursor","type":"string","description":"A pointer to the next page of `EmployeeWage` results to fetch."}],
    requestType: "ListTeamMemberWagesRequest",
    isMultipart: false,
    originalName: "ListTeamMemberWages",
    isWrite: false
  } as ApiMethodInfo,

  getTeamMemberWage: {
    description: "Labor GetTeamMemberWage operation",
    method: "get",
    path: "/v2/labor/team-member-wages/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `TeamMemberWage` being retrieved."}],
    queryParams: [],
    requestType: "GetTeamMemberWageRequest",
    isMultipart: false,
    originalName: "GetTeamMemberWage",
    isWrite: false
  } as ApiMethodInfo,

  listWorkweekConfigs: {
    description: "Labor ListWorkweekConfigs operation",
    method: "get",
    path: "/v2/labor/workweek-configs",
    pathParams: [],
    queryParams: [{"name":"limit","type":"integer","description":"The maximum number of `WorkweekConfigs` results to return per page."},{"name":"cursor","type":"string","description":"A pointer to the next page of `WorkweekConfig` results to fetch."}],
    requestType: "ListWorkweekConfigsRequest",
    isMultipart: false,
    originalName: "ListWorkweekConfigs",
    isWrite: false
  } as ApiMethodInfo,

  updateWorkweekConfig: {
    description: "Labor UpdateWorkweekConfig operation",
    method: "put",
    path: "/v2/labor/workweek-configs/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `WorkweekConfig` object being updated."}],
    queryParams: [],
    requestType: "UpdateWorkweekConfigRequest",
    isMultipart: false,
    originalName: "UpdateWorkweekConfig",
    isWrite: true
  } as ApiMethodInfo,

  createScheduledShift: {
    description: "Creates a scheduled shift by providing draft shift details such as job ID, team member assignment, and start and end times. The following `draft_shift_details` fields are required: `location_id`, `job_id`, `start_at`, `end_at`",
    method: "post",
    path: "/v2/labor/scheduled-shifts",
    pathParams: [],
    queryParams: [],
    requestType: "CreateScheduledShiftRequest",
    isMultipart: false,
    originalName: "CreateScheduledShift",
    isWrite: true
  } as ApiMethodInfo,

  bulkPublishScheduledShifts: {
    description: "Publishes 1 - 100 scheduled shifts. Request body requires a 'scheduled_shifts' field containing a map/object (NOT an array) where: keys are scheduled shift IDs, values are objects with 'version' field. Optional 'scheduled_shift_notification_audience' field controls email notifications. The minimum `start_at` and maximum `end_at` timestamps of all shifts must fall within a two-week period.",
    method: "post",
    path: "/v2/labor/scheduled-shifts/bulk-publish",
    pathParams: [],
    queryParams: [],
    requestType: "BulkPublishScheduledShiftsRequest",
    isMultipart: false,
    originalName: "BulkPublishScheduledShifts",
    isWrite: true
  } as ApiMethodInfo,

  searchScheduledShifts: {
    description: "Returns a paginated list of `ScheduledShift` records for a business. The list can be filtered by location IDs, team member IDs, and time range.",
    method: "post",
    path: "/v2/labor/scheduled-shifts/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchScheduledShiftsRequest",
    isMultipart: false,
    originalName: "SearchScheduledShifts",
    isWrite: false
  } as ApiMethodInfo,

  retrieveScheduledShift: {
    description: "Returns the details of the `ScheduledShift` specified by the given ID.",
    method: "get",
    path: "/v2/labor/scheduled-shifts/{id}",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `ScheduledShift` being retrieved."}],
    queryParams: [],
    requestType: "RetrieveScheduledShiftRequest",
    isMultipart: false,
    originalName: "RetrieveScheduledShift",
    isWrite: false
  } as ApiMethodInfo,

  updateScheduledShift: {
    description: "Updates an existing `ScheduledShift` defined by the given ID. You cannot add or remove breaks when updating a `ScheduledShift`.",
    method: "put",
    path: "/v2/labor/scheduled-shifts/{id}",
    pathParams: [{"name":"id","type":"string","description":"The ID of the object being updated."}],
    queryParams: [],
    requestType: "UpdateScheduledShiftRequest",
    isMultipart: false,
    originalName: "UpdateScheduledShift",
    isWrite: true
  } as ApiMethodInfo,

  publishScheduledShift: {
    description: "Publishes the `ScheduledShift` by setting the `published_shift_details` field to the same value as the `draft_shift_details` field.",
    method: "post",
    path: "/v2/labor/scheduled-shifts/{id}/publish",
    pathParams: [{"name":"id","type":"string","description":"The UUID for the `ScheduledShift` being published."}],
    queryParams: [],
    requestType: "PublishScheduledShiftRequest",
    isMultipart: false,
    originalName: "PublishScheduledShift",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const LaborHandlers = {
  createBreakType: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.createBreakType;
    
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

  createShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.createShift;
    
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

  searchShifts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.searchShifts;
    
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

  deleteBreakType: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.deleteBreakType;
    
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

  getBreakType: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.getBreakType;
    
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

  updateBreakType: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.updateBreakType;
    
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

  deleteShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.deleteShift;
    
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

  getShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.getShift;
    
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

  updateShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.updateShift;
    
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

  getTeamMemberWage: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.getTeamMemberWage;
    
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

  updateWorkweekConfig: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.updateWorkweekConfig;
    
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

  listBreakTypes: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.listBreakTypes;
    
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

  listTeamMemberWages: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.listTeamMemberWages;
    
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

  listWorkweekConfigs: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.listWorkweekConfigs;
    
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

  createScheduledShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.createScheduledShift;
    
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

  bulkPublishScheduledShifts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.bulkPublishScheduledShifts;
    
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

  searchScheduledShifts: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.searchScheduledShifts;
    
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

  retrieveScheduledShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.retrieveScheduledShift;
    
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

  updateScheduledShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.updateScheduledShift;
    
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

  publishScheduledShift: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = LaborMethods.publishScheduledShift;
    
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
  }
};