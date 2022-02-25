const express = require('express');
const router = express.Router();
const catPicsController = require('../controllers/catPicsController');
const bodyParser = require('body-parser');

router.post('/catPics/:id', catPicsController.uploadNew, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.get('/catPics/:id', catPicsController.getOne, (req, res) => {  
    return res.status(200)
        .contentType('image/png')
        .send(res.locals.pic);
});

router.get('/catPics', catPicsController.getAll, (req, res) => {
    return res.status(200).json(res.locals.list);
});

router.patch('/catPics/:id', catPicsController.updateOne, (req, res) => {
    return res.status(200).json(res.locals.message);
});

router.delete('/catPics', catPicsController.deleteOne, (req, res) => {
    return res.status(200).json(res.locals.message);
});

module.exports = router;