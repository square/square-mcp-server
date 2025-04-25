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
export const CatalogMethods: { [key: string]: ApiMethodInfo } = {
  batchDeleteobjects: {
    description: "Deletion is a cascading event such that all children of the\ntargeted object are also deleted. For example, deleting a CatalogItem will\nalso delete all of its [CatalogItemVariation](entity:CatalogItemVariation)\nchildren.\n\n`BatchDeleteCatalogObjects` succeeds even if only a portion of the targeted\nIDs can be deleted. The response will only include IDs that were\nactually deleted.\n\nTo ensure consistency, only one delete request is processed at a time per seller account.\nWhile one (batch or non-batch) delete request is being processed, other (batched and non-batched)\ndelete requests are rejected with the `429` error code.",
    method: "post",
    path: "/v2/catalog/batch-delete",
    pathParams: [],
    queryParams: [],
    requestType: "BatchDeleteCatalogObjectsRequest",
    isMultipart: false,
    originalName: "BatchDeleteCatalogObjects",
    isWrite: true
  } as ApiMethodInfo,

  batchGetobjects: {
    description: "Each [CatalogItem](entity:CatalogItem) returned in the set includes all of its\nchild information including: all of its\n[CatalogItemVariation](entity:CatalogItemVariation) objects, references to\nits [CatalogModifierList](entity:CatalogModifierList) objects, and the ids of\nany [CatalogTax](entity:CatalogTax) objects that apply to it.",
    method: "post",
    path: "/v2/catalog/batch-retrieve",
    pathParams: [],
    queryParams: [],
    requestType: "BatchRetrieveCatalogObjectsRequest",
    isMultipart: false,
    originalName: "BatchRetrieveCatalogObjects",
    isWrite: false
  } as ApiMethodInfo,

  batchUpsertobjects: {
    description: "The target objects are grouped into batches and each batch is\ninserted/updated in an all-or-nothing manner. If an object within a batch is\nmalformed in some way, or violates a database constraint, the entire batch\ncontaining that item will be disregarded. However, other batches in the same\nrequest may still succeed. Each batch may contain up to 1,000 objects, and\nbatches will be processed in order as long as the total object count for the\nrequest (items, variations, modifier lists, discounts, and taxes) is no more\nthan 10,000.\n\nTo ensure consistency, only one update request is processed at a time per seller account.\nWhile one (batch or non-batch) update request is being processed, other (batched and non-batched)\nupdate requests are rejected with the `429` error code.",
    method: "post",
    path: "/v2/catalog/batch-upsert",
    pathParams: [],
    queryParams: [],
    requestType: "BatchUpsertCatalogObjectsRequest",
    isMultipart: false,
    originalName: "BatchUpsertCatalogObjects",
    isWrite: true
  } as ApiMethodInfo,

  createImage: {
    description: "The resulting `CatalogImage` is unattached to any `CatalogObject` if the `object_id`\nis not specified.\n\nThis `CreateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in\nJPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.",
    method: "post",
    path: "/v2/catalog/images",
    pathParams: [],
    queryParams: [],
    requestType: "CreateCatalogImageRequest",
    isMultipart: true,
    originalName: "CreateCatalogImage",
    isWrite: true
  } as ApiMethodInfo,

  updateImage: {
    description: "This `UpdateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in\nJPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.",
    method: "put",
    path: "/v2/catalog/images/{image_id}",
    pathParams: [{"name":"image_id","type":"string","description":"The ID of the `CatalogImage` object to update the encapsulated image file."}],
    queryParams: [],
    requestType: "UpdateCatalogImageRequest",
    isMultipart: true,
    originalName: "UpdateCatalogImage",
    isWrite: true
  } as ApiMethodInfo,

  info: {
    description: "Catalog CatalogInfo operation",
    method: "get",
    path: "/v2/catalog/info",
    pathParams: [],
    queryParams: [],
    requestType: "CatalogInfoRequest",
    isMultipart: false,
    originalName: "CatalogInfo",
    isWrite: false
  } as ApiMethodInfo,

  list: {
    description: "The `types` parameter is specified as a comma-separated list of the [CatalogObjectType](entity:CatalogObjectType) values,\nfor example, \"`ITEM`, `ITEM_VARIATION`, `MODIFIER`, `MODIFIER_LIST`, `CATEGORY`, `DISCOUNT`, `TAX`, `IMAGE`\".\n\n__Important:__ ListCatalog does not return deleted catalog items. To retrieve\ndeleted catalog items, use [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)\nand set the `include_deleted_objects` attribute value to `true`.",
    method: "get",
    path: "/v2/catalog/list",
    pathParams: [],
    queryParams: [{"name":"cursor","type":"string","description":"The pagination cursor returned in the previous response. Leave unset for an initial request.\nThe page size is currently set to be 100.\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."},{"name":"types","type":"string","description":"An optional case-insensitive, comma-separated list of object types to retrieve.\n\nThe valid values are defined in the [CatalogObjectType](entity:CatalogObjectType) enum, for example,\n`ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`,\n`MODIFIER`, `MODIFIER_LIST`, `IMAGE`, etc.\n\nIf this is unspecified, the operation returns objects of all the top level types at the version\nof the Square API used to make the request. Object types that are nested onto other object types\nare not included in the defaults.\n\nAt the current API version the default object types are:\nITEM, CATEGORY, TAX, DISCOUNT, MODIFIER_LIST, \nPRICING_RULE, PRODUCT_SET, TIME_PERIOD, MEASUREMENT_UNIT,\nSUBSCRIPTION_PLAN, ITEM_OPTION, CUSTOM_ATTRIBUTE_DEFINITION, QUICK_AMOUNT_SETTINGS."},{"name":"catalog_version","type":"integer","description":"The specific version of the catalog objects to be included in the response.\nThis allows you to retrieve historical versions of objects. The specified version value is matched against\nthe [CatalogObject](entity:CatalogObject)s' `version` attribute.  If not included, results will be from the\ncurrent version of the catalog."}],
    requestType: "ListCatalogRequest",
    isMultipart: false,
    originalName: "ListCatalog",
    isWrite: false
  } as ApiMethodInfo,

  upsertObject: {
    description: "To ensure consistency, only one update request is processed at a time per seller account.\nWhile one (batch or non-batch) update request is being processed, other (batched and non-batched)\nupdate requests are rejected with the `429` error code.",
    method: "post",
    path: "/v2/catalog/object",
    pathParams: [],
    queryParams: [],
    requestType: "UpsertCatalogObjectRequest",
    isMultipart: false,
    originalName: "UpsertCatalogObject",
    isWrite: true
  } as ApiMethodInfo,

  deleteObject: {
    description: "Deletion is a cascading event such that all children of the targeted object\nare also deleted. For example, deleting a [CatalogItem](entity:CatalogItem)\nwill also delete all of its\n[CatalogItemVariation](entity:CatalogItemVariation) children.\n\nTo ensure consistency, only one delete request is processed at a time per seller account.\nWhile one (batch or non-batch) delete request is being processed, other (batched and non-batched)\ndelete requests are rejected with the `429` error code.",
    method: "delete",
    path: "/v2/catalog/object/{object_id}",
    pathParams: [{"name":"object_id","type":"string","description":"The ID of the catalog object to be deleted. When an object is deleted, other\nobjects in the graph that depend on that object will be deleted as well (for example, deleting a\ncatalog item will delete its catalog item variations)."}],
    queryParams: [],
    requestType: "DeleteCatalogObjectRequest",
    isMultipart: false,
    originalName: "DeleteCatalogObject",
    isWrite: true
  } as ApiMethodInfo,

  getObject: {
    description: "The returned\nobject includes all of the relevant [CatalogItem](entity:CatalogItem)\ninformation including: [CatalogItemVariation](entity:CatalogItemVariation)\nchildren, references to its\n[CatalogModifierList](entity:CatalogModifierList) objects, and the ids of\nany [CatalogTax](entity:CatalogTax) objects that apply to it.",
    method: "get",
    path: "/v2/catalog/object/{object_id}",
    pathParams: [{"name":"object_id","type":"string","description":"The object ID of any type of catalog objects to be retrieved."}],
    queryParams: [{"name":"include_related_objects","type":"boolean","description":"If `true`, the response will include additional objects that are related to the\nrequested objects. Related objects are defined as any objects referenced by ID by the results in the `objects` field\nof the response. These objects are put in the `related_objects` field. Setting this to `true` is\nhelpful when the objects are needed for immediate display to a user.\nThis process only goes one level deep. Objects referenced by the related objects will not be included. For example,\n\nif the `objects` field of the response contains a CatalogItem, its associated\nCatalogCategory objects, CatalogTax objects, CatalogImage objects and\nCatalogModifierLists will be returned in the `related_objects` field of the\nresponse. If the `objects` field of the response contains a CatalogItemVariation,\nits parent CatalogItem will be returned in the `related_objects` field of\nthe response.\n\nDefault value: `false`"},{"name":"catalog_version","type":"integer","description":"Requests objects as of a specific version of the catalog. This allows you to retrieve historical\nversions of objects. The value to retrieve a specific version of an object can be found\nin the version field of [CatalogObject](entity:CatalogObject)s. If not included, results will\nbe from the current version of the catalog."},{"name":"include_category_path_to_root","type":"boolean","description":"Specifies whether or not to include the `path_to_root` list for each returned category instance. The `path_to_root` list consists\nof `CategoryPathToRootNode` objects and specifies the path that starts with the immediate parent category of the returned category\nand ends with its root category. If the returned category is a top-level category, the `path_to_root` list is empty and is not returned\nin the response payload."}],
    requestType: "RetrieveCatalogObjectRequest",
    isMultipart: false,
    originalName: "RetrieveCatalogObject",
    isWrite: false
  } as ApiMethodInfo,

  searchObjects: {
    description: "This (`SearchCatalogObjects`) endpoint differs from the [SearchCatalogItems](api-endpoint:Catalog-SearchCatalogItems)\nendpoint in the following aspects:\n\n- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.\n- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.\n- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.\n- The both endpoints have different call conventions, including the query filter formats.",
    method: "post",
    path: "/v2/catalog/search",
    pathParams: [],
    queryParams: [],
    requestType: "SearchCatalogObjectsRequest",
    isMultipart: false,
    originalName: "SearchCatalogObjects",
    isWrite: false
  } as ApiMethodInfo,

  searchItems: {
    description: "This (`SearchCatalogItems`) endpoint differs from the [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)\nendpoint in the following aspects:\n\n- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.\n- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.\n- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.\n- The both endpoints use different call conventions, including the query filter formats.",
    method: "post",
    path: "/v2/catalog/search-catalog-items",
    pathParams: [],
    queryParams: [],
    requestType: "SearchCatalogItemsRequest",
    isMultipart: false,
    originalName: "SearchCatalogItems",
    isWrite: false
  } as ApiMethodInfo,

  updateItemModifierLists: {
    description: "Catalog UpdateItemModifierLists operation",
    method: "post",
    path: "/v2/catalog/update-item-modifier-lists",
    pathParams: [],
    queryParams: [],
    requestType: "UpdateItemModifierListsRequest",
    isMultipart: false,
    originalName: "UpdateItemModifierLists",
    isWrite: true
  } as ApiMethodInfo,

  updateItemTaxes: {
    description: "Catalog UpdateItemTaxes operation",
    method: "post",
    path: "/v2/catalog/update-item-taxes",
    pathParams: [],
    queryParams: [],
    requestType: "UpdateItemTaxesRequest",
    isMultipart: false,
    originalName: "UpdateItemTaxes",
    isWrite: true
  } as ApiMethodInfo
};

