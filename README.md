# Creating a music recommendation engine

Your objective is to create a social media feed to the given specifications.

1. Clone the assessment repository from the [starter].
2. `npm install` to install any dependencies
3. Fill out code in `recommendations.js`
4. `node recommendations.js` to run local test cases
5. `npm test` to run the test specs

If you want to run the tests for one problem file at a time, you can do so
with the following command in your terminal:

```shell
npm test test/small-recommendations-spec.js
npm test test/large-recommendations-spec.js
```

It's recommended to start with the small recommendations, then move on to the
large recommendations.

## Test data

There are data sets provided for testing, both large and small, containing
user and music genre data. The keys are the ID of the user/genre and the values
are the user/genre data.

```js
// data/small-users.js
{
  1: {'name': 'Alice', 'friends': [2], 'genres': [1, 2, 3]},
  2: {'name': 'Bob', 'friends': [1, 3, 5], 'genres': [2, 3, 4]},
  3: {'name': 'Charlie', 'friends': [2, 4], 'genres': [1, 3, 5]},
  4: {'name': 'David', 'friends': [3, 5], 'genres': [1, 2, 3]},
  5: {'name': 'Eve', 'friends': [2, 4], 'genres': [3, 4, 5]}
}

// data/music-genres.js
{
  1: 'Rock',
  2: 'Hip hop',
  3: 'Jazz',
  4: 'Pop',
  5: 'Blues',
  6: 'Heavy metal',
  7: 'Country',
  8: 'Punk',
  9: 'Classical',
  // ...
```

The following specifications will refer to this small data set.

## Social network specifications - `getFriendIDs(userID, degrees=1)`

```js
  1: {'name': 'Alice', 'friends': [2], 'genres': [1, 2, 3]},
  2: {'name': 'Bob', 'friends': [1, 3, 5], 'genres': [2, 3, 4]},
  3: {'name': 'Charlie', 'friends': [2, 4], 'genres': [1, 3, 5]},
  4: {'name': 'David', 'friends': [3, 5], 'genres': [1, 2, 3]},
  5: {'name': 'Eve', 'friends': [2, 4], 'genres': [3, 4, 5]}
```

First, you will be filling out the social network portion of the feed. The
function, `getFriendIDs` takes in a userID and returns an array containing the
IDs of all friends of the given degree. 1st degree friends are direct friends
of the user, 2nd degree friends are friends-of-friends, 3rd degree friends are
friends-of-friends-of-friends, etc.

`getFriendIDs(1)` will return the 1st degree friends of user 1 (Alice).
Alice's only first degree friend is user 2 (Bob) and she has two second degree
friends: users 3 and 5 (Charlie and Eve). So `getFriendIDs(1)` will return
`[2]` and `getFriendIDs(1, 2)` will return `[3, 5]`.

## Recommendation specifications

You will be filling out three algorithms for music recommendations.

* `genresLiked(userID)` returns a list of music genres liked by the given user
* `similarityScore(userOneID, userTwoID)` returns a value ranking the similarity in music taste between two users
* `recommendFriends(userID, degrees=2)` recommends friends ranked in order of their musical similarity

### `genresLiked(userID)`

```js
  1: {'name': 'Alice', 'friends': [2], 'genres': [1, 2, 3]},
  2: {'name': 'Bob', 'friends': [1, 3, 5], 'genres': [2, 3, 4]},
//...

  1: 'Rock',
  2: 'Hip hop',
  3: 'Jazz',
  4: 'Pop',
  5: 'Blues',
//...
```

In this example, Alice likes genres 1 ('Rock'), 2 ('Hip hop'), 3 ('Jazz').
Bob likes genres 2 ('Hip hop'), 3 ('Jazz'), and 4 ('Blues'). `genresLiked`
returns an array containing the names of the genres liked by the user with the
given ID.

```js
genresLiked(1);  // ['Rock', 'Hip hop', 'Jazz']
genresLiked(2);  // ['Hip hop', 'Jazz', 'Blues']
```

### `similarityScore(userOneID, userTwoID)`

`similarityScore` will calculate the similarity in musical taste by dividing
the number of mutually enjoyed genres by the total number of genres liked
between two users. For example, Alice and Bob both like 2 genres: 'Hip hop'
and 'Jazz', and between them like a total of 4 genres: 'Rock', 'Hip hop',
'Jazz' and 'Blues'. Therefore, their similarity score is `2 / 4` or `0.5`.

### `recommendFriends(userID, degrees=2)`

`recommendFriends` will recommend friends within a given degree of separation
ranked in order of musical similarity. To implement this, you should use
`getFriendIDs` to get a list of friends within the given degrees, then sort
them by the `similarityScore` between them and the base user.

Alice's recommended friends-of-friends are Charlie (ID: 3, similarity: 0.5)
and Eve (ID: 5, similarity: 0.2) so `recommendFriends(1)` would return `[3, 5]`.

## Submission

When you are ready to submit:

1. Delete the `node_modules` directory
2. Zip up your folder
3. Upload it

[starter]: https://github.com/appacademy/assessment-for-week-06-v2-practice-graphs