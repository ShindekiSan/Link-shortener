import { Router, Request } from 'express';
import shortId from 'shortid';
import config from 'config';
import Link from '../models/Link';
import auth from '../middleware/auth.middleware';
import { TypedRequest, TypedResponse } from '../types/api';
import { LinkInterface, SearchedLinkInterface } from '../types/link';

const router = Router();

interface UserInterface {
  userId: string,
  email: string,
  userName: string,
  token: string,
  password: string,
}

interface GenerateRequest {
  from: string,
  description?: string,
  tags?: {
    tagName: string,
  }[],
  user: UserInterface
}

interface GenerateResponse {
  link?: LinkInterface,
  message?: string,
}

interface EditRequest {
  code: string,
  description: string,
  tags: {
    tagName: string,
  }[],
}

interface EditResponse {
  link?: LinkInterface,
  message: string,
}

interface GetLinksRequest {
  user: UserInterface,
}

interface GetLinksResponse {
  links?: LinkInterface[],
  message: string,
}

interface GetLinkResponse {
  link?: LinkInterface,
  message: string,
}

interface GetSearchedLinksResponse {
  links?: SearchedLinkInterface[],
  message: string,
}

interface GetSearchedLinkResponse {
  link?: SearchedLinkInterface,
  message: string,
}

router.post('/generate', auth, async (
  req: TypedRequest<GenerateRequest>,
  resp: TypedResponse<GenerateResponse>,
): Promise<TypedResponse<GenerateResponse>> => {
  try {
    const baseUrl:string = config.get('baseUrl');
    const { from, tags, description } = req.body;
    const code:string = shortId.generate();

    const existing:LinkInterface = await Link.findOne({ from, owner: req.body.user.userId });

    if (existing) {
      return resp.json({ link: existing, message: 'You have already shortened this link' });
    }

    const to:string = `${baseUrl}/t/${code}`;

    const link = new Link({
      code, to, from, tags, description, owner: req.body.user.userId,
    });

    link.save();

    return resp.status(201).json({ link, message: 'Your link has been shortened successfully! Check profile' });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.post('/edit', auth, async (
  req: TypedRequest<EditRequest>,
  resp: TypedResponse<EditResponse>,
): Promise<void | TypedResponse<EditResponse>> => {
  try {
    const filter = { code: req.body.code };
    const update = {
      description: req.body.description,
      tags: req.body.tags,
    };
    const link:LinkInterface = await Link.findOneAndUpdate(filter, update);
    resp.json({ message: 'Link has been updated successfully!', link });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/', auth, async (
  req: TypedRequest<GetLinksRequest>,
  resp: TypedResponse<GetLinksResponse>,
): Promise<void | TypedResponse<GetLinksResponse>> => {
  try {
    const links:LinkInterface[] = await Link.find({ owner: req.body.user.userId });
    resp.json({ links, message: 'Links have been received!' });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/:id', auth, async (
  req: Request,
  resp: TypedResponse<GetLinkResponse>,
): Promise<void | TypedResponse<GetLinkResponse>> => {
  try {
    const link:LinkInterface = await Link.findById(req.params.id);
    resp.json({ message: 'Link has been received successfully!', link });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/search/:tagName', async (
  req: Request,
  resp: TypedResponse<GetSearchedLinksResponse>,
): Promise<void | TypedResponse<GetSearchedLinkResponse>> => {
  try {
    const filter:string = req.params.tagName;
    const links:SearchedLinkInterface[] = await Link.find({
      tags: { $elemMatch: { tagName: filter } },
    });
    resp.json({ links, message: 'Links have been found!' });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

router.get('/link-info/:id', async (
  req: Request,
  resp: TypedResponse<GetSearchedLinkResponse>,
): Promise<void | TypedResponse<GetSearchedLinkResponse>> => {
  try {
    const link:SearchedLinkInterface = await Link.findById(req.params.id);
    resp.json({
      link,
      message: 'Link has been received successfully!',
    });
  } catch (e) {
    return resp.status(500).json({ message: 'Something went wrong, try again' });
  }
});

export default router;
