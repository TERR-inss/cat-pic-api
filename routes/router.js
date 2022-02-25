const express = require('express');
const router = express.Router();
const catPicsController = require('../controllers/catPicsController');

router.post('/catPics', catPicsController.uploadNew, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.get('/catPics/:id', catPicsController.getOne, (req, res) => {
    // if a message is returned in res locals, then no pic was found
    if (res.locals.message) return res.status(200).json(res.locals.message);
    // otherwise, a pic was found - so we return it
    return res.status(200).send(res.locals.pic);
});

router.get('/catPics', catPicsController.getAll, (req, res) => {
    return res.status(200).json(res.locals.pics);
});

router.patch('/catPics', catPicsController.updateOne, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.delete('/catPics', catPicsController.deleteOne, (req, res) => {
    return res.status(200).json(res.locals.message);
});

module.exports = router;