import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as fromModels from "../../models";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await fromModels.User.findOne({ where: { username, password } });

    if (user) {
      const token = jwt.sign({ id: user.id, name: user.name , username: user.username }, process.env.SECRET_KEY as string, { expiresIn: '1h' });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Email and Password didn't match" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Some error occured!' });
  }
};