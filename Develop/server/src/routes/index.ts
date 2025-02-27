import type { Request, Response } from 'express';
import express from 'express';
const router = express.Router();

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import path from "path";
import { fileURLToPath } from "url";

const __filename = path.resolve();

const __dirname = path.dirname(__filename);
import apiRoutes from './api/index.js';

router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

export default router;
