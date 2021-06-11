
const { expect } = require('chai');

const smallUsers = require('../data/small-users');
const musicGenres = require('../data/music-genres');

const assert = require('assert')

let MusicRecommendation = () => {
  throw new Error('Could not load recommendations');
};

try {
  ({ MusicRecommendation } = require('../recommendations'));
} catch (e) {}

describe('Small Feed', () => {

  const smallRecs = new MusicRecommendation(smallUsers, musicGenres);

  context('social network', () => {

    it(`Alice's friends`, () => {

      const friendsOfAlice = smallRecs.getFriendIDs(1);

      expect(friendsOfAlice).to.have.members([2]);

    });


    it(`Eve's friends of friends`, () => {

      const friendsOfFriendsOfEve = smallRecs.getFriendIDs(5, 2);

      expect(friendsOfFriendsOfEve).to.have.members([1, 3]);

    });


    it(`Alice's friends of friends of friends`, () => {

      const friendOffriendsOfFriendsOfAlice = smallRecs.getFriendIDs(1, 3);

      expect(friendOffriendsOfFriendsOfAlice).to.have.members([4]);

    });

  });


  context('music genres', () => {

    it(`displays the genres of music that Alice likes`, () => {

      const aliceMusicGenres = smallRecs.genresLiked(1);

      expect(aliceMusicGenres).to.have.members(['Rock', 'Hip hop', 'Jazz']);
    });

    it(`displays the music similarity scores between Alice and David`, () => {

      expect(smallRecs.similarityScore(1, 4)).to.eq(1.0);

    });

    it(`displays the music similarity scores between Alice and Bob`, () => {

      expect(smallRecs.similarityScore(1, 2)).to.eq(0.5);

    });

  });


  context('friend recommendations', () => {

    it(`recommends Alice friends-of-friends based on musical similarity`, () => {

      const aliceFriendRecs = smallRecs.recommendFriends(1);

      expect(aliceFriendRecs).to.have.members([3,5]);
    });

    it(`recommends Alice 3rd degree friends based on musical similarity`, () => {

      const aliceFriendRecs = smallRecs.recommendFriends(1, 3);

      expect(aliceFriendRecs).to.have.members([3,5,4]);
    });


  });

});


