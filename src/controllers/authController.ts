import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export const signUp = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  const userExists = await userRepository.findOneBy({ email });

  //check if email is already used
  if (userExists)
    return res
      .status(400)
      .json({ message: "An account with this email already exists!" });

  //encrypt password
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = userRepository.create({
    email,
    name,
    password: hashPassword,
  });

  try {
    await userRepository.save(newUser);

    const { password, ...user } = newUser;

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while trying to create an user!",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOneBy({ email });

  //check if email exists
  if (!user)
    return res
      .status(404)
      .json({ message: "There is no user with this email!" });

  const verifyPass = await bcrypt.compare(password, user.password);

  //if password is wrong
  if (!verifyPass)
    return res.status(400).json({ message: "Password is wrong!" });

  //declare a token that expires in 24hours
  const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD ?? "", {
    expiresIn: "24h",
  });

  const { password: _, ...userLogin } = user;

  return res.status(200).json({ user: userLogin, token });
};
