# Approval System

Approval System for file sharing - by _Ron Borysovski_ © 2019

# Features

- Create request via API from external applications (protected with Spike token)
- Approve, deny or request additional information for each request
- Set approval ranks and people for each unit
- Update `statuses` service and `push` service on every status change

# Installing

```bash
 $ git clone https://github.com/Ron537/approval-system 

 $ cd approval-system 

 $ npm install 
 ```

# Running the project

For development:

```bash
$ npm run dev 
```

For production:

```bash
$ npm start 
```

# Public Endpoint

## Creating a request 

| Method 	| Endpoint          	            | Description                    	    | Required Scopes  	        |
|--------	|--------------------------------	|--------------------------------	    |-----------------------	|
| POST    	| /api/v1/request         	        | Create new request                 	| `write` 	                |

### Required properties

| Name   	| Type                	            | Description                    	   | Required  | Example         	        |
|--------	|--------------------------------	|--------------------------------	   |---------- | -----------------------	|
| id    	| `string`                 	        | Unique request id                    |     V     | "req-2019-file-X"          |
| from      | `string`                          | Requestor genesis id (from Kartoffel)|     V     | "5db03275b02d1dcfd9ccd57e" |
| to        | `{id: string, name: string}[]`    | Destination users (receivers)        |     V     | `[{id: '5db03275b02d1dcfd9ccd57e', name: 'John Doe'}]` |
| fileId    | `string`                          | File id from `drive`                 |     V     | "file-id-201041122"        |
| info      | `string`                          | Request information                  |     X     | "This file is very important to me, please approve" |
| classification | `string`                     | Request's classification             |     V     | "Secret"                   |

#### Example

```JSON
{
	"id": "req-2019-file-X",
	"from": "5db03275b02d1dcfd9ccd57e",
	"to": [
        {"id": "5db03275b02d1dcfd9ccd57e", "name": "John Doe"},
        {"id": "5dee4946e982ca42cc4ffc53", "name": "Jane Doe"},
    ],
	"fileId": "file-id-201041122",
	"info": "This file is very important to me, please approve",
	"classification": "Secret"
}
```

#### Response Schema
```JSON
{
    "id": "req-2019-file-X",
    "from": "5db03275b02d1dcfd9ccd57e",
    "to": [
        {
            "id": "5db03275b02d1dcfd9ccd57e",
            "name": "John Doe"
        },
        {
            "id": "5dee4946e982ca42cc4ffc53",
            "name": "Jane Doe"
        }
    ],
    "fileId": "file-id-201041122",
    "info": "This file is very important to me, please approve",
    "classification": "Secret",
    "unit": "Ron Borysovski © 2019",
    "workflow": [
        {
            "status": "PENDING",
            "type": "REGULAR"
        }
    ],
    "createdAt": "2019-12-10T15:11:38.067Z",
    "updatedAt": "2019-12-10T15:11:38.067Z",
    "_id": "req-2019-file-X",
}
```

#### Request Headers
This request is protected with spike-middleware.
Requires `Authorization` header with correct token with `write` scope.

# Files to change when deploying
When deploying the application several files should be changed (can be done via docker volumes).

`assets/ranks.json` - Add all possible ranks.

`certificate/certificate.pem` - Spike public certificate.

# Default DB values
Application contains sevaral collections:
`units`, `requests`, `admins`.

1. `units` collection should include 1 default document named `default` (name can be changed in config file).
This document affects every new unit that is created.
Unit's approvers is copied from defualt unit approvers.

NOTE: when running the application for the first time, create the following document in the unit's collection:

```JSON
{
    "approvers" : [  // Array of defualt ranks for new units
        "rank1",
        "rank2",
        ...
    ],
    "name" : "default",
}
```

2. `admins` collection stores the users that has admin privillege in the application. In order to add new admin, simply add new record to this collection:

```JSON
{
    "_id" : "5db03275b02d1dcfd9ccd57e" // user genesis id
}
```

# Spike Tokens
This application is using spike to generate the following tokens:

1. Users service token (Kartoffel)
2. Push service token

This application also protectes the public endpoints specified above with spike token.

# Authentication
Authentication is handled with Shraga.
Every request requires the user to be logged in.

Client is redirected to authentication endpoint and when authenticated, server is used to proxy the client with the user (same session).