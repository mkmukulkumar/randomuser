# randomuser WebApp

## Requirements
#### 1) Login page with dummy login details
The WebApp features a user-friendly login page with dummy login details for testing purposes. Two users are available for login:

User 1:

Email: user1@example.com

Password: password1

User 2:

Email: user2@example.com

Password: password2

The authentication logic is implemented in the authenticated function. Upon successful authentication, user data is stored in local storage using Redux persist.

#### 2)A table which contains the list of users from a dummy API (https://randomuser.me/documentation#multiple) OR any other free API you can find
##### Axios usage 
The WebApp displays a table containing a list of users retrieved from a dummy API. Axios is used to fetch data from the Random User API. The data is fetched using the UsersService.ts file and displayed in the table made from material UI. All the data is fetched but not shown in the table. Only some information is shown in the table.

#### 3) ⁠After you login the app should remember the login state and should not go back to the login page, in the same manner if the app isn't logged in, the users list should not be accessible 
The WebApp maintains login state persistence. If a user is logged in, the app remembers the login state and does not redirect to the login page. Conversely, if the user is not logged in, the user list is inaccessible. 

Redux is utilized to store user information, including the username and authentication status (isauth). Redux persist is employed to store the isauth value in local storage, eliminating the need for repeated logins.

#### 4.) Enable user search by name
The WebApp enables users to search for other users by name. A Material UI search bar is implemented. All the data is fetched once in the array then the required info is stored in another variable "rows" then this rows variable is used to filter to enable search. The search bar keeps on searching as you type.

## App Load Time and Performance
To optimize app load time and performance:

- Proper data models using interfaces are implemented for readability and future data management.
- Data is fetched once and then filtered for search operations, preventing redundant API requests.
- Pagination is implemented in the table to facilitate efficient searching based on specific requirements.

## MUI Usage
Material UI is extensively used in the WebApp:
- LoginPage is designed using Material UI components.
- Navigation bar, table, and search bar for users are created using Material UI.

## Redux Usage
Redux is employed for state management:
- User information, including the username and authentication status, is stored using Redux.
- Redux persist is utilized to store the isauth value in local storage for seamless login experiences.

## Possible Improvements
Future enhancements for the WebApp could include:
- Integration with a backend to fetch users from a database instead of directly writing in the code.
- Consideration of using cookies for more efficient login session management when a backend is available. Currently, cookies are not implemented due to the absence of a backend.


## Deployed on Vercel
Check using the link below
https://randomuser-mkmukulkumars-projects.vercel.app/

## References:
-Learn to Persist State in React Redux-Toolkit App using Redux-Persist
https://www.youtube.com/watch?v=b88Z5POQBwI

https://lightrains.com/blogs/redux-persist-with-next-js/

https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data

-Login 
https://mui.com/material-ui/getting-started/templates/

-Table
https://mui.com/material-ui/react-table/

-API
https://randomuser.me/

-Fetching data
https://www.youtube.com/watch?v=y7vNLQ_vbD4

-Json Formater
https://jsonformatter.org/json-viewer

-Typescript basic
https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
