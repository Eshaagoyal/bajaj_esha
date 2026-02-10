const express = require("express");
const router = express.Router();

const { fibonacci, isPrime, hcf, lcm } = require("../utils/math");
const { askAI } = require("../utils/ai");

const OFFICIAL_EMAIL = process.env.OFFICIAL_EMAIL;

router.post("/", async (req, res) => {
  const body = req.body;
  const keys = Object.keys(body);

  if (keys.length !== 1) {
    return res.status(400).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: "Exactly one key is required"
    });
  }

  const key = keys[0];
  let data;

  try {
    switch (key) {
      case "fibonacci":
        data = fibonacci(body[key]);
        break;

      case "prime":
        data = body[key].filter(isPrime);
        break;

      case "lcm":
        data = lcm(body[key]);
        break;

      case "hcf":
        data = hcf(body[key]);
        break;

      case "AI":
        data = await askAI(body[key]);
        break;

      default:
        return res.status(400).json({
          is_success: false,
          official_email: OFFICIAL_EMAIL,
          error: "Invalid key"
        });
    }

    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL,
      data
    });

  } catch (err) {
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL,
      error: err.toString()
    });
  }
});

module.exports = router;
