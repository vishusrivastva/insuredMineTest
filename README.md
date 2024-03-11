# insuredMine
This project is designed to handle various tasks related to insurance policy management. It includes functionalities such as uploading data into MongoDB, searching policy information based on user name, providing aggregated policy data for each user, tracking CPU utilization of the server, and inserting messages into the database at specified times.

## Table of Contents
- [Task 1](#task-1)
  - [API Documentation](#api-documentation)
  - [Collections](#collections)
- [Task 2](#task-2)
  - [Real-time CPU Utilization Tracking](#real-time-cpu-utilization-tracking)
  - [Post-Service for Inserting Messages](#post-service-for-inserting-messages)

## Task 1

### API Documentation

1.1. **Upload API**
   - Endpoint: `/upload`
   - Method: POST
   - Description: API to upload XLSX/CSV data into MongoDB using worker threads.

1.2. **Search API**
   - Endpoint: `/searchPolicyInfo`
   - Method: POST
   - Parameter: `userName` (String)
   - Description: Search policy info based on the username.

1.3. **Aggregated Policy API**
   - Endpoint: `/aggregatePolicy`
   - Method: GET
   - Description: API to provide aggregated policy data for each user.

### Collections

1. **Agent**
   - Attributes: `agentName`

2. **User**
   - Attributes: `firstName`, `DOB`, `address`, `phoneNumber`, `state`, `zipCode`, `email`, `gender`, `userType`

3. **User's Account**
   - Attributes: `accountName`

4. **Policy Category (LOB)**
   - Attributes: `categoryName`

5. **Policy Carrier**
   - Attributes: `companyName`

6. **Policy Info**
   - Attributes: `policyNumber`, `policyStartDate`, `policyEndDate`, `policyCategory`, `premiumAmount`, `collectionId`, `companyCollectionId`, `userId`

## Task 2

### 2.1 Real-time CPU Utilization Tracking

The server tracks real-time CPU utilization and restarts the server if it exceeds 70% usage.

### 2.2 Post-Service for Inserting Messages

**Message Insertion API**
 - Endpoint: `/scheduleMessage`
 - Method: POST
 - Parameters: `message` (String), `day` (String) e.g `Monday`, `time` (String) e.g `HH:MM`
 - Description: Inserts a message into the database at the specified day and time.

## Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Configure MongoDB connection settings.
4. Run the server using `npm start`.
5. Attached sample csv file to upload and test.
6. Added Postman Collection to run the APIs, Please import this in Postman Application.

## Contributors

- Vishwajeet Kumar