/**
 * Handlers for each API endpoint
 */
export const CatalogHandlers = {
  batchDeleteobjects: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.batchDeleteobjects;
    
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

  batchGetobjects: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.batchGetobjects;
    
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

  batchUpsertobjects: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.batchUpsertobjects;
    
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

  info: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.info;
    
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

  upsertObject: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.upsertObject;
    
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

  searchObjects: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.searchObjects;
    
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

  searchItems: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.searchItems;
    
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

  updateItemModifierLists: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.updateItemModifierLists;
    
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

  updateItemTaxes: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.updateItemTaxes;
    
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

  deleteObject: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.deleteObject;
    
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
    const methodInfo = CatalogMethods.list;
    
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

  getObject: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.getObject;
    
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

  createImage: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.createImage;
    // Simple endpoint with no path or query parameters
    const url = methodInfo.path;

    // Handle multipart form data request
    const formData = new FormData();
    
    // Get file fields from type map
    const typeInfo = typeMap[methodInfo.requestType];
    const mainType = typeInfo.find((t: { name: string; properties: Array<{ name: string; isFile?: boolean }> }) => t.name === methodInfo.requestType);
    const fileFields = mainType?.properties.filter((p: { isFile?: boolean }) => p.isFile).map((p: { name: string }) => p.name) || [];
    
    // Add the JSON part first
    const jsonData = { ...args };
    // Remove file fields from JSON data but preserve 'image' if it exists
    const imageField = jsonData.image;
    fileFields.forEach(field => delete jsonData[field]);
    if (imageField !== undefined) {
      jsonData.image = imageField;
    }
    formData.append('request', JSON.stringify(jsonData), {
      contentType: 'application/json'
    });
    
    // Handle file fields
    for (const field of fileFields) {
      const filePath = args[field];
      if (filePath) {
        if (typeof filePath !== 'string') {
          throw new Error(`Expected file path string for field '${field}', got ${typeof filePath}`);
        }

        // Validate file exists
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found at path: ${filePath}`);
        }
        
        // Get file name and extension from path
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath).toLowerCase();
        
        // Create read stream for file
        const fileStream = fs.createReadStream(filePath);
        
        // Determine content type based on extension
        let contentType = 'application/octet-stream';
        if (['.jpg', '.jpeg'].includes(fileExt)) {
          contentType = 'image/jpeg';
        } else if (fileExt === '.png') {
          contentType = 'image/png';
        } else if (fileExt === '.gif') {
          contentType = 'image/gif';
        } else if (fileExt === '.pdf') {
          contentType = 'application/pdf';
        }
        
        // Add to form data - use 'image_file' as the field name for Square API
        formData.append('image_file', fileStream, {
          filename: fileName,
          contentType
        });
      }
    }

    // Make the multipart request
    const boundary = formData.getBoundary();
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: {
        ...getRequestHeaders(accessToken),
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: formData
    });
    return await handleResponse(response)
  },

  updateImage: async (accessToken: string, args: Record<string, unknown>) => {
    const methodInfo = CatalogMethods.updateImage;
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

    // Handle multipart form data request
    const formData = new FormData();
    
    // Get file fields from type map
    const typeInfo = typeMap[methodInfo.requestType];
    const mainType = typeInfo.find((t: { name: string; properties: Array<{ name: string; isFile?: boolean }> }) => t.name === methodInfo.requestType);
    const fileFields = mainType?.properties.filter((p: { isFile?: boolean }) => p.isFile).map((p: { name: string }) => p.name) || [];
    
    // Add the JSON part first
    const jsonData = { ...args };
    // Remove file fields from JSON data but preserve 'image' if it exists
    const imageField = jsonData.image;
    fileFields.forEach(field => delete jsonData[field]);
    if (imageField !== undefined) {
      jsonData.image = imageField;
    }
    formData.append('request', JSON.stringify(jsonData), {
      contentType: 'application/json'
    });
    
    // Handle file fields
    for (const field of fileFields) {
      const filePath = args[field];
      if (filePath) {
        if (typeof filePath !== 'string') {
          throw new Error(`Expected file path string for field '${field}', got ${typeof filePath}`);
        }

        // Validate file exists
        if (!fs.existsSync(filePath)) {
          throw new Error(`File not found at path: ${filePath}`);
        }
        
        // Get file name and extension from path
        const fileName = path.basename(filePath);
        const fileExt = path.extname(filePath).toLowerCase();
        
        // Create read stream for file
        const fileStream = fs.createReadStream(filePath);
        
        // Determine content type based on extension
        let contentType = 'application/octet-stream';
        if (['.jpg', '.jpeg'].includes(fileExt)) {
          contentType = 'image/jpeg';
        } else if (fileExt === '.png') {
          contentType = 'image/png';
        } else if (fileExt === '.gif') {
          contentType = 'image/gif';
        } else if (fileExt === '.pdf') {
          contentType = 'application/pdf';
        }
        
        // Add to form data - use 'image_file' as the field name for Square API
        formData.append('image_file', fileStream, {
          filename: fileName,
          contentType
        });
      }
    }

    // Make the multipart request
    const boundary = formData.getBoundary();
    const response = await fetch(`${baseUrl}${url}`, {
      method: methodInfo.method.toUpperCase(),
      headers: {
        ...getRequestHeaders(accessToken),
        'Content-Type': `multipart/form-data; boundary=${boundary}`
      },
      body: formData
    });
    return await handleResponse(response)
  }
};