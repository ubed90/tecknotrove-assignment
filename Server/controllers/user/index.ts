import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as fromModels from '../../models';

export const registerUser = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  try {
    const user = await fromModels.User.create({ name, username, password, isActive: true });
    const token = jwt.sign({ id: user.id, username: user.username, name: user.name }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Some error occured! Please try again later.' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await fromModels.User.findAll({ attributes: ['id', 'name', 'username'] });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Some error occured! Please try again later.' });
  }
};