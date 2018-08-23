# Reference project (Module 2) **Quote**

## User Stories

    404: "As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I maybe a mistake :(."
    
    500: "As an anon/user I can see a 500 page if there is something wrong with the server so that I know that the code is shit :D."
  
    Signup: "As an anon I can sign up in the platform so that I can start discovering awesome quotes."
    
    Login: "As a user I can login to the platform so that I can start discovering awesome quotes."
    
    Logout: "As a user I can logout from the platform so no one else can use my account."
  
    Quote List: "As a user I can list quotes from public groups so i can discover amazing quotes."

    Quote Create: "As a user I can add a quote so i can share it with the rest of the comunity."

    Quote Edit: "As a user I can edit a quote so i can change it details."

    Quote Delete: "As a user I can delete a quote so i can erase it from the face of the earth."

    Quote Like: "As a user I can mark a quote in favorite so i can see it in my profile."

---
## Backlog:

  ### Quote Epic:
    Quote Show: "As a user I can show a specific quote so i can see the details of the quote."

    Quote Report: "As a user I can report a quote so i can help building a cool comunity"

    Quote Comment: "As a user i can comment a quote so i can start a thread with other members of the comunity"

---
## Models

  ### User model:

  ```
  username: String,
  password: String,
  email: String,
  imgPath: String,
  isActive: Boolean,
  ```

  ### Quote model:

  ```
  owner: ObjectId(User)
  body: String
  from: String
  location: String
  likeCount: Number
  likes: [ObjectId(User)]
  isActive: Boolean
  background: String
  currentUserLiked: Boolean
  ```

---
## Routes

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
|get     |/quotes/:id/edit             | shows the edit quote form                |
|post    |/quotes/:id                  | updates an quote                         |
|post    |/quotes/:id/delete           | deletes the quote (isActive = false)     |
|post    |/quotes/:id/like             | add a like to the quote                  |


---
## Trello

- [Trello Board](https://trello.com/b/lCkVQ3fs/quote-module-2-reference-project)

---
## Helpful resources

- [**How to model a likes voting system with mongoDB** (Stack Overflow)](https://stackoverflow.com/questions/28006521/how-to-model-a-likes-voting-system-with-mongodb)

