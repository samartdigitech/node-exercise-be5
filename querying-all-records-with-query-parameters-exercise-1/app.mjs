import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/movies", async (req, res) => {
	try {
		// แก้ไขโค้ดให้สามารถกรองผลลัพธ์ด้วย Parameter ได้ข้างล่างนี้ 🔽🔽🔽
		const genres = req.query.genres;
		const result = await pool.query(
			`
    SELECT * FROM movies
	where (genres = $1 or $1 is null or $1 = '')
    `,
			[genres]
		);
		// แก้ไขโค้ดให้สามารถกรองผลลัพธ์ด้วย Parameter ได้ข้างบนนี้ 🔼🔼🔼

		return res.status(200).json({
			data: result.rows,
		});
	} catch (e) {
		console.log("Database Error :",e)
		return res.status(500).json({
			message: "ไม่สามารถเชื่อมต่อ Database ได้",
		});
	}
});

app.listen(port, () => {
	console.log(`🚀 Server is running at ${port}`);
});
