const reviewModel = require("../models/review-model")
const utilities = require("../utilities/")

async function postReview(req, res) {
  const { review_text, review_rating, inv_id } = req.body
  const account_id = res.locals.accountData.account_id

  try {
    await reviewModel.addReview(review_text, review_rating, inv_id, account_id)
    req.flash("notice", "Review added successfully!")
    res.redirect(`/inv/detail/${inv_id}`)
  } catch (error) {
    req.flash("notice", "Error adding review.")
    res.redirect(`/inv/detail/${inv_id}`)
  }
}

module.exports = { postReview }
