#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import express from "express";
import cors from 'cors';
import crypto from 'crypto';
import { Server } from "http"
import { typeMap } from './utils/type-map.js';
import { ApiMethodInfo, ApiParameter } from './api-types.js';
import escapeHtml from 'escape-html';

import { ApplePayMethods, ApplePayHandlers } from './services/applepay.js';
import { BankAccountsMethods, BankAccountsHandlers } from './services/bankaccounts.js';
import { BookingCustomAttributesMethods, BookingCustomAttributesHandlers } from './services/bookingcustomattributes.js';
import { BookingsMethods, BookingsHandlers } from './services/bookings.js';
import { CardsMethods, CardsHandlers } from './services/cards.js';
import { CashDrawersMethods, CashDrawersHandlers } from './services/cashdrawers.js';
import { CatalogMethods, CatalogHandlers } from './services/catalog.js';
import { CheckoutMethods, CheckoutHandlers } from './services/checkout.js';
import { CustomerCustomAttributesMethods, CustomerCustomAttributesHandlers } from './services/customercustomattributes.js';
import { CustomerGroupsMethods, CustomerGroupsHandlers } from './services/customergroups.js';
import { CustomerSegmentsMethods, CustomerSegmentsHandlers } from './services/customersegments.js';
import { CustomersMethods, CustomersHandlers } from './services/customers.js';
import { DevicesMethods, DevicesHandlers } from './services/devices.js';
import { DisputesMethods, DisputesHandlers } from './services/disputes.js';
import { EventsMethods, EventsHandlers } from './services/events.js';
import { GiftCardActivitiesMethods, GiftCardActivitiesHandlers } from './services/giftcardactivities.js';
import { GiftCardsMethods, GiftCardsHandlers } from './services/giftcards.js';
import { InventoryMethods, InventoryHandlers } from './services/inventory.js';
import { InvoicesMethods, InvoicesHandlers } from './services/invoices.js';
import { LaborMethods, LaborHandlers } from './services/labor.js';
import { LocationCustomAttributesMethods, LocationCustomAttributesHandlers } from './services/locationcustomattributes.js';
import { LocationsMethods, LocationsHandlers } from './services/locations.js';
import { LoyaltyMethods, LoyaltyHandlers } from './services/loyalty.js';
import { MerchantCustomAttributesMethods, MerchantCustomAttributesHandlers } from './services/merchantcustomattributes.js';
import { MerchantsMethods, MerchantsHandlers } from './services/merchants.js';
import { OAuthMethods, OAuthHandlers } from './services/oauth.js';
import { OrderCustomAttributesMethods, OrderCustomAttributesHandlers } from './services/ordercustomattributes.js';
import { OrdersMethods, OrdersHandlers } from './services/orders.js';
import { PaymentsMethods, PaymentsHandlers } from './services/payments.js';
import { PayoutsMethods, PayoutsHandlers } from './services/payouts.js';
import { RefundsMethods, RefundsHandlers } from './services/refunds.js';
import { SitesMethods, SitesHandlers } from './services/sites.js';
import { SnippetsMethods, SnippetsHandlers } from './services/snippets.js';
import { SubscriptionsMethods, SubscriptionsHandlers } from './services/subscriptions.js';
import { TeamMethods, TeamHandlers } from './services/team.js';
import { TerminalMethods, TerminalHandlers } from './services/terminal.js';
import { VendorsMethods, VendorsHandlers } from './services/vendors.js';
import { WebhookSubscriptionsMethods, WebhookSubscriptionsHandlers } from './services/webhooksubscriptions.js';

// Create MCP server
const server = new McpServer(
  {
    name: "square-mcp",
    version: "1.0.0"
  }
);

// Target-specific code
/**
 * PUBLIC API
 * 
 * This MCP server is designed for public use with the Square API.
 * It provides a standard interface for accessing Square services
 * through the Model Context Protocol.
 * 
 * For questions or support, visit the Square Developer Forum:
 * https://developer.squareup.com/forums
 */

const accessToken: string | undefined = process.env.ACCESS_TOKEN;

async function getAccessToken(): Promise<string> {
  return accessToken || '';
}

