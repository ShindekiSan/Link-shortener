const {Router} = require('express');
const Link = require('../models/Link');
const User = require('../models/User');
const shortId = require('shortid');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async(req, resp) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from, tags} = req.body
        const code = shortId.generate()

        const existing = await Link.findOne({ from: from, owner: req.user.userId })

        if (existing) {
            return resp.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code
        

        const link = new Link({
            code, to, from: from, tags: tags, owner: req.user.userId
        })

        link.save()

        return resp.status(201).json({ link })
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
});

router.get('/', auth, async(req, resp) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        resp.json(links);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
});

router.get('/:id', auth, async(req, resp) => {
    try {
        const link = await Link.findById( req.params.id );
        resp.json(link);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
});

module.exports = router;