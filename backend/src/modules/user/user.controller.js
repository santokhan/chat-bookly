import * as userService from './user.service.js';

export async function register(req, res) {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function login(req, res) {
  try {
    const user = await userService.loginUser(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function getUser(req, res) {
  try {
    const user = await userService.getUserWithBusiness(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json(err);
  }
}

export async function update(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(204).json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
