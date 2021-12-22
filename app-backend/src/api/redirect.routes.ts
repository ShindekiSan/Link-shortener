import { Router, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import Link from '../models/Link';
import { LinkInterface } from '../types/link';

const router = Router();

router.get('/:code', async (req: Request, resp: Response): Promise<void | Response> => {
  try {
    const link: HydratedDocument<LinkInterface> = await Link.findOne({ code: req.params.code });

    if (link) {
      link.clicks += 1;
      await link.save();
      return resp.redirect(link.from);
    }

    return resp.status(404).json({ message: 'link not found' });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

export default router;
