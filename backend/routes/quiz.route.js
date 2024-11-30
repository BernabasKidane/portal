import express from "express";
import {createquiz, deletequiz, getquiz, updatequiz} from "../controllers/quiz.controller.js";

const router = express.Router();


//create a user
router.post("/", createquiz);

//get a user
router.get('/', getquiz);

//update a user
router.put('/:id',updatequiz );

//delete a user
router.delete('/:id',deletequiz );



export default router;