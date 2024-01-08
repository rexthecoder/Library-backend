import { Request, Response } from 'express';
import handleGetRepository from '../utils/handleGetRepository';
import { PublisherEntity } from '../entities/PublisherEntity';



class PublisherController {
    private publisherRepository = handleGetRepository(PublisherEntity);

    getAllPublishers = async (req: Request, res: Response): Promise<void> => {
        const publishers = await this.publisherRepository.find({ relations: ['books'] });
        res.json(publishers);
    };

    getPublisherById = async (req: Request, res: Response): Promise<void> => {
        const publisher = await this.publisherRepository.findOne({ where: { id: Number(req.params.id) } });
        if (!publisher) {
            res.status(404).json({ message: 'Publisher not found' });
        } else {
            res.json(publisher);
        }
    };

    createPublisher = async (req: Request, res: Response): Promise<void> => {
        const newPublisher = this.publisherRepository.create(req.body);
        const result = await this.publisherRepository.save(newPublisher);
        res.json(result);
    };

    updatePublisher = async (req: Request, res: Response): Promise<void> => {
        const publisher = await this.publisherRepository.findOne({ where: { id: Number(req.params.id) } });
        if (!publisher) {
            res.status(404).json({ message: 'Publisher not found' });
            return;
        }

        this.publisherRepository.merge(publisher, req.body);
        const result = await this.publisherRepository.save(publisher);
        res.json(result);
    };

    deletePublisher = async (req: Request, res: Response): Promise<void> => {
        const result = await this.publisherRepository.delete(req.params.id);
        res.json(result);
    };
}

export default new PublisherController();
