## Team Renaissance

### Team & Contributions:
1. **Surabhi Govil**
  * Setup barebones structure of the app and the configurations to get started
  - APIs
    - Register new users after an account has been created for them by admin, check if they are already registered or not.
    - Login exisitng users already registered with the system 
    - Profile page for admin view:
      - List of all users in the database 
      - Added the option to delete a user account from the UI.
      - Added UI for refund fees button
    - Profile page for users
      - There basic information 
      - List of the accounts they have with the application
    - Search bar for view transaction page having options to select from a time period 
      - Dropdown to select date in time periods of 3 months 
      - Fetch credits/debits made in the selected time period
    - Database Validations for transfer funds API between beneficiary and payee. 
2. **Gayathri Pulagam (Transfer funds, View Transactions, Deployment)**
  - APIs
    * Transfer funds api using payee account number, beneficiary account number, transaction amount (without validations)
    * Update balance apis for both payee and beneficiary after a successful transaction
    * Fetch transactions api for current logged in user to display transactions
  - Frontend and UI
    * transfer (with basic validations) , view transactions (without searchbar)
  - Deployment
    * Deployment of app to AWS in an Auto Scaled EC2 Cluster with Load Balancer
 3. **Arpitha Gurumurthy**
- APIs
    * createAccount, deleteAccount - creates/deletes an account associated to a bank customer
    * fetchAccountBalance and fetchBalanceFromUserName to display user’s account balance
    * fetchAllAccounts api for admin
- Frontend and UI
    * createAccount form to take in inputs and create an account for a customer
    * Table to show the existing bank accounts of a customer on his profile page

 4. **Priti Sharma(Bill Payment for external payees, Admin functionality such as Manual Refunds and Closing accounts)**
  - APIs
    * PayBill api uses username, Merchant Name, Merchant account number, Bill amount, recurring period
    * Add External api creates a new merchant, uses merchant name and merchant account number.
    * PayBill api debits account balance for current user after a successful Bill pay transaction.
    * Refund api credits account balance for user after a successful refund transaction.
  - Frontend and UI Changes
    * Bill Pay component with basic validations on input (without search option)
    * Refund and Close button functionality (with validation)
  - UI Wireframe
    * BillPay wireframe 


## Online Banking features:

### Customer:

> Customers signup using the username provided by Admin through online banking application.

> Customer's login with JWT Authentication.

> Customers can have 2 accounts, Checking, Savings accounts.

> Customer can transfer money between accounts.

> Customers can setup recurring or one-time Bill payment for external payees

> Customer can view all of his transaction records and account balance.


### Admin:


> Admin can view all the registered users and their account information.

> Admin create accounts for customers.

> Admin can delete/close any user accounts

> Admin can add transactions such as manual refunds on fees

## Tools and Languages

> FrontEnd using React

> Database using Mysql sequalize

> Deployment - AWS EC2 and RDS

