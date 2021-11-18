const {Router} = require('express');
const Link = require('../models/Link');
const shortId = require('shortid');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async(req, resp) => {
    try {
        const baseUrl = config.get('baseUrl');
        const from = req.body.from
        const code = shortId.generate()

        const existing = await Link.findOne({ from: from })

        if (existing) {
            return resp.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code
        

        const link = new Link({
            code, to, from: from, owner: req.user.userId
        })

        await link.save()

        return resp.status(201).json({ link })
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
});

router.get('/', auth, async(req, resp) => {
    try {
        const links = Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
});

router.get('/:id', auth, async(req, resp) => {
    try {
        const link = Link.findById(req.params.id);
        res.json(link);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    } ;
});

module.exports = router;