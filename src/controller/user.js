const datamapper = require("../data/datamapper");
const { createError } = require("../helper/error/handler");
const { User } = require("../schema/");

module.exports = {
  async register(req, res, next) {
    const body = req.body;
    try {
      const exists = await datamapper["user"].findOne({ email: body.email });
      if (exists) {
        createError(401, "Email already taken");
      }
      const user = await datamapper["user"].create(body);

      try {
        await user.save();
      } catch (error) {
        return next(error);
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  },
};

// {
// 	"firstname":"Lorem",
// 	"lastname":"Ipsum",
// 	"handicap":true,
// 	"gender": "Homme",
// 	"email":"test@gmail.com",
// 	"password":"password123",
// 	"dob": "06/03/2000",
// 	"sports": [{
// 		"level": "Expert",
// 		"sport": "63315cc303beff9752dd8e45"
// 	}],
// 	"city": "Nimes",
// 	"zipcode":30000
// }
