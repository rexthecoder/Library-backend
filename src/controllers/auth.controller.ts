import createError from 'http-errors';
import handleGetRepository from '../utils/handleGetRepository';
import { UserEntity, UserRole } from '../entities/UserEntity';


import { Request, Response } from 'express';

/**
 * POST /auth/login
 * Login request
 */
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // console.log(password)
        const userRepository = handleGetRepository(UserEntity);


        // Find user by email address
        const user = await userRepository.findOneBy({ email: email });
        console.log(user.password)
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Check user password
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
            return res.status(404).send({ message: 'Incorrect password!' });

        }

        // Generate and return token
        const token = user.generateToken();
        const refreshToken = user.generateToken('2h');
        return res.status(200).json({ token, refreshToken });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

/**
 * POST /auth/register
 * Register request
 */
export const register = async (req: Request, res: Response) => {
    const { firstName, lastName, age, email, password, role, level } = req.body;
    try {
        const userRepository = handleGetRepository(UserEntity);


        // Check if the provided role is a valid role
        if (!Object.values(UserRole).includes(role)) {
            return res.status(400).send({ message: 'Invalid role' });
        }
        if (!password) {
            return res.status(400).send({ message: 'Invalid Password' });
        }

        // Create user

        const user = await userRepository.save(
            userRepository.create({
                firstName,
                lastName,
                age,
                email,
                password,
                role,
                level
            })
        );
        // const user = userRepository.create({
        //     firstName,
        //     lastName,
        //     age,
        //     email,
        //     password,
        //     role,
        //     level
        // });
        // // Generate and return tokens
        const token = user.generateToken();
        const refreshToken = user.generateToken('2h');
        res.status(201).json({ token, refreshToken });
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

/**
 * GET /auth/me
 * Get current user
 */
export const getCurrentUser = async (req, res, next) => {
    try {
        delete req.user.password;
        console.log(req.user.password)
        res.json(req.user);
    } catch (err) {
        next(err);
    }
};


/**
 * PUT /auth/me
 * Update current user
 */
export const updateCurrentUser = async (req, res, next) => {
    try {
        await req.user.update(req.body, {
            fields: ['firstName', 'lastName', 'email'],
        });
        res.status(200).json({ success: true });
    } catch (err) {
        next(err);
    }
};

/**
 * DELETE /auth/me
 * Delete current user
 */
export const deleteCurrentUser = async (req, res, next) => {
    try {
        await req.user.destroy();
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};

/**
 * PUT /auth/me/password
 * Update password of current user
 */
export const updatePassword = async (req, res, next) => {
    try {
        const { current, password } = req.body;

        // Check user password
        const isValidPassword = await req.user.validatePassword(current);
        if (!isValidPassword) {
            return next(createError(400, 'Incorrect password!'));
        }

        // Update password
        req.user.password = password;
        await req.user.save();

        return res.json({ success: true });
    } catch (err) {
        return next(err);
    }
};