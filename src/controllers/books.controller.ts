import { Request, Response } from 'express';
import { BookEntity } from '../entities/BookEntity';
import handleGetRepository from '../utils/handleGetRepository';
import { AuthorEntity } from '../entities/AuthorEntity';
import { CategoryEntity } from '../entities/CategoryEntity';
import { PublisherEntity } from '../entities/PublisherEntity';


class BooksController {
    private bookRepository = handleGetRepository(BookEntity);

    getAllBooks = async (req: Request, res: Response): Promise<void> => {
        const books = await this.bookRepository.find();
        res.json(books);
    };

    getBookById = async (req: Request, res: Response): Promise<void> => {
        const book = await this.bookRepository.findOne({ where: { bookId: Number(req.params.id) } });
        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            res.json(book);
        }
    };

    createBook = async (req: Request, res: Response): Promise<void> => {
        const { authorId, category, publisher, ...bookData } = req.body;

        const book = new BookEntity();
        book.title = bookData.title;
        book.description = bookData.description;

        // Assuming authorId is the ID of the AuthorEntity
        book.authorId = (await handleGetRepository(AuthorEntity).findOne(authorId)).authorId;

        // Assuming category is the ID of the CategoryEntity
        book.category = await handleGetRepository(CategoryEntity).findOne(category);

        // Assuming publisher is the ID of the PublisherEntity
        book.publisher = await handleGetRepository(PublisherEntity).findOne(publisher);

        const result = await this.bookRepository.save(book);
        res.json(result);
    };

    updateBook = async (req: Request, res: Response): Promise<void> => {
        const { authorId, category, publisher, ...bookData } = req.body;

        const book = await this.bookRepository.findOne({ where: { bookId: Number(req.params.id) } });

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        book.title = bookData.title || book.title;
        book.description = bookData.description || book.description;

        // Update associations if provided
        if (authorId) {
            book.authorId = (await handleGetRepository(AuthorEntity).findOne(authorId)).authorId;
        }
        if (category) {
            book.category = await  handleGetRepository(CategoryEntity).findOne(category);
        }
        if (publisher) {
            book.publisher = await  handleGetRepository(PublisherEntity).findOne(publisher);
        }

        const result = await this.bookRepository.save(book);
        res.json(result);
    };

    deleteBook = async (req: Request, res: Response): Promise<void> => {
        const result = await this.bookRepository.delete(req.params.id);
        res.json(result);
    };
}

export default new BooksController();
