import { ApiInfo, ApiEndpoint } from '../api-types.js';

/**
 * API map for all Square API endpoints
 */
export const apiMap: ApiInfo[] = [
  {
    "api": {
      "name": "Apple Pay",
      "description": "\nThe Apple Pay APIs provides an easy way for platform developers\nto bulk activate Web Apple Pay with Square for merchants using their platform.\n\nFor more information, see the following guides:\n- [Web Payments SDK](https://developer.squareup.com/docs/web-payments/apple-pay)\n- [In-App Payments SDK](https://developer.squareup.com/docs/in-app-payments-sdk/add-digital-wallets/apple-pay)"
    },
    "endpoint": {
      "name": "RegisterDomain",
      "description": "A validation\nis performed on this domain by Apple to ensure that it is properly set up as\nan Apple Pay enabled domain.\n\nThis endpoint provides an easy way for platform developers to bulk activate\nApple Pay on the Web with Square for merchants using their platform.\n\nNote: You will need to host a valid domain verification file on your domain to support Apple Pay.  The\ncurrent version of this file is always available at https://app.squareup.com/digital-wallets/apple-pay/apple-developer-merchantid-domain-association,\nand should be hosted at `.well_known/apple-developer-merchantid-domain-association` on your\ndomain.  This file is subject to change; we strongly recommend checking for updates regularly and avoiding\nlong-lived caches that might not keep in sync with the correct file version.\n\nTo learn more about the Web Payments SDK and how to add Apple Pay, see [Take an Apple Pay Payment](https://developer.squareup.com/docs/web-payments/apple-pay).",
      "method": "post",
      "path": "/v2/apple-pay/domains",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bank Accounts",
      "description": "\nThe Bank Accounts API allows you to get basic details about a seller's bank account, such as the\nlast few digits of the account number and the routing number. It can be paired with the Payouts API to understand the\npattern of deposits and withdrawals from a seller's bank account.\n\nFor more information, see the following guides:\n - [Bank Accounts](https://developer.squareup.com/docs/bank-accounts-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListBankAccounts",
      "method": "get",
      "path": "/v2/bank-accounts",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor returned by a previous call to this endpoint.\nUse it in the next `ListBankAccounts` request to retrieve the next set \nof results.\n\nSee the [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination) guide for more information."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "Upper limit on the number of bank accounts to return in the response. \nCurrently, 1000 is the largest supported limit. You can specify a limit \nof up to 1000 bank accounts. This is also the default limit."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "Location ID. You can specify this optional filter \nto retrieve only the linked bank accounts belonging to a specific location."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bank Accounts",
      "description": "\nThe Bank Accounts API allows you to get basic details about a seller's bank account, such as the\nlast few digits of the account number and the routing number. It can be paired with the Payouts API to understand the\npattern of deposits and withdrawals from a seller's bank account.\n\nFor more information, see the following guides:\n - [Bank Accounts](https://developer.squareup.com/docs/bank-accounts-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "GetBankAccountByV1Id",
      "method": "get",
      "path": "/v2/bank-accounts/by-v1-id/{v1_bank_account_id}",
      "pathParameters": [
        {
          "name": "v1_bank_account_id",
          "type": "string",
          "description": "Connect V1 ID of the desired `BankAccount`. For more information, see \n[Retrieve a bank account by using an ID issued by V1 Bank Accounts API](https://developer.squareup.com/docs/bank-accounts-api#retrieve-a-bank-account-by-using-an-id-issued-by-v1-bank-accounts-api)."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bank Accounts",
      "description": "\nThe Bank Accounts API allows you to get basic details about a seller's bank account, such as the\nlast few digits of the account number and the routing number. It can be paired with the Payouts API to understand the\npattern of deposits and withdrawals from a seller's bank account.\n\nFor more information, see the following guides:\n - [Bank Accounts](https://developer.squareup.com/docs/bank-accounts-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "GetBankAccount",
      "method": "get",
      "path": "/v2/bank-accounts/{bank_account_id}",
      "pathParameters": [
        {
          "name": "bank_account_id",
          "type": "string",
          "description": "Square-issued ID of the desired `BankAccount`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListBookingCustomAttributeDefinitions",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "CreateBookingCustomAttributeDefinition",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "post",
      "path": "/v2/bookings/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "DeleteBookingCustomAttributeDefinition",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "delete",
      "path": "/v2/bookings/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveBookingCustomAttributeDefinition",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpdateBookingCustomAttributeDefinition",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "put",
      "path": "/v2/bookings/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkDeleteBookingCustomAttributes",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "post",
      "path": "/v2/bookings/custom-attributes/bulk-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkUpsertBookingCustomAttributes",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "post",
      "path": "/v2/bookings/custom-attributes/bulk-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListBookingCustomAttributes",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings/{booking_id}/custom-attributes",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the target [booking](entity:Booking)."
        }
      ],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "with_definitions",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "DeleteBookingCustomAttribute",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "delete",
      "path": "/v2/bookings/{booking_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the target [booking](entity:Booking)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveBookingCustomAttribute",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings/{booking_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the target [booking](entity:Booking)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "with_definition",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        },
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Booking Custom Attributes",
      "description": "\nUse the Booking Custom Attributes API to create and manage custom attributes for bookings to store properties or \nmetadata to support seller-specific customizations of and extensions to the `Booking` object. \n\nFor more information, see the following guides: \n - [Booking Custom Attributes](https://developer.squareup.com/docs/booking-custom-attributes-api/overview).\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpsertBookingCustomAttribute",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "put",
      "path": "/v2/bookings/{booking_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the target [booking](entity:Booking)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListBookings",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results per page to return in a paged response."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."
        },
        {
          "name": "customer_id",
          "type": "string",
          "description": "The [customer](entity:Customer) for whom to retrieve bookings. If this is not set, bookings for all customers are retrieved."
        },
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The team member for whom to retrieve bookings. If this is not set, bookings of all members are retrieved."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "The location for which to retrieve bookings. If this is not set, all locations' bookings are retrieved."
        },
        {
          "name": "start_at_min",
          "type": "string",
          "description": "The RFC 3339 timestamp specifying the earliest of the start time. If this is not set, the current time is used.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "start_at_max",
          "type": "string",
          "description": "The RFC 3339 timestamp specifying the latest of the start time. If this is not set, the time of 31 days after `start_at_min` is used.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "CreateBooking",
      "description": "The required input must include the following:\n- `Booking.location_id`\n- `Booking.start_at`\n- `Booking.AppointmentSegment.team_member_id`\n- `Booking.AppointmentSegment.service_variation_id`\n- `Booking.AppointmentSegment.service_variation_version`\n\nTo call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "post",
      "path": "/v2/bookings",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "SearchAvailability",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "post",
      "path": "/v2/bookings/availability/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkRetrieveBookings",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "post",
      "path": "/v2/bookings/bulk-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveBusinessBookingProfile",
      "method": "get",
      "path": "/v2/bookings/business-booking-profile",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListLocationBookingProfiles",
      "method": "get",
      "path": "/v2/bookings/location-booking-profiles",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a paged response."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveLocationBookingProfile",
      "method": "get",
      "path": "/v2/bookings/location-booking-profiles/{location_id}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to retrieve the booking profile."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListTeamMemberBookingProfiles",
      "method": "get",
      "path": "/v2/bookings/team-member-booking-profiles",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "bookable_only",
          "type": "boolean",
          "description": "Indicates whether to include only bookable team members in the returned result (`true`) or not (`false`)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a paged response."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor from the preceding response to return the next page of the results. Do not set this when retrieving the first page of the results."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "Indicates whether to include only team members enabled at the given location in the returned result."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkRetrieveTeamMemberBookingProfiles",
      "method": "post",
      "path": "/v2/bookings/team-member-booking-profiles/bulk-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveTeamMemberBookingProfile",
      "method": "get",
      "path": "/v2/bookings/team-member-booking-profiles/{team_member_id}",
      "pathParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The ID of the team member to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveBooking",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_READ` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_READ` and `APPOINTMENTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/bookings/{booking_id}",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the [Booking](entity:Booking) object representing the to-be-retrieved booking."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpdateBooking",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "put",
      "path": "/v2/bookings/{booking_id}",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the [Booking](entity:Booking) object representing the to-be-updated booking."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Bookings",
      "description": "\nThe Bookings API allows you to create, retrieve, update, and cancel appointments online. When used with other Square APIs (such as the Locations API, Team API, Catalog API, and Customers API), the Bookings API lets you create online-booking applications for users to book services provided by Square sellers.   \n\n\n## Why Use the Bookings API?\nThe Bookings API simplifies the scheduling process for Square sellers and their customers. By integrating with Square’s broader ecosystem, it offers a robust solution for managing appointments. Key Bookings API benefits include:\n\n\n* Comprehensive calendar control for sellers, with permissions that allow flexibility in creating bookings.\n* Streamlined buyer-level operations with secure and limited access.\n* Compatibility with Square’s Appointments subscription plans, offering additional features and functionality.\n* Custom attributes to personalize the booking experience.\n* Seamless integration with other Square APIs, such as [Customers API](https://developer.squareup.com/docs/customers-api/what-it-does), [Locations API](https://developer.squareup.com/docs/locations-api), [Team API](https://developer.squareup.com/docs/team/overview), and [Catalog API](https://developer.squareup.com/docs/catalog-api/what-it-does).\n\n\nFor more information, see the following guides:\n - [Bookings API Guide](https://developer.squareup.com/docs/bookings-api/what-it-is)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "CancelBooking",
      "description": "To call this endpoint with buyer-level permissions, set `APPOINTMENTS_WRITE` for the OAuth scope.\nTo call this endpoint with seller-level permissions, set `APPOINTMENTS_ALL_WRITE` and `APPOINTMENTS_WRITE` for the OAuth scope.\n\nFor calls to this endpoint with seller-level permissions to succeed, the seller must have subscribed to *Appointments Plus*\nor *Appointments Premium*.",
      "method": "post",
      "path": "/v2/bookings/{booking_id}/cancel",
      "pathParameters": [
        {
          "name": "booking_id",
          "type": "string",
          "description": "The ID of the [Booking](entity:Booking) object representing the to-be-cancelled booking."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cards",
      "description": "\nYou can use the [CreateCard](/reference/square/cards-api/create-card) endpoint to save a credit or debit card to a Square account.\nDevelopers can integrate the Cards API in their application to let Square sellers:\n\n- **Save a card that can be charged by any Square seller who uses your application.** Your application specifies the organization access token in the `CreateCard` request.\n- **Save a card that can be charged by a single Square seller.**  Your application specifies the access token of the specific seller account in the `CreateCard` request.\n\nThe Cards API also supports other endpoints to manage the cards.\n\nFor more information, see the following guides:\n - [Cards](https://developer.squareup.com/docs/cards-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListCards",
      "description": "A max of 25 cards will be returned.",
      "method": "get",
      "path": "/v2/cards",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."
        },
        {
          "name": "customer_id",
          "type": "string",
          "description": "Limit results to cards associated with the customer supplied.\nBy default, all cards owned by the merchant are returned."
        },
        {
          "name": "include_disabled",
          "type": "boolean",
          "description": "Includes disabled cards.\nBy default, all enabled cards owned by the merchant are returned."
        },
        {
          "name": "reference_id",
          "type": "string",
          "description": "Limit results to cards associated with the reference_id supplied."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "Sorts the returned list by when the card was created with the specified order.\nThis field defaults to ASC."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cards",
      "description": "\nYou can use the [CreateCard](/reference/square/cards-api/create-card) endpoint to save a credit or debit card to a Square account.\nDevelopers can integrate the Cards API in their application to let Square sellers:\n\n- **Save a card that can be charged by any Square seller who uses your application.** Your application specifies the organization access token in the `CreateCard` request.\n- **Save a card that can be charged by a single Square seller.**  Your application specifies the access token of the specific seller account in the `CreateCard` request.\n\nThe Cards API also supports other endpoints to manage the cards.\n\nFor more information, see the following guides:\n - [Cards](https://developer.squareup.com/docs/cards-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateCard",
      "method": "post",
      "path": "/v2/cards",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cards",
      "description": "\nYou can use the [CreateCard](/reference/square/cards-api/create-card) endpoint to save a credit or debit card to a Square account.\nDevelopers can integrate the Cards API in their application to let Square sellers:\n\n- **Save a card that can be charged by any Square seller who uses your application.** Your application specifies the organization access token in the `CreateCard` request.\n- **Save a card that can be charged by a single Square seller.**  Your application specifies the access token of the specific seller account in the `CreateCard` request.\n\nThe Cards API also supports other endpoints to manage the cards.\n\nFor more information, see the following guides:\n - [Cards](https://developer.squareup.com/docs/cards-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveCard",
      "method": "get",
      "path": "/v2/cards/{card_id}",
      "pathParameters": [
        {
          "name": "card_id",
          "type": "string",
          "description": "Unique ID for the desired Card."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cards",
      "description": "\nYou can use the [CreateCard](/reference/square/cards-api/create-card) endpoint to save a credit or debit card to a Square account.\nDevelopers can integrate the Cards API in their application to let Square sellers:\n\n- **Save a card that can be charged by any Square seller who uses your application.** Your application specifies the organization access token in the `CreateCard` request.\n- **Save a card that can be charged by a single Square seller.**  Your application specifies the access token of the specific seller account in the `CreateCard` request.\n\nThe Cards API also supports other endpoints to manage the cards.\n\nFor more information, see the following guides:\n - [Cards](https://developer.squareup.com/docs/cards-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DisableCard",
      "description": "Disabling an already disabled card is allowed but has no effect.",
      "method": "post",
      "path": "/v2/cards/{card_id}/disable",
      "pathParameters": [
        {
          "name": "card_id",
          "type": "string",
          "description": "Unique ID for the desired Card."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cash Drawers",
      "description": "\nCash drawer shifts track cash transactions so that the total money in the cash drawers can be reconciled for a\nspecific period of time (a cash drawer shift), for a particular device, in a particular location. The Cash Drawer Shifts API\nenables you to list and retrieve information about cash drawer shifts.\n\nFor more information, see the following guide:\n - [Cash Drawer Shifts](https://developer.squareup.com/docs/cashdrawershift-api/reporting)"
    },
    "endpoint": {
      "name": "ListCashDrawerShifts",
      "method": "get",
      "path": "/v2/cash-drawers/shifts",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to query for a list of cash drawer shifts."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which cash drawer shifts are listed in the response,\nbased on their opened_at field. Default value: ASC"
        },
        {
          "name": "begin_time",
          "type": "string",
          "description": "The inclusive start time of the query on opened_at, in ISO 8601 format."
        },
        {
          "name": "end_time",
          "type": "string",
          "description": "The exclusive end date of the query on opened_at, in ISO 8601 format."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "Number of cash drawer shift events in a page of results (200 by\ndefault, 1000 max)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "Opaque cursor for fetching the next page of results."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cash Drawers",
      "description": "\nCash drawer shifts track cash transactions so that the total money in the cash drawers can be reconciled for a\nspecific period of time (a cash drawer shift), for a particular device, in a particular location. The Cash Drawer Shifts API\nenables you to list and retrieve information about cash drawer shifts.\n\nFor more information, see the following guide:\n - [Cash Drawer Shifts](https://developer.squareup.com/docs/cashdrawershift-api/reporting)"
    },
    "endpoint": {
      "name": "RetrieveCashDrawerShift",
      "description": "See\n[ListCashDrawerShiftEvents](api-endpoint:CashDrawers-ListCashDrawerShiftEvents) for a list of cash drawer shift events.",
      "method": "get",
      "path": "/v2/cash-drawers/shifts/{shift_id}",
      "pathParameters": [
        {
          "name": "shift_id",
          "type": "string",
          "description": "The shift ID."
        }
      ],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to retrieve cash drawer shifts from."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Cash Drawers",
      "description": "\nCash drawer shifts track cash transactions so that the total money in the cash drawers can be reconciled for a\nspecific period of time (a cash drawer shift), for a particular device, in a particular location. The Cash Drawer Shifts API\nenables you to list and retrieve information about cash drawer shifts.\n\nFor more information, see the following guide:\n - [Cash Drawer Shifts](https://developer.squareup.com/docs/cashdrawershift-api/reporting)"
    },
    "endpoint": {
      "name": "ListCashDrawerShiftEvents",
      "method": "get",
      "path": "/v2/cash-drawers/shifts/{shift_id}/events",
      "pathParameters": [
        {
          "name": "shift_id",
          "type": "string",
          "description": "The shift ID."
        }
      ],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to list cash drawer shifts for."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "Number of resources to be returned in a page of results (200 by\ndefault, 1000 max)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "Opaque cursor for fetching the next page of results."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchDeleteCatalogObjects",
      "description": "Deletion is a cascading event such that all children of the\ntargeted object are also deleted. For example, deleting a CatalogItem will\nalso delete all of its [CatalogItemVariation](entity:CatalogItemVariation)\nchildren.\n\n`BatchDeleteCatalogObjects` succeeds even if only a portion of the targeted\nIDs can be deleted. The response will only include IDs that were\nactually deleted.\n\nTo ensure consistency, only one delete request is processed at a time per seller account.\nWhile one (batch or non-batch) delete request is being processed, other (batched and non-batched)\ndelete requests are rejected with the `429` error code.",
      "method": "post",
      "path": "/v2/catalog/batch-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchRetrieveCatalogObjects",
      "description": "Each [CatalogItem](entity:CatalogItem) returned in the set includes all of its\nchild information including: all of its\n[CatalogItemVariation](entity:CatalogItemVariation) objects, references to\nits [CatalogModifierList](entity:CatalogModifierList) objects, and the ids of\nany [CatalogTax](entity:CatalogTax) objects that apply to it.",
      "method": "post",
      "path": "/v2/catalog/batch-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchUpsertCatalogObjects",
      "description": "The target objects are grouped into batches and each batch is\ninserted/updated in an all-or-nothing manner. If an object within a batch is\nmalformed in some way, or violates a database constraint, the entire batch\ncontaining that item will be disregarded. However, other batches in the same\nrequest may still succeed. Each batch may contain up to 1,000 objects, and\nbatches will be processed in order as long as the total object count for the\nrequest (items, variations, modifier lists, discounts, and taxes) is no more\nthan 10,000.\n\nTo ensure consistency, only one update request is processed at a time per seller account.\nWhile one (batch or non-batch) update request is being processed, other (batched and non-batched)\nupdate requests are rejected with the `429` error code.",
      "method": "post",
      "path": "/v2/catalog/batch-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateCatalogImage",
      "description": "The resulting `CatalogImage` is unattached to any `CatalogObject` if the `object_id`\nis not specified.\n\nThis `CreateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in\nJPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.",
      "method": "post",
      "path": "/v2/catalog/images",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": true
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateCatalogImage",
      "description": "This `UpdateCatalogImage` endpoint accepts HTTP multipart/form-data requests with a JSON part and an image file part in\nJPEG, PJPEG, PNG, or GIF format. The maximum file size is 15MB.",
      "method": "put",
      "path": "/v2/catalog/images/{image_id}",
      "pathParameters": [
        {
          "name": "image_id",
          "type": "string",
          "description": "The ID of the `CatalogImage` object to update the encapsulated image file."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": true
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CatalogInfo",
      "method": "get",
      "path": "/v2/catalog/info",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListCatalog",
      "description": "The `types` parameter is specified as a comma-separated list of the [CatalogObjectType](entity:CatalogObjectType) values,\nfor example, \"`ITEM`, `ITEM_VARIATION`, `MODIFIER`, `MODIFIER_LIST`, `CATEGORY`, `DISCOUNT`, `TAX`, `IMAGE`\".\n\n__Important:__ ListCatalog does not return deleted catalog items. To retrieve\ndeleted catalog items, use [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)\nand set the `include_deleted_objects` attribute value to `true`.",
      "method": "get",
      "path": "/v2/catalog/list",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor returned in the previous response. Leave unset for an initial request.\nThe page size is currently set to be 100.\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."
        },
        {
          "name": "types",
          "type": "string",
          "description": "An optional case-insensitive, comma-separated list of object types to retrieve.\n\nThe valid values are defined in the [CatalogObjectType](entity:CatalogObjectType) enum, for example,\n`ITEM`, `ITEM_VARIATION`, `CATEGORY`, `DISCOUNT`, `TAX`,\n`MODIFIER`, `MODIFIER_LIST`, `IMAGE`, etc.\n\nIf this is unspecified, the operation returns objects of all the top level types at the version\nof the Square API used to make the request. Object types that are nested onto other object types\nare not included in the defaults.\n\nAt the current API version the default object types are:\nITEM, CATEGORY, TAX, DISCOUNT, MODIFIER_LIST, \nPRICING_RULE, PRODUCT_SET, TIME_PERIOD, MEASUREMENT_UNIT,\nSUBSCRIPTION_PLAN, ITEM_OPTION, CUSTOM_ATTRIBUTE_DEFINITION, QUICK_AMOUNT_SETTINGS."
        },
        {
          "name": "catalog_version",
          "type": "integer",
          "description": "The specific version of the catalog objects to be included in the response.\nThis allows you to retrieve historical versions of objects. The specified version value is matched against\nthe [CatalogObject](entity:CatalogObject)s' `version` attribute.  If not included, results will be from the\ncurrent version of the catalog."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpsertCatalogObject",
      "description": "To ensure consistency, only one update request is processed at a time per seller account.\nWhile one (batch or non-batch) update request is being processed, other (batched and non-batched)\nupdate requests are rejected with the `429` error code.",
      "method": "post",
      "path": "/v2/catalog/object",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteCatalogObject",
      "description": "Deletion is a cascading event such that all children of the targeted object\nare also deleted. For example, deleting a [CatalogItem](entity:CatalogItem)\nwill also delete all of its\n[CatalogItemVariation](entity:CatalogItemVariation) children.\n\nTo ensure consistency, only one delete request is processed at a time per seller account.\nWhile one (batch or non-batch) delete request is being processed, other (batched and non-batched)\ndelete requests are rejected with the `429` error code.",
      "method": "delete",
      "path": "/v2/catalog/object/{object_id}",
      "pathParameters": [
        {
          "name": "object_id",
          "type": "string",
          "description": "The ID of the catalog object to be deleted. When an object is deleted, other\nobjects in the graph that depend on that object will be deleted as well (for example, deleting a\ncatalog item will delete its catalog item variations)."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveCatalogObject",
      "description": "The returned\nobject includes all of the relevant [CatalogItem](entity:CatalogItem)\ninformation including: [CatalogItemVariation](entity:CatalogItemVariation)\nchildren, references to its\n[CatalogModifierList](entity:CatalogModifierList) objects, and the ids of\nany [CatalogTax](entity:CatalogTax) objects that apply to it.",
      "method": "get",
      "path": "/v2/catalog/object/{object_id}",
      "pathParameters": [
        {
          "name": "object_id",
          "type": "string",
          "description": "The object ID of any type of catalog objects to be retrieved."
        }
      ],
      "queryParameters": [
        {
          "name": "include_related_objects",
          "type": "boolean",
          "description": "If `true`, the response will include additional objects that are related to the\nrequested objects. Related objects are defined as any objects referenced by ID by the results in the `objects` field\nof the response. These objects are put in the `related_objects` field. Setting this to `true` is\nhelpful when the objects are needed for immediate display to a user.\nThis process only goes one level deep. Objects referenced by the related objects will not be included. For example,\n\nif the `objects` field of the response contains a CatalogItem, its associated\nCatalogCategory objects, CatalogTax objects, CatalogImage objects and\nCatalogModifierLists will be returned in the `related_objects` field of the\nresponse. If the `objects` field of the response contains a CatalogItemVariation,\nits parent CatalogItem will be returned in the `related_objects` field of\nthe response.\n\nDefault value: `false`"
        },
        {
          "name": "catalog_version",
          "type": "integer",
          "description": "Requests objects as of a specific version of the catalog. This allows you to retrieve historical\nversions of objects. The value to retrieve a specific version of an object can be found\nin the version field of [CatalogObject](entity:CatalogObject)s. If not included, results will\nbe from the current version of the catalog."
        },
        {
          "name": "include_category_path_to_root",
          "type": "boolean",
          "description": "Specifies whether or not to include the `path_to_root` list for each returned category instance. The `path_to_root` list consists\nof `CategoryPathToRootNode` objects and specifies the path that starts with the immediate parent category of the returned category\nand ends with its root category. If the returned category is a top-level category, the `path_to_root` list is empty and is not returned\nin the response payload."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchCatalogObjects",
      "description": "This (`SearchCatalogObjects`) endpoint differs from the [SearchCatalogItems](api-endpoint:Catalog-SearchCatalogItems)\nendpoint in the following aspects:\n\n- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.\n- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.\n- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.\n- The both endpoints have different call conventions, including the query filter formats.",
      "method": "post",
      "path": "/v2/catalog/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchCatalogItems",
      "description": "This (`SearchCatalogItems`) endpoint differs from the [SearchCatalogObjects](api-endpoint:Catalog-SearchCatalogObjects)\nendpoint in the following aspects:\n\n- `SearchCatalogItems` can only search for items or item variations, whereas `SearchCatalogObjects` can search for any type of catalog objects.\n- `SearchCatalogItems` supports the custom attribute query filters to return items or item variations that contain custom attribute values, where `SearchCatalogObjects` does not.\n- `SearchCatalogItems` does not support the `include_deleted_objects` filter to search for deleted items or item variations, whereas `SearchCatalogObjects` does.\n- The both endpoints use different call conventions, including the query filter formats.",
      "method": "post",
      "path": "/v2/catalog/search-catalog-items",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateItemModifierLists",
      "method": "post",
      "path": "/v2/catalog/update-item-modifier-lists",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Catalog",
      "description": "\nThe Catalog API allows you to programmatically catalog products or services, including items, variations, categories, discounts, taxes, modifiers, and more.\n\nFor more information, see the following guides:\n - [Catalog](https://developer.squareup.com/docs/catalog-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateItemTaxes",
      "method": "post",
      "path": "/v2/catalog/update-item-taxes",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "RetrieveLocationSettings",
      "method": "get",
      "path": "/v2/online-checkout/location-settings/{location_id}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location for which to retrieve settings."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "UpdateLocationSettings",
      "method": "put",
      "path": "/v2/online-checkout/location-settings/{location_id}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location for which to retrieve settings."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "RetrieveMerchantSettings",
      "method": "get",
      "path": "/v2/online-checkout/merchant-settings",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "UpdateMerchantSettings",
      "method": "put",
      "path": "/v2/online-checkout/merchant-settings",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "ListPaymentLinks",
      "method": "get",
      "path": "/v2/online-checkout/payment-links",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results.\nFor more  information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "A limit on the number of results to return per page. The limit is advisory and\nthe implementation might return more or less results. If the supplied limit is negative, zero, or\ngreater than the maximum limit of 1000, it is ignored.\n\nDefault value: `100`"
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "CreatePaymentLink",
      "description": "Applications can share the resulting payment link with their buyer to pay for goods and services.",
      "method": "post",
      "path": "/v2/online-checkout/payment-links",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "DeletePaymentLink",
      "method": "delete",
      "path": "/v2/online-checkout/payment-links/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The ID of the payment link to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "RetrievePaymentLink",
      "method": "get",
      "path": "/v2/online-checkout/payment-links/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The ID of link to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Checkout",
      "description": "\nWith the Square Checkout API, your customers can pay for a purchase through a simple, Square-hosted checkout page. It can be integrated into any payments workflow with minimal coding. \n\nYou can create and configure your checkout page through a `CreatePaymentLink` request, specifying the accepted payment methods and checkout options like tipping and custom fields.  You can also configure a URL for customers to be redirected to once they complete their purchase. \n\nFirst time Square developers should utilize the payment link endpoints to create, update, retrieve, and list checkout pages. \n\nFor more information, see the following guide:\n - [Checkout](https://developer.squareup.com/docs/checkout-api-overview)"
    },
    "endpoint": {
      "name": "UpdatePaymentLink",
      "description": "You can update the `payment_link` fields such as\n`description`, `checkout_options`, and  `pre_populated_data`.\nYou cannot update other fields such as the `order_id`, `version`, `URL`, or `timestamp` field.",
      "method": "put",
      "path": "/v2/online-checkout/payment-links/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The ID of the payment link to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListCustomerCustomAttributeDefinitions",
      "description": "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that\nseller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/customers/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateCustomerCustomAttributeDefinition",
      "description": "Use this endpoint to define a custom attribute that can be associated with customer profiles.\n\nA custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties\nfor a custom attribute. After the definition is created, you can call\n[UpsertCustomerCustomAttribute](api-endpoint:CustomerCustomAttributes-UpsertCustomerCustomAttribute) or\n[BulkUpsertCustomerCustomAttributes](api-endpoint:CustomerCustomAttributes-BulkUpsertCustomerCustomAttributes)\nto set the custom attribute for customer profiles in the seller's Customer Directory.\n\nSellers can view all custom attributes in exported customer data, including those set to\n`VISIBILITY_HIDDEN`.",
      "method": "post",
      "path": "/v2/customers/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteCustomerCustomAttributeDefinition",
      "description": "Deleting a custom attribute definition also deletes the corresponding custom attribute from\nall customer profiles in the seller's Customer Directory.\n\nOnly the definition owner can delete a custom attribute definition.",
      "method": "delete",
      "path": "/v2/customers/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveCustomerCustomAttributeDefinition",
      "description": "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/customers/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateCustomerCustomAttributeDefinition",
      "description": "Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the\n`schema` for a `Selection` data type.\n\nOnly the definition owner can update a custom attribute definition. Note that sellers can view\nall custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.",
      "method": "put",
      "path": "/v2/customers/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpsertCustomerCustomAttributes",
      "description": "Use this endpoint to set the value of one or more custom attributes for one or more customer profiles.\nA custom attribute is based on a custom attribute definition in a Square seller account, which is\ncreated using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.\n\nThis `BulkUpsertCustomerCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides a customer ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/customers/custom-attributes/bulk-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListCustomerCustomAttributes",
      "description": "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\n\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/customers/{customer_id}/custom-attributes",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the target [customer profile](entity:Customer)."
        }
      ],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "with_definitions",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteCustomerCustomAttribute",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "delete",
      "path": "/v2/customers/{customer_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the target [customer profile](entity:Customer)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveCustomerCustomAttribute",
      "description": "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\n\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/customers/{customer_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the target [customer profile](entity:Customer)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "with_definition",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        },
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Custom Attributes",
      "description": "\nUse the Customer Custom Attributes API to create and manage custom attributes for customer profiles. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for customer profiles in the seller's Customer Directory.\n\nFor more information, see the following guides:\n - [Customer Custom Attributes](https://developer.squareup.com/docs/customer-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpsertCustomerCustomAttribute",
      "description": "Use this endpoint to set the value of a custom attribute for a specified customer profile.\nA custom attribute is based on a custom attribute definition in a Square seller account, which\nis created using the [CreateCustomerCustomAttributeDefinition](api-endpoint:CustomerCustomAttributes-CreateCustomerCustomAttributeDefinition) endpoint.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/customers/{customer_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the target [customer profile](entity:Customer)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Groups",
      "description": "\nThe Customer Groups API lets you create and manage customer groups to provide targeted promotions or take other customized actions based on group membership. For example, you can create Weekly, Monthly, and Quarterly customer groups and add customers to them based on their preferences to receive marketing promotions on a weekly, monthly, and quarterly basis. You can then use the information to manage your marketing email schedule. \n\nYou can use the Customer Groups API to retrieve and manage customer groups. You can use the Customers API to add customers to and remove customers from groups and search for customers based on group membership.\n\nFor more information, see the following guide:\n - [Customer Groups](https://developer.squareup.com/docs/customer-groups-api/what-it-does)"
    },
    "endpoint": {
      "name": "ListCustomerGroups",
      "method": "get",
      "path": "/v2/customers/groups",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single page. This limit is advisory. The response might contain more or fewer results.\nIf the limit is less than 1 or greater than 50, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The default value is 50.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Groups",
      "description": "\nThe Customer Groups API lets you create and manage customer groups to provide targeted promotions or take other customized actions based on group membership. For example, you can create Weekly, Monthly, and Quarterly customer groups and add customers to them based on their preferences to receive marketing promotions on a weekly, monthly, and quarterly basis. You can then use the information to manage your marketing email schedule. \n\nYou can use the Customer Groups API to retrieve and manage customer groups. You can use the Customers API to add customers to and remove customers from groups and search for customers based on group membership.\n\nFor more information, see the following guide:\n - [Customer Groups](https://developer.squareup.com/docs/customer-groups-api/what-it-does)"
    },
    "endpoint": {
      "name": "CreateCustomerGroup",
      "description": "The request must include the `name` value of the group.",
      "method": "post",
      "path": "/v2/customers/groups",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Groups",
      "description": "\nThe Customer Groups API lets you create and manage customer groups to provide targeted promotions or take other customized actions based on group membership. For example, you can create Weekly, Monthly, and Quarterly customer groups and add customers to them based on their preferences to receive marketing promotions on a weekly, monthly, and quarterly basis. You can then use the information to manage your marketing email schedule. \n\nYou can use the Customer Groups API to retrieve and manage customer groups. You can use the Customers API to add customers to and remove customers from groups and search for customers based on group membership.\n\nFor more information, see the following guide:\n - [Customer Groups](https://developer.squareup.com/docs/customer-groups-api/what-it-does)"
    },
    "endpoint": {
      "name": "DeleteCustomerGroup",
      "method": "delete",
      "path": "/v2/customers/groups/{group_id}",
      "pathParameters": [
        {
          "name": "group_id",
          "type": "string",
          "description": "The ID of the customer group to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Groups",
      "description": "\nThe Customer Groups API lets you create and manage customer groups to provide targeted promotions or take other customized actions based on group membership. For example, you can create Weekly, Monthly, and Quarterly customer groups and add customers to them based on their preferences to receive marketing promotions on a weekly, monthly, and quarterly basis. You can then use the information to manage your marketing email schedule. \n\nYou can use the Customer Groups API to retrieve and manage customer groups. You can use the Customers API to add customers to and remove customers from groups and search for customers based on group membership.\n\nFor more information, see the following guide:\n - [Customer Groups](https://developer.squareup.com/docs/customer-groups-api/what-it-does)"
    },
    "endpoint": {
      "name": "RetrieveCustomerGroup",
      "method": "get",
      "path": "/v2/customers/groups/{group_id}",
      "pathParameters": [
        {
          "name": "group_id",
          "type": "string",
          "description": "The ID of the customer group to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Groups",
      "description": "\nThe Customer Groups API lets you create and manage customer groups to provide targeted promotions or take other customized actions based on group membership. For example, you can create Weekly, Monthly, and Quarterly customer groups and add customers to them based on their preferences to receive marketing promotions on a weekly, monthly, and quarterly basis. You can then use the information to manage your marketing email schedule. \n\nYou can use the Customer Groups API to retrieve and manage customer groups. You can use the Customers API to add customers to and remove customers from groups and search for customers based on group membership.\n\nFor more information, see the following guide:\n - [Customer Groups](https://developer.squareup.com/docs/customer-groups-api/what-it-does)"
    },
    "endpoint": {
      "name": "UpdateCustomerGroup",
      "method": "put",
      "path": "/v2/customers/groups/{group_id}",
      "pathParameters": [
        {
          "name": "group_id",
          "type": "string",
          "description": "The ID of the customer group to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Segments",
      "description": "\nThe Customer Segments API lets you retrieve information about the segments defined for a business. Square sellers can create customer segments in the Seller Dashboard or Point of Sale by defining filters for the segment. For example, a segment can include customers who have visited more than 10 times. Customers are automatically added to and removed from the segment over time based on this criterion. \n\nYou can inspect the customer's `segment_ids` property to determine which segments a customer belongs to. Then, you can use the Customer Segments API to retrieve basic details about each segment, such as the segment name and the time when it was created.\n\nFor more information, see the following guide:\n - [Customer Segments](https://developer.squareup.com/docs/customer-segments-api/what-it-does)"
    },
    "endpoint": {
      "name": "ListCustomerSegments",
      "method": "get",
      "path": "/v2/customers/segments",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by previous calls to `ListCustomerSegments`.\nThis cursor is used to retrieve the next set of query results.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single page. This limit is advisory. The response might contain more or fewer results.\nIf the specified limit is less than 1 or greater than 50, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The default value is 50.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customer Segments",
      "description": "\nThe Customer Segments API lets you retrieve information about the segments defined for a business. Square sellers can create customer segments in the Seller Dashboard or Point of Sale by defining filters for the segment. For example, a segment can include customers who have visited more than 10 times. Customers are automatically added to and removed from the segment over time based on this criterion. \n\nYou can inspect the customer's `segment_ids` property to determine which segments a customer belongs to. Then, you can use the Customer Segments API to retrieve basic details about each segment, such as the segment name and the time when it was created.\n\nFor more information, see the following guide:\n - [Customer Segments](https://developer.squareup.com/docs/customer-segments-api/what-it-does)"
    },
    "endpoint": {
      "name": "RetrieveCustomerSegment",
      "method": "get",
      "path": "/v2/customers/segments/{segment_id}",
      "pathParameters": [
        {
          "name": "segment_id",
          "type": "string",
          "description": "The Square-issued ID of the customer segment."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListCustomers",
      "description": "Under normal operating conditions, newly created or updated customer profiles become available\nfor the listing operation in well under 30 seconds. Occasionally, propagation of the new or updated\nprofiles can take closer to one minute or longer, especially during network incidents and outages.",
      "method": "get",
      "path": "/v2/customers",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single page. This limit is advisory. The response might contain more or fewer results.\nIf the specified limit is less than 1 or greater than 100, Square returns a `400 VALUE_TOO_LOW` or `400 VALUE_TOO_HIGH` error. The default value is 100.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "sort_field",
          "type": "string",
          "description": "Indicates how customers should be sorted.\n\nThe default value is `DEFAULT`."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "Indicates whether customers should be sorted in ascending (`ASC`) or\ndescending (`DESC`) order.\n\nThe default value is `ASC`."
        },
        {
          "name": "count",
          "type": "boolean",
          "description": "Indicates whether to return the total count of customers in the `count` field of the response.\n\nThe default value is `false`."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateCustomer",
      "description": "You must provide at least one of the following values in your request to this\nendpoint:\n\n- `given_name`\n- `family_name`\n- `company_name`\n- `email_address`\n- `phone_number`",
      "method": "post",
      "path": "/v2/customers",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkCreateCustomers",
      "description": "This endpoint takes a map of individual create requests and returns a map of responses.\n\nYou must provide at least one of the following values in each create request:\n\n- `given_name`\n- `family_name`\n- `company_name`\n- `email_address`\n- `phone_number`",
      "method": "post",
      "path": "/v2/customers/bulk-create",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkDeleteCustomers",
      "description": "The endpoint takes a list of customer IDs and returns a map of responses.",
      "method": "post",
      "path": "/v2/customers/bulk-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkRetrieveCustomers",
      "description": "This endpoint takes a list of customer IDs and returns a map of responses.",
      "method": "post",
      "path": "/v2/customers/bulk-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpdateCustomers",
      "description": "This endpoint takes a map of individual update requests and returns a map of responses.",
      "method": "post",
      "path": "/v2/customers/bulk-update",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchCustomers",
      "description": "Calling `SearchCustomers` without any explicit query filter returns all\ncustomer profiles ordered alphabetically based on `given_name` and\n`family_name`.\n\nUnder normal operating conditions, newly created or updated customer profiles become available\nfor the search operation in well under 30 seconds. Occasionally, propagation of the new or updated\nprofiles can take closer to one minute or longer, especially during network incidents and outages.",
      "method": "post",
      "path": "/v2/customers/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteCustomer",
      "description": "To delete a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.",
      "method": "delete",
      "path": "/v2/customers/{customer_id}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the customer to delete."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the customer profile.\n\nAs a best practice, you should include this parameter to enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency) control.  For more information, see [Delete a customer profile](https://developer.squareup.com/docs/customers-api/use-the-api/keep-records#delete-customer-profile)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveCustomer",
      "method": "get",
      "path": "/v2/customers/{customer_id}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the customer to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateCustomer",
      "description": "This endpoint supports sparse updates, so only new or changed fields are required in the request.\nTo add or update a field, specify the new value. To remove a field, specify `null`.\n\nTo update a customer profile that was created by merging existing profiles, you must use the ID of the newly created profile.",
      "method": "put",
      "path": "/v2/customers/{customer_id}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the customer to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RemoveGroupFromCustomer",
      "description": "The customer is identified by the `customer_id` value\nand the customer group is identified by the `group_id` value.",
      "method": "delete",
      "path": "/v2/customers/{customer_id}/groups/{group_id}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the customer to remove from the group."
        },
        {
          "name": "group_id",
          "type": "string",
          "description": "The ID of the customer group to remove the customer from."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Customers",
      "description": "\nThe Customers API enables you to create and manage customer profiles, as well as search for customers based on various criteria (including customer group membership). You can also use the API to sync contacts between your CRM system and Square.\n\nFor more information, see the following guides:\n - [Customers](https://developer.squareup.com/docs/customers-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "AddGroupToCustomer",
      "description": "The customer is identified by the `customer_id` value\nand the customer group is identified by the `group_id` value.",
      "method": "put",
      "path": "/v2/customers/{customer_id}/groups/{group_id}",
      "pathParameters": [
        {
          "name": "customer_id",
          "type": "string",
          "description": "The ID of the customer to add to a group."
        },
        {
          "name": "group_id",
          "type": "string",
          "description": "The ID of the customer group to add the customer to."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Devices",
      "description": "\nFor more information, see the following guides:\n - [Devices](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListDevices",
      "description": "Currently, only Terminal API\ndevices are supported.",
      "method": "get",
      "path": "/v2/devices",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nSee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination) for more information."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which results are listed.\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The number of results to return in a single page."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "If present, only returns devices at the target location."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Devices",
      "description": "\nFor more information, see the following guides:\n - [Devices](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListDeviceCodes",
      "method": "get",
      "path": "/v2/devices/codes",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nSee [Paginating results](https://developer.squareup.com/docs/working-with-apis/pagination) for more information."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "If specified, only returns DeviceCodes of the specified location.\nReturns DeviceCodes of all locations if empty."
        },
        {
          "name": "product_type",
          "type": "string",
          "description": "If specified, only returns DeviceCodes targeting the specified product type.\nReturns DeviceCodes of all product types if empty."
        },
        {
          "name": "status",
          "type": "string",
          "description": "If specified, returns DeviceCodes with the specified statuses.\nReturns DeviceCodes of status `PAIRED` and `UNPAIRED` if empty."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Devices",
      "description": "\nFor more information, see the following guides:\n - [Devices](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateDeviceCode",
      "method": "post",
      "path": "/v2/devices/codes",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Devices",
      "description": "\nFor more information, see the following guides:\n - [Devices](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetDeviceCode",
      "method": "get",
      "path": "/v2/devices/codes/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The unique identifier for the device code."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Devices",
      "description": "\nFor more information, see the following guides:\n - [Devices](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetDevice",
      "method": "get",
      "path": "/v2/devices/{device_id}",
      "pathParameters": [
        {
          "name": "device_id",
          "type": "string",
          "description": "The unique ID for the desired `Device`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListDisputes",
      "method": "get",
      "path": "/v2/disputes",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "states",
          "type": "string",
          "description": "The dispute states used to filter the result. If not specified, the endpoint returns all disputes."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location for which to return a list of disputes.\nIf not specified, the endpoint returns disputes associated with all locations."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveDispute",
      "method": "get",
      "path": "/v2/disputes/{dispute_id}",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute you want more details about."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "AcceptDispute",
      "description": "Square returns the disputed amount to the cardholder and\nupdates the dispute state to ACCEPTED.\n\nSquare debits the disputed amount from the seller’s Square account. If the Square account\ndoes not have sufficient funds, Square debits the associated bank account.",
      "method": "post",
      "path": "/v2/disputes/{dispute_id}/accept",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute you want to accept."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListDisputeEvidence",
      "method": "get",
      "path": "/v2/disputes/{dispute_id}/evidence",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute."
        }
      ],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateDisputeEvidenceFile",
      "description": "The endpoint accepts HTTP\nmultipart/form-data file uploads in HEIC, HEIF, JPEG, PDF, PNG, and TIFF formats.",
      "method": "post",
      "path": "/v2/disputes/{dispute_id}/evidence-files",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute for which you want to upload evidence."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateDisputeEvidenceText",
      "method": "post",
      "path": "/v2/disputes/{dispute_id}/evidence-text",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute for which you want to upload evidence."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteDisputeEvidence",
      "description": "Square does not send the bank any evidence that is removed.",
      "method": "delete",
      "path": "/v2/disputes/{dispute_id}/evidence/{evidence_id}",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute from which you want to remove evidence."
        },
        {
          "name": "evidence_id",
          "type": "string",
          "description": "The ID of the evidence you want to remove."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveDisputeEvidence",
      "description": "You must maintain a copy of any evidence uploaded if you want to reference it later. Evidence cannot be downloaded after you upload it.",
      "method": "get",
      "path": "/v2/disputes/{dispute_id}/evidence/{evidence_id}",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute from which you want to retrieve evidence metadata."
        },
        {
          "name": "evidence_id",
          "type": "string",
          "description": "The ID of the evidence to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Disputes",
      "description": "\nA seller has the following options to process a dispute:\n\n- Accept the dispute using the [AcceptDispute](/reference/square/disputes-api/accept-dispute) endpoint. Square returns the disputed amount from the account balance of the Square account.\n- Challenge the dispute using the [SubmitEvidence](/reference/square/disputes-api/submit-evidence) endpoint. If the payment was valid, you can contest the disputed payment.\nYou submit supporting evidence you have about the transaction, such as receipts, invoices, email correspondence, proof of delivery, or photos.\nYou upload evidence using the [CreateDisputeEvidenceFile](/reference/square/disputes-api/create-dispute-evidence-file) endpoint.\n\nThe Disputes API also supports other endpoints useful in dispute management.\n\nFor more information, see the following guides:\n - [Disputes](https://developer.squareup.com/docs/disputes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SubmitEvidence",
      "description": "The evidence submitted by this endpoint includes evidence uploaded\nusing the [CreateDisputeEvidenceFile](api-endpoint:Disputes-CreateDisputeEvidenceFile) and\n[CreateDisputeEvidenceText](api-endpoint:Disputes-CreateDisputeEvidenceText) endpoints and\nevidence automatically provided by Square, when available. Evidence cannot be removed from\na dispute after submission.",
      "method": "post",
      "path": "/v2/disputes/{dispute_id}/submit-evidence",
      "pathParameters": [
        {
          "name": "dispute_id",
          "type": "string",
          "description": "The ID of the dispute for which you want to submit evidence."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Events",
      "description": "\nIf you don't need a real-time response to data changes or need a disaster recovery or reconciliation mechanism for missed webhook events (caused by server outages, misconfigured webhook subscriptions, network errors, and other events), you can use the Events API instead of webhook subscriptions managed manually or through the Webhook Subscriptions API.\n\nBecause Square events are owned by the application and not any one seller, you cannot use OAuth access tokens with the Events API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see:\n - [Events API](https://developer.squareup.com/docs/events-api/overview) \n"
    },
    "endpoint": {
      "name": "SearchEvents",
      "method": "post",
      "path": "/v2/events",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Events",
      "description": "\nIf you don't need a real-time response to data changes or need a disaster recovery or reconciliation mechanism for missed webhook events (caused by server outages, misconfigured webhook subscriptions, network errors, and other events), you can use the Events API instead of webhook subscriptions managed manually or through the Webhook Subscriptions API.\n\nBecause Square events are owned by the application and not any one seller, you cannot use OAuth access tokens with the Events API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see:\n - [Events API](https://developer.squareup.com/docs/events-api/overview) \n"
    },
    "endpoint": {
      "name": "DisableEvents",
      "description": "All events are disabled by default. You must enable events to make them searchable.\nDisabling events for a specific time period prevents them from being searchable, even if you re-enable them later.",
      "method": "put",
      "path": "/v2/events/disable",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Events",
      "description": "\nIf you don't need a real-time response to data changes or need a disaster recovery or reconciliation mechanism for missed webhook events (caused by server outages, misconfigured webhook subscriptions, network errors, and other events), you can use the Events API instead of webhook subscriptions managed manually or through the Webhook Subscriptions API.\n\nBecause Square events are owned by the application and not any one seller, you cannot use OAuth access tokens with the Events API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see:\n - [Events API](https://developer.squareup.com/docs/events-api/overview) \n"
    },
    "endpoint": {
      "name": "EnableEvents",
      "description": "Only events that occur while in the enabled state are searchable.",
      "method": "put",
      "path": "/v2/events/enable",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Events",
      "description": "\nIf you don't need a real-time response to data changes or need a disaster recovery or reconciliation mechanism for missed webhook events (caused by server outages, misconfigured webhook subscriptions, network errors, and other events), you can use the Events API instead of webhook subscriptions managed manually or through the Webhook Subscriptions API.\n\nBecause Square events are owned by the application and not any one seller, you cannot use OAuth access tokens with the Events API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see:\n - [Events API](https://developer.squareup.com/docs/events-api/overview) \n"
    },
    "endpoint": {
      "name": "ListEventTypes",
      "method": "get",
      "path": "/v2/events/types",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "api_version",
          "type": "string",
          "description": "The API version for which to list event types. Setting this field overrides the default version used by the application."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Card Activities",
      "description": "\nUse the Gift Card Activities API to create activities for a Square gift card (such as activating or reloading the gift card) and to track gift card activities. The Gift Card Activities API is used with the [Gift Cards API](https://developer.squareup.com/reference/square/gift-cards-api) to manage the gift card program for a Square seller.\n\nFor more information, see the following guides:\n - [Gift Card Activities](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListGiftCardActivities",
      "description": "By default, you get gift card activities for all\ngift cards in the seller's account. You can optionally specify query parameters to\nfilter the list. For example, you can get a list of gift card activities for a gift card,\nfor all gift cards in a specific region, or for activities within a time window.",
      "method": "get",
      "path": "/v2/gift-cards/activities",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "gift_card_id",
          "type": "string",
          "description": "If a gift card ID is provided, the endpoint returns activities related \nto the specified gift card. Otherwise, the endpoint returns all gift card activities for \nthe seller."
        },
        {
          "name": "type",
          "type": "string",
          "description": "If a [type](entity:GiftCardActivityType) is provided, the endpoint returns gift card activities of the specified type. \nOtherwise, the endpoint returns all types of gift card activities."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "If a location ID is provided, the endpoint returns gift card activities for the specified location. \nOtherwise, the endpoint returns gift card activities for all locations."
        },
        {
          "name": "begin_time",
          "type": "string",
          "description": "The timestamp for the beginning of the reporting period, in RFC 3339 format.\nThis start time is inclusive. The default value is the current time minus one year.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "end_time",
          "type": "string",
          "description": "The timestamp for the end of the reporting period, in RFC 3339 format.\nThis end time is inclusive. The default value is the current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "If a limit is provided, the endpoint returns the specified number \nof results (or fewer) per page. The maximum value is 100. The default value is 50.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which the endpoint returns the activities, based on `created_at`.\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Card Activities",
      "description": "\nUse the Gift Card Activities API to create activities for a Square gift card (such as activating or reloading the gift card) and to track gift card activities. The Gift Card Activities API is used with the [Gift Cards API](https://developer.squareup.com/reference/square/gift-cards-api) to manage the gift card program for a Square seller.\n\nFor more information, see the following guides:\n - [Gift Card Activities](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateGiftCardActivity",
      "description": "For example, create an `ACTIVATE` activity to activate a gift card with an initial balance before first use.",
      "method": "post",
      "path": "/v2/gift-cards/activities",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListGiftCards",
      "description": "You can specify optional filters to retrieve \na subset of the gift cards. Results are sorted by `created_at` in ascending order.",
      "method": "get",
      "path": "/v2/gift-cards",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "type",
          "type": "string",
          "description": "If a [type](entity:GiftCardType) is provided, the endpoint returns gift cards of the specified type.\nOtherwise, the endpoint returns gift cards of all types."
        },
        {
          "name": "state",
          "type": "string",
          "description": "If a [state](entity:GiftCardStatus) is provided, the endpoint returns the gift cards in the specified state.\nOtherwise, the endpoint returns the gift cards of all states."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "If a limit is provided, the endpoint returns only the specified number of results per page.\nThe maximum value is 200. The default value is 30.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nIf a cursor is not provided, the endpoint returns the first page of the results. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "customer_id",
          "type": "string",
          "description": "If a customer ID is provided, the endpoint returns only the gift cards linked to the specified customer."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateGiftCard",
      "description": "The resulting gift card\nhas a `PENDING` state. To activate a gift card so that it can be redeemed for purchases, call\n[CreateGiftCardActivity](api-endpoint:GiftCardActivities-CreateGiftCardActivity) and create an `ACTIVATE`\nactivity with the initial balance. Alternatively, you can use [RefundPayment](api-endpoint:Refunds-RefundPayment)\nto refund a payment to the new gift card.",
      "method": "post",
      "path": "/v2/gift-cards",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveGiftCardFromGAN",
      "method": "post",
      "path": "/v2/gift-cards/from-gan",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveGiftCardFromNonce",
      "method": "post",
      "path": "/v2/gift-cards/from-nonce",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "LinkCustomerToGiftCard",
      "method": "post",
      "path": "/v2/gift-cards/{gift_card_id}/link-customer",
      "pathParameters": [
        {
          "name": "gift_card_id",
          "type": "string",
          "description": "The ID of the gift card to be linked."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UnlinkCustomerFromGiftCard",
      "method": "post",
      "path": "/v2/gift-cards/{gift_card_id}/unlink-customer",
      "pathParameters": [
        {
          "name": "gift_card_id",
          "type": "string",
          "description": "The ID of the gift card to be unlinked."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Gift Cards",
      "description": "\n[Square Gift Cards](https://squareup.com/gift-cards) enable sellers to boost sales and attract new customers. Customers can purchase gift cards and redeem them at any of the seller's locations. Sellers can manage gift cards and track activity.\n\nUse the Gift Cards API to create and retrieve gift cards (for example, to get the gift card balance) and manage gift cards on file by linking or unlinking gift cards with customers. After creating a gift card, use the [Gift Card Activities API](https://developer.squareup.com/reference/square/gift-card-activities-api) to activate the gift card with an initial balance and manage other activities.\n\nFor more information, see the following guides:\n - [Gift Cards](https://developer.squareup.com/docs/gift-cards/using-gift-cards-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveGiftCard",
      "method": "get",
      "path": "/v2/gift-cards/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The ID of the gift card to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveInventoryAdjustment",
      "method": "get",
      "path": "/v2/inventory/adjustments/{adjustment_id}",
      "pathParameters": [
        {
          "name": "adjustment_id",
          "type": "string",
          "description": "ID of the [InventoryAdjustment](entity:InventoryAdjustment) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchChangeInventory",
      "description": "On success: returns the current calculated counts for all objects\nreferenced in the request.\nOn failure: returns a list of related errors.",
      "method": "post",
      "path": "/v2/inventory/changes/batch-create",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchRetrieveInventoryChanges",
      "description": "Results are paginated and sorted in ascending order according their\n`occurred_at` timestamp (oldest first).\n\nBatchRetrieveInventoryChanges is a catch-all query endpoint for queries\nthat cannot be handled by other, simpler endpoints.",
      "method": "post",
      "path": "/v2/inventory/changes/batch-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchRetrieveInventoryCounts",
      "description": "Results are paginated and sorted in descending order according to their\n`calculated_at` timestamp (newest first).\n\nWhen `updated_after` is specified, only counts that have changed since that\ntime (based on the server timestamp for the most recent change) are\nreturned. This allows clients to perform a \"sync\" operation, for example\nin response to receiving a Webhook notification.",
      "method": "post",
      "path": "/v2/inventory/counts/batch-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveInventoryPhysicalCount",
      "method": "get",
      "path": "/v2/inventory/physical-counts/{physical_count_id}",
      "pathParameters": [
        {
          "name": "physical_count_id",
          "type": "string",
          "description": "ID of the\n[InventoryPhysicalCount](entity:InventoryPhysicalCount) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveInventoryTransfer",
      "method": "get",
      "path": "/v2/inventory/transfers/{transfer_id}",
      "pathParameters": [
        {
          "name": "transfer_id",
          "type": "string",
          "description": "ID of the [InventoryTransfer](entity:InventoryTransfer) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Inventory",
      "description": "\nThe Inventory API allows you to programmatically manage inventory counts and inventory changes of products or services.\n\nFor more information, see the following guides:\n - [Inventory](https://developer.squareup.com/docs/inventory-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveInventoryCount",
      "description": "Responses are paginated and unsorted.\nFor more sophisticated queries, use a batch endpoint.",
      "method": "get",
      "path": "/v2/inventory/{catalog_object_id}",
      "pathParameters": [
        {
          "name": "catalog_object_id",
          "type": "string",
          "description": "ID of the [CatalogObject](entity:CatalogObject) to retrieve."
        }
      ],
      "queryParameters": [
        {
          "name": "location_ids",
          "type": "string",
          "description": "The [Location](entity:Location) IDs to look up as a comma-separated\nlist. An empty list queries all locations."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for the original query.\n\nSee the [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination) guide for more information."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListInvoices",
      "description": "The response \nis paginated. If truncated, the response includes a `cursor` that you    \nuse in a subsequent request to retrieve the next set of invoices.",
      "method": "get",
      "path": "/v2/invoices",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location for which to list invoices."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint. \nProvide this cursor to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of invoices to return (200 is the maximum `limit`). \nIf not provided, the server uses a default limit of 100 invoices."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateInvoice",
      "description": "A draft invoice remains in your account and no action is taken. \nYou must publish the invoice before Square can process it (send it to the customer's email address or charge the customer’s card on file).",
      "method": "post",
      "path": "/v2/invoices",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchInvoices",
      "description": "You can optionally specify customers in the filter for whom to \nretrieve invoices. In the current implementation, you can only specify one location and \noptionally one customer.\n\nThe response is paginated. If truncated, the response includes a `cursor` \nthat you use in a subsequent request to retrieve the next set of invoices.",
      "method": "post",
      "path": "/v2/invoices/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteInvoice",
      "description": "When an invoice is deleted, the \nassociated order status changes to CANCELED. You can only delete a draft \ninvoice (you cannot delete a published invoice, including one that is scheduled for processing).",
      "method": "delete",
      "path": "/v2/invoices/{invoice_id}",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the invoice to delete."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The version of the [invoice](entity:Invoice) to delete.\nIf you do not know the version, you can call [GetInvoice](api-endpoint:Invoices-GetInvoice) or \n[ListInvoices](api-endpoint:Invoices-ListInvoices)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetInvoice",
      "method": "get",
      "path": "/v2/invoices/{invoice_id}",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the invoice to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateInvoice",
      "description": "This endpoint supports sparse updates, so you only need\nto specify the fields you want to change along with the required `version` field.\nSome restrictions apply to updating invoices. For example, you cannot change the\n`order_id` or `location_id` field.",
      "method": "put",
      "path": "/v2/invoices/{invoice_id}",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the invoice to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateInvoiceAttachment",
      "description": "This endpoint accepts HTTP multipart/form-data file uploads\nwith a JSON `request` part and a `file` part. The `file` part must be a `readable stream` that contains a file\nin a supported format: GIF, JPEG, PNG, TIFF, BMP, or PDF.\n\nInvoices can have up to 10 attachments with a total file size of 25 MB. Attachments can be added only to invoices\nin the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.",
      "method": "post",
      "path": "/v2/invoices/{invoice_id}/attachments",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the [invoice](entity:Invoice) to attach the file to."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteInvoiceAttachment",
      "description": "Attachments can be removed only\nfrom invoices in the `DRAFT`, `SCHEDULED`, `UNPAID`, or `PARTIALLY_PAID` state.",
      "method": "delete",
      "path": "/v2/invoices/{invoice_id}/attachments/{attachment_id}",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the [invoice](entity:Invoice) to delete the attachment from."
        },
        {
          "name": "attachment_id",
          "type": "string",
          "description": "The ID of the [attachment](entity:InvoiceAttachment) to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelInvoice",
      "description": "The seller cannot collect payments for \nthe canceled invoice.\n\nYou cannot cancel an invoice in the `DRAFT` state or in a terminal state: `PAID`, `REFUNDED`, `CANCELED`, or `FAILED`.",
      "method": "post",
      "path": "/v2/invoices/{invoice_id}/cancel",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the [invoice](entity:Invoice) to cancel."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Invoices",
      "description": "\n[Square Invoices](https://squareup.com/invoices) makes it easy for sellers to request and collect payments from their customers. Square notifies customers and processes invoice payments.\n\nUse the Invoices API to create and manage invoices for orders that were created using the Orders API. After you create the invoice and configure its delivery method, payment schedule, and other invoice settings, you can publish the invoice. Depending on the invoice settings, Square can send the invoice to the customer or automatically charge a card on file. Square hosts each invoice on a web page where customers can pay for it.\n\nFor more information, see the following guides:\n - [Invoices](https://developer.squareup.com/docs/invoices-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "PublishInvoice",
      "description": "After an invoice is published, Square \nfollows up based on the invoice configuration. For example, Square \nsends the invoice to the customer's email address, charges the customer's card on file, or does \nnothing. Square also makes the invoice available on a Square-hosted invoice page. \n\nThe invoice `status` also changes from `DRAFT` to a status \nbased on the invoice configuration. For example, the status changes to `UNPAID` if \nSquare emails the invoice or `PARTIALLY_PAID` if Square charges a card on file for a portion of the \ninvoice amount.\n\nIn addition to the required `ORDERS_WRITE` and `INVOICES_WRITE` permissions, `CUSTOMERS_READ`\nand `PAYMENTS_WRITE` are required when publishing invoices configured for card-on-file payments.",
      "method": "post",
      "path": "/v2/invoices/{invoice_id}/publish",
      "pathParameters": [
        {
          "name": "invoice_id",
          "type": "string",
          "description": "The ID of the invoice to publish."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListBreakTypes",
      "method": "get",
      "path": "/v2/labor/break-types",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "Filter the returned `BreakType` results to only those that are associated with the\nspecified location."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of `BreakType` results to return per page. The number can range between 1\nand 200. The default is 200."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pointer to the next page of `BreakType` results to fetch."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateBreakType",
      "description": "A `BreakType` is a template for creating `Break` objects.\nYou must provide the following values in your request to this\nendpoint:\n\n- `location_id`\n- `break_name`\n- `expected_duration`\n- `is_paid`\n\nYou can only have three `BreakType` instances per location. If you attempt to add a fourth\n`BreakType` for a location, an `INVALID_REQUEST_ERROR` \"Exceeded limit of 3 breaks per location.\"\nis returned.",
      "method": "post",
      "path": "/v2/labor/break-types",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteBreakType",
      "description": "A `BreakType` can be deleted even if it is referenced from a `Shift`.",
      "method": "delete",
      "path": "/v2/labor/break-types/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `BreakType` being deleted."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetBreakType",
      "method": "get",
      "path": "/v2/labor/break-types/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `BreakType` being retrieved."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateBreakType",
      "method": "put",
      "path": "/v2/labor/break-types/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": " The UUID for the `BreakType` being updated."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateShift",
      "description": "A `Shift` represents a complete workday for a single team member.\nYou must provide the following values in your request to this\nendpoint:\n\n- `location_id`\n- `team_member_id`\n- `start_at`\n\nAn attempt to create a new `Shift` can result in a `BAD_REQUEST` error when:\n- The `status` of the new `Shift` is `OPEN` and the team member has another\nshift with an `OPEN` status.\n- The `start_at` date is in the future.\n- The `start_at` or `end_at` date overlaps another shift for the same team member.\n- The `Break` instances are set in the request and a break `start_at`\nis before the `Shift.start_at`, a break `end_at` is after\nthe `Shift.end_at`, or both.",
      "method": "post",
      "path": "/v2/labor/shifts",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchShifts",
      "description": "The list to be returned can be filtered by:\n- Location IDs\n- Team member IDs\n- Shift status (`OPEN` or `CLOSED`)\n- Shift start\n- Shift end\n- Workday details\n\nThe list can be sorted by:\n- `START_AT`\n- `END_AT`\n- `CREATED_AT`\n- `UPDATED_AT`",
      "method": "post",
      "path": "/v2/labor/shifts/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteShift",
      "method": "delete",
      "path": "/v2/labor/shifts/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `Shift` being deleted."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetShift",
      "method": "get",
      "path": "/v2/labor/shifts/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `Shift` being retrieved."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateShift",
      "description": "When adding a `Break` to a `Shift`, any earlier `Break` instances in the `Shift` have\nthe `end_at` property set to a valid RFC-3339 datetime string.\n\nWhen closing a `Shift`, all `Break` instances in the `Shift` must be complete with `end_at`\nset on each `Break`.",
      "method": "put",
      "path": "/v2/labor/shifts/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The ID of the object being updated."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListTeamMemberWages",
      "method": "get",
      "path": "/v2/labor/team-member-wages",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "Filter the returned wages to only those that are associated with the\nspecified team member."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of `TeamMemberWage` results to return per page. The number can range between\n1 and 200. The default is 200."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pointer to the next page of `EmployeeWage` results to fetch."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetTeamMemberWage",
      "method": "get",
      "path": "/v2/labor/team-member-wages/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `TeamMemberWage` being retrieved."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListWorkweekConfigs",
      "method": "get",
      "path": "/v2/labor/workweek-configs",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of `WorkweekConfigs` results to return per page."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pointer to the next page of `WorkweekConfig` results to fetch."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Labor",
      "description": "\nThe Labor API allows you to see when employees clocked in and out, how much they worked during different\nperiods, and how many breaks they took. You can also call the API to register a past break, adjust a shift,\nor update a wage.\n\nThis API is used in conjunction with the Team API.\n\nFor more information, see the following guides:\n - [Labor](https://developer.squareup.com/docs/labor-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateWorkweekConfig",
      "method": "put",
      "path": "/v2/labor/workweek-configs/{id}",
      "pathParameters": [
        {
          "name": "id",
          "type": "string",
          "description": "The UUID for the `WorkweekConfig` object being updated."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListLocationCustomAttributeDefinitions",
      "description": "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/locations/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Filters the `CustomAttributeDefinition` results by their `visibility` values."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateLocationCustomAttributeDefinition",
      "description": "Use this endpoint to define a custom attribute that can be associated with locations.\nA custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties\nfor a custom attribute. After the definition is created, you can call\n[UpsertLocationCustomAttribute](api-endpoint:LocationCustomAttributes-UpsertLocationCustomAttribute) or\n[BulkUpsertLocationCustomAttributes](api-endpoint:LocationCustomAttributes-BulkUpsertLocationCustomAttributes)\nto set the custom attribute for locations.",
      "method": "post",
      "path": "/v2/locations/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteLocationCustomAttributeDefinition",
      "description": "Deleting a custom attribute definition also deletes the corresponding custom attribute from\nall locations.\nOnly the definition owner can delete a custom attribute definition.",
      "method": "delete",
      "path": "/v2/locations/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLocationCustomAttributeDefinition",
      "description": "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/locations/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateLocationCustomAttributeDefinition",
      "description": "Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the\n`schema` for a `Selection` data type.\nOnly the definition owner can update a custom attribute definition.",
      "method": "put",
      "path": "/v2/locations/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkDeleteLocationCustomAttributes",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/locations/custom-attributes/bulk-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpsertLocationCustomAttributes",
      "description": "Use this endpoint to set the value of one or more custom attributes for one or more locations.\nA custom attribute is based on a custom attribute definition in a Square seller account, which is\ncreated using the [CreateLocationCustomAttributeDefinition](api-endpoint:LocationCustomAttributes-CreateLocationCustomAttributeDefinition) endpoint.\nThis `BulkUpsertLocationCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides a location ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/locations/custom-attributes/bulk-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListLocationCustomAttributes",
      "description": "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/locations/{location_id}/custom-attributes",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the target [location](entity:Location)."
        }
      ],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Filters the `CustomAttributeDefinition` results by their `visibility` values."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "with_definitions",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteLocationCustomAttribute",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
      "method": "delete",
      "path": "/v2/locations/{location_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the target [location](entity:Location)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLocationCustomAttribute",
      "description": "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/locations/{location_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the target [location](entity:Location)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "with_definition",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        },
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Location Custom Attributes",
      "description": "\nUse the Location Custom Attributes API to create and manage custom attributes for locations. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for locations.\n\nFor more information, see the following guides:\n - [Location Custom Attributes](https://developer.squareup.com/docs/location-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpsertLocationCustomAttribute",
      "description": "Use this endpoint to set the value of a custom attribute for a specified location.\nA custom attribute is based on a custom attribute definition in a Square seller account, which\nis created using the [CreateLocationCustomAttributeDefinition](api-endpoint:LocationCustomAttributes-CreateLocationCustomAttributeDefinition) endpoint.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/locations/{location_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the target [location](entity:Location)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Locations",
      "description": "\nMany sellers use multiple locations to track where they make sales. The Locations API allows you to\ncreate and manage data about those locations, such as their addresses, names, and business hours.\n\nFor more information, see the following guides:\n - [Locations](https://developer.squareup.com/docs/locations-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListLocations",
      "description": "Locations are listed alphabetically by `name`.",
      "method": "get",
      "path": "/v2/locations",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Locations",
      "description": "\nMany sellers use multiple locations to track where they make sales. The Locations API allows you to\ncreate and manage data about those locations, such as their addresses, names, and business hours.\n\nFor more information, see the following guides:\n - [Locations](https://developer.squareup.com/docs/locations-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateLocation",
      "description": "Creating new locations allows for separate configuration of receipt layouts, item prices,\nand sales reports. Developers can use locations to separate sales activity through applications\nthat integrate with Square from sales activity elsewhere in a seller's account.\nLocations created programmatically with the Locations API last forever and\nare visible to the seller for their own management. Therefore, ensure that\neach location has a sensible and unique name.",
      "method": "post",
      "path": "/v2/locations",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Locations",
      "description": "\nMany sellers use multiple locations to track where they make sales. The Locations API allows you to\ncreate and manage data about those locations, such as their addresses, names, and business hours.\n\nFor more information, see the following guides:\n - [Locations](https://developer.squareup.com/docs/locations-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLocation",
      "description": "Specify \"main\"\nas the location ID to retrieve details of the [main location](https://developer.squareup.com/docs/locations-api#about-the-main-location).",
      "method": "get",
      "path": "/v2/locations/{location_id}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to retrieve. Specify the string\n\"main\" to return the main location."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Locations",
      "description": "\nMany sellers use multiple locations to track where they make sales. The Locations API allows you to\ncreate and manage data about those locations, such as their addresses, names, and business hours.\n\nFor more information, see the following guides:\n - [Locations](https://developer.squareup.com/docs/locations-api)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateLocation",
      "method": "put",
      "path": "/v2/locations/{location_id}",
      "pathParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateLoyaltyAccount",
      "description": "To create a loyalty account, you must provide the `program_id` and a `mapping` with the `phone_number` of the buyer.",
      "method": "post",
      "path": "/v2/loyalty/accounts",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchLoyaltyAccounts",
      "description": "You can search for a loyalty account using the phone number or customer ID associated with the account. To return all loyalty accounts, specify an empty `query` object or omit it entirely.\n\nSearch results are sorted by `created_at` in ascending order.",
      "method": "post",
      "path": "/v2/loyalty/accounts/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLoyaltyAccount",
      "method": "get",
      "path": "/v2/loyalty/accounts/{account_id}",
      "pathParameters": [
        {
          "name": "account_id",
          "type": "string",
          "description": "The ID of the [loyalty account](entity:LoyaltyAccount) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "AccumulateLoyaltyPoints",
      "description": "- If you are using the Orders API to manage orders, provide the `order_id`. Square reads the order\nto compute the points earned from both the base loyalty program and an associated\n[loyalty promotion](entity:LoyaltyPromotion). For purchases that qualify for multiple accrual\nrules, Square computes points based on the accrual rule that grants the most points.\nFor purchases that qualify for multiple promotions, Square computes points based on the most\nrecently created promotion. A purchase must first qualify for program points to be eligible for promotion points.\n\n- If you are not using the Orders API to manage orders, provide `points` with the number of points to add.\nYou must first perform a client-side computation of the points earned from the loyalty program and\nloyalty promotion. For spend-based and visit-based programs, you can call [CalculateLoyaltyPoints](api-endpoint:Loyalty-CalculateLoyaltyPoints)\nto compute the points earned from the base loyalty program. For information about computing points earned from a loyalty promotion, see\n[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).",
      "method": "post",
      "path": "/v2/loyalty/accounts/{account_id}/accumulate",
      "pathParameters": [
        {
          "name": "account_id",
          "type": "string",
          "description": "The ID of the target [loyalty account](entity:LoyaltyAccount)."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "AdjustLoyaltyPoints",
      "description": "Use this endpoint only when you need to manually adjust points. Otherwise, in your application flow, you call\n[AccumulateLoyaltyPoints](api-endpoint:Loyalty-AccumulateLoyaltyPoints)\nto add points when a buyer pays for the purchase.",
      "method": "post",
      "path": "/v2/loyalty/accounts/{account_id}/adjust",
      "pathParameters": [
        {
          "name": "account_id",
          "type": "string",
          "description": "The ID of the target [loyalty account](entity:LoyaltyAccount)."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchLoyaltyEvents",
      "description": "A Square loyalty program maintains a ledger of events that occur during the lifetime of a\nbuyer's loyalty account. Each change in the point balance\n(for example, points earned, points redeemed, and points expired) is\nrecorded in the ledger. Using this endpoint, you can search the ledger for events.\n\nSearch results are sorted by `created_at` in descending order.",
      "method": "post",
      "path": "/v2/loyalty/events/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLoyaltyProgram",
      "description": "Loyalty programs define how buyers can earn points and redeem points for rewards. Square sellers can have only one loyalty program, which is created and managed from the Seller Dashboard. For more information, see [Loyalty Program Overview](https://developer.squareup.com/docs/loyalty/overview).",
      "method": "get",
      "path": "/v2/loyalty/programs/{program_id}",
      "pathParameters": [
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the loyalty program or the keyword `main`. Either value can be used to retrieve the single loyalty program that belongs to the seller."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CalculateLoyaltyPoints",
      "description": "Applications might call this endpoint\nto display the points to the buyer.\n\n- If you are using the Orders API to manage orders, provide the `order_id` and (optional) `loyalty_account_id`.\nSquare reads the order to compute the points earned from the base loyalty program and an associated\n[loyalty promotion](entity:LoyaltyPromotion).\n\n- If you are not using the Orders API to manage orders, provide `transaction_amount_money` with the\npurchase amount. Square uses this amount to calculate the points earned from the base loyalty program,\nbut not points earned from a loyalty promotion. For spend-based and visit-based programs, the `tax_mode`\nsetting of the accrual rule indicates how taxes should be treated for loyalty points accrual.\nIf the purchase qualifies for program points, call\n[ListLoyaltyPromotions](api-endpoint:Loyalty-ListLoyaltyPromotions) and perform a client-side computation\nto calculate whether the purchase also qualifies for promotion points. For more information, see\n[Calculating promotion points](https://developer.squareup.com/docs/loyalty-api/loyalty-promotions#calculate-promotion-points).",
      "method": "post",
      "path": "/v2/loyalty/programs/{program_id}/calculate",
      "pathParameters": [
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the [loyalty program](entity:LoyaltyProgram), which defines the rules for accruing points."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListLoyaltyPromotions",
      "description": "Results are sorted by the `created_at` date in descending order (newest to oldest).",
      "method": "get",
      "path": "/v2/loyalty/programs/{program_id}/promotions",
      "pathParameters": [
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the base [loyalty program](entity:LoyaltyProgram). To get the program ID,\ncall [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram) using the `main` keyword."
        }
      ],
      "queryParameters": [
        {
          "name": "status",
          "type": "string",
          "description": "The status to filter the results by. If a status is provided, only loyalty promotions\nwith the specified status are returned. Otherwise, all loyalty promotions associated with\nthe loyalty program are returned."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response.\nThe minimum value is 1 and the maximum value is 30. The default value is 30.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateLoyaltyPromotion",
      "description": "A loyalty promotion\nenables buyers to earn points in addition to those earned from the base loyalty program.\n\nThis endpoint sets the loyalty promotion to the `ACTIVE` or `SCHEDULED` status, depending on the\n`available_time` setting. A loyalty program can have a maximum of 10 loyalty promotions with an\n`ACTIVE` or `SCHEDULED` status.",
      "method": "post",
      "path": "/v2/loyalty/programs/{program_id}/promotions",
      "pathParameters": [
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the [loyalty program](entity:LoyaltyProgram) to associate with the promotion.\nTo get the program ID, call [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram)\nusing the `main` keyword."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLoyaltyPromotion",
      "method": "get",
      "path": "/v2/loyalty/programs/{program_id}/promotions/{promotion_id}",
      "pathParameters": [
        {
          "name": "promotion_id",
          "type": "string",
          "description": "The ID of the [loyalty promotion](entity:LoyaltyPromotion) to retrieve."
        },
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the base [loyalty program](entity:LoyaltyProgram). To get the program ID,\ncall [RetrieveLoyaltyProgram](api-endpoint:Loyalty-RetrieveLoyaltyProgram) using the `main` keyword."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelLoyaltyPromotion",
      "description": "Use this endpoint to cancel an `ACTIVE` promotion earlier than the\nend date, cancel an `ACTIVE` promotion when an end date is not specified, or cancel a `SCHEDULED` promotion.\nBecause updating a promotion is not supported, you can also use this endpoint to cancel a promotion before\nyou create a new one.\n\nThis endpoint sets the loyalty promotion to the `CANCELED` state",
      "method": "post",
      "path": "/v2/loyalty/programs/{program_id}/promotions/{promotion_id}/cancel",
      "pathParameters": [
        {
          "name": "promotion_id",
          "type": "string",
          "description": "The ID of the [loyalty promotion](entity:LoyaltyPromotion) to cancel. You can cancel a\npromotion that has an `ACTIVE` or `SCHEDULED` status."
        },
        {
          "name": "program_id",
          "type": "string",
          "description": "The ID of the base [loyalty program](entity:LoyaltyProgram)."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateLoyaltyReward",
      "description": "In the process, the endpoint does following:\n\n- Uses the `reward_tier_id` in the request to determine the number of points\nto lock for this reward.\n- If the request includes `order_id`, it adds the reward and related discount to the order.\n\nAfter a reward is created, the points are locked and\nnot available for the buyer to redeem another reward.",
      "method": "post",
      "path": "/v2/loyalty/rewards",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchLoyaltyRewards",
      "description": "This endpoint accepts a request with no query filters and returns results for all loyalty accounts.\nIf you include a `query` object, `loyalty_account_id` is required and `status` is  optional.\n\nIf you know a reward ID, use the\n[RetrieveLoyaltyReward](api-endpoint:Loyalty-RetrieveLoyaltyReward) endpoint.\n\nSearch results are sorted by `updated_at` in descending order.",
      "method": "post",
      "path": "/v2/loyalty/rewards/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteLoyaltyReward",
      "description": "- If an order ID was specified when the reward was created\n(see [CreateLoyaltyReward](api-endpoint:Loyalty-CreateLoyaltyReward)),\nit updates the order by removing the reward and related\ndiscounts.\n\nYou cannot delete a reward that has reached the terminal state (REDEEMED).",
      "method": "delete",
      "path": "/v2/loyalty/rewards/{reward_id}",
      "pathParameters": [
        {
          "name": "reward_id",
          "type": "string",
          "description": "The ID of the [loyalty reward](entity:LoyaltyReward) to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveLoyaltyReward",
      "method": "get",
      "path": "/v2/loyalty/rewards/{reward_id}",
      "pathParameters": [
        {
          "name": "reward_id",
          "type": "string",
          "description": "The ID of the [loyalty reward](entity:LoyaltyReward) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Loyalty",
      "description": "\nSellers subscribe to [Square Loyalty](https://squareup.com/software/loyalty) to offer a loyalty program that can increase repeat visits to their business by rewarding customers.\n\nUse the Loyalty API to create loyalty accounts for buyers and enable them to earn points for purchases and redeem points for reward discounts. Also use the Loyalty API to retrieve details about the loyalty program, create and manage loyalty promotions that extend the base program, and track balance-changing events for loyalty accounts.\n\nFor more information, see the following guides:\n - [Loyalty](https://developer.squareup.com/docs/loyalty-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RedeemLoyaltyReward",
      "description": "The endpoint sets the reward to the `REDEEMED` terminal state.\n\nIf you are using your own order processing system (not using the\nOrders API), you call this endpoint after the buyer paid for the\npurchase.\n\nAfter the reward reaches the terminal state, it cannot be deleted.\nIn other words, points used for the reward cannot be returned\nto the account.",
      "method": "post",
      "path": "/v2/loyalty/rewards/{reward_id}/redeem",
      "pathParameters": [
        {
          "name": "reward_id",
          "type": "string",
          "description": "The ID of the [loyalty reward](entity:LoyaltyReward) to redeem."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListMerchantCustomAttributeDefinitions",
      "description": "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/merchants/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Filters the `CustomAttributeDefinition` results by their `visibility` values."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateMerchantCustomAttributeDefinition",
      "description": "Use this endpoint to define a custom attribute that can be associated with a merchant connecting to your application.\nA custom attribute definition specifies the `key`, `visibility`, `schema`, and other properties\nfor a custom attribute. After the definition is created, you can call\n[UpsertMerchantCustomAttribute](api-endpoint:MerchantCustomAttributes-UpsertMerchantCustomAttribute) or\n[BulkUpsertMerchantCustomAttributes](api-endpoint:MerchantCustomAttributes-BulkUpsertMerchantCustomAttributes)\nto set the custom attribute for a merchant.",
      "method": "post",
      "path": "/v2/merchants/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteMerchantCustomAttributeDefinition",
      "description": "Deleting a custom attribute definition also deletes the corresponding custom attribute from\nthe merchant.\nOnly the definition owner can delete a custom attribute definition.",
      "method": "delete",
      "path": "/v2/merchants/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveMerchantCustomAttributeDefinition",
      "description": "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/merchants/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to retrieve. If the requesting application\nis not the definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute definition, which is used for strongly consistent\nreads to guarantee that you receive the most up-to-date data. When included in the request,\nSquare returns the specified version or a higher version if one exists. If the specified version\nis higher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateMerchantCustomAttributeDefinition",
      "description": "Use this endpoint to update the following fields: `name`, `description`, `visibility`, or the\n`schema` for a `Selection` data type.\nOnly the definition owner can update a custom attribute definition.",
      "method": "put",
      "path": "/v2/merchants/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkDeleteMerchantCustomAttributes",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/merchants/custom-attributes/bulk-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpsertMerchantCustomAttributes",
      "description": "Use this endpoint to set the value of one or more custom attributes for a merchant.\nA custom attribute is based on a custom attribute definition in a Square seller account, which is\ncreated using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.\nThis `BulkUpsertMerchantCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides a merchant ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/merchants/custom-attributes/bulk-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListMerchantCustomAttributes",
      "description": "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/merchants/{merchant_id}/custom-attributes",
      "pathParameters": [
        {
          "name": "merchant_id",
          "type": "string",
          "description": "The ID of the target [merchant](entity:Merchant)."
        }
      ],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Filters the `CustomAttributeDefinition` results by their `visibility` values."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory.\nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100.\nThe default value is 20. For more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint.\nProvide this cursor to retrieve the next page of results for your original request. For more\ninformation, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "with_definitions",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteMerchantCustomAttribute",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`.",
      "method": "delete",
      "path": "/v2/merchants/{merchant_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "merchant_id",
          "type": "string",
          "description": "The ID of the target [merchant](entity:Merchant)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to delete. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveMerchantCustomAttribute",
      "description": "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/merchants/{merchant_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "merchant_id",
          "type": "string",
          "description": "The ID of the target [merchant](entity:Merchant)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to retrieve. This key must match the `key` of a custom\nattribute definition in the Square seller account. If the requesting application is not the\ndefinition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [
        {
          "name": "with_definition",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of\nthe custom attribute. Set this parameter to `true` to get the name and description of the custom\nattribute, information about the data type, or other definition details. The default value is `false`."
        },
        {
          "name": "version",
          "type": "integer",
          "description": "The current version of the custom attribute, which is used for strongly consistent reads to\nguarantee that you receive the most up-to-date data. When included in the request, Square\nreturns the specified version or a higher version if one exists. If the specified version is\nhigher than the current version, Square returns a `BAD_REQUEST` error."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchant Custom Attributes",
      "description": "\nUse the Merchant Custom Attributes API to create and manage custom attributes for merchants that connect to your application. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows.\n\nFor more information, see the following guides:\n - [Merchant Custom Attributes](https://developer.squareup.com/docs/merchant-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpsertMerchantCustomAttribute",
      "description": "Use this endpoint to set the value of a custom attribute for a specified merchant.\nA custom attribute is based on a custom attribute definition in a Square seller account, which\nis created using the [CreateMerchantCustomAttributeDefinition](api-endpoint:MerchantCustomAttributes-CreateMerchantCustomAttributeDefinition) endpoint.\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/merchants/{merchant_id}/custom-attributes/{key}",
      "pathParameters": [
        {
          "name": "merchant_id",
          "type": "string",
          "description": "The ID of the target [merchant](entity:Merchant)."
        },
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute to create or update. This key must match the `key` of a\ncustom attribute definition in the Square seller account. If the requesting application is not\nthe definition owner, you must use the qualified key."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchants",
      "description": "\nThe Merchants API groups individual seller locations into larger organizations, allowing them to operate as a single entity. Each merchant represents one organization or business that sells with Square. Use this API to retrieve core information about the organization connecting to your application such as the merchant ID, language preferences, country, account status, and the name of the overall business.\n\nFor more information, see the following guide:\n - [Merchants](https://developer.squareup.com/docs/merchants-api)"
    },
    "endpoint": {
      "name": "ListMerchants",
      "description": "The access token used to connect your application to a Square seller is associated\nwith a single merchant. That means that `ListMerchants` returns a list\nwith a single `Merchant` object. You can specify your personal access token\nto get your own merchant information or specify an OAuth token to get the\ninformation for the merchant that granted your application access.\n\nIf you know the merchant ID, you can also use the [RetrieveMerchant](api-endpoint:Merchants-RetrieveMerchant)\nendpoint to retrieve the merchant information.",
      "method": "get",
      "path": "/v2/merchants",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "integer",
          "description": "The cursor generated by the previous response."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Merchants",
      "description": "\nThe Merchants API groups individual seller locations into larger organizations, allowing them to operate as a single entity. Each merchant represents one organization or business that sells with Square. Use this API to retrieve core information about the organization connecting to your application such as the merchant ID, language preferences, country, account status, and the name of the overall business.\n\nFor more information, see the following guide:\n - [Merchants](https://developer.squareup.com/docs/merchants-api)"
    },
    "endpoint": {
      "name": "RetrieveMerchant",
      "method": "get",
      "path": "/v2/merchants/{merchant_id}",
      "pathParameters": [
        {
          "name": "merchant_id",
          "type": "string",
          "description": "The ID of the merchant to retrieve. If the string \"me\" is supplied as the ID,\nthen retrieve the merchant that is currently accessible to this call."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "OAuth",
      "description": "\nThe Square OAuth API lets applications request and obtain permission from a Square account to make API\ncalls on behalf of that account. Applications can request individual permissions so that users do not need\nto grant full access to their Square accounts.\n\nFor more information, see the following guides:\n - [OAuth](https://developer.squareup.com/docs/oauth-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RevokeToken",
      "description": "If an account has more than one OAuth access token for your application, this\nendpoint revokes all of them, regardless of which token you specify. \n\n__Important:__ The `Authorization` header for this endpoint must have the\nfollowing format:\n\n```\nAuthorization: Client APPLICATION_SECRET\n```\n\nReplace `APPLICATION_SECRET` with the application secret on the **OAuth**\npage for your application in the Developer Dashboard.",
      "method": "post",
      "path": "/oauth2/revoke",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "OAuth",
      "description": "\nThe Square OAuth API lets applications request and obtain permission from a Square account to make API\ncalls on behalf of that account. Applications can request individual permissions so that users do not need\nto grant full access to their Square accounts.\n\nFor more information, see the following guides:\n - [OAuth](https://developer.squareup.com/docs/oauth-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ObtainToken",
      "description": "The `grant_type` parameter specifies the type of OAuth request. If \n`grant_type` is `authorization_code`, you must include the authorization \ncode you received when a seller granted you authorization. If `grant_type` \nis `refresh_token`, you must provide a valid refresh token. If you're using \nan old version of the Square APIs (prior to March 13, 2019), `grant_type` \ncan be `migration_token` and you must provide a valid migration token.\n\nYou can use the `scopes` parameter to limit the set of permissions granted \nto the access token and refresh token. You can use the `short_lived` parameter \nto create an access token that expires in 24 hours.\n\n__Note:__ OAuth tokens should be encrypted and stored on a secure server. \nApplication clients should never interact directly with OAuth tokens.",
      "method": "post",
      "path": "/oauth2/token",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "OAuth",
      "description": "\nThe Square OAuth API lets applications request and obtain permission from a Square account to make API\ncalls on behalf of that account. Applications can request individual permissions so that users do not need\nto grant full access to their Square accounts.\n\nFor more information, see the following guides:\n - [OAuth](https://developer.squareup.com/docs/oauth-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveTokenStatus",
      "description": "Add the access token to the Authorization header of the request.\n\n__Important:__ The `Authorization` header you provide to this endpoint must have the following format:\n\n```\nAuthorization: Bearer ACCESS_TOKEN\n```\n\nwhere `ACCESS_TOKEN` is a\n[valid production authorization credential](https://developer.squareup.com/docs/build-basics/access-tokens).\n\nIf the access token is expired or not a valid access token, the endpoint returns an `UNAUTHORIZED` error.",
      "method": "post",
      "path": "/oauth2/token/status",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListOrderCustomAttributeDefinitions",
      "description": "When all response pages are retrieved, the results include all custom attribute definitions\nthat are visible to the requesting application, including those that are created by other\napplications and set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that\nseller-defined custom attributes (also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/orders/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Requests that all of the custom attributes be returned, or only those that are read-only or read-write."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint. \nProvide this cursor to retrieve the next page of results for your original request. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory. \nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100. \nThe default value is 20.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateOrderCustomAttributeDefinition",
      "description": "Use this endpoint to\ndefine a custom attribute that can be associated with orders.\n\nAfter creating a custom attribute definition, you can set the custom attribute for orders\nin the Square seller account.",
      "method": "post",
      "path": "/v2/orders/custom-attribute-definitions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteOrderCustomAttributeDefinition",
      "description": "Only the definition owner can delete a custom attribute definition.",
      "method": "delete",
      "path": "/v2/orders/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveOrderCustomAttributeDefinition",
      "description": "To retrieve a custom attribute definition created by another application, the `visibility`\nsetting must be `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/orders/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to retrieve."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "To enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency)\ncontrol, include this optional field and specify the current version of the custom attribute."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateOrderCustomAttributeDefinition",
      "description": "Only the definition owner can update a custom attribute definition. Note that sellers can view all custom attributes in exported customer data, including those set to `VISIBILITY_HIDDEN`.",
      "method": "put",
      "path": "/v2/orders/custom-attribute-definitions/{key}",
      "pathParameters": [
        {
          "name": "key",
          "type": "string",
          "description": "The key of the custom attribute definition to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkDeleteOrderCustomAttributes",
      "description": "Use this endpoint to delete one or more custom attributes from one or more orders.\nA custom attribute is based on a custom attribute definition in a Square seller account.  (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nThis `BulkDeleteOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual delete\nrequests and returns a map of individual delete responses. Each delete request has a unique ID\nand provides an order ID and custom attribute. Each delete response is returned with the ID\nof the corresponding request.\n\nTo delete a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/orders/custom-attributes/bulk-delete",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpsertOrderCustomAttributes",
      "description": "Use this endpoint to delete one or more custom attributes from one or more orders.\nA custom attribute is based on a custom attribute definition in a Square seller account.  (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nThis `BulkUpsertOrderCustomAttributes` endpoint accepts a map of 1 to 25 individual upsert\nrequests and returns a map of individual upsert responses. Each upsert request has a unique ID\nand provides an order ID and custom attribute. Each upsert response is returned with the ID\nof the corresponding request.\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/orders/custom-attributes/bulk-upsert",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListOrderCustomAttributes",
      "description": "You can use the `with_definitions` query parameter to also retrieve custom attribute definitions\nin the same call.\n\nWhen all response pages are retrieved, the results include all custom attributes that are\nvisible to the requesting application, including those that are owned by other applications\nand set to `VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/orders/{order_id}/custom-attributes",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the target [order](entity:Order)."
        }
      ],
      "queryParameters": [
        {
          "name": "visibility_filter",
          "type": "string",
          "description": "Requests that all of the custom attributes be returned, or only those that are read-only or read-write."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "The cursor returned in the paged response from the previous call to this endpoint. \nProvide this cursor to retrieve the next page of results for your original request. \nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to return in a single paged response. This limit is advisory. \nThe response might contain more or fewer results. The minimum value is 1 and the maximum value is 100. \nThe default value is 20.\nFor more information, see [Pagination](https://developer.squareup.com/docs/working-with-apis/pagination)."
        },
        {
          "name": "with_definitions",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each\ncustom attribute. Set this parameter to `true` to get the name and description of each custom attribute, \ninformation about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteOrderCustomAttribute",
      "description": "To delete a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "delete",
      "path": "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the target [order](entity:Order)."
        },
        {
          "name": "custom_attribute_key",
          "type": "string",
          "description": "The key of the custom attribute to delete.  This key must match the key of an\nexisting custom attribute definition."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveOrderCustomAttribute",
      "description": "You can use the `with_definition` query parameter to also retrieve the custom attribute definition\nin the same call.\n\nTo retrieve a custom attribute owned by another application, the `visibility` setting must be\n`VISIBILITY_READ_ONLY` or `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\nalso known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "get",
      "path": "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the target [order](entity:Order)."
        },
        {
          "name": "custom_attribute_key",
          "type": "string",
          "description": "The key of the custom attribute to retrieve.  This key must match the key of an\nexisting custom attribute definition."
        }
      ],
      "queryParameters": [
        {
          "name": "version",
          "type": "integer",
          "description": "To enable [optimistic concurrency](https://developer.squareup.com/docs/build-basics/common-api-patterns/optimistic-concurrency)\ncontrol, include this optional field and specify the current version of the custom attribute."
        },
        {
          "name": "with_definition",
          "type": "boolean",
          "description": "Indicates whether to return the [custom attribute definition](entity:CustomAttributeDefinition) in the `definition` field of each \ncustom attribute. Set this parameter to `true` to get the name and description of each custom attribute, \ninformation about the data type, or other definition details. The default value is `false`."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Order Custom Attributes",
      "description": "\nUse the Order Custom Attributes API to create and manage custom attributes for orders. Custom attributes can be used to store properties or metadata that simplify integration, synchronization, and personalization workflows. After a custom attribute definition is created in a Square seller account, the custom attribute value can be set for orders.\n\nFor more information, see the following guides:\n - [Order Custom Attributes](https://developer.squareup.com/docs/orders-custom-attributes-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpsertOrderCustomAttribute",
      "description": "Use this endpoint to set the value of a custom attribute for a specific order.\nA custom attribute is based on a custom attribute definition in a Square seller account. (To create a\ncustom attribute definition, use the [CreateOrderCustomAttributeDefinition](api-endpoint:OrderCustomAttributes-CreateOrderCustomAttributeDefinition) endpoint.)\n\nTo create or update a custom attribute owned by another application, the `visibility` setting\nmust be `VISIBILITY_READ_WRITE_VALUES`. Note that seller-defined custom attributes\n(also known as custom fields) are always set to `VISIBILITY_READ_WRITE_VALUES`.",
      "method": "post",
      "path": "/v2/orders/{order_id}/custom-attributes/{custom_attribute_key}",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the target [order](entity:Order)."
        },
        {
          "name": "custom_attribute_key",
          "type": "string",
          "description": "The key of the custom attribute to create or update.  This key must match the key \nof an existing custom attribute definition."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateOrder",
      "description": "To pay for a created order, see\n[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).\n\nYou can modify open orders using the [UpdateOrder](api-endpoint:Orders-UpdateOrder) endpoint.",
      "method": "post",
      "path": "/v2/orders",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BatchRetrieveOrders",
      "description": "If a given order ID does not exist, the ID is ignored instead of generating an error.",
      "method": "post",
      "path": "/v2/orders/batch-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CalculateOrder",
      "method": "post",
      "path": "/v2/orders/calculate",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CloneOrder",
      "description": "The newly created order has\nonly the core fields (such as line items, taxes, and discounts) copied from the original order.",
      "method": "post",
      "path": "/v2/orders/clone",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchOrders",
      "description": "Orders include all sales,\nreturns, and exchanges regardless of how or when they entered the Square\necosystem (such as Point of Sale, Invoices, and Connect APIs).\n\n`SearchOrders` requests need to specify which locations to search and define a\n[SearchOrdersQuery](entity:SearchOrdersQuery) object that controls\nhow to sort or filter the results. Your `SearchOrdersQuery` can:\n\n  Set filter criteria.\n  Set the sort order.\n  Determine whether to return results as complete `Order` objects or as\n[OrderEntry](entity:OrderEntry) objects.\n\nNote that details for orders processed with Square Point of Sale while in\noffline mode might not be transmitted to Square for up to 72 hours. Offline\norders have a `created_at` value that reflects the time the order was created,\nnot the time it was subsequently transmitted to Square.",
      "method": "post",
      "path": "/v2/orders/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveOrder",
      "method": "get",
      "path": "/v2/orders/{order_id}",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the order to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateOrder",
      "description": "Orders with a `COMPLETED` or `CANCELED` state cannot be updated.\n\nAn `UpdateOrder` request requires the following:\n\n- The `order_id` in the endpoint path, identifying the order to update.\n- The latest `version` of the order to update.\n- The [sparse order](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#sparse-order-objects)\ncontaining only the fields to update and the version to which the update is\nbeing applied.\n- If deleting fields, the [dot notation paths](https://developer.squareup.com/docs/orders-api/manage-orders/update-orders#identifying-fields-to-delete)\nidentifying the fields to clear.\n\nTo pay for an order, see\n[Pay for Orders](https://developer.squareup.com/docs/orders-api/pay-for-orders).",
      "method": "put",
      "path": "/v2/orders/{order_id}",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the order to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Orders",
      "description": "\nThe Orders API is your one-stop shop for adding rich functionality to payments. You can itemize\npayments using custom line items or catalog objects, send orders to physical Point of Sale devices\nto be fulfilled, attach a customer to a payment, and more.\n\nIn addition, the Orders API lets you search through all of a seller's past sales and returns itemization\ndata, customer references, and other details from sales made using POS or online.\n\nIf you use the Square Orders API with a non-Square payments provider, Square charges a transaction fee. For more information, see [Orders API fee structure.](https://developer.squareup.com/docs/payments-pricing#orders-api-fee-structure)\n\nFor more information, see the following guides:\n - [Orders](https://developer.squareup.com/docs/orders-api/what-it-does)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "PayOrder",
      "description": "The total of the `payment_ids` listed in the request must be equal to the order\ntotal. Orders with a total amount of `0` can be marked as paid by specifying an empty\narray of `payment_ids` in the request.\n\nTo be used with `PayOrder`, a payment must:\n\n- Reference the order by specifying the `order_id` when [creating the payment](api-endpoint:Payments-CreatePayment).\nAny approved payments that reference the same `order_id` not specified in the\n`payment_ids` is canceled.\n- Be approved with [delayed capture](https://developer.squareup.com/docs/payments-api/take-payments/card-payments/delayed-capture).\nUsing a delayed capture payment with `PayOrder` completes the approved payment.",
      "method": "post",
      "path": "/v2/orders/{order_id}/pay",
      "pathParameters": [
        {
          "name": "order_id",
          "type": "string",
          "description": "The ID of the order being paid."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListPayments",
      "description": "Results are eventually consistent, and new payments or changes to payments might take several\nseconds to appear.\n\nThe maximum results per page is 100.",
      "method": "get",
      "path": "/v2/payments",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "begin_time",
          "type": "string",
          "description": "Indicates the start of the time range to retrieve payments for, in RFC 3339 format.  \nThe range is determined using the `created_at` field for each Payment.\nInclusive. Default: The current time minus one year."
        },
        {
          "name": "end_time",
          "type": "string",
          "description": "Indicates the end of the time range to retrieve payments for, in RFC 3339 format.  The \nrange is determined using the `created_at` field for each Payment.\n\nDefault: The current time."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which results are listed by `ListPaymentsRequest.sort_field`:\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "Limit results to the location supplied. By default, results are returned\nfor the default (main) location associated with the seller."
        },
        {
          "name": "total",
          "type": "integer",
          "description": "The exact amount in the `total_money` for a payment."
        },
        {
          "name": "last_4",
          "type": "string",
          "description": "The last four digits of a payment card."
        },
        {
          "name": "card_brand",
          "type": "string",
          "description": "The brand of the payment card (for example, VISA)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\n\nThe default value of 100 is also the maximum allowed value. If the provided value is \ngreater than 100, it is ignored and the default value is used instead.\n\nDefault: `100`"
        },
        {
          "name": "is_offline_payment",
          "type": "boolean",
          "description": "Whether the payment was taken offline or not."
        },
        {
          "name": "offline_begin_time",
          "type": "string",
          "description": "Indicates the start of the time range for which to retrieve offline payments, in RFC 3339\nformat for timestamps. The range is determined using the\n`offline_payment_details.client_created_at` field for each Payment. If set, payments without a\nvalue set in `offline_payment_details.client_created_at` will not be returned.\n\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "offline_end_time",
          "type": "string",
          "description": "Indicates the end of the time range for which to retrieve offline payments, in RFC 3339\nformat for timestamps. The range is determined using the\n`offline_payment_details.client_created_at` field for each Payment. If set, payments without a\nvalue set in `offline_payment_details.client_created_at` will not be returned.\n\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "updated_at_begin_time",
          "type": "string",
          "description": "Indicates the start of the time range to retrieve payments for, in RFC 3339 format.  The\nrange is determined using the `updated_at` field for each Payment."
        },
        {
          "name": "updated_at_end_time",
          "type": "string",
          "description": "Indicates the end of the time range to retrieve payments for, in RFC 3339 format.  The\nrange is determined using the `updated_at` field for each Payment."
        },
        {
          "name": "sort_field",
          "type": "string",
          "description": "The field used to sort results by. The default is `CREATED_AT`."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreatePayment",
      "description": "You can use this endpoint \nto charge a card (credit/debit card or    \nSquare gift card) or record a payment that the seller received outside of Square \n(cash payment from a buyer or a payment that an external entity \nprocessed on behalf of the seller).\n\nThe endpoint creates a \n`Payment` object and returns it in the response.",
      "method": "post",
      "path": "/v2/payments",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelPaymentByIdempotencyKey",
      "description": "Use this method when the status of a `CreatePayment` request is unknown (for example, after you send a\n`CreatePayment` request, a network error occurs and you do not get a response). In this case, you can\ndirect Square to cancel the payment using this endpoint. In the request, you provide the same\nidempotency key that you provided in your `CreatePayment` request that you want to cancel. After\ncanceling the payment, you can submit your `CreatePayment` request again.\n\nNote that if no payment with the specified idempotency key is found, no action is taken and the endpoint\nreturns successfully.",
      "method": "post",
      "path": "/v2/payments/cancel",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetPayment",
      "method": "get",
      "path": "/v2/payments/{payment_id}",
      "pathParameters": [
        {
          "name": "payment_id",
          "type": "string",
          "description": "A unique ID for the desired payment."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdatePayment",
      "description": "You can update the `amount_money` and `tip_money` using this endpoint.",
      "method": "put",
      "path": "/v2/payments/{payment_id}",
      "pathParameters": [
        {
          "name": "payment_id",
          "type": "string",
          "description": "The ID of the payment to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelPayment",
      "description": "You can use this endpoint to cancel a payment with \nthe APPROVED `status`.",
      "method": "post",
      "path": "/v2/payments/{payment_id}/cancel",
      "pathParameters": [
        {
          "name": "payment_id",
          "type": "string",
          "description": "The ID of the payment to cancel."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payments",
      "description": "\nApplications need the following input to take a payment:\n\n- The amount to charge.\n- The payment recipient. The payment goes to the account identified by the Authorization header in the API request.\n- The payment source. The source can be a payment token or card on file.\n\n  You can generate a payment token using the Web Payments SDK and the In-App Payments SDK. For working code examples, see [Square Connect API Examples](https://github.com/square/connect-api-examples).\n\n  A card on file is a credit card, debit card, or gift card that is associated with a customer. \n  You can create a customer and add a card on file using Square APIs, the Square Seller Dashboard, or the Square Point of Sale application.\n\n  For more information, see the following guides:\n - [Payments](https://developer.squareup.com/docs/payments-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CompletePayment",
      "description": "By default, payments are set to complete immediately after they are created.\n\nYou can use this endpoint to complete a payment with the APPROVED `status`.",
      "method": "post",
      "path": "/v2/payments/{payment_id}/complete",
      "pathParameters": [
        {
          "name": "payment_id",
          "type": "string",
          "description": "The unique ID identifying the payment to be completed."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payouts",
      "description": "\nThe Payouts API allows you to see a complete list of payouts made to a seller's banking destination,\nwith a list of payout entries that describe the payments associated with each payout. It can be paired with the\nBank Accounts API to add detail about which bank account each payout was made to.\n\nFor more information, see the following guide:\n - [Payouts](https://developer.squareup.com/docs/payouts/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListPayouts",
      "description": "You can filter payouts by location ID, status, time range, and order them in ascending or descending order.\nTo call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/payouts",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "location_id",
          "type": "string",
          "description": "The ID of the location for which to list the payouts.\nBy default, payouts are returned for the default (main) location associated with the seller."
        },
        {
          "name": "status",
          "type": "string",
          "description": "If provided, only payouts with the given status are returned."
        },
        {
          "name": "begin_time",
          "type": "string",
          "description": "The timestamp for the beginning of the payout creation time, in RFC 3339 format.\nInclusive. Default: The current time minus one year.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "end_time",
          "type": "string",
          "description": "The timestamp for the end of the payout creation time, in RFC 3339 format.\nDefault: The current time.\n\nExamples for January 25th, 2020 6:25:34pm Pacific Standard Time:\n\nUTC:  2020-01-26T02:25:34Z\n\nPacific Standard Time with UTC offset:  2020-01-25T18:25:34-08:00"
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which payouts are listed."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination).\nIf request parameters change between requests, subsequent results may contain duplicates or missing records."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value. If the provided value is\ngreater than 100, it is ignored and the default value is used instead.\nDefault: `100`"
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payouts",
      "description": "\nThe Payouts API allows you to see a complete list of payouts made to a seller's banking destination,\nwith a list of payout entries that describe the payments associated with each payout. It can be paired with the\nBank Accounts API to add detail about which bank account each payout was made to.\n\nFor more information, see the following guide:\n - [Payouts](https://developer.squareup.com/docs/payouts/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetPayout",
      "description": "To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/payouts/{payout_id}",
      "pathParameters": [
        {
          "name": "payout_id",
          "type": "string",
          "description": "The ID of the payout to retrieve the information for."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Payouts",
      "description": "\nThe Payouts API allows you to see a complete list of payouts made to a seller's banking destination,\nwith a list of payout entries that describe the payments associated with each payout. It can be paired with the\nBank Accounts API to add detail about which bank account each payout was made to.\n\nFor more information, see the following guide:\n - [Payouts](https://developer.squareup.com/docs/payouts/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListPayoutEntries",
      "description": "To call this endpoint, set `PAYOUTS_READ` for the OAuth scope.",
      "method": "get",
      "path": "/v2/payouts/{payout_id}/payout-entries",
      "pathParameters": [
        {
          "name": "payout_id",
          "type": "string",
          "description": "The ID of the payout to retrieve the information for."
        }
      ],
      "queryParameters": [
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which payout entries are listed."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination).\nIf request parameters change between requests, subsequent results may contain duplicates or missing records."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value. If the provided value is\ngreater than 100, it is ignored and the default value is used instead.\nDefault: `100`"
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Refunds",
      "description": "\nThe following applies to refunds:\n\n- You cannot refund more than what was originally collected.\n- The refund amount must be available in the account's Square balance. If the amount is not available, Square attempts to take money out of\n  the associated bank account. Refunds are in a state of PENDING until the funds are secured.\n- If funds cannot be secured, the refund is not completed and the buyer does not receive a credit. The refund has \n  a status of FAILED. Future refunds to this payment are not allowed and the buyer should be reimbursed by other means.\n- You can refund only payments with status COMPLETED. You cannot refund an APPROVED payment; however, you can cancel\n  an approved payment.\n\nFor more information, see the following guides:\n - [Refunds](https://developer.squareup.com/docs/payments-api/refund-payments)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListPaymentRefunds",
      "description": "Results are eventually consistent, and new refunds or changes to refunds might take several\nseconds to appear.\n\nThe maximum results per page is 100.",
      "method": "get",
      "path": "/v2/refunds",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "begin_time",
          "type": "string",
          "description": "Indicates the start of the time range to retrieve each `PaymentRefund` for, in RFC 3339 \nformat.  The range is determined using the `created_at` field for each `PaymentRefund`. \n\nDefault: The current time minus one year."
        },
        {
          "name": "end_time",
          "type": "string",
          "description": "Indicates the end of the time range to retrieve each `PaymentRefund` for, in RFC 3339 \nformat.  The range is determined using the `created_at` field for each `PaymentRefund`.\n\nDefault: The current time."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "The order in which results are listed by `PaymentRefund.created_at`:\n- `ASC` - Oldest to newest.\n- `DESC` - Newest to oldest (default)."
        },
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this cursor to retrieve the next set of results for the original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "location_id",
          "type": "string",
          "description": "Limit results to the location supplied. By default, results are returned\nfor all locations associated with the seller."
        },
        {
          "name": "status",
          "type": "string",
          "description": "If provided, only refunds with the given status are returned.\nFor a list of refund status values, see [PaymentRefund](entity:PaymentRefund).\n\nDefault: If omitted, refunds are returned regardless of their status."
        },
        {
          "name": "source_type",
          "type": "string",
          "description": "If provided, only returns refunds whose payments have the indicated source type.\nCurrent values include `CARD`, `BANK_ACCOUNT`, `WALLET`, `CASH`, and `EXTERNAL`.\nFor information about these payment source types, see\n[Take Payments](https://developer.squareup.com/docs/payments-api/take-payments).\n\nDefault: If omitted, refunds are returned regardless of the source type."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to be returned in a single page.\n\nIt is possible to receive fewer results than the specified limit on a given page.\n\nIf the supplied value is greater than 100, no more than 100 results are returned.\n\nDefault: 100"
        },
        {
          "name": "updated_at_begin_time",
          "type": "string",
          "description": "Indicates the start of the time range to retrieve each `PaymentRefund` for, in RFC 3339\nformat.  The range is determined using the `updated_at` field for each `PaymentRefund`.\n\nDefault: If omitted, the time range starts at `begin_time`."
        },
        {
          "name": "updated_at_end_time",
          "type": "string",
          "description": "Indicates the end of the time range to retrieve each `PaymentRefund` for, in RFC 3339\nformat.  The range is determined using the `updated_at` field for each `PaymentRefund`.\n\nDefault: The current time."
        },
        {
          "name": "sort_field",
          "type": "string",
          "description": "The field used to sort results by. The default is `CREATED_AT`."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Refunds",
      "description": "\nThe following applies to refunds:\n\n- You cannot refund more than what was originally collected.\n- The refund amount must be available in the account's Square balance. If the amount is not available, Square attempts to take money out of\n  the associated bank account. Refunds are in a state of PENDING until the funds are secured.\n- If funds cannot be secured, the refund is not completed and the buyer does not receive a credit. The refund has \n  a status of FAILED. Future refunds to this payment are not allowed and the buyer should be reimbursed by other means.\n- You can refund only payments with status COMPLETED. You cannot refund an APPROVED payment; however, you can cancel\n  an approved payment.\n\nFor more information, see the following guides:\n - [Refunds](https://developer.squareup.com/docs/payments-api/refund-payments)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RefundPayment",
      "description": "You can refund the entire payment amount or a\nportion of it. You can use this endpoint to refund a card payment or record a \nrefund of a cash or external payment. For more information, see\n[Refund Payment](https://developer.squareup.com/docs/payments-api/refund-payments).",
      "method": "post",
      "path": "/v2/refunds",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Refunds",
      "description": "\nThe following applies to refunds:\n\n- You cannot refund more than what was originally collected.\n- The refund amount must be available in the account's Square balance. If the amount is not available, Square attempts to take money out of\n  the associated bank account. Refunds are in a state of PENDING until the funds are secured.\n- If funds cannot be secured, the refund is not completed and the buyer does not receive a credit. The refund has \n  a status of FAILED. Future refunds to this payment are not allowed and the buyer should be reimbursed by other means.\n- You can refund only payments with status COMPLETED. You cannot refund an APPROVED payment; however, you can cancel\n  an approved payment.\n\nFor more information, see the following guides:\n - [Refunds](https://developer.squareup.com/docs/payments-api/refund-payments)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetPaymentRefund",
      "method": "get",
      "path": "/v2/refunds/{refund_id}",
      "pathParameters": [
        {
          "name": "refund_id",
          "type": "string",
          "description": "The unique ID for the desired `PaymentRefund`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Sites",
      "description": "\nSquare sellers use Square Online to build eCommerce websites. The Sites API lets you get basic details about Square Online sites, such as the site ID, title, and domain. You can use the Sites API with the Snippets API to manage snippets that extend Square Online features.\n\n __Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).\n\n For more information, see the following guide:\n - [Sites](https://developer.squareup.com/docs/sites-api/overview)"
    },
    "endpoint": {
      "name": "ListSites",
      "description": "Sites are listed in descending order by the `created_at` date.\n\n\n__Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).",
      "method": "get",
      "path": "/v2/sites",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Snippets",
      "description": "\nThe Snippets API lets you manage snippets that add custom functionality to Square Online sites. A snippet is HTML, CSS, and JavaScript that is injected into the `head` element of all pages on a site, except for checkout pages. You can use the Snippets API to create applications that help meet the many needs of Square sellers.\n\n __Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).\n\n For more information, see the following guide:\n - [Snippets](https://developer.squareup.com/docs/snippets-api/overview)"
    },
    "endpoint": {
      "name": "DeleteSnippet",
      "description": "You can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.\n\n\n__Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).",
      "method": "delete",
      "path": "/v2/sites/{site_id}/snippet",
      "pathParameters": [
        {
          "name": "site_id",
          "type": "string",
          "description": "The ID of the site that contains the snippet."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Snippets",
      "description": "\nThe Snippets API lets you manage snippets that add custom functionality to Square Online sites. A snippet is HTML, CSS, and JavaScript that is injected into the `head` element of all pages on a site, except for checkout pages. You can use the Snippets API to create applications that help meet the many needs of Square sellers.\n\n __Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).\n\n For more information, see the following guide:\n - [Snippets](https://developer.squareup.com/docs/snippets-api/overview)"
    },
    "endpoint": {
      "name": "RetrieveSnippet",
      "description": "A site can contain snippets from multiple snippet applications, but you can retrieve only the snippet that was added by your application.\n\nYou can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.\n\n\n__Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).",
      "method": "get",
      "path": "/v2/sites/{site_id}/snippet",
      "pathParameters": [
        {
          "name": "site_id",
          "type": "string",
          "description": "The ID of the site that contains the snippet."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Snippets",
      "description": "\nThe Snippets API lets you manage snippets that add custom functionality to Square Online sites. A snippet is HTML, CSS, and JavaScript that is injected into the `head` element of all pages on a site, except for checkout pages. You can use the Snippets API to create applications that help meet the many needs of Square sellers.\n\n __Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).\n\n For more information, see the following guide:\n - [Snippets](https://developer.squareup.com/docs/snippets-api/overview)"
    },
    "endpoint": {
      "name": "UpsertSnippet",
      "description": "The snippet code is appended to the end of the `head` element on every page of the site, except checkout pages. A snippet application can add one snippet to a given site. \n\nYou can call [ListSites](api-endpoint:Sites-ListSites) to get the IDs of the sites that belong to a seller.\n\n\n__Note:__ Square Online APIs are publicly available as part of an early access program. For more information, see [Early access program for Square Online APIs](https://developer.squareup.com/docs/online-api#early-access-program-for-square-online-apis).",
      "method": "post",
      "path": "/v2/sites/{site_id}/snippet",
      "pathParameters": [
        {
          "name": "site_id",
          "type": "string",
          "description": "The ID of the site where you want to add or update the snippet."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateSubscription",
      "description": "If you provide a card on file in the request, Square charges the card for\nthe subscription. Otherwise, Square sends an invoice to the customer's email\naddress. The subscription starts immediately, unless the request includes\nthe optional `start_date`. Each individual subscription is associated with a particular location.\n\nFor more information, see [Create a subscription](https://developer.squareup.com/docs/subscriptions-api/manage-subscriptions#create-a-subscription).",
      "method": "post",
      "path": "/v2/subscriptions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkSwapPlan",
      "description": "For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).",
      "method": "post",
      "path": "/v2/subscriptions/bulk-swap-plan",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchSubscriptions",
      "description": "Results are ordered chronologically by subscription creation date. If\nthe request specifies more than one location ID,\nthe endpoint orders the result\nby location ID, and then by creation date within each location. If no locations are given\nin the query, all locations are searched.\n\nYou can also optionally specify `customer_ids` to search by customer.\nIf left unset, all customers\nassociated with the specified locations are returned.\nIf the request specifies customer IDs, the endpoint orders results\nfirst by location, within location by customer ID, and within\ncustomer by subscription creation date.",
      "method": "post",
      "path": "/v2/subscriptions/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveSubscription",
      "method": "get",
      "path": "/v2/subscriptions/{subscription_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to retrieve."
        }
      ],
      "queryParameters": [
        {
          "name": "include",
          "type": "string",
          "description": "A query parameter to specify related information to be included in the response. \n\nThe supported query parameter values are: \n\n- `actions`: to include scheduled actions on the targeted subscription."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateSubscription",
      "description": "To clear a field, set its value to `null`.",
      "method": "put",
      "path": "/v2/subscriptions/{subscription_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DeleteSubscriptionAction",
      "method": "delete",
      "path": "/v2/subscriptions/{subscription_id}/actions/{action_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription the targeted action is to act upon."
        },
        {
          "name": "action_id",
          "type": "string",
          "description": "The ID of the targeted action to be deleted."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ChangeBillingAnchorDate",
      "method": "post",
      "path": "/v2/subscriptions/{subscription_id}/billing-anchor",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to update the billing anchor date."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelSubscription",
      "description": "This \nsets the `canceled_date` field to the end of the active billing period. After this date, \nthe subscription status changes from ACTIVE to CANCELED.",
      "method": "post",
      "path": "/v2/subscriptions/{subscription_id}/cancel",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to cancel."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ListSubscriptionEvents",
      "method": "get",
      "path": "/v2/subscriptions/{subscription_id}/events",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to retrieve the events for."
        }
      ],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "When the total number of resulting subscription events exceeds the limit of a paged response, \nspecify the cursor returned from a preceding response here to fetch the next set of results.\nIf the cursor is unset, the response contains the last page of the results.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The upper limit on the number of subscription events to return\nin a paged response."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "PauseSubscription",
      "method": "post",
      "path": "/v2/subscriptions/{subscription_id}/pause",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to pause."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "ResumeSubscription",
      "method": "post",
      "path": "/v2/subscriptions/{subscription_id}/resume",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to resume."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Subscriptions",
      "description": "\nSubscriptions enable sellers to generate a reliable cash flow and recurring revenue to grow their businesses. Square offers the Subscriptions API for developers to embed subscription functionality in their applications. You first create a subscription plan using the Catalog API and then use the Subscriptions API to create and manage subscriptions. \n\nFor more information, see the following guides:\n - [Subscriptions](https://developer.squareup.com/docs/subscriptions/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SwapPlan",
      "description": "For more information, see [Swap Subscription Plan Variations](https://developer.squareup.com/docs/subscriptions-api/swap-plan-variations).",
      "method": "post",
      "path": "/v2/subscriptions/{subscription_id}/swap-plan",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "The ID of the subscription to swap the subscription plan for."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "CreateTeamMember",
      "description": "The `TeamMember` object is returned on successful creates.\nYou must provide the following values in your request to this endpoint:\n- `given_name`\n- `family_name`\n\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#createteammember).",
      "method": "post",
      "path": "/v2/team-members",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkCreateTeamMembers",
      "description": "The created `TeamMember` objects are returned on successful creates.\nThis process is non-transactional and processes as much of the request as possible. If one of the creates in\nthe request cannot be successfully processed, the request is not marked as failed, but the body of the response\ncontains explicit error information for the failed create.\n\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-create-team-members).",
      "method": "post",
      "path": "/v2/team-members/bulk-create",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "BulkUpdateTeamMembers",
      "description": "The updated `TeamMember` objects are returned on successful updates.\nThis process is non-transactional and processes as much of the request as possible. If one of the updates in\nthe request cannot be successfully processed, the request is not marked as failed, but the body of the response\ncontains explicit error information for the failed update.\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#bulk-update-team-members).",
      "method": "post",
      "path": "/v2/team-members/bulk-update",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "ListJobs",
      "description": "Results are sorted by title in ascending order.",
      "method": "get",
      "path": "/v2/team-members/jobs",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "The pagination cursor returned by the previous call to this endpoint. Provide this\ncursor to retrieve the next page of results for your original request. For more information,\nsee [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        }
      ],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "CreateJob",
      "description": "A job defines a title and tip eligibility. Note that\ncompensation is defined in a [job assignment](entity:JobAssignment) in a team member's wage setting.",
      "method": "post",
      "path": "/v2/team-members/jobs",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveJob",
      "method": "get",
      "path": "/v2/team-members/jobs/{job_id}",
      "pathParameters": [
        {
          "name": "job_id",
          "type": "string",
          "description": "The ID of the job to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpdateJob",
      "description": "Changes to the title propagate to all\n`JobAssignment`, `Shift`, and `TeamMemberWage` objects that reference the job ID. Changes to\ntip eligibility propagate to all `TeamMemberWage` objects that reference the job ID.",
      "method": "put",
      "path": "/v2/team-members/jobs/{job_id}",
      "pathParameters": [
        {
          "name": "job_id",
          "type": "string",
          "description": "The ID of the job to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "SearchTeamMembers",
      "description": "The list can be filtered by location IDs, `ACTIVE` or `INACTIVE` status, or whether\nthe team member is the Square account owner.",
      "method": "post",
      "path": "/v2/team-members/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveTeamMember",
      "description": "Learn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrieve-a-team-member).",
      "method": "get",
      "path": "/v2/team-members/{team_member_id}",
      "pathParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The ID of the team member to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpdateTeamMember",
      "description": "The `TeamMember` object is returned on successful updates.\nLearn about [Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#update-a-team-member).",
      "method": "put",
      "path": "/v2/team-members/{team_member_id}",
      "pathParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The ID of the team member to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "RetrieveWageSetting",
      "description": "For more information, see\n[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#retrievewagesetting).\n\nSquare recommends using [RetrieveTeamMember](api-endpoint:Team-RetrieveTeamMember) or [SearchTeamMembers](api-endpoint:Team-SearchTeamMembers)\nto get this information directly from the `TeamMember.wage_setting` field.",
      "method": "get",
      "path": "/v2/team-members/{team_member_id}/wage-setting",
      "pathParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The ID of the team member for which to retrieve the wage setting."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Team",
      "description": "\nThe Team API allows applications to manage team members and job definitions, which can be useful\nin payroll and accounting contexts.\n\nThe Team API integrates closely with the Labor API for timecard management.\n\nFor more information, see the following guide:\n - [Team](https://developer.squareup.com/docs/team/overview)\n - [Square Webhooks](https://developer.squareup.com/docs/webhooks-overview)\n"
    },
    "endpoint": {
      "name": "UpdateWageSetting",
      "description": "The object is created if a\n`WageSetting` with the specified `team_member_id` doesn't exist. Otherwise,\nit fully replaces the `WageSetting` object for the team member.\nThe `WageSetting` is returned on a successful update. For more information, see\n[Troubleshooting the Team API](https://developer.squareup.com/docs/team/troubleshooting#create-or-update-a-wage-setting).\n\nSquare recommends using [CreateTeamMember](api-endpoint:Team-CreateTeamMember) or [UpdateTeamMember](api-endpoint:Team-UpdateTeamMember)\nto manage the `TeamMember.wage_setting` field directly.",
      "method": "put",
      "path": "/v2/team-members/{team_member_id}/wage-setting",
      "pathParameters": [
        {
          "name": "team_member_id",
          "type": "string",
          "description": "The ID of the team member for which to update the `WageSetting` object."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateTerminalAction",
      "method": "post",
      "path": "/v2/terminals/actions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchTerminalActions",
      "description": "Terminal action requests are available for 30 days.",
      "method": "post",
      "path": "/v2/terminals/actions/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetTerminalAction",
      "description": "Terminal action requests are available for 30 days.",
      "method": "get",
      "path": "/v2/terminals/actions/{action_id}",
      "pathParameters": [
        {
          "name": "action_id",
          "type": "string",
          "description": "Unique ID for the desired `TerminalAction`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelTerminalAction",
      "method": "post",
      "path": "/v2/terminals/actions/{action_id}/cancel",
      "pathParameters": [
        {
          "name": "action_id",
          "type": "string",
          "description": "Unique ID for the desired `TerminalAction`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DismissTerminalAction",
      "description": "See [Link and Dismiss Actions](https://developer.squareup.com/docs/terminal-api/advanced-features/custom-workflows/link-and-dismiss-actions) for more details.",
      "method": "post",
      "path": "/v2/terminals/actions/{action_id}/dismiss",
      "pathParameters": [
        {
          "name": "action_id",
          "type": "string",
          "description": "Unique ID for the `TerminalAction` associated with the action to be dismissed."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateTerminalCheckout",
      "method": "post",
      "path": "/v2/terminals/checkouts",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchTerminalCheckouts",
      "description": "Only Terminal checkout requests created for the merchant scoped to the OAuth token are returned. Terminal checkout requests are available for 30 days.",
      "method": "post",
      "path": "/v2/terminals/checkouts/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetTerminalCheckout",
      "description": "Terminal checkout requests are available for 30 days.",
      "method": "get",
      "path": "/v2/terminals/checkouts/{checkout_id}",
      "pathParameters": [
        {
          "name": "checkout_id",
          "type": "string",
          "description": "The unique ID for the desired `TerminalCheckout`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelTerminalCheckout",
      "method": "post",
      "path": "/v2/terminals/checkouts/{checkout_id}/cancel",
      "pathParameters": [
        {
          "name": "checkout_id",
          "type": "string",
          "description": "The unique ID for the desired `TerminalCheckout`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DismissTerminalCheckout",
      "method": "post",
      "path": "/v2/terminals/checkouts/{checkout_id}/dismiss",
      "pathParameters": [
        {
          "name": "checkout_id",
          "type": "string",
          "description": "Unique ID for the `TerminalCheckout` associated with the checkout to be dismissed."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateTerminalRefund",
      "description": "Refunds for Interac payments on a Square Terminal are supported only for Interac debit cards in Canada. Other refunds for Terminal payments should use the Refunds API. For more information, see [Refunds API](api:Refunds).",
      "method": "post",
      "path": "/v2/terminals/refunds",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchTerminalRefunds",
      "description": "Terminal refund requests are available for 30 days.",
      "method": "post",
      "path": "/v2/terminals/refunds/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "GetTerminalRefund",
      "description": "Terminal refund objects are available for 30 days.",
      "method": "get",
      "path": "/v2/terminals/refunds/{terminal_refund_id}",
      "pathParameters": [
        {
          "name": "terminal_refund_id",
          "type": "string",
          "description": "The unique ID for the desired `TerminalRefund`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CancelTerminalRefund",
      "method": "post",
      "path": "/v2/terminals/refunds/{terminal_refund_id}/cancel",
      "pathParameters": [
        {
          "name": "terminal_refund_id",
          "type": "string",
          "description": "The unique ID for the desired `TerminalRefund`."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Terminal",
      "description": "\nThe Terminal API allows you to manage sending and receiving requests and responses from a paired Square Terminal. For a Terminal checkout, refund, or action, you can create a request, check its status, cancel the request, search for in-process requests, and get the results of the request after it is completed. In the current implementation, refunds are only supported for Interac debit cards in Canada.\n\nFor more information, see the following guides:\n - [Terminal](https://developer.squareup.com/docs/terminal-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "DismissTerminalRefund",
      "method": "post",
      "path": "/v2/terminals/refunds/{terminal_refund_id}/dismiss",
      "pathParameters": [
        {
          "name": "terminal_refund_id",
          "type": "string",
          "description": "Unique ID for the `TerminalRefund` associated with the refund to be dismissed."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkCreateVendors",
      "method": "post",
      "path": "/v2/vendors/bulk-create",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkRetrieveVendors",
      "method": "post",
      "path": "/v2/vendors/bulk-retrieve",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "BulkUpdateVendors",
      "method": "put",
      "path": "/v2/vendors/bulk-update",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "CreateVendor",
      "method": "post",
      "path": "/v2/vendors/create",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "SearchVendors",
      "method": "post",
      "path": "/v2/vendors/search",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "RetrieveVendor",
      "method": "get",
      "path": "/v2/vendors/{vendor_id}",
      "pathParameters": [
        {
          "name": "vendor_id",
          "type": "string",
          "description": "ID of the [Vendor](entity:Vendor) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Vendors",
      "description": "The Vendors API allows applications to create, retrieve, and update vendors as suppliers to a seller.\n\nFor more information, see the following guides:\n - [Vendors](https://developer.squareup.com/docs/vendors-api/overview)\n - [Square Webhooks Overview](https://developer.squareup.com/docs/webhooks-overview)"
    },
    "endpoint": {
      "name": "UpdateVendor",
      "method": "put",
      "path": "/v2/vendors/{vendor_id}",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "BETA",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "ListWebhookEventTypes",
      "method": "get",
      "path": "/v2/webhooks/event-types",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "api_version",
          "type": "string",
          "description": "The API version for which to list event types. Setting this field overrides the default version used by the application."
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "ListWebhookSubscriptions",
      "method": "get",
      "path": "/v2/webhooks/subscriptions",
      "pathParameters": [],
      "queryParameters": [
        {
          "name": "cursor",
          "type": "string",
          "description": "A pagination cursor returned by a previous call to this endpoint.\nProvide this to retrieve the next set of results for your original query.\n\nFor more information, see [Pagination](https://developer.squareup.com/docs/build-basics/common-api-patterns/pagination)."
        },
        {
          "name": "include_disabled",
          "type": "boolean",
          "description": "Includes disabled [Subscription](entity:WebhookSubscription)s.\nBy default, all enabled [Subscription](entity:WebhookSubscription)s are returned."
        },
        {
          "name": "sort_order",
          "type": "string",
          "description": "Sorts the returned list by when the [Subscription](entity:WebhookSubscription) was created with the specified order.\nThis field defaults to ASC."
        },
        {
          "name": "limit",
          "type": "integer",
          "description": "The maximum number of results to be returned in a single page.\nIt is possible to receive fewer results than the specified limit on a given page.\nThe default value of 100 is also the maximum allowed value.\n\nDefault: 100"
        }
      ],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "CreateWebhookSubscription",
      "method": "post",
      "path": "/v2/webhooks/subscriptions",
      "pathParameters": [],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "DeleteWebhookSubscription",
      "method": "delete",
      "path": "/v2/webhooks/subscriptions/{subscription_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to delete."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "RetrieveWebhookSubscription",
      "method": "get",
      "path": "/v2/webhooks/subscriptions/{subscription_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to retrieve."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "UpdateWebhookSubscription",
      "method": "put",
      "path": "/v2/webhooks/subscriptions/{subscription_id}",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "UpdateWebhookSubscriptionSignatureKey",
      "method": "post",
      "path": "/v2/webhooks/subscriptions/{subscription_id}/signature-key",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to update."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  },
  {
    "api": {
      "name": "Webhook Subscriptions",
      "description": "\nThe Webhook Subscriptions API allows you to create, retrieve, update, and delete webhook subscriptions. Because Webhook subscriptions are owned by the application and not any one seller, you cannot use OAuth Access Tokens with the Webhook Subscriptions API. You must use the application’s [personal access token](/docs/build-basics/access-tokens).\n\nFor more information, see the following guide the following guide:\n - [Webhook Subscriptions](https://developer.squareup.com/docs/webhooks/webhook-subscriptions-api)"
    },
    "endpoint": {
      "name": "TestWebhookSubscription",
      "method": "post",
      "path": "/v2/webhooks/subscriptions/{subscription_id}/test",
      "pathParameters": [
        {
          "name": "subscription_id",
          "type": "string",
          "description": "[REQUIRED] The ID of the [Subscription](entity:WebhookSubscription) to test."
        }
      ],
      "queryParameters": [],
      "releaseStatus": "PUBLIC",
      "isMultipart": false
    }
  }
];