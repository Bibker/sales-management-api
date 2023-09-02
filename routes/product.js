const express = require('express')
const router = express.Router();
const { product } = require('../controllers');
const auth = require('../middlewares/auth');

router.post('/create', auth, product.create)
router.get('/', product.all)
router.put('/update/:id', auth, product.update)
router.delete('/remove/:id', auth, product.delete)


module.exports = router;