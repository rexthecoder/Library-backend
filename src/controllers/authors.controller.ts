import { Request, Response } from 'express';
import { AuthorEntity } from '../entities/AuthorEntity';
import handleGetRepository from '../utils/handleGetRepository';


class AuthorController {
    private authorRepository = handleGetRepository(AuthorEntity);

    getAllAuthors = async (req: Request, res: Response): Promise<void> => {
        const authors = await this.authorRepository.find();
        res.json(authors);
    };

    getAuthorById = async (req: Request, res: Response): Promise<void> => {
        const author = await this.authorRepository.findOne({ where: { authorId: Number(req.params.id) } });
        if (!author) {
            res.status(404).json({ message: 'Author not found' });
        } else {
            res.json(author);
        }
    };

    createAuthor = async (req: Request, res: Response): Promise<void> => {
        const newAuthor = this.authorRepository.create(req.body);
        const result = await this.authorRepository.save(newAuthor);
        res.json(result);
    };

    updateAuthor = async (req: Request, res: Response): Promise<void> => {
        const author = await this.authorRepository.findOne({ where: { authorId: Number(req.params.id) } });
        if (!author) {
            res.status(404).json({ message: 'Author not found' });
            return;
        }

        this.authorRepository.merge(author, req.body);
        const result = await this.authorRepository.save(author);
        res.json(result);
    };

    deleteAuthor = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authorRepository.delete(req.params.id);
        res.json(result);
    };
}

export default new AuthorController();
