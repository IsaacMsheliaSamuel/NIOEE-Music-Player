# User Signup & Login

Extend your Bank Management App by adding a simple **Signup and Login system**.

## 1. Signup

Create a signup form that collects:

* Full name
* Email
* Password
* Confirm password

When a user signs up:

1. Validate all fields.
2. Check that the email is not already registered.
3. Check that the passwords match.
4. Create a user object.
5. Store the user in a users array.
6. Display a successful signup message.
7. Redirect/show the login screen.

Example user structure:

```js
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "password123"
}
```

Research:

* Objects
* Arrays
* `find()`
* `push()`
* Form events
* Input validation
* Functions

---

## 2. Login

Create a login form with:

* Email
* Password

When the user logs in:

1. Get the email and password.
2. Search the users array.
3. Check whether the user exists.
4. Validate the password.
5. Display an error if the credentials are incorrect.
6. Display the bank dashboard if login is successful.

Research:

```js
find()
```

and understand how it can be used to find a user.

---

## 3. Logout

Add a **Logout** button to the dashboard.

When clicked:

1. Log the user out.
2. Hide the dashboard.
3. Show the login screen.

---

## 4. Protect the Dashboard

The bank dashboard should only be accessible after login.

Think about:

```text
Not logged in
      ↓
Login / Signup
      ↓
Successful login
      ↓
Bank Dashboard
```

If the user logs out:

```text
Logout
   ↓
Login Screen
```

---

## 5. Store Login State

Research and implement `localStorage`.

Use it to remember whether a user is currently logged in.

For example, research how to use:

```js
localStorage.setItem()
localStorage.getItem()
localStorage.removeItem()
```

When the page is refreshed, your application should determine whether the user is logged in.

---

## 6. Connect Users to Bank Accounts

A logged-in user should have access to their own bank account.

Think about how you can connect:

```text
User
 ↓
Bank Account
 ↓
Transactions
```

For example, your data could conceptually look like:

```js
{
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  account: {
    accountNumber: "100001",
    balance: 50000,
    transactions: []
  }
}
```

You may choose a different structure. The important thing is that you understand how the data is connected.

---

## 7. Authentication Rules

Your application should:

* Prevent duplicate email addresses.
* Require all signup fields.
* Require matching passwords.
* Prevent login with incorrect credentials.
* Prevent access to the dashboard when logged out.
* Allow users to log out.
* Remember the logged-in user after page refresh.

---

## Security Note

This is a **frontend learning project**, not a real authentication system.

Do **not** use this approach for a real banking application.

In a production application:

* Passwords must never be stored as plain text.
* Authentication should be handled by a secure backend.
* Passwords should be properly hashed.
* Sessions/tokens should be securely managed.
* Sensitive banking operations must be protected server-side.

The purpose here is to understand how authentication logic works using JavaScript.
