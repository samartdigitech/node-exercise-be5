import express from "express";
import { pool } from "./db.mjs";

const app = express();
const port = 4000;

app.use(express.json());

// 📍 **** สร้าง API เพื่อใช้ในการเพิ่มข้อมูลหนังเรื่องใหม่ไปที่ Database ตรงนี้ ****
app.post("/movies", async (req,res)=>{

	await pool.query(
		`insert into movies (title, description, genres, year, poster, rating)
		values ($1,$2,$3,$4,$5,$6) RETURNING *`,
		[
			
			req.body.title,
			req.body.description,
			req.body.genres,
			req.body.year,
			req.body.poster,
			req.body.rating

		]
	)

	return res.status(201).json({
		message : "Movie has been created."
	})
})


app.listen(port, () => {
	console.log(`🚀 Server is running at ${port}`);
});
