import { Request, Response } from 'express';

import { UserEntity, UserRole } from '../entities/UserEntity';
import handleGetRepository from '../utils/handleGetRepository';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userRepository = handleGetRepository(UserEntity);
    const users = await userRepository.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, age, email, password, role, level } = req.body;
  try {
    const userRepository = handleGetRepository(UserEntity);

    // Check if the provided role is a valid role
    if (!Object.values(UserRole).includes(role)) {
      return res.status(400).send({ message: 'Invalid role' });
    }

    const user = userRepository.create({
      firstName,
      lastName,
      age,
      email,
      password,
      role,
      level,
    });

    const results = await userRepository.save(user);

    return res.status(201).send({
      message: 'User created',
      data: {
        userId: results.userId,
        email: results.email,
        fullName: `${results.firstName} ${results.lastName}`,
        role: results.role,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  // const userId = req.params.id;
  const { firstName, lastName, age, email, password, role, level } = req.body;
  try {
    const userRepository = handleGetRepository(UserEntity);

    // Check if the provided role is a valid role
    if (role && !Object.values(UserRole).includes(role)) {
      return res.status(400).send({ message: 'Invalid role' });
    }

    const user = await userRepository.findOneBy({ userId: Number(req.params.id) });

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    userRepository.merge(user, {
      firstName,
      lastName,
      age,
      email,
      password,
      role,
      level,
    });

    const results = await userRepository.save(user);

    return res.status(200).send({
      message: 'User updated',
      data: {
        userId: results.userId,
        email: results.email,
        fullName: `${results.firstName} ${results.lastName}`,
        role: results.role,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};