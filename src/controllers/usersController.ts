import { Request, Response } from "express";

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const updateUser = async (req: Request, res: Response) => {
  const { name, balance } = req.body;
  const userId = parseInt(req.params.id);

  try {
    // Verify if user exists
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) return res.status(404).json({ message: "User not found!" });

    // Verify if the id matches
    if (String(req.userId) !== String(userId)) {
      return res.status(403).json({
        message: "Don't have permissions to update this user!",
      });
    }

    // Update user's name and balance
    user.name = name;
    user.balance = balance;

    await userRepository.save(user);

    return res.json({ message: "User updated with success!" });
  } catch (error) {
    return res.status(500).json({ message: "Error updating the user!" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const user = await userRepository.findOne({
      where: { id },
      relations: ["transactions", "transactions.subCategory"],
    });

    if (!user)
      return res.status(404).json({ message: `User with id ${id} not found!` });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user" });
  }
};
