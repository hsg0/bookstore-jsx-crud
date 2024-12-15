import express from 'express';
import { Book } from '../models/bookModel.js';


const router = express.Router();




router.post('/', async (req, res) => {
    try {
        if (!req.body.title || 
            !req.body.author || 
            !req.body.publishYear) 
            {
            return res.status(400).send({ message: 'All fields are required.' });
            }
            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear,
            }
            const book = await Book.create(newBook);

            return res.status(201).send(book);
        }catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
);

          router.get('/', async (req, res) => {
                try {
                    const books = await Book.find();
                    return res.status(200).json({
                        count: books.length,
                        data: books,
                    });
                } catch (error) {
                    return res.status(500).send({ message: error.message });
                }
            }
);

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById();
        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
);
        
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || 
            !req.body.author || 
            !req.body.publishYear) 
            {
            return res.status(400).send({ 
                message: 'All fields are required.' });
            }
            const { id } = req.params;

            const result = await Book.findByIdAndUpdate(id, req.body)

            if (!result) {
                return res.status(404).json({ message: 'Book not found.' });
            }
            return res.status(200).send({ message: 'Book updated.' });
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
);

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result
        = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        return res.status(200).send({ message: 'Book deleted.' });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}
);

export default router;