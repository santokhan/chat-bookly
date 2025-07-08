import businessService from './business.service';

const register = async (req, res) => {
  try {
    const data = req.body;
    const result = await businessService.register(data);
    res
      .status(result.success ? 201 : 400)
      .json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration error',
      error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await businessService.login(email, password);
    res
      .status(result.success ? 200 : 401)
      .json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login error',
      error,
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await businessService.getById(id);
    res
      .status(result.success ? 200 : 404)
      .json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Get error',
      error,
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const result = await businessService.update(id, data);
    res
      .status(result.success ? 200 : 400)
      .json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Update error',
      error,
    });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await businessService.remove(id);
    res
      .status(result.success ? 200 : 400)
      .json(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Delete error',
      error,
    });
  }
};

export default {
  register,
  login,
  getById,
  update,
  remove,
};
