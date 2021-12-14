import { Router, Request, Response } from 'express';
import shortId from 'shortid';
import config from 'config';
import Link from '../models/Link';
import auth from '../middleware/auth.middleware';

const router = Router();

router.post('/generate', auth, async (req: Request, resp: Response) => {
  try {
    const baseUrl = config.get('baseUrl');
    const { from, tags, description } = req.body;
    const code = shortId.generate();

    // @ts-ignore
    const existing = await Link.findOne({ from, owner: req.user.userId });

    if (existing) {
      return resp.json({ link: existing, message: 'You have already shortened this link' });
    }

    const to = `${baseUrl}/t/${code}`;

    const link = new Link({
      // @ts-ignore
      code, to, from, tags, description, owner: req.user.userId,
    });

    link.save();

    return resp.status(201).json({ link, message: 'Your link has been shortened successfully! Check profile' });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.post('/edit', auth, async (req: Request, resp: Response) => {
  try {
    const filter = { code: req.body.code };
    const update = {
      description: req.body.description,
      tags: req.body.tags,
    };
    const link = await Link.findOneAndUpdate(filter, update);
    resp.json({ message: 'Link has been updated successfully!', link });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/', auth, async (req: Request, resp: Response) => {
  try {
    // @ts-ignore
    const links = await Link.find({ owner: req.user.userId });
    resp.json(links);
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/:id', auth, async (req: Request, resp: Response) => {
  try {
    const link = await Link.findById(req.params.id);
    resp.json(link);
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/search/:tagName', async (req: Request, resp: Response) => {
  try {
    const filter = req.params.tagName;
    const links = await Link.find({ tags: { $elemMatch: { tagName: filter } } });
    resp.json(links);
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/link-info/:id', async (req: Request, resp: Response) => {
  try {
    const link = await Link.findById(req.params.id);
    resp.json({
      from: link.from,
      to: link.to,
      tags: link.tags,
      description: link.description,
    });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

export default router;
