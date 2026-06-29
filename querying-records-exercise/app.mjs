import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.get("/movies", async (req, res) => {
	const result = await pool.query("select * from movies");

	return res.json({
		data: result.rows,
	});
});

// 📍 **** สร้าง API เพื่อใช้ในการดูข้อมูลหนังแต่ละเรื่องด้วย movieId ตรงนี้ ****
app.get("/movies/:movieId" , async (req,res) => {
	const movieIdFromClient = req.params.movieId
	let results
	try{
		results = await pool.query (
		`select * from movies where movie_id = $1`,[movieIdFromClient]
	)
	}catch{
		return res,status(500).json({
			message : "ไม่สามารถเชื่อมต่อ Database ได้"
		})
	}
	return res.status(200).json({
		message: "Movie has been created.",
		data: results.rows
	})
})

app.listen(port, () => {
	console.log(`🚀 Server is running at ${port}`);
});
