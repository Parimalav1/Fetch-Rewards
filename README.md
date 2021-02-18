# Fetch-Rewards

About the Coding Exercise:

#### Tech Stack: Node.js, Express, Postman, SQLite3
 
 URL: http://localhost:3300/

## Routes:

● Add transactions for a specific payer and date.

     HTTP Method: [POST] 
  
     URL: /api/addTransactions
   
     Request:
   
       { 
         "payer": "P&G", 
         "points": 600,
         "timestamp": "2021-02-02T07:15:05.129Z"
       }
       
     Response:
     
      {
        "id": 14
      }

● Spend points using the rules above and return a list of { "payer": <string>, "points": <integer> } for each call.
 
    HTTP Method: [POST]
   
    URL: /api/spendPoints
   
    Request:
    
      {
        "points": 500
      }
  
    Response:
    
      {
        "P&G": 100,
        "error": "Inadequate balance for 400 points"
      }
    
    
● Return all payer point balance

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

