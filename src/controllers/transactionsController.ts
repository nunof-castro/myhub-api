import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { SubCategory } from "../entities/SubCategory";
import { Transaction } from "../entities/Transaction";
import { User } from "../entities/User";

const transactionRepository = AppDataSource.getRepository(Transaction);
const userRepository = AppDataSource.getRepository(User);
const subCategoryRepository = AppDataSource.getRepository(SubCategory);

export const createTransaction = async (req: Request, res: Response) => {
  const { body, userId: requestUserId } = req;
  const { type, amount, description, date, subcategory_id } = body;
  const userId = Number(requestUserId);

  try {
    // Fetch the User entity
    const user = await userRepository.findOne({ where: { id: userId } });

    // Fetch the SubCategory entity
    const subCategory = await subCategoryRepository.findOne({
      where: { id: subcategory_id },
    });

    if (!user || !subCategory)
      return res
        .status(404)
        .json({ message: "User or SubCategory not found!" });

    const newTransaction = new Transaction();
    newTransaction.user = user;
    newTransaction.type = type;
    newTransaction.amount = amount;
    newTransaction.description = description;
    newTransaction.date = date;
    newTransaction.subCategory = subCategory;

    await transactionRepository.save(newTransaction);

    return res.status(201).json(newTransaction);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while creating a Transaction!",
    });
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
  const id = Number(req.userId);

  try {
    const user = await userRepository.findOne({
      where: { id },
      relations: ["transactions", "transactions.subCategory"],
    });

    if (user!.transactions.length === 0)
      return res
        .status(404)
        .json({ message: `User has no transactions registered yet!` });

    return res.status(200).json(user!.transactions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving user transactions!" });
  }
};
