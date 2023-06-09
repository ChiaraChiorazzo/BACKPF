const {
  getAllUser,
  getOneUser,
  getSearchUser,
  postNewUser,
  postLoginUser,
  updateUser,
  deleteUser,
  updatePassword,
  getUserOrder,
  putUserOrderCancelar,
} = require('../../controllers/userController/UserController');
const {
  sendWelcomeEmail,
} = require('../../controllers/emailControllers/emailNewUserController');

const getAllUserHandler = async (req, res) => {
  try {
    const allUser = await getAllUser();

    res.status(200).json(allUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOneUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const oneUser = await getOneUser(id);

    res.status(200).json(oneUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSearchUserHandler = async (req, res) => {
  try {
    const { name } = req.query;

    const usersSearch = await getSearchUser(name);

    res.status(200).json(usersSearch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postNewtUserHandler = async (req, res) => {
  try {
    const { name, surname, password, mail, phone, date_of_birth, image } =
      req.body;

    const newUser = await postNewUser({
      name,
      surname,
      mail,
      phone,
      date_of_birth,
      password,
      image,
    });

    await sendWelcomeEmail(mail, name);

    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postLoginUserHandler = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const userLogin = await postLoginUser({
      mail,
      password,
    });

    res.status(200).json(userLogin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const update = await updateUser(id, req.body);

    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await deleteUser(id);

    res.status(200).json(userDelete);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserOrderHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;
    const hola = await getUserOrder(id, page, limit);

    res.status(200).json(hola);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const putUserOrderCancelarHandler = async (req, res) => {
  try {
    const { orderId } = req.body;
    const orderCancelled = await putUserOrderCancelar(orderId);

    res.status(200).json(orderCancelled);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getAllUserHandler,
  getOneUserHandler,
  getSearchUserHandler,
  postNewtUserHandler,
  postLoginUserHandler,
  updateUserHandler,
  deleteUserHandler,
  getUserOrderHandler,
  putUserOrderCancelarHandler,
  // updatePasswordHanlder
};
