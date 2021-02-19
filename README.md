# Fetch-Rewards

This project is a coding exercise to implement backend APIs for Fetch-Rewards. Reward points are given to a customer by providers such as Proctor & Gamble, Dannon, and Unilever. When a customer interacts with a brand, such as making a purchase or viewing a marketing video, the provider may choose to reward the customer with points. These points are stored in our backend. The customer can spend these rewards points during checkout process in future purchases. At any time, customer can view his or her balance points. This backend is designed to provide APIs necessary to implement this reward point system.

Rest of this document contains information about what technologies were used to develop the backend and how to use the backend REST API. Pay close attention to the examples for each API.

#### Tech Stack: Node.js, Express, Postman, SQLite3
 
 Backend APIs are deployed: https://fetchrewards.herokuapp.com/

## Routes & APIs:

### Add transactions
Adding transactions(adding reward points) can be done using the REST API shown below. 

     HTTP Method: [POST] 
  
     URL: /api/addTransactions
   
     Request:
   
       { 
         "payer": "P&G", 
         "points": 600,
         "timestamp": "2021-02-02T07:15:05.129Z"
       }
       
     Response(HTTP 200 OK):
     
      {
        "id": 14
      }

### Spend Points
Spending points can be done using the REST API show below. Note the three cases below with an example for each: 

a) Successful full debit 

b) Successful partial debit 

c) Failed  debit due to 0 balance
 
    
   #### Example a: Successful full debit
    
    HTTP Method: [POST]
   
    URL: /api/spendPoints
    
    Request:
      {
          "points": 500
      }
  
    Response (HTTP 200 OK):
    
      {
          "P&G": 500
      }
    
   #### Example b: Successful partial debit
   In this example, user had a balance of 100 points. A request to spend 500 points would result in a partial debit of 100 points. 
   The response says that user was able to spend 100 points from "P&G" and unable to spend remaining 400 points due to inadequate balance.
    
    HTTP Method: [POST]
   
    URL: /api/spendPoints
    
    Request:
    
      {
          "points": 500
      }
  
    Response (HTTP 200 OK):
    
      {
          "P&G": 100,
          "error": "Inadequate balance for 400 points"
      }
    
   #### Example c: Failed debit due to 0 balance
    
    HTTP Method: [POST]
   
    URL: /api/spendPoints
    
    Request:
    
      {
          "points": 500
      }
  
    Response (HTTP 400 Bad Request):
    
      {
          "error": "Zero balance, unable to service request"
      }    
    
### Balance Enquiry
Get balance points using REST API shown below.

    HTTP Method: [GET]
   
    URL: /api/pointBalance
    
    Response:
    
     {
       "DANNON": 1600,
       "UNILEVER": 700,
       "P&G": 600
     }
  
 
 ## Database Details
 SQLite3 databased is being used. Schema is shown below:

#### Table: Payers
|  id  | name |
|:----:|:----:|

Everytime the backend sees a new provider in a add transaction, an entry/row is created in Payers table. 

#### Table: Transactions
|  id  | payerId(foreign key) | points | timestamp | debtFrom |
|:----:|:--------------------:|:------:|:---------:|:--------:|

Adding points results in adding an entry/row to the transaction table. Spending points may result in addition of one or more entries/rows to the transaction table.
When spending points, a negative sign is used to denote subtraction of points. Also, debtFrom field is used to keep track of the source of the points. debtFrom references the id of the row/entry in transaction table from where the points were used for spending.

## How to deploy the backend locally
1. If you do not have node/npm on your computer, install nodejs+npm combo from here: https://nodejs.org/en/download/
2. Open a terminal
3. Clone this backend repository. ```git clone https://github.com/Parimalav1/Fetch-Rewards```
4. ```cd Fetch-Rewards```
5. ```npm install```
6. ```npm start```
7. Voila! Backend is now up and running on your localhost.
8. Point your postman at http://localhost:3300 and start using/testing the backend API
9. Note that the port number(3300) may change on your computer. If it does, the correct URL for backend API will show up on your terminal

### 2 tables - payers, transactions(intermediary)
### payers table: id, name
### transactions table: id, payerId, points(+,-), timestamp, debtFrom(id)
### debtFrom(id) is included to track the oldest transaction

### 3 routers
### addTransaction-router, spend-router, balance-router
