The Masterschool Capstone Project for creating and hosting a full-stack web app. See rubrics [here](https://masterschool.notion.site/Web-Capstone-Project-06f5167a6d9a436ab698da31d7f1eca9).

# User stories
As a user, I want to be able to chat with friends and be able to have the following abilities:
- Join rooms & invite people
- Sending DMs
- Block someone from sending me DMs
- Sending & captioning images
- Adding emojis
- Basic markup (links, bold, italic, etc.)
- `@mention` someone who is a member of the room
- Search for messages
- Sending gifs (by pasting exact URL or using a search functionality)

As the site owner, I wish to be able to:
- Ban accounts (for specified/unlimited duration), on specific rooms or globally
- Access logs (account creation, room joining/leaving, room/global ban log)
- Change users' user group settings:
  - Moderator: are assigned to rooms and can ban users from these specific rooms and can view the logs associated with the room/global logs associated with members of this room)
  - Admin: can give other users moderator rights/revoke them on specific rooms but not globally. Have the same access as moderators but globally
  - Restricted: Unable to start new DMs, sending images or gifs
- Create/close/temporarily disable rooms
  - No option to permanenty delete from the database, for archival purposes


In terms of message data, I want the following data to be accessible:
- Plain text content (parsing will be done while rendering)
- Sender
- Associated room
- Timestamp
- A `restricted: true` flag will be added to messages sent by someone while they have the Restricted user group

More data may be added accordingly, e.g. gifs will have a `"type": "media"` with a `url` property and the `text` will be caption

> As basic database requirement, every created account is case-insensitively unique, meaning someone cannot create an account called **Foo** if there's already an account named **foo**

# Backend

> to be added

# To-do List

## Backend
- [ ] Authentication is set up with JWT and bcrypt
- [ ] There are register, login, and logout routes
- [ ] There are three or more collections
- [ ] There are protected routes (accessed only with JWT)
- [ ] Full CRUD functionality is implemented for at least one collection
- [ ] All routes work as expected
- [ ] All errors are handled

# Frontend
- [ ] Interfaces with the backend API
- [ ] One or more views are login protected (i.e., at least one page cannot be viewed or used by a user who is not logged in)
- [ ] UI is broken up into small, reusable components
- [ ] Components follow the single-responsibility principle (component should only do one thing)
- [ ] Components contain logic to control the UI, but do not include business logic

## Overall Stretch Goal
The project incorporates at least 1 stretch goal:
- [ ] Implement a library, technology, or concept that you have not learned before (please discuss with your mentor)
- [ ] Implement frontend in a framework you have not used before in a project
- [ ] Implement PostgreSQL9
- [ ] Implement Redux or another state management system as your global state manager
- [ ] Implement WebSockets (e.g., socket.io)
- [ ] Implement Docker
- [ ] Implement connection to a cloud platform and use cloud operations (e.g., AWS - upload content )
- [ ] Implement microservices
- [ ] Implement a unit, integration, and/or end-to-end testing framework
- [ ] Other (please discuss with your mentor)