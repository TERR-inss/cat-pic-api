const express = require('express');
const router = express.Router();
const catPicsController = require('../controllers/catPicsController');

router.post('/catPics', catPicsController.uploadNew, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.get('/catPics', catPicsController.getAll, (req,res) => {
    return res.status(200).json(res.locals.message);
});

router.delete('/catPics', catPicsController.deleteAll);

router.get('/catPics/:id', catPicsController.getOne);

router.put('/catPics/:id', catPicsController.updateOne);

router.delete('/catPics/:id', catPicsController.deleteOne);

module.exports = router;