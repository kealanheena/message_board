# Message Board

## User Stories

```
As a User,
So I can make my opinion know,
I would like to Create a message.

As a User,
So I can see my and others opinions,
I would like to be able to Read a messages.

As a User,
So I can retroactively change my opinions,
I would like the option to Update a messages.

As a User,
So I can take back something I regret saying,
I would like the option to DESTROY a messages.
```

## Tech Used

- JavaScript 
- MongoDB
- Express
- React
- Node.js
- Mocha
- Chai

## Features

You'll be able to:

- Create a message
- Read a message
- Update a message
- DESTROY/Delete a message

## Getting Started

### Local Setup

```sh
$ git clone 
```

```sh
$ cd 
```

#### To Start



## Running the tests


## Tests 

### Back-End Test

#### App
- MessageApp Tests
  - posts a message
  - gets all messages
  - gets a single message
  - updates a message
  - deletes a message
- message api errors correctly
  - posts a message errors
  - gets all errors when no messages
  - errors if cant find single message
  - errors on bad update
  - errors deleting message that doesn't exist
#### Controler
- App
  - getAll returns all messages
  - app has messages
  - app creates message (post)
  - message has content, date, and id
  - app reads (get)
  - app updates (update)
  - app deletes (delete)
  - id's are always unique
  - app deletes correctly
  - app updates correctly
  - app reads from given filepath
  - rejects empty messages
  - no messages if no messages are sent
  - rejects false update
  - errors if no message to delete

### Front-End Test
