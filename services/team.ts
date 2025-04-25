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
export const TeamMethods: { [key: string]: ApiMethodInfo } = {
  createMember: {
    description: "The `TeamMember` object is returned on successful creates.\nYou must provide the following values in your request to this endpoint:\n- `given_name`\n- `family_name`\n\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#createteammember).",
    method: "post",
    path: "/v2/team-members",
    pathParams: [],
    queryParams: [],
    requestType: "CreateTeamMemberRequest",
    isMultipart: false,
    originalName: "CreateTeamMember",
    isWrite: true
  } as ApiMethodInfo,

  bulkCreatemembers: {
    description: "The created `TeamMember` objects are returned on successful creates.\nThis process is non-transactional and processes as much of the request as possible. If one of the creates in\nthe request cannot be successfully processed, the request is not marked as failed, but the body of the response\ncontains explicit error information for the failed create.\n\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-create-team-members).",
    method: "post",
    path: "/v2/team-members/bulk-create",
    pathParams: [],
    queryParams: [],
    requestType: "BulkCreateTeamMembersRequest",
    isMultipart: false,
    originalName: "BulkCreateTeamMembers",
    isWrite: true
  } as ApiMethodInfo,

  bulkUpdatemembers: {
    description: "The updated `TeamMember` objects are returned on successful updates.\nThis process is non-transactional and processes as much of the request as possible. If one of the updates in\nthe request cannot be successfully processed, the request is not marked as failed, but the body of the response\ncontains explicit error information for the failed update.\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-update-team-members).",
    method: "post",
    path: "/v2/team-members/bulk-update",
    pathParams: [],
    queryParams: [],
    requestType: "BulkUpdateTeamMembersRequest",
    isMultipart: false,
    originalName: "BulkUpdateTeamMembers",
    isWrite: true
  } as ApiMethodInfo,

  listJobs: {
    description: "Results are sorted by title in ascending order.",
    method: "get",
    path: "/v2/team-members/jobs",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"The pagination cursor returned by the previous call to this endpoint. Provide this\ncursor to retrieve the next page of results for your original request. For more information,\nsee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."}],
    requestType: "ListJobsRequest",
    isMultipart: false,
    originalName: "ListJobs",
    isWrite: false
  } as ApiMethodInfo,

  createJob: {
    description: "A job defines a title and tip eligibility. Note that\ncompensation is defined in a [job assignment](entity:JobAssignment) in a team member's wage setting.",
    method: "post",
    path: "/v2/team-members/jobs",
    pathParams: [],
    queryParams: [],
    requestType: "CreateJobRequest",
    isMultipart: false,
    originalName: "CreateJob",
    isWrite: true
  } as ApiMethodInfo,

  getJob: {
    description: "Team RetrieveJob operation",
    method: "get",
    path: "/v2/team-members/jobs/{job_id}",
    pathParams: [{"name":"job_id","type":"string","description":"The ID of the job to retrieve."}],
    queryParams: [],
    requestType: "RetrieveJobRequest",
    isMultipart: false,
    originalName: "RetrieveJob",
    isWrite: false
  } as ApiMethodInfo,

  updateJob: {
    description: "Changes to the title propagate to all\n`JobAssignment`, `Shift`, and `TeamMemberWage` objects that reference the job ID. Changes to\ntip eligibility propagate to all `TeamMemberWage` objects that reference the job ID.",
    method: "put",
    path: "/v2/team-members/jobs/{job_id}",
    pathParams: [{"name":"job_id","type":"string","description":"The ID of the job to update."}],
    queryParams: [],
    requestType: "UpdateJobRequest",
    isMultipart: false,
    originalName: "UpdateJob",
    isWrite: true
  } as ApiMethodInfo,

  searchMembers: {
    description: "The list can be filtered by location IDs, `ACTIVE` or `INACTIVE` status, or whether\nthe team member is the Square account owner.",
    method: "post",
    path: "/v2/team-members/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchTeamMembersRequest",
    isMultipart: false,
    originalName: "SearchTeamMembers",
    isWrite: false
  } as ApiMethodInfo,

  getMember: {
    description: "Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrieve-a-team-member).",
    method: "get",
    path: "/v2/team-members/{team_member_id}",
    pathParams: [{"name":"team_member_id","type":"string","description":"The ID of the team member to retrieve."}],
    queryParams: [],
    requestType: "RetrieveTeamMemberRequest",
    isMultipart: false,
    originalName: "RetrieveTeamMember",
    isWrite: false
  } as ApiMethodInfo,

  updateMember: {
    description: "The `TeamMember` object is returned on successful updates.\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#update-a-team-member).",
    method: "put",
    path: "/v2/team-members/{team_member_id}",
    pathParams: [{"name":"team_member_id","type":"string","description":"The ID of the team member to update."}],
    queryParams: [],
    requestType: "UpdateTeamMemberRequest",
    isMultipart: false,
    originalName: "UpdateTeamMember",
    isWrite: true
  } as ApiMethodInfo,

  getWageSetting: {
    description: "For more information, see\n[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrievewagesetting).\n\nSquare recommends using [RetrieveTeamMember](api-endpoint:Team-RetrieveTeamMember) or [SearchTeamMembers](api-endpoint:Team-SearchTeamMembers)\nto get this information directly from the `TeamMember.wage_setting` field.",
    method: "get",
    path: "/v2/team-members/{team_member_id}/wage-setting",
    pathParams: [{"name":"team_member_id","type":"string","description":"The ID of the team member for which to retrieve the wage setting."}],
    queryParams: [],
    requestType: "RetrieveWageSettingRequest",
    isMultipart: false,
    originalName: "RetrieveWageSetting",
    isWrite: false
  } as ApiMethodInfo,

  updateWageSetting: {
    description: "The object is created if a\n`WageSetting` with the specified `team_member_id` doesn't exist. Otherwise,\nit fully replaces the `WageSetting` object for the team member.\nThe `WageSetting` is returned on a successful update. For more information, see\n[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#create-or-update-a-wage-setting).\n\nSquare recommends using [CreateTeamMember](api-endpoint:Team-CreateTeamMember) or [UpdateTeamMember](api-endpoint:Team-UpdateTeamMember)\nto manage the `TeamMember.wage_setting` field directly.",
    method: "put",
    path: "/v2/team-members/{team_member_id}/wage-setting",
    pathParams: [{"name":"team_member_id","type":"string","description":"The ID of the team member for which to update the `WageSetting` object."}],
    queryParams: [],
    requestType: "UpdateWageSettingRequest",
    isMultipart: false,
    originalName: "UpdateWageSetting",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const TeamHandlers = {
  createMember: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.createMember;
    
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

  bulkCreatemembers: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.bulkCreatemembers;
    
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

  bulkUpdatemembers: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.bulkUpdatemembers;
    
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

  createJob: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.createJob;
    
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

  searchMembers: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.searchMembers;
    
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

  getJob: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.getJob;
    
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

  updateJob: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.updateJob;
    
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

  getMember: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.getMember;
    
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

  updateMember: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.updateMember;
    
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

  getWageSetting: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.getWageSetting;
    
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

  updateWageSetting: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.updateWageSetting;
    
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

  listJobs: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = TeamMethods.listJobs;
    
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