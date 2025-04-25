/**
 * Shared configuration for Square API services
 */
import { Response } from 'node-fetch';
import { setBaseUrl } from './server.js';

/**
 * Configure base URL based on environment
 */
export const baseUrl = setBaseUrl()

/**
 * Square API version to use
 */
export const apiVersion = process.env.SQUARE_VERSION || '2025-04-16';

/**
 * Standard request headers for Square API
 * @param accessToken Square API access token
 * @returns Headers object
 */
export function getRequestHeaders(accessToken: string): Record<string, string> {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
    'Square-Version': apiVersion,
    'User-Agent': 'Square-MCP-Server/0.1.0'
  };
}

/**
 * Handle API response
 * @param response node-fetch Response object
 * @returns Response text
 */
export async function handleResponse(response: Response): Promise<string> {
  // Handle response
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || response.statusText);
  }

  // Return raw response text
  return await response.text().catch(() => {
    // Handle empty responses
    return '{"success": true}';
  });
}