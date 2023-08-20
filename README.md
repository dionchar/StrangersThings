# Welcome to Stranger's Things!

Welcome to Stranger's Things, the React Post Sharing Platform project!

## Functionality

### Routes via React Router

- `/posts`: Displays a list of all posts.
- `/profile`: Shows user's profile with messages.
- `/login` and `/register`: User authentication routes.

### Unauthenticated Users

#### Can:

- View a list of all posts.
- Sign up for an account with a username and password.
- Sign in with the correct username/password combination.

#### Cannot:

- Create a new post.
- Delete any post.
- Send a message to the author of any post.

### Authenticated Users

#### Can:

- Create a new post.
- Delete a post if they are the author.
- Send a message to the author of any post, excluding their own.
- See all messages for posts they authored.
- View messages received in a special view..

#### Cannot:

- Delete posts for which they are not the author.
- Send a message to themselves.

### All Users

- Can filter posts using a simple text matcher.

## Implementation Requirements

### JavaScript Basics

- Use `let` and `const` for variable declaration.
- Utilize loops such as `map`, `forEach`, `for`, or `while`.
- Implement control structures: `if`, `else`, `else if`, ternaries.
- Declare and invoke functions appropriately.
- Work with basic and complex data types like arrays and objects.

### AJAX Basics

- Utilize HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) for data requests.
- Handle asynchronous code using `try`/`catch` blocks within async functions.
- Update the DOM with data request results.

### Front-End Basics

- Develop well-structured React components.
- Use props effectively to share data and functions between components.
- Implement event listeners on React components.
- Manage state and effects proficiently.
- Set up routes using React Router.

### CSS Basics

- Create layouts using Flex/Grid.
- Apply cascading and specificity to prevent style bleed.
- Focus on delivering a good User Experience (UX) through clean interface design.

### Code Quality

- Write clean and organized code.
- Eliminate unused functions or variables.
- Choose meaningful names for variables, functions, and CSS classes.
- Maintain a coherent and understandable code flow.

## Getting Started

1. Clone the repository to your local machine.
2. Install project dependencies using `npm install`.
3. Start the development server with `npm start`.

## Conclusion

Thank you for participating in the React Post Sharing Platform project. Following these guidelines and implementing the specified functionality will contribute to creating a robust and user-friendly web application. Happy coding! 🚀

