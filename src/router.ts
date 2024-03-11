import { Router } from "express";
import {
  CreateStudent,
  DeleteStudent,
  GetStudentsList,
  UpdateStudent,
} from "./controllers";

export const router = Router();

router.get("/list", GetStudentsList);
router.post("/create", CreateStudent);
router.put("/update", UpdateStudent);
router.delete("/delete/:id", DeleteStudent);
