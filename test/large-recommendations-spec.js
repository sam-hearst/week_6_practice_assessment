
const { expect } = require('chai');

const largeUsers = require('../data/users');
const musicGenres = require('../data/music-genres');

const assert = require('assert')

let MusicRecommendation = () => {
  throw new Error('Could not load recommendations');
};

try {
  ({ MusicRecommendation } = require('../recommendations'));
} catch (e) {}

describe('Large Feed', () => {

  const largeRecs = new MusicRecommendation(largeUsers, musicGenres);

  context('social network', () => {

    it(`Hermelinda's friends`, () => {

      const friendsOfHermelinda = largeRecs.getFriendIDs(9);

      expect(friendsOfHermelinda).to.have.members([19, 22, 96, 100, 115]);

    });


    it(`Gregorio's friends of friends`, () => {

      const friendsOfFriendsOfGregorio = largeRecs.getFriendIDs(40, 2);

      expect(friendsOfFriendsOfGregorio).to.have.members([3, 55, 52, 58, 32, 83, 65, 9, 106, 50, 80, 116, 113, 101, 21, 11, 37, 34, 94]);

    });


    it(`Mana's friends of friends of friends`, () => {

      const friendOffriendsOfFriendsOfMana = largeRecs.getFriendIDs(48, 3);

      expect(friendOffriendsOfFriendsOfMana).to.have.members([22,96,115,1,51,52,78,38,106,107,27,68,87,7,88,89,35,21,36,44,63,28,95,13,50,6,10,61,54,71]);

    });

  });


  context('music genres', () => {

    it(`displays the genres of music that Shella likes`, () => {

      const shellaMusicGenres = largeRecs.genresLiked(1);

      expect(shellaMusicGenres).to.have.members([`Ambient`, `Musical Theatre`, `Folk`, `Disco`, `R&B`]);
    });

    it(`displays the music similarity scores between Nieves and Brian`, () => {

      expect(largeRecs.similarityScore(31, 100)).to.eq(0.1);

    });

    it(`displays the music similarity scores between Elsa and Bertram`, () => {

      expect(largeRecs.similarityScore(45, 101)).to.eq(0);

    });

  });


  context('friend recommendations', () => {

    it(`recommends Alice friends-of-friends based on musical similarity`, () => {

      const aliceFriendRecs = largeRecs.recommendFriends(1);

      expect(aliceFriendRecs).to.have.members([38,56,70,47,79,98,51,77,17,37,64,88,27,69,72,78,33,52,94,18,57,95,106,107,19,44,75,5,73,90]);
    });

    it(`recommends Alice 3rd degree friends based on musical similarity`, () => {

      const aliceFriendRecs = largeRecs.recommendFriends(1, 3);

      expect(aliceFriendRecs).to.have.members([56,38,70,47,79,98,51,77,17,37,64,88,27,69,72,78,33,52,94,18,57,95,106,107,19,44,75,5,73,90,108,50,48,10,43,100,6,25,74,99,112,32,93,105,7,22,31,34,85,24,116,53,63,39,80,102,109,110,3,14,16,20,28,45,96,113,4,9,13,15,21,26,30,40,42,49,54,58,61,65,76,81,82,86,89,91,111,115]);
    });


  });

});


