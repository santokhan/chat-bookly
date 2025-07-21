import * as userService from './user.service.js';

export async function register(req, res) {
  try {
    const user = await userService.registerUser(req.body);

    if (user.success) {
      res.status(201).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function login(req, res) {
  try {
    const user = await userService.loginUser(req.body);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function getUser(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(404).json(err);
  }
}

export async function update(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);

    if (user.success) {
      res.status(200).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (user.success) {
      res.status(204).json(user);
    } else {
      res.status(400).json(user);
    }
  } catch (err) {
    res.status(400).json(err);
  }
}
