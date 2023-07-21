const model = require("../model/model");
const uuid = require("uuid");

const getSignUpUser = async (req,res) => {
    try {
        const data = await model.getAllUserSignup();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const registerUser = async (req,res) => {
    try {
        const newUser = {
            "_id" : uuid.v4(),
            "firstName" : req.body.firstName,
            "lastName" : req.body.lastName,
            "email" : req.body.email,
            "address" : req.body.addr,
            "password" : req.body.password,
            "location" : req.body.loc,
            "phone" : req.body.phone
        };
        const data = await model.registerUser(newUser);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}

const loginUser = async (req,res) => {
    try {
        const validateUser = {
            "email" : req.body.email
        };
        const data = await model.loginUserModel(validateUser);

        if (!data) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        if (data.password !== req.body.password) {
            res.status(401).json({ message: 'Invalid Password' });
            return;
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
}
const getOrderHistory = async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await model.getOrderHistory(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const getCart = async (req, res) => {
    try {
      const userId = req.params.userId;
      const data = await model.getCart(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const getPayments = async (req, res) => {
    try {
      const userId = req.params.userId
      const data = await model.getPayments(userId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
  const editPayment = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      const paymentData = req.body;
      const data = await model.editPayment(paymentId, paymentData);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const deletePaymentMethod = async (req, res) => {
    try {
      const paymentId = req.params.paymentId;
      
      const data = await model.deletePaymentMethod(paymentId);
    
  
        res.status(200).json(data);
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
  };
const createPayment = async (req,res) => {
    try {
        console.log("request received:", req.body);
        const newPayment = {
            "_id" : uuid.v4(),
            "user_id" : req.body.user_id,
            "card_number" : req.body.card_number,
            "expiry" : req.body.expiry,
            "cvv" : req.body.cvv,
            "fname" : req.body.firstName,
            "lname" : req.body.lastName,
            "address" : req.body.address
        };
        console.log(newPayment);
        const response = await model.createPayment(newPayment);
        if (response && response.data) {
            alert('Payment added successfully');
            onClose();
          } else {
            alert('Failed to add payment method');
          }
    } catch (error) {
        alert('Failed to add payment method');
        console.error('Error adding payment method:', error);
      }
}

module.exports = {
    getSignUpUser,
    registerUser,
    loginUser,
    getOrderHistory,
    getPayments,
    editPayment,
    deletePaymentMethod,
    createPayment,
    getCart,
}