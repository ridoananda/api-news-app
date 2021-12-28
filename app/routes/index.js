const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController');
const newsController = require('../controllers/newsController');
const authenticated = require('../middleware/authenticated');

router.get('/', (req, res) => {
    console.log('oke');
    res.send('oke')
})

router.get('/user/me', authenticated, authController.user)
// News
router.post('/news', authenticated, newsController.store)
router.get('/news', newsController.getAll)
router.get('/news/:id', newsController.get)
router.delete('/news', authenticated, newsController.destroy)
// Login
router.post('/auth/login', authController.login)

module.exports = router