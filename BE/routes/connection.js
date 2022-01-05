const express = require("express");
const { checkAuth } = require("../controllers/user");
const connection = require("../controllers/connection");

const router = express.Router();

router.get("/check/:followId", checkAuth, connection.isFollowing);
router.get("/follow/:followId", checkAuth, connection.addFollower);
router.delete("/follow/:followId", checkAuth, connection.removeFollower);
router.get("/follower/count", checkAuth, connection.getFollowerCount);
router.get("/follower/list", checkAuth, connection.getFollowers);
router.get("/following/count", checkAuth, connection.getFollowingCount);
router.get("/following/list", checkAuth, connection.getFollowingList);

module.exports = router;
