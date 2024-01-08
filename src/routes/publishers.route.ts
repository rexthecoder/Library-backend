import { Router } from 'express'


import publishersController from '../controllers/publishers.controller';

const router = Router();


router.route('/')
    .get(publishersController.getAllPublishers)
    .post(publishersController.createPublisher);


router.route('/:id')
    .get(publishersController.getPublisherById)
    .put(publishersController.updatePublisher)
    .delete(publishersController.deletePublisher);

export default router;