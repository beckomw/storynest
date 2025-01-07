# StoryNest Project - By Jay Yong & Wayne Beckom



## How To install

- Fork the repository and download zipped files <code>cd storynest</code>
- Using a terminal run the command inside the storynest folder <code>docker-compose up --build</code>
- To connect a data base or use the PostGreSQL database the instructions are in the server directory commented in the main.py file!








## Project Overview

![alt text](storynestimage.png "Finalized Wireframe")














## Project Description
StoryNest is a locally hosted platform designed for developers to share, discuss, and refine their coding projects through interactive storytelling. The app addresses the need for community-driven learning and problem-solving within smaller, private networks or organizations. By allowing users to create, tag, and interact with stories, StoryNest fosters a supportive environment where developers can connect, learn from one another, and gain feedback on their work.

## Mission Statement
Empowering developers to collaborate, learn, and grow through the art of storytelling.

## Vision Statement
To create a thriving community where every developer’s journey is shared, celebrated, and enriched by collective knowledge.



### Target Customers
- Primarily designed with developers in mind, but versatile enough for anyone who values a collaborative environment.

### Customer Needs/Desires
- As the tech community continues to grow, there is an increasing need for platforms that foster collaboration and knowledge-sharing.

## Application Features & Functionality


Please note that some of these features were scrapped due to the restruc
### User Authentication & Login
### Profile Page
### Activity Tracking
### Create Stories (Basic CRUD Functionality)
### Story Interactions
- User reactions to stories
- Comments
- Reactions

### Search Functionality
- Search for other users
- Search for stories
- Search user activity (Only if friends = True)

### Notifications
- All activity notifications
- Ability to edit which notifications you receive

### Messaging
- Message the author of a story

### Main Feed
- Stories feed where any logged-in user can interact
- Only friends can message from their stories

### Tags
- Add tags to each story to make them searchable
- Use tags to filter the main feed

### Sharing
- Export the story you're viewing as PDF, Word, etc.

## Product Summary
StoryNest is a locally hosted platform designed for developers to share, discuss, and refine their coding projects through interactive storytelling. The app addresses the need for community-driven learning and problem-solving within smaller, private networks or organizations. By allowing users to create, tag, and interact with stories, StoryNest fosters a supportive environment where developers can connect, learn from one another, and gain feedback on their work. With features like user authentication, story creation, and activity tracking, StoryNest empowers developers to build a network of peers and mentors, making collaboration more accessible and effective within a controlled, local setting.



## Finalized Wireframe
![alt text](StoryNestWebframe.JPG "Finalized Wireframe")

## API Design

# StoryNest API Endpoints

## **User Endpoints**

- **Get all users**
  - `GET /api/users/`
  - Retrieves a list of all users.

- **Get a single user**
  - `GET /api/users/{id}/`
  - Retrieves a single user by their ID.

- **Create a new user**
  - `POST /api/users/`
  - Creates a new user.

- **Update an existing user**
  - `PUT /api/users/{id}/`
  - Updates an existing user by their ID.

- **Delete a user**
  - `DELETE /api/users/{id}/`
  - Deletes a user by their ID.

## **Story Endpoints**

- **Get all stories**
  - `GET /api/stories/`
  - Retrieves a list of all stories.

- **Get a single story**
  - `GET /api/stories/{id}/`
  - Retrieves a single story by its ID.

- **Create a new story**
  - `POST /api/stories/`
  - Creates a new story.

- **Update an existing story**
  - `PUT /api/stories/{id}/`
  - Updates an existing story by its ID.

- **Delete a story**
  - `DELETE /api/stories/{id}/`
  - Deletes a story by its ID.

## **Comment Endpoints**

- **Get all comments for a story**
  - `GET /api/stories/{story_id}/comments/`
  - Retrieves all comments for a specific story.

- **Get a single comment**
  - `GET /api/comments/{id}/`
  - Retrieves a single comment by its ID.

- **Create a new comment**
  - `POST /api/stories/{story_id}/comments/`
  - Creates a new comment for a specific story.

- **Update an existing comment**
  - `PUT /api/comments/{id}/`
  - Updates an existing comment by its ID.

- **Delete a comment**
  - `DELETE /api/comments/{id}/`
  - Deletes a comment by its ID.

## **Reaction Endpoints**

- **Get all reactions for a story or comment**
  - `GET /api/reactions/`
  - Retrieves all reactions (can be filtered by story_id or comment_id).

- **Create a new reaction**
  - `POST /api/reactions/`
  - Creates a new reaction to a story or comment.

- **Delete a reaction**
  - `DELETE /api/reactions/{id}/`
  - Deletes a reaction by its ID.

## **Notification Endpoints**

- **Get all notifications for a user**
  - `GET /api/users/{user_id}/notifications/`
  - Retrieves all notifications for a specific user.

- **Mark a notification as read**
  - `PUT /api/notifications/{id}/read/`
  - Marks a specific notification as read.

## **Tag Endpoints**

- **Get all tags**
  - `GET /api/tags/`
  - Retrieves a list of all tags.

- **Get a single tag**
  - `GET /api/tags/{id}/`
  - Retrieves a single tag by its ID.

- **Create a new tag**
  - `POST /api/tags/`
  - Creates a new tag.

- **Update an existing tag**
  - `PUT /api/tags/{id}/`
 

### User
- Fields: username, email, password, profile_picture, bio, date_joined
- Relationships: friends, stories, comments, reactions, followers

### Story
- Fields: title, content, tags, author_id, created_at, updated_at, views_count, likes_count, dislikes_count, is_featured
- Relationships: author, comments, reactions, views

### Comment
- Fields: content, author_id, story_id, created_at, likes_count, dislikes_count
- Relationships: author, story, reactions

### Reaction
- Fields: reaction_type, user_id, story_id, comment_id, created_at
- Relationships: user, story, comment

### Notification
- Fields: message, user_id, is_read, created_at, related_id
- Relationships: user

### Tag
- Fields: name, created_at, description
- Relationships: stories

### Friend
- Fields: friend_id, created_at
- Relationships: user

### Message
- Fields: title, sender_id, receiver_id, content, created_at
- Relationships: sender, receiver

