const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (req, resp) => {
    try {
        const link = await Link.findOne({ code: req.params.code })

        if (link) {
            link.clicks++
            await link.save()
            return resp.redirect(link.from)
        }

        return resp.status(404).json({message: 'link not found' })
    } catch (e) {
        return resp.status(500).json({ message: 'Something went wrong, try again' });
    };
})

module.exports = router