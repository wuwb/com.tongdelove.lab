'use strict';

module.exports = {
  data: {
    encrypt: [
      {
        params: ['Hgui34j3hh5jg2jb22423', 'The sandglass remembers the time we lost.'],
        return: 'okn38R+pwi1KtpBnnDNUroREWFGGQAz5JiUQqosKIeka8mtJkzAwntKLIKTGHqJ2',
      },
    ],
    decrypt: [
      {
        params: [
          'Hgui34j3hh5jg2jb22423',
          'okn38R+pwi1KtpBnnDNUroREWFGGQAz5JiUQqosKIeka8mtJkzAwntKLIKTGHqJ2',
        ],
        return: 'The sandglass remembers the time we lost.',
      },
    ],
    encryptData: [
      {
        params: [
          'Hgui34j3hh5jg2jb22423',
          {
            name: 'Neo',
            profile: 'The sandglass remembers the time we lost.',
          },
        ],
        return: {
          name: '6gjusuTKndKIuc34Guc/IQ==',
          profile: 'okn38R+pwi1KtpBnnDNUroREWFGGQAz5JiUQqosKIeka8mtJkzAwntKLIKTGHqJ2',
        },
      },
    ],
    decryptData: [
      {
        params: [
          'Hgui34j3hh5jg2jb22423',
          {
            name: '6gjusuTKndKIuc34Guc/IQ==',
            profile: 'okn38R+pwi1KtpBnnDNUroREWFGGQAz5JiUQqosKIeka8mtJkzAwntKLIKTGHqJ2',
          },
        ],
        return: {
          name: 'Neo',
          profile: 'The sandglass remembers the time we lost.',
        },
      },
    ],
  },

  fn: {
    file: 'aes',
    methods: ['encrypt', 'decrypt', 'encryptData', 'decryptData'],
  },
};
