const Account = require('../models/accounts');

const account = new Account();

const list = async (req, res) => {
  try {
    const accounts = await account.listAccount();   

    res.render('accounts', {
      accounts,
    });  
  } catch (e) {
    console.log(e);
    
    return res.status(500).send({
      message: e,
    });
  }
};

const add = async (req, res) => {
  try {
    
    await account.addAccount(req.body);

    return res.json({
      message: "new account",
    });
  } catch (e) {
    console.log(e);
    
    return res.status(500).json({
      message: e,
    });
  }
};

const update = async (req, res) => {
  try {
    await account.updateAccount(req.body);

    return res.json({
      message: "update account",
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const delet = async (req, res) => {
  try {
    await account.deleteAccount(req.body.id);

    return res.json({
      message: "delete account",
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};


module.exports = {
  list,
  add,
  update,
  delet
};
