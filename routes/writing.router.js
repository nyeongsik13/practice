import express from 'express';
import Write from '../schemas/writing.schemas.js';

const router = express.Router();

router.use(express.json());

router.post('/write', async (req, res, next) => {
    const { title, content, password } = req.body;
    // const writeMaxOrder = await Write.findOne().sort('-order').exec()
    // const order = writeMaxOrder?writeMaxOrder.order+1:1
    try {
        const newWrite = new Write({ title, content, password });
        await newWrite.save();
        return res.status(201).json({ write: newWrite });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.get('/write', async (req, res, next) => {
    try {
        const writes = await Write.find().exec();
        return res.status(200).json({ writes });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete('/write/:writeId', async (req, res, next) => {
    const { password } = req.body;
    const { writeId } = req.params;

    const write = await Write.findById(writeId).exec();
    if (password !== write.password) {
        return res
            .status(403)
            .json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    await Write.findByIdAndDelete(writeId);
    return res.status(200).json({ message: '상품이 삭제되었습니다' });
});

router.get('/write/:writeId', async (req, res, next) => {
    const { writeId } = req.params;

    const write = await Write.findById(writeId).exec();

    return res.status(200).json({ write });
});

router.put('/write/:writeId', async (req, res, next) => {
    const { writeId } = req.params;
    const { title, content, password } = req.body;

    const write = await Write.findById(writeId).exec();

    if (password !== write.password) {
        return res.status(400).json({ errorMessage: '수정권한이 없습니다.' });
    }
    write.title = title;
    write.content = content;
    await write.save();
    return res.status(201).json({ message: '수정성공^^' });
});

export default router;