export function setBaseUrl() {
  let baseUrl = "https://connect.squareup.com";

  if (process.env.SANDBOX == "true" && process.env.PRODUCTION == "true") {
    throw new Error("Both SANDBOX and PRODUCTION env vars are true");
  }
  if (process.env.SANDBOX == "true") {
    baseUrl = "https://connect.squareupsandbox.com"
  }

  return baseUrl
}
setBaseUrl()

// Define types for service maps
type ServiceMethods = { [key: string]: { [key: string]: ApiMethodInfo } };
type ServiceHandlers = { [key: string]: { [key: string]: (accessToken: string, args: Record<string, unknown>) => Promise<unknown> } };

// Create a mapping of service methods and handlers
export const serviceMethodsMap: ServiceMethods = {
  "ApplePay": ApplePayMethods,
  "BankAccounts": BankAccountsMethods,
  "BookingCustomAttributes": BookingCustomAttributesMethods,
  "Bookings": BookingsMethods,
  "Cards": CardsMethods,
  "CashDrawers": CashDrawersMethods,
  "Catalog": CatalogMethods,
  "Checkout": CheckoutMethods,
  "CustomerCustomAttributes": CustomerCustomAttributesMethods,
  "CustomerGroups": CustomerGroupsMethods,
  "CustomerSegments": CustomerSegmentsMethods,
  "Customers": CustomersMethods,
  "Devices": DevicesMethods,
  "Disputes": DisputesMethods,
  "Events": EventsMethods,
  "GiftCardActivities": GiftCardActivitiesMethods,
  "GiftCards": GiftCardsMethods,
  "Inventory": InventoryMethods,
  "Invoices": InvoicesMethods,
  "Labor": LaborMethods,
  "LocationCustomAttributes": LocationCustomAttributesMethods,
  "Locations": LocationsMethods,
  "Loyalty": LoyaltyMethods,
  "MerchantCustomAttributes": MerchantCustomAttributesMethods,
  "Merchants": MerchantsMethods,
  "OAuth": OAuthMethods,
  "OrderCustomAttributes": OrderCustomAttributesMethods,
  "Orders": OrdersMethods,
  "Payments": PaymentsMethods,
  "Payouts": PayoutsMethods,
  "Refunds": RefundsMethods,
  "Sites": SitesMethods,
  "Snippets": SnippetsMethods,
  "Subscriptions": SubscriptionsMethods,
  "Team": TeamMethods,
  "Terminal": TerminalMethods,
  "Vendors": VendorsMethods,
  "WebhookSubscriptions": WebhookSubscriptionsMethods
};

export const serviceHandlersMap: ServiceHandlers = {
  "ApplePay": ApplePayHandlers,
  "BankAccounts": BankAccountsHandlers,
  "BookingCustomAttributes": BookingCustomAttributesHandlers,
  "Bookings": BookingsHandlers,
  "Cards": CardsHandlers,
  "CashDrawers": CashDrawersHandlers,
  "Catalog": CatalogHandlers,
  "Checkout": CheckoutHandlers,
  "CustomerCustomAttributes": CustomerCustomAttributesHandlers,
  "CustomerGroups": CustomerGroupsHandlers,
  "CustomerSegments": CustomerSegmentsHandlers,
  "Customers": CustomersHandlers,
  "Devices": DevicesHandlers,
  "Disputes": DisputesHandlers,
  "Events": EventsHandlers,
  "GiftCardActivities": GiftCardActivitiesHandlers,
  "GiftCards": GiftCardsHandlers,
  "Inventory": InventoryHandlers,
  "Invoices": InvoicesHandlers,
  "Labor": LaborHandlers,
  "LocationCustomAttributes": LocationCustomAttributesHandlers,
  "Locations": LocationsHandlers,
  "Loyalty": LoyaltyHandlers,
  "MerchantCustomAttributes": MerchantCustomAttributesHandlers,
  "Merchants": MerchantsHandlers,
  "OAuth": OAuthHandlers,
  "OrderCustomAttributes": OrderCustomAttributesHandlers,
  "Orders": OrdersHandlers,
  "Payments": PaymentsHandlers,
  "Payouts": PayoutsHandlers,
  "Refunds": RefundsHandlers,
  "Sites": SitesHandlers,
  "Snippets": SnippetsHandlers,
  "Subscriptions": SubscriptionsHandlers,
  "Team": TeamHandlers,
  "Terminal": TerminalHandlers,
  "Vendors": VendorsHandlers,
  "WebhookSubscriptions": WebhookSubscriptionsHandlers
};

