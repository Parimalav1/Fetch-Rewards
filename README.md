# Fetch-Rewards

This project is a coding exercise to implement backend APIs for Fetch-Rewards. Rewards points are given to a customer by providers such as Proctor & Gamble, Dannon, and Unilever. When a customer interacts with a brand, such as making a purchase or viewing a marketing video, the provider may choose to reward the customer with points. These points are stored in our backend. The customer can spend these rewards points during checkout process in future purchases. At any time, customer can view his or her balance points. This backend is designed to provide APIs necessary to implement this reward point system.

Rest of this document contains information about what technologies were used to develop the backend and how to use the backend REST API. Pay close attention to the examples for each API.

#### Tech Stack: Node.js, Express, Postman, SQLite3
 
 URL: http://localhost:3300/

## Routes:

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
  
  
 #### 2 tables - payers, transactions(intermediary)
 #### payers table: id, name
 #### transactions table: id, payerId, points(+,-), timestamp, debtFrom(integer)

