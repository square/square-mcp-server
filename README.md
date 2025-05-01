# Square Model Context Protocol Server (Beta)

This project follows the [Model Context Protocol](https://modelcontextprotocol.com/) standard, allowing AI assistants to interact with Square's connect API.

## Quick Start

Get up and running with the Square MCP server using npx:

```bash
# Basic startup
npx square-mcp-server start

# With environment configuration
ACCESS_TOKEN=YOUR_SQUARE_ACCESS_TOKEN SANDBOX=true npx square-mcp-server start

# local runs
npx /path/to/project/square-mcp-server
```

Replace `YOUR_SQUARE_ACCESS_TOKEN` with your actual Square access token. You can obtain your access token by following the guide at [Square Access Tokens](https://developer.squareup.com/docs/build-basics/access-tokens). You can also set environment variables before running the command.

## Remote MCP Server

Square now offers a hosted remote MCP server at:

```
https://mcp.squareup.com/sse
```

The remote MCP is recommended as it uses OAuth authentication, allowing you to log in with your Square account directly without having to create or manage access tokens manually.

## Configuration Options

| Environment Variable | Purpose | Example |
|---------------------|---------|---------|
| `ACCESS_TOKEN` | Your Square API access token | `ACCESS_TOKEN=sq0atp-...` |
| `SANDBOX` | Use Square sandbox environment | `SANDBOX=true` |
| `PRODUCTION` | Use Square production environment | `PRODUCTION=true` |
| `DISALLOW_WRITES` | Restrict to read-only operations | `DISALLOW_WRITES=true` |
| `SQUARE_VERSION` | Specify Square API version | `SQUARE_VERSION=2025-04-16` |

## Integration with AI Assistants

### Goose Integration

To configure the Square MCP Server with [Goose](https://block.github.io/goose/):

#### Remote MCP
To install the Square remote MCP in Goose, click this URL on a computer where Goose is installed:

[goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fmcp.squareup.com%2Fsse&id=square_mcp_production_remote&name=Square%20MCP%20Remote&description=Square%20Production%20MCP%20Remote](goose://extension?cmd=npx&arg=mcp-remote&arg=https%3A%2F%2Fmcp.squareup.com%2Fsse&id=square_mcp_production_remote&name=Square%20MCP%20Remote&description=Square%20Production%20MCP%20Remote)

Or copy and paste the URL into your browser's address bar.

```bash
# Automatic installation
npx square-mcp-server install

# Get URL for manual installation
npx square-mcp-server get-goose-url
```

The `install` command automatically updates your Goose configuration.

### Claude Desktop Integration

For Claude Desktop integration, see the [Model Context Protocol Quickstart Guide](https://modelcontextprotocol.io/quickstart/user). Add this configuration to your `claude_desktop_config.json`:

#### Remote MCP
```json
{
  "mcpServers": {
    "mcp_square_api": {
      "command": "npx",
      "args": ["mcp-remote", "https://mcp.squareup.com/sse"]
    }
  }
}
```

This approach allows you to authenticate directly with your Square account credentials without needing to manage access tokens.

#### Local MCP
```json
{
  "mcpServers": {
    "mcp_square_api": {
      "command": "npx",
      "args": ["square-mcp-server", "start"],
      "env": {
        "ACCESS_TOKEN": "YOUR_SQUARE_ACCESS_TOKEN",
        "SANDBOX": "true"
      }
    }
  }
}
```

## Tool Reference

The Square MCP Server provides a streamlined set of tools for interacting with Square APIs:

| Tool | Description | Primary Use |
|------|-------------|------------|
| `get_service_info` | Discover methods available for a service | Exploration and discovery |
| `get_type_info` | Get detailed parameter requirements | Request preparation |
| `make_api_request` | Execute API calls to Square | Performing operations |

## Service Catalog

Square MCP Server provides access to Square's complete [API ecosystem](https://developer.squareup.com/reference/square). Check out the [Square API Documentation](https://developer.squareup.com/docs) for detailed information about each service:

| Service | Description |
|---------|-------------|
| `applepay` | Apple Pay integration |
| `bankaccounts` | Bank account management |
| `bookingcustomattributes` | Custom attributes for bookings |
| `bookings` | Appointment booking management |
| `cards` | Payment card management |
| `cashdrawers` | Cash drawer management |
| `catalog` | Catalog management (items, categories, etc.) |
| `checkout` | Checkout and payment processing |
| `customercustomattributes` | Custom attributes for customers |
| `customergroups` | Customer grouping |
| `customersegments` | Customer segmentation |
| `customers` | Customer management |
| `devices` | Square device management |
| `disputes` | Payment dispute handling |
| `events` | Event tracking |
| `giftcardactivities` | Gift card activity tracking |
| `giftcards` | Gift card management |
| `inventory` | Inventory tracking |
| `invoices` | Invoice management |
| `labor` | Workforce management |
| `locationcustomattributes` | Custom attributes for locations |
| `locations` | Location management |
| `loyalty` | Loyalty program management |
| `merchantcustomattributes` | Custom attributes for merchants |
| `merchants` | Merchant account management |
| `oauth` | Authentication |
| `ordercustomattributes` | Custom attributes for orders |
| `orders` | Order management |
| `payments` | Payment processing |
| `payouts` | Payout management |
| `refunds` | Refund management |
| `sites` | Website integration |
| `snippets` | Square Online Code integration |
| `subscriptions` | Subscription management |
| `team` | Staff management |
| `terminal` | Square Terminal management |
| `vendors` | Supplier management |
| `webhooksubscriptions` | Event notifications |

## Usage Pattern

For optimal interaction with the Square API through MCP:

1. **Discover**: Use `get_service_info` to explore available methods
   ```
   get_service_info(service: "catalog")
   ```

2. **Understand**: Use `get_type_info` to learn parameter requirements
   ```
   get_type_info(service: "catalog", method: "list")
   ```

3. **Execute**: Use `make_api_request` to perform the operation
   ```
   make_api_request(service: "catalog", method: "list", request: {})
   ```

## Development and Debugging

### Using MCP Inspector

The [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) provides a visual interface for testing:

```bash
# Build the project
npm run build

# Start the inspector with the Square MCP Server
npx @modelcontextprotocol/inspector node dist/index.js start
```

### Development Workflow

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development mode: `npm run watch`
4. Run the server: `node dist/index.js start`
5. Test your changes using the MCP Inspector

## Contributing

This repository is auto-generated from Square's OpenAPI Specification. While contributions are welcome, please note that changes will need to be incorporated into the generator that produces this code. Please open an issue to discuss proposed changes before submitting a pull request.
