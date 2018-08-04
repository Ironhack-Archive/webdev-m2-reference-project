# Reference project (Module 2) **Quote**

## User Stories

  ### Error Epic:
    404: "As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I maybe a mistake :(."
    
    500: "As an anon/user I can see a 500 page if there is something wrong with the server so that I know that the code is shit :D."
  
  ### Auth Epic:
    Signup: "As an anon I can sign up in the platform so that I can start discovering awesome quotes."
    
    Login: "As a user I can login to the platform so that I can start discovering awesome quotes."
    
    Logout: "As a user I can logout from the platform so no one else can use my account."
  
  ### Quote Epic:
    List: "As a user I can list quotes from public groups so i can discover amazing quotes."

    Create: "As a user I can add a quote so i can share it with the rest of the comunity."

    Show: "As a user I can show a specific quote so i can see the details of the quote."

    Update: "As a user I can update a quote so i can change it details."

    Delete: "As a user I can delete a quote so i can erase it from the face of the earth."

    like: "As a user I can mar a quote in favorite so i can see it in my profile."

    Comment: "As a user i can make a comment so that i can share mis thoughts about that quote with the community"

---
## Backlog:

  ### Profile Epic:
  Profile: "As a user I would like to see my profile so I can manage my preferences and see my favorites quotes and my groups."

  ### Group Epic:
    List: "As a user I can list group that are not private so i can"

    Create: "As a user I can group so i can see all the quotes specific to that group."

    Show: "As a user I can show a specific group so i can "

    Update: "As a user i can update a group so i can change it prefenrences"

    Invite: "As a user i can invite other users to the private group so i can start sharing quotes with them."

    Join: "As a user I can join a public group so i can start sharing quotes with others members."

---
## Models

  ### User model:

  ```
  User {
    username: {
    type: String,
    required: true,
    unique: true
    },
    password: {
      type: String,
      required: true
    },
    email: {
      type: string,
      required: true
    },
    picture: {
      type: string,
      required: true
    }
  }, {
  timestamps: true
  }
  ```

  ### Quote model:

  ```
  Quote {
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    body: {
      type: String,
      required: true
    },
    reviews: [
      Review.schema
    ],
    likes: [
      owner: {
        type: ObjectId,
        ref: 'User',
        required: true
      }
    ],
    isActive: {
      type: Boolean,
      default: true
    }    
  }, {
  timestamps: true
  }
 ```

  ### Comment Sub-Schema  

  ```
  Comment {
    content: {
      type: String,
      required: true
    },
    owner: {
      type: ObjectId,
      ref: 'User',
      required: true
    }
  }, {
  timestamps: true
  }
  ```

---
## Routes

## INDEX
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/                            | show the homepage                        |

---

## ERRORS
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/404                         | shows the 404 page                       |
|get     |/500                         | shows the 500 page                       |

---

## AUTH
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/auth/login                  | shows login form                         |
|post    |/auth/login                  | creates a new session                    |
|get     |/auth/signup                 | show the new user form                   |
|post    |/auth/signup                 | creates a new user and log him in        |
|post    |/auth/logout                 | deletes user from session                |

---

## QUOTES
Method   | Route                       | Whats does?                              |
|:-------|:----------------------------|:-----------------------------------------|
|get     |/quotes                      | shows the list of quotes                 |
|get     |/quotes/create               | shows the quote creation form            |
|post    |/quotes                      | creates a new quote                      |
|get     |/quotes/:id                  | shows the quotes detail page             |
|get     |/quotes/:id/edit             | shows the edit quote form                |
|post    |/quotes/:id/                 | updates an quote                         |
|post    |/quotes/:id/delete           | deletes the quote (isActive = false)     |
|post    |/quotes/:id/like             | add a like to the quote                  |
|post    |/quotes/:id/comment          | add a comment to the quote               |