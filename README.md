# GrocerMe: 
## User Manual
#### Leonardo Rodriguez

# 0 - What, Why, Who, How

## 0.1. - What
  GrocerMe is an application to help users track deadlines for the groceries items they need to purchase and track expiration dates for grocery items they need to eat

## 0.2. - Why
  Food waste happens often and in many different scenarios, but perhaps one of the worst ways is just by us not remembering about them. GrocerMe exist to help people keep better track of their items to reduce their food waste. 

## 0.3. - Who
  This app is for people who often forget about the food they purchase, whether it is just a busy schedule or the tendency to forget. This tends to include students who for many are not used to buying groceries and will forget to eat them or couples/small families that often overbuy or underbuy groceries.

## 0.4. - How
  This app includes two main lists that pertain to items to eat and items to buy. The list items contain the days left to do both. This gives people a relative time frame to when they should be eating/buying what groceries. The main technology this app uses is React JS, MongoDB, Express, and Node.js to implement this functionality. 

# 1 - Instructions
## 1.1. - Overview
  Welcome to GrocerMe, the grocery tracker . This user manual has sections for setting up and using your account, troubleshooting, and information about the GitHub repository for this product. GrocerMe's capabilities include the ability to add and delete items, assign items a due/expiration date, and label items to buy under an food category. In order to save your data and keep your list private, you will need to register with an account and log in to the application. 

## 1.2. - Accessing the Application
  To access the application, use the link https://grocer-me.herokuapp.com in your web browser. After a few seconds, GrocerMe should be ready for use.

## 1.3. - Creating an Account
  Before being able to utilize our tracking functionality, you will need to register for an account on GrocerMe. When opening GrocerMe, for the first time, you will see that the info about GrocerMe, and be prompted to login or register. To register, navigate to the Register page hitting the blue link or using the buttons located at the top left hand sideof the page. In the respective fields, enter an email you would like the account to be linked to and create a password for your account. Once typed in, hit the blue Register button at the bottom of the page to register your account.
  
## 1.5. - Logging In
  To log in with you account information, navigate to the Login page using the buttons at the top left of the page. Enter the email you used to register and the password you created for your account in the respective boxes, and click the blue Log In button at the bottom of the page. After clicking the Log In Button, the application will automatically bring you to the Home page where you can now keep track of your groceries.

## 1.6. - Navigating Application Functionality
### 1.6.1. Adding Grocery Items
  Once logged in and on the Home page, you will see two main sections. The left hand section respective to items to need to eat before they expire and the right hand section respective to items that still need to be bought.
  
 ### 1.6.2. Completing Items
  If you have completed a task in your either section, you can mark the task off by clicking the square box that appears at the left side of each item. Once clicked, your item will be crossed off the and the checkbox at the left handside of the task will be checked off, denoting that this task has been completed.
 
 ### 1.6.3. Deleting Items
  If a item is no longer applicable, canceled, or you wish to get clear your list of it, you have the option to delete your item. In order to do this, click on the trash can icon that appears at the bottom center of each task. Once clicked, you task will be deleted. Be careful, as this feature permanently deletes items from your list. 

# 2 - Troubleshooting
## 2.1. Application Loading Issue
  Because this application is hosted on a third party website, there may be a delay in terms of the application loading on the user's end. However, if the application does not load after a minute, close out of the application completely. Make sure to check that you have a stable internet connection and retry the link to the application. 
  
## 2.2. Task Not Being Added
  If a task is not being added and you see error warnings appearing on your screen, this is because you did not fill out one of the neccessary fields required to add a task. Todo requires you to fill out all fields including Description, Date, and Time in order to add a task to your list.

# 3 - Repository
## 3.1. Navigation
  To access the repository, use the following link: https://github.com/leovrodriguez/grocerMe . To view the user manual/README file in a separate window, click on README.md in the repository. There are two main sections in our repository: The server api and client-app. Everything to do with the server is in the root directory and everything to do with client side is in the client-app. The server section contains all neccessary API, code, schema, and database information to create the application interface and base while client-app is where the styling and client side app functionality can be found. Within client-app, there are three folders. The first one, public, is imported files from the initial setup of the React app, the second one, src, is where a majority of the product's code is found, and the third one build where out production code is built for our static client facing site. 