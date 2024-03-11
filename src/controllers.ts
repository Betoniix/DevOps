import { Request, Response } from "express";
import { StudentStore } from "./db";
import { StudentData } from "./dto/student-data";
import { Student } from "./dto/student";

export const GetStudentsList = (_: Request, res: Response) => {
  try {
    res.send({ result: StudentStore });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({
      message: "Unable to response",
      reason: "DB couldn't retrive students list",
    });
  }
};

export const CreateStudent = (req: Request, res: Response) => {
  try {
    const student_data: StudentData = req.body as StudentData;

    if (student_data === null || CheckEmptyProperties(student_data))
      throw new Error("Student data incomplete");

    const last_student = StudentStore.pop();

    const id = last_student ? last_student.id + 1 : 1;
    const new_student = { ...student_data, id };

    StudentStore.push({ ...new_student });

    res.send({ result: new_student });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({
      message: "Unable to response",
      reason: "DB couldn't create the student",
    });
  }
};

export const UpdateStudent = (req: Request, res: Response) => {
  try {
    const to_update: Student = req.body as Student;

    if (to_update === null || CheckEmptyProperties(to_update))
      throw new Error("Student data incomplete");

    const index = StudentStore.findIndex(
      (student) => student.id === to_update.id
    );

    if (index === -1)
      throw new Error(`Student with id ${to_update.id} doesn't exist`);

    StudentStore[index] = { ...StudentStore[index], ...to_update };

    res.send({ result: to_update });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({
      message: "Unable to response",
      reason: "DB couldn't update the student",
    });
  }
};

export const DeleteStudent = (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    if (id === undefined) throw new Error("ID wasn't provided");

    const index = StudentStore.findIndex((student) => student.id === id);

    if (index === -1) throw new Error(`Student with id ${id} doesn't exist`);

    StudentStore.filter((student) => student.id !== id);

    res.status(204).send({ message: "Succesful delete" });
  } catch (error) {
    console.error((error as Error).message);
    res.status(500).send({
      message: "Unable to response",
      reason: "DB couldn't update the student",
    });
  }
};

const CheckEmptyProperties = <T extends Object>(obj: T): boolean => {
  if (Object.keys(obj).length === 0) return true;
  return !Object.values(obj).every(Boolean);
};
