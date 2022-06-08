# CHALLENGE FULL STACK - JavaScript *** NODE JS/ VUE JS ***

It is an application for personal budget management. It should
allow to create and edit income and expenditure of money, and 
show a balance of the recorded operations.

## Sections Information
* Home
    The home screen should show the current balance,it means, the result of the cash inflows and outflows charged, and a list of the last 10 recorded.

* ABM of operations (income and expenditure)
    The application must contain:
    * Transaction registration form (Concept, Amount, Date, Type).
    * List of transactions recorded according to their type (input or output).
    * From the list, it should be possible to modify or delete a previously recorded operation. It should not be possible to modify the type of operation (input or output) once created. 

* Bonus
    In addition, you can...
    
    * User authentication
    Add a registration and login form to identify the user using the application, and link the registered operations to the authenticated user in the system.
    application, and link the registered operations to the authenticated user in the system,
    both for the listing and creation of new records. The indispensable data to allow the login must be an email and password, being able to add the desired ones.
    
    * Categories of operations
    Add the functionality to categorize the operations registered in the manager, such as, for example, a "food" category to categorize expenses. Additionally, add the possibility to list transactions by category.

## Technologies
    * Express,
    * Vue Js 3
    * Sql Server

### Clone the project
You can use:
```sh
git clone 'url'
```
or download it

## Project Setup
personal_budget/backend
```sh
npm install
```
../backend/src/db/script
Contain the DB Sql Script

../backend/src/db/connection
Change to your own values


personal_budget/frontend
```sh
npm install
```
personal_budget/frontend/src/helpers/connectionDb
Change the correct api url
 

### Compile and reload for Vue Js Development

```sh
npm run dev
```

### Compile and reload for Node Js Development

```sh
nodemon app
```
