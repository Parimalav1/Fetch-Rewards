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

● Spend points using the rules above and return a list of { "payer": <string>, "points": <integer> } for each call.
 
   HTTP Method: [POST]
   
   URL: /api/spendPoints
   
    Request:
  
    Response:
    
    
● Return all payer point balance

   HTTP Method: [GET]
   
   URL: /api/pointBalance
  
 #### 2 tables - payers, transactions(intermediary)
 #### payers table: id, name
 #### transactions table: id, payerId, points(+,-), timestamp, debtFrom(integer)