## Deployment Diagram
![alt text](https://github.com/gopinathsjsu/team-project-renaissance/blob/master/Screenshots/BankDeploymentDIagram.png)

## Architecture Diagram (AWS)

![alt text](https://github.com/gopinathsjsu/team-project-renaissance/blob/master/Project_Documents/architecture%20-%20aws.png)

## XP Core Values Implemented
Communication
* Throughout the course of our project, we met once a week for a pair programming session where if one member from the team had a blocker, we would work together to resolve that issue 
* We had a team group where we could update the progress and get instant feeback throughout the sprint week. 
* Every Friday, we had a sprint review, sprint retrospective and a pair programming session. This helped in a smoother development process and learning experience
* On Mondays, we had sprint plan meetings where we would plan for the sprint

## Burn down chart 
![alt text](https://github.com/gopinathsjsu/team-project-renaissance/blob/master/Screenshots/BurnDown_Chart.png)

# Week 1 

**3/15/2021:**

Surabhi: 
- Discussed with team the architecture of the application and APIs to be developed.
- Started with the login API.
- Working on adding JWT authentication to login and adding Registration API

Gayathri: 
- Planning on how to develop the application. 
- Took up the transfer component and display lists all the transactions for a user for the past 18 months

Arpitha:
- Took responsibility for component: Transfer between accounts - one time or recurring and create account

Priti:
- Started working on components: Add transactions(such as manual refunds on fees) and 
  Set up recurring or one-time Bill payment for external payees


**3/16/2021:**

Surabhi: 
- Developed UML class diagram for Login and Register

Arpitha:
- Discussed with team regarding the UML diagrams and CRC, implementation in progress.

Priti:
- Researching on how to develop the assigned components.

**3/17/2021:**

Surabhi:
- Added MYSQL to the React app, testing the CRUD operations

Gayathri: 
- UML class diagram for the transactions

Arpitha:
- Looked into tutorials for node and react

Priti:
- Working on UML and class diagrams. Refreshing concepts of react and nodejs.


**3/18/2021:**

Surabhi:
- Implemented Login API. Added login form on the front end

# Week 2

**3/26/2021:**

Surabhi:
- Designed the approach for tying Register API with create user bank account

Priti:
- Completed initial application setup in the local with MySQL database.

Arpitha:
- Created a remote git branch for my changes.
- Completed local setup for mysql, node and react.

**3/31/2021:**

Surabhi:
- Researched on how to deploy MySQL database to cloud.
- Worked on integrating MySQL DB on cloud in the app

Gayathri:
- Researched into different implementations of fetch from database

**4/1/2021:**

Surabhi:
- Working on Register API

Gayathri:
- Set up of the application on local machine

**4/2/2021:**

Surabhi:
- Completed implementation of Register API
- Read about update using Sequelize

# Week 3:
**4/5/2021**

Surabhi:
- Planning meeting with team
- Developed wireframe for register and login
- Added update username on register
- Implemented encrypt password on register and decrypt to login

Gayathri:
- Created a dummy table with records to experiment fetch functionality to transactions tab

Arpitha:
- Working on designing the classes and attributes for functionality - create new account

**4/7/2021**

Surabhi:
- Worked on deploying code to cloud 
- Resolved dependency errors

**4/9/2021**

Surabhi:
- Completed functionality to deploy to AWS and stashed changes 
- Planning and pair programming session with team

Gayathri:
- Pair programming with the team

Arpitha:
- Created account table using sequelize
- Implemented account creation api - tested locally via postman

# Week 4:
**4/12/2021**

Surabhi: 
- Pair programming and discussion with team
- Planned the Profile page
- 

**4/14/2021**

Surabhi:
- Started to work on functionality to avoid multiple sign ups
- Facing some issues with the usage of Update in Sequelize.

Arpitha:
- Working on the UI for createAccount

**4/16/2021**

Surabhi:
- Completed one user sign up
- Minor tweaks related to registration remaining 
- Trying to find a solution for conditional update issue

Arpitha:
- Added form for createAccount, integrated it with the backend API

**4/17/20121**
Surabhi:
- Started working on the user profile page 
- Added components to render user profile page on frontend.
- Update service to send user info on signin.

**4/22/20121**
Surabhi:
- Added user profile page 
- Worked on enabling one time user registration update functionality.

Arpitha:
- Working on creating a dropdown for account type - Checkings / Savings (createAccount form)

# Week 5:
**4/26/2021**

Gayathri:
- Pair Programming with the team
- Working on resolving memory errors 
- Working on creating transaction table for transfer funds

Surabhi:
- Sprint meeting with team
- Modularizing code in the application
- Added changes for one time registration check and profile page

Arpitha:
- Completed createAccount component - currently adds an account with userID as foreign key

**4/27/2021**

Gayathri:
- UI Wireframe for transfer funds
- Designed an approach for transferfund functionality, created table with appropriate schema

**4/28/2021**

Gayathri:
- Created update transaction for a transaction table
- Working on checks for sufficient balance in payee's account

**4/30/2021**

Gayathri:
- Pair programming with the team
- Implemented basic transfer funds api, working on validations of input fields

Surabhi:
- Pair programming with team
- Testing api developed for login and registration 

# Week 6

**5/3/2021**

Priti:
- Completed code for Admin manual refunds
- Implemented external account Billpay Backend API
- Sprint meeting/planning with the team
- Planning to implement UI changes for Billpay

Gayathri:
  - Implemented Update balance apis for beneficiary and payee
  - Implemented fetch transaction api for fetching all the transactions by user_id for the view transactions page
  - Did pair programming and sprint plan with the team
  - planning to implement get_current_user_account_number from the current session today and tomorrow
  - Currently blocked on getting current_session user's account number

Surabhi:
- Created profile page for admin to display all the users in the sytem 
- Updated admin profile page to include options to delete a user account
- Added UI elements for refund fee for the api to be developed by Priti

Arpitha:
- Modified createAccount functionality to add a user record during account creation if the user is not already present
- Working on deleteAccount implementation
 
**5/4/2021**


Priti:
- Implemented Null value checked for refund 
- Implemented delete/ close account for admin.
- Done with backend API changes for close and refund.


Gayathri:
  - Working on resolving getting current_session user's details
  - Implemented payee and beneficiary's updateAccountBalance in the transfer funds component

Arpitha:
- Implemented deleteAccount api

**5/6/2021**
Priti:
-  Implemented UI changes for Billpay
-  Modified UI to add external payee information
-  Planning to implemented backend API changes for external payee 

**5/7/2021**
Priti:
- sprint planning with the team
- Created a list of pending task
- Planning to work on High Priority task
- Added input text edit for bill amount 

**5/10/2021**
Priti:
- Added validation for input fields-Billpay API
- Code clean up for Billpay API and 
- Fixed issue with delete button fucnctionality

**5/10/2021**
Priti:
- Testing Billpay API
- Created wireframes for external account billpay 

Surabhi:
- Started working on AWS deployment, read about EC2 instance and load balancers 

Arpitha:
- Implemented fetchAccountBalance api

**5/7/2021**

Gayathri: 
  - Working on deploying the app on AWS
  
Surabhi:
- Looked into deployment ran into issue with AWS account, switched stories with Gayathri 
- Tested issue with sign up after account creation. No solution found 

Arpitha:
- Implemented fetchAccountBalanceByUserName api and updated user profile page to display account balance
- Updated burndown chart

# Week 7

**5/10/2021**

Gayathri:
- Set up RDS instance
- deployed the app to aws ec2 by hardcoding the host IP and added load balancer
- currently blocked on enabling cors to prevent network error
- Plan to resolve the cors error and add to the auto scaling group today and tomorrow

Surabhi:
- Validate funds available in payee account for funds transfer
- Updating account balance for payee and beneficiary
- Looked into sign in api 404 issue


**5/11/2021**

Gayathri:
- Resolved the cors error by removing some invalid options and adding appropriate headers
- Added the app to an autoscaling group(minimum 3 instances) with Load Balancer
- Plan to work on the documentation today and tomorrow


**5/12/2021**

Surabhi:
- Added Search bar on frontend for transactions and bill pay page to search transactions.
- Added function in backend to display records containing credit/debits for transfer funds and rendered on page.
- Rendered transaction in a time period for external billpay page. Worked on UI and backend for search bar functionality

Gayathri:
- Added recurring period column in transfer funds
- Worked on project documentation

**5/13/2021**

Surabhi:
- Tested the application
- Worked on documentation
- Added remianing functionalities  

Gayathri:
- Tests on application before demo
- Rechecked the health of the deployed ec2 instances

# To Run the app 

1. yarn init
2. yarn start
