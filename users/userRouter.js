const express = require('express');
const db = require('./userDb')
const postDb = require('../posts/postDb')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
  validateUser(req, res)
  db.insert(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({error: 'Error inserting user'}))
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
  validatePost(req, res)
  validateUserId(req, res)
  postDb.insert(req.body)
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error: 'Error inserting post'}))
});

router.get('/', (req, res) => {
  // do your magic!
  db.get()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({error: 'Error retrieving users'}))
});

router.get('/:id', (req, res) => {
  // do your magic!
  validateUserId(req, res)
  db.getById(req.params.id)
    .then(user => {
      console.log(user)
      res.status(200).json(user)
    })
    .catch(err => res.status(500).json({error: 'Error retrieving user'}))
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
  validateUserId(req, res)
  db.getUserPosts(req.params.id)
    .then(posts => res.status(200).json(posts))
    .catch(err => res.status(500).json({error: 'Error retrieving post'}))
});

router.delete('/:id', (req, res) => {
  // do your magic!
  validateUserId(req, res)
  db.remove(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({error: 'error deleting user'}))
});

router.put('/:id', (req, res) => {
  // do your magic!
  validateUserId(req, res)
  db.update(req.params.id, req.body)
    .then(response => res.status(200).json(response))
    .catch(err => res.status(500).json({error: 'error updating user'}))
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  db.getById(req.params.id)
    .then(user => {
      if (user) {
        req.user = user;
      } else {
        res.status(400).json({message: 'invalid user id'})
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({message: 'missing user data'})
  } else if (!req.body.name) {
    return res.status(400).json({message: 'missing required name field'})
  } 
}

function validatePost(req, res, next) {
  // do your magic!
  if (!req.body) {
    return res.status(400).json({message: 'missing post data'})
  } else if (!req.body.text) {
    return res.status(400).json({message: 'missing required text field'})
  }
}

module.exports = router;
