# Fetch-Rewards
#### 2 tables - payers, transactions(intermediary)
#### payers table: id, name
#### transactions table: id, payerId, points(+,-), timestamp, debtFrom(integer)

About the Coding Exercise:
 I'm using Node.js with Express
 Hosted/Deployed on Heroku
 URL: http://localhost:3300/

Routes:

● Add transactions for a specific payer and date.

  http://localhost:3300/api/addTransactions

● Spend points using the rules above and return a list of { "payer": <string>, "points": <integer> } for each call.
  
  http://localhost:3300/api/spendPoints
  
● Return all payer point balance

  http://localhost:3300/api/pointBalance
  
Example
Suppose you call your add transaction route with the following sequence of calls:
● { "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }
● { "payer": "UNILEVER", "points": 200, "timestamp": "2020-10-31T11:00:00Z" }
● { "payer": "DANNON", "points": -200, "timestamp": "2020-10-31T15:00:00Z" }
● { "payer": "MILLER COORS", "points": 10000, "timestamp": "2020-11-01T14:00:00Z" }
● { "payer": "DANNON", "points": 300, "timestamp": "2020-10-31T10:00:00Z" }
