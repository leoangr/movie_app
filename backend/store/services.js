import { pool } from "./database.js";

export const isTitleExist = async (title) => {
    const [rows] = await pool.query("SELECT id FROM search_statistics WHERE title_movie = ?", [
        title,
    ]);
    return rows.length > 0;
};

export const createNewTitle = async (title, imgurl) => {
    const [result] = await pool.query(
        "INSERT INTO search_statistics (title_movie, img_movie) VALUES (?, ?)",
        [title, imgurl]
    );
    return result;
}

export const updateTitleCount = async (title) => {
    const [result] = await pool.query(
        "UPDATE search_statistics SET count_search = count_search + 1 WHERE title_movie = ?",
        [title]
    );
    return result;
}

export const allTitle = async () => {
    const [rows] = await pool.query("SELECT * FROM search_statistics ORDER BY count_search DESC LIMIT 5");
    return rows;
}