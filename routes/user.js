const express = require('express')
const router = express.Router();
const {user} = require('../controllers');
const auth = require('../middlewares/auth');

router.get('/', user.all)
router.post('/create', user.create)
router.get('/profile', auth,  user.search)
router.post('/profile', auth, user.update)





module.exports = router;