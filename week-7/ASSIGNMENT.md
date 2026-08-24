# Frontend Assignment: Build a User Directory

## Overview

Build a responsive **User Directory** using **HTML, CSS, and vanilla JavaScript**.

You will consume data from the following REST API:

**JSONPlaceholder Users API:**
https://jsonplaceholder.typicode.com/users

Your application should fetch the users from the API and present the information in a clean, responsive, and user-friendly interface.

---

## Learning Objectives

By completing this assignment, you should demonstrate your ability to:

* Structure a webpage using semantic HTML.
* Create responsive layouts using CSS.
* Use JavaScript to interact with the DOM.
* Fetch data from an external REST API.
* Work with asynchronous JavaScript using `fetch()`.
* Handle loading and error states.
* Dynamically generate HTML elements from API data.
* Implement search/filter functionality.
* Write clean and organized frontend code.

---

# Requirements

## 1. Project Setup

Create the following project structure:

```text
user-directory/
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

Do not use frontend frameworks or libraries.

### You must use:

* HTML5
* CSS3
* Vanilla JavaScript

### Do not use:

* React
* Vue
* Angular
* Bootstrap
* Tailwind CSS
* jQuery
* Any UI/component library

---

# 2. Page Layout

Create a professional **User Directory** page.

The page should contain:

### Header

Include:

* Application name/title: **User Directory**
* A short description such as:

> Explore users and their contact information.

### Search Section

Add a search input that allows users to search for users.

The search should work by:

* Name
* Username
* Email

Example:

```text
Search users...
```

### User Section

Display the users retrieved from the API in cards or another well-designed layout.

A grid layout is recommended.

---

# 3. Fetch Users from the API

Use JavaScript's `fetch()` API to retrieve the users.

Endpoint:

```text
https://jsonplaceholder.typicode.com/users
```

Example response structure:

```json
[
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874"
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
]
```

You should dynamically render the data rather than manually writing the users into your HTML.

---

# 4. User Card

Each user should be displayed in a card.

At minimum, each card should contain:

* Name
* Username
* Email
* Phone
* City
* Company

Example:

```text
┌───────────────────────────────┐
│ Leanne Graham                 │
│ @Bret                         │
│                               │
│ ✉ Sincere@april.biz           │
│ ☎ 1-770-736-8031              │
│ 📍 Gwenborough                │
│ 🏢 Romaguera-Crona            │
└───────────────────────────────┘
```

You are encouraged to improve the design.

---

# 5. Search Functionality

Implement a real-time search feature.

When the user types into the search input, filter the displayed users.

For example:

```text
Search: leanne
```

Should display:

```text
Leanne Graham
```

The search should be case-insensitive.

It should search through:

* Name
* Username
* Email

---

# 6. Loading State

While the application is fetching data from the API, display a loading state.

For example:

```text
Loading users...
```

You can implement a spinner, skeleton cards, or another creative loading experience.

---

# 7. Error Handling

Your application must handle API errors gracefully.

If the request fails, display a meaningful message such as:

```text
Unable to load users.

Please check your internet connection and try again.
```

Do not leave the page blank.

---

# 8. Empty Search State

If a user's search does not match anyone, display an appropriate message.

Example:

```text
No users found.

Try searching for another name, username, or email.
```

---

# 9. Responsive Design

The application must work properly on:

* Desktop
* Tablet
* Mobile

The user cards should automatically adapt to different screen sizes.

For example:

```text
Desktop

┌───────┐ ┌───────┐ ┌───────┐
│ User  │ │ User  │ │ User  │
└───────┘ └───────┘ └───────┘


Mobile

┌─────────────┐
│    User     │
└─────────────┘

┌─────────────┐
│    User     │
└─────────────┘
```

---

# 10. User Details

Add a way for users to view more information about a particular user.

You can implement this using either:

### Option A — Modal

Clicking a user card opens a modal containing additional information.

### Option B — Details Section

Clicking a card displays the user's complete information in a dedicated section.

The details should include information such as:

* Full name
* Username
* Email
* Phone
* Website
* Full address
* Company name
* Company catchphrase

---

# 11. Code Quality

Your code should be:

* Well organized
* Properly indented
* Easy to understand
* Reusable where possible
* Free from unnecessary repetition

Use meaningful variable and function names.

For example:

```javascript
fetchUsers()
renderUsers()
filterUsers()
showUserDetails()
```

Avoid putting all your JavaScript inside `index.html`.

---

# Bonus Challenges

These are optional but recommended.

## Bonus 1 — Sort Users

Add the ability to sort users by:

* Name A → Z
* Name Z → A
* Username
* Company

---

## Bonus 2 — Dark Mode

Add a dark/light mode toggle.

The user's preference should persist after refreshing the page using `localStorage`.

---

## Bonus 3 — User Count

Display the number of users currently being shown.

Example:

```text
10 users found
```

When searching:

```text
3 users found
```

---

## Bonus 4 — Favorites

Allow users to mark users as favorites.

Store favorite users using:

```javascript
localStorage
```

The favorites should remain after refreshing the page.

---

# Technical Expectations

You are expected to demonstrate knowledge of:

### HTML

* Semantic HTML
* Forms
* Buttons
* Input fields
* Accessibility basics

### CSS

* Flexbox and/or CSS Grid
* Responsive design
* Media queries
* Hover states
* Transitions
* Good spacing and typography

### JavaScript

* Variables and constants
* Functions
* Arrays
* Objects
* Array methods
* DOM manipulation
* Event listeners
* `fetch()`
* Promises / `async` and `await`
* Error handling
* Conditional rendering
* Local storage if completing bonus features

---

# Deliverables

Submit a GitHub repository containing:

```text
user-directory/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

Your `README.md` should contain:

1. Project name
2. Project description
3. Features implemented
4. Technologies used
5. How to run the project
6. Screenshot(s) of the application
7. Live demo link, if available

---

# Submission Checklist

Before submitting, make sure:

* [ ] Users are fetched from the API.
* [ ] Users are dynamically rendered.
* [ ] Search functionality works.
* [ ] Loading state is implemented.
* [ ] API error state is implemented.
* [ ] Empty search state is implemented.
* [ ] User details can be viewed.
* [ ] Application is responsive.
* [ ] HTML is semantic and properly structured.
* [ ] CSS is organized and responsive.
* [ ] JavaScript is separated from HTML.
* [ ] No frontend frameworks or CSS libraries were used.
* [ ] Code is pushed to GitHub.
* [ ] README is included.
* [ ] Live demo is provided if possible.

---

# Evaluation Criteria

| Category                      |  Points |
| ----------------------------- | ------: |
| HTML structure & semantics    |      10 |
| CSS & visual design           |      15 |
| Responsive design             |      10 |
| API integration               |      20 |
| JavaScript & DOM manipulation |      15 |
| Search functionality          |      10 |
| Loading & error handling      |      10 |
| User details functionality    |       5 |
| Code quality                  |       5 |
| **Total**                     | **100** |

### Bonus

Up to **10 additional points** may be awarded for:

* Sorting
* Dark mode
* Favorites
* Excellent UX
* Creative UI/UX improvements

---

## Important

The goal of this assignment is **not just to make the page look good**.

You should demonstrate that you understand how a frontend application communicates with an external API, processes the response, manages application state, and presents dynamic data to users.

**Do not hardcode the users into your HTML. The user data must come from the API.**
