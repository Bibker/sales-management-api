const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Hello from Report.");
})

module.exports = router;