// Register unified Square API tool
server.tool(
  "make_api_request",
  `Unified tool for all Square API operations. Be sure to get types before calling. Available services:
  ${Object.keys(serviceMethodsMap).map(name => name.toLowerCase()).join(", ")}.`,
  {
    service: z.string().describe("The Square API service category (e.g., 'catalog', 'payments')"),
    method: z.string().describe("The API method to call (e.g., 'list', 'create')"),
    request: z.any().optional().describe("The request object for the API call")
  },
  async (params) => {
    try {
      const { service, method, request } = params;
      const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
      
      const methods = serviceMethodsMap[serviceName];
      if (!methods) {
        throw new Error(`Invalid service: ${service}. Available services: ${JSON.stringify(Object.keys(serviceMethodsMap), null, 2)}`);
      }

      const handlers = serviceHandlersMap[serviceName];
      if (!methods[method]) {
        throw new Error(`Invalid method ${method} for service ${service}. Available methods: ${JSON.stringify(Object.keys(methods), null, 2)}`);
      }
      

      // Support read-only mode if desired
      const methodInfo = methods[method];
      if (process.env.DISALLOW_WRITES == "true" && methodInfo?.isWrite) {
        throw new Error(`Write operations are not allowed in this environment. Please set DISALLOW_WRITES to false to enable write operations. Attempted operation: ${service}.${method}`);
      }

      const handler = handlers[method];
      if (!handler) {
        throw new Error(`No handler found for ${service}.${method}`);
      }

      const token = await getAccessToken();
      const result = await handler(token, request || {});

      return {
        content: [{
          type: "text",
          text: result as string
        }]
      };
    } catch (err: any) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: err.message,
            details: err.errors || err.stack
          }, null, 2)
        }],
        isError: true
      };
    }
  });

// Register get_request_type tool
server.tool(
  "get_type_info",
  "Get type information for a Square API method. You must call this before calling the make_api_request tool.",
  {
    service: z.string().describe("The Square API service category (e.g., 'catalog', 'payments')"),
    method: z.string().describe("The API method to call (e.g., 'list', 'create')")
  },
  async (params) => {
    try {
      const { service, method } = params;
      const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
      
      const methods = serviceMethodsMap[serviceName];
      if (!methods) {
        throw new Error(`Invalid service: ${service}. Available services: ${JSON.stringify(Object.keys(serviceMethodsMap), null, 2)}`);
      }

      if (!methods[method]) {
        throw new Error(`Invalid method ${method} for service ${service}. Available methods: ${JSON.stringify(Object.keys(methods), null, 2)}`);
      }

      const methodInfo = methods[method];
      const requestTypeName = methodInfo.requestType;
      
      const typeInfo = typeMap[requestTypeName];
      if (!typeInfo) {
        throw new Error(`Type information not found for ${requestTypeName}`);
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(typeInfo, null, 2)
        }]
      };
    } catch (err: any) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: err.message,
            details: err.errors || err.stack
          }, null, 2)
        }],
        isError: true
      };
    }
  }
);

// register service info tool
server.tool(
  "get_service_info",
  "Get information about a Square API service. Call me before trying to get type info",
  {
    service: z.string().describe("The Square API service category (e.g., 'catalog', 'payments')")
  },
  async (params) => {
    try {
      const { service } = params;
      const serviceName = service.charAt(0).toUpperCase() + service.slice(1);
      
      const methods = serviceMethodsMap[serviceName];
      if (!methods) {
        throw new Error(`Invalid service: ${service}. Available services: ${JSON.stringify(Object.keys(serviceMethodsMap), null, 2)}`);
      }

      // Create a map of method names to their descriptions
      const methodInfo = Object.entries(methods).reduce((acc, [methodName, info]) => {
        acc[methodName] = {
          description: info.description
        };
        return acc;
      }, {} as Record<string, { description: string }>);

      return {
        content: [{
          type: "text",
          text: JSON.stringify(methodInfo, null, 2)
        }]
      };
    } catch (err: any) {
      return {
        content: [{
          type: "text",
          text: JSON.stringify({
            error: err.message,
            details: err.errors || err.stack
          }, null, 2)
        }],
        isError: true
      };
    }
  }
);

export async function startServer() {
  // Connect to the transport and start listening
  await server.connect(new StdioServerTransport());
}