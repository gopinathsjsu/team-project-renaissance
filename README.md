## Team Renaissance

### Group Members: 
* Surabhi Govil
* Gayathri Pulagam
* Arpitha Gurumurthy
* Priti Sharma


## Online Banking features:

### Customer:

> Customers signup using the username provided by Admin through online banking application.

> Customers can have 2 accounts, Checking, Savings accounts.

> Each account can deposit and withdraw money.

> Customer can transfer money between accounts.

> Customers can setup recurring or one-time Bill payment for external payees

> Customer can view all of his transaction records and account balance.


### Admin:


> Admin can view all the registered users and their information.

> Admin create accounts for customers.

> Admin can delete/close any user accounts

> Admin can add transactions such as manual refunds on fees

## Tools and Languages

> FrontEnd using React

> Database using Mysql sequalize



## Architectural Diagram

## XP Core Values Implemented:

## Screenshots




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
 
**5/4/2021**

Gayathri:
  - Working on resolving getting current_session user's details
  - Implemented payee and beneficiary's updateAccountBalance in the transfer funds component

Surabhi:
- Started working on AWS deployment, read about EC2 instance and load balancers 

**5/7/2021**

Gayathri: 
  - Working on deploying the app on AWS
  
Surabhi:
- Looked into deployment ran into issue with AWS account, switched stories with Gayathri 

# Week 7

**5/10/2021**

Gayathri:
- Set up RDS instance
- deployed the app to aws ec2 by hardcoding the host IP and added load balancer
- currently blocked on enabling cors to prevent network error
- Plan to resolve the cors error and add to the auto scaling group today and tomorrow

**5/10/2021**
Surabhi:
- Validate funds available in payee account for funds transfer
- Updating account balance for payee and beneficiary
- Looked into sign in api 404 issue

**5/11/2021**

Gayathri:
- Resolved the cors error by removing some invalid options and adding appropriate headers
- Added the app to an autoscaling group(minimum 3 instances) with Load Balancer
- Plan to work on the documentation today and tomorrow

# To Run the app 

1. yarn init
2. yarn start
