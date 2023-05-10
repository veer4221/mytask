import Joi from "joi";
import CustomerErrorHandler from "../../services/CustomErrorHandler";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";
import { User } from "../../models";
import { decryptOBJ, descryptData, encryptData } from "../../utils/CriptoJS";
import Transaction from "../../models/Transaction,";

const Transactioncontroller = {
  Transaction: async (req, res, next) => {
    let body = await decryptOBJ(req.body.data);

    const TransactionScheme = Joi.object({
      ProcessingCode: Joi.number().required(),
      SystemTraceNr: Joi.number().required(),
      FunctionCode: Joi.number().required(),
      CardNo: Joi.string(),
      CardHolder: Joi.string(),
      AmountTrxn: Joi.number().required(),
      CurrencyCode: Joi.number().required(),
    });

    console.log("veer::>", body);
    const { error } = TransactionScheme.validate(body);
    if (error) return next(error);
    try {
      const transaction = new Transaction(body);
      if (transaction) {
        let ApprovalCode = "";
        for (let i = 0; i < 6; i++) {
          ApprovalCode += Math.floor(Math.random() * 10);
        }
        let response = {
          ResponseCode: 0,
          Message: "Success",
          ApprovalCode,
          DateTime: Date.now(),
        };
        const data = await encryptData(JSON.stringify(response));
        res.json({ data });
      }
    } catch (error) {
      return next(error);
    }
  },
};

export default Transactioncontroller;
