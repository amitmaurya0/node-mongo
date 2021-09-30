/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { Router, Request, Response } from 'express';
import deployements from './deployments';

export default Router({ mergeParams: true })
  .use('/deployments', deployements)
 
