import express from "express";
import {
    isTitleExist,
    createNewTitle,
    updateTitleCount,
    allTitle
} from "./services.js";

const router = express.Router();

router.post('/check-title', async (req, res) => {
    const title = req.body.title.toLowerCase();
    const img = req.body.img;
    try {
        if(!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        if (await isTitleExist(title)) {
            await updateTitleCount(title);
        } else {
            await createNewTitle(title, img);
        }
        res.status(200).json({ message: 'Check title success' });   
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/mostly-searched', async (req, res) => {
    try {
        const data = await allTitle();
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching data' });
    }
})

export default router;