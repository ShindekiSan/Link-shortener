const {Router} = require('express');
const Link = require('../models/Link');
const shortId = require('shortid');
const config = require('config');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async(req, resp) => {
    try {
        const baseUrl = config.get('baseUrl');
        const {from, tags, description} = req.body
        const code = shortId.generate()

        const existing = await Link.findOne({ from: from, owner: req.user.userId })

        if (existing) {
            return resp.json({ link: existing, message: 'You have already shortened this link' })
        }

        const to = baseUrl + '/t/' + code
        

        const link = new Link({
            code, to, from: from, tags: tags, description: description, owner: req.user.userId
        })

        link.save()

        return resp.status(201).json({ link, message: 'Your link has been shortened successfully! Check profile' })
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post('/edit', auth, async(req, resp) => {
    try {
        const filter = { code : req.body.code }
        const update = {
            description: req.body.description,
            tags: req.body.tags
        }
        const link = await Link.findOneAndUpdate(filter, update);
        resp.json(link);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
});


router.get('/', auth, async(req, resp) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        resp.json(links);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/:id', auth, async(req, resp) => {
    try {
        const link = await Link.findById( req.params.id );
        resp.json(link);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/search/:tagName', async(req, resp) => {
    try {
        const filter = req.params.tagName
        const links = await Link.find({ tags: { $elemMatch : {tagName: filter} } });
        resp.json(links);
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/link-info/:id', async(req, resp) => {
    try {
        const link = await Link.findById( req.params.id );
        resp.json({
            from: link.from,
            to: link.to,
            tags: link.tags,
            description: link.description
        });
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    }
})

module.exports = router;