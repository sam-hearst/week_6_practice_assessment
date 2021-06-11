const musicGenres = require('./data/music-genres');

const smallUsers = require('./data/small-users');
const largeUsers = require('./data/users');



class MusicRecommendation {
  constructor (users, genres) {
    this.users = users
    this.genres = genres
  }

  // Given a userID, return an array containing
  // the IDs of each of that user's friends.
  // The variable `degree` is the number of degrees
  // of friendship away from the user: A degree-2
  // friend is a friend-of-a-friend, and not a friend.
  getFriendIDs(userID, degree = 1) {
    // Your code here
  }

  // Given a userID, return an array of the musical genres that user likes:
  genresLiked(userID) {
    // Your code here
  }


  // Given 2 user IDs, return the musical similarity score between the users.
  // Similarity score is defined as the number of liked music genres both
  // users have in common divided by the total genres liked by either.
  //
  // E.g. User 1 likes 'Jazz' and 'Blues'
  //      User 2 likes 'Rock' and 'Jazz'
  //
  similarityScore(userOneID, userTwoID) {
    // Your code here
  }

  // Return a list of recommended friends ordered by musical similarity score.
  recommendFriends(userID, degrees=2) {
    // Your code here
  }


}


function tryLocalTests() {
  smallRecs = new MusicRecommendation(smallUsers, musicGenres);


  // David is friends with Charlie and Eve
  console.log(smallRecs.getFriendIDs(4));
  // [3, 5]

  // Eve has two 2nd degree (friend-of-a-friend) friends: Alice and Charlie
  console.log(smallRecs.getFriendIDs(5, 2));
  // [1, 3]

  // Alice has one 3rd degree (friend-of-a-friend-of-a-friend): David
  console.log(smallRecs.getFriendIDs(1, 3));
  // [4]

  // Alice likes genres 1, 2 and 3: Rock, Hip Hop and Jazz
  console.log(smallRecs.genresLiked(1));
  // [ 'Rock', 'Hip hop', 'Jazz' ]

  // Alice has a music similarity score of 1.0 with David
  console.log(smallRecs.similarityScore(1, 4));
  // 1.0

  // Alice has a music similarity score of 0.2 with Bob
  console.log(smallRecs.similarityScore(1, 2));
  // 0.5

  // Alice's recommended friend-of-friends are:
  // Charlie (id: 3, similarity: 0.5) and Eve (id: 5, similarity: 0.2)
  let friendRecs = smallRecs.recommendFriends(1);
  // [3, 5]
  for (let i = 0 ; i < friendRecs.length ; i++) {
    console.log(friendRecs[i] + ": " + smallRecs.similarityScore(1, friendRecs[i]));
  }
  // 3: 0.5
  // 5: 0.2

  // Alice's recommended friend-of-friends are:
  // Charlie (similarity: 0.5) and Eve (similarity: 0.2)
  // followed by her friend-of-friend-of-friend recommendation:
  // David (similarity: 1.0)
  let moreFriendRecs = smallRecs.recommendFriends(1, 3);
  // [3, 5, 4]
  for (let i = 0 ; i < moreFriendRecs.length ; i++) {
    console.log(moreFriendRecs[i] + ": " + smallRecs.similarityScore(1, moreFriendRecs[i]));
  }
  // 3: 0.5
  // 5: 0.2
  // 4: 1

}

// Uncomment to run local tests
// tryLocalTests();



/*******************************************************************************
 * Do not change the code after this line.
 */

try {
  exports.MusicRecommendation = MusicRecommendation;
} catch(e) {
  module.exports = null;
}