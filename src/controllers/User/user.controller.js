import User from "../../models/User.js";
import sendDeleteEmail from "../../utils/emails/deleteEmail.js";
import sendUpdateStatusEmail from "../../utils/emails/updateStatusEmail.js";
import Role from "../../models/Role.js";
import config from "../../config.js";
import { io } from '../../index.js';
import Jwt from 'jsonwebtoken';

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const { email, username } = user;

    await User.findByIdAndDelete(userId);
    await sendDeleteEmail(email, username);

    io.emit('userDelete', userId);
    res.status(204).json("user delete successfully");
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
};

const changeRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (role) {
      const foundRoles = await Role.find({ name: { $in: role } });
      user.role = foundRoles.map(role => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      user.role = [role._id];
    }

    await user.save();

    io.emit('userUpdate');
    res.status(200).json({ message: "User role changed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const users = await User.find({ _id: { $ne: decoded.id } }).populate("role");

    res.json(users);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users", Details: error });
  }
};

const getUsersById = async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId).populate('role').populate('following').populate('followers').populate('friends').populate('posts').populate('posts').populate('savedPosts').populate('likes');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user by id", Details: error });
  }
};

const getUsersByUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    io.emit('userUpdate', user);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user by username", message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, password, fullname, gender, phone_number, description, } = req.body;

    await User.findByIdAndUpdate(userId, {
      username,
      email,
      password,
      fullname,
      gender,
      phone_number,
      description,
    });

    io.emit('userUpdate', User);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    try {
      await sendUpdateStatusEmail(user.email, user.username, status);
    } catch (emailError) {
      console.error("Error sending update status email:", emailError);
      return res.status(200).json({
        message: "User status updated successfully, but failed to send email",
        user,
      });
    }

    io.emit('userUpdate', user);
    res.status(200).json({ message: "User status updated successfully", user });
  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Error updating user status" });
  }
};

const followUser = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const { userId } = req.params;
    const user = await User.findById(userId);
    const follower = await User.findById(decoded.id);

    if (!user || !follower) {
      return res.status(404).json({ message: "User or follower not found." });
    }

    if (user.followers.includes(decoded.id)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    user.followers.push(decoded.id);
    follower.following.push(userId);

    await user.save();
    await follower.save();

    // Emitir evento a todos los clientes conectados
    io.emit('userFollowed', { userId: user._id, followerId: follower._id });

    res.json({ message: "Follower added successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error following user" });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const { userId } = req.params;
    const user = await User.findById(userId);
    const follower = await User.findById(decoded.id);

    if (!user || !follower) {
      return res.status(404).json({ message: "User or follower not found." });
    }

    user.followers = user.followers.filter(
      (followerId) => followerId.toString() !== decoded.id
    );
    follower.following = follower.following.filter(
      (followedUserId) => followedUserId.toString() !== userId
    );

    await user.save();
    await follower.save();

    // Emitir evento a todos los clientes conectados
    io.emit('userUnfollowed', { userId: user._id, followerId: follower._id });

    res.json({ message: "Follower removed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error unfollowing user" });
  }
};

const getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate('followers');

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: "Error fetching followers", details: error.message });
  }
};

const getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;

    const users = await User.findById(userId).populate('following');

    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(users.following);
  } catch (error) {
    res.status(500).json({ error: "Error fetching following" });
  }
};

const addFriend = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const { userId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(decoded.id);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    user.friends.push(decoded.id);
    friend.friends.push(userId);
    await friend.save();
    await user.save();

    io.emit('friendAdded', { userId: user._id, friendId: friend._id });
    res.json({ message: "Friend added successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error adding friend" });
  }
};

const removeFriend = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const { userId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(decoded.id);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found." });
    }

    user.friends = user.friends.filter((f) => f.toString() !== decoded.id);
    friend.friends = friend.friends.filter((f) => f.toString() !== userId);
    await user.save();
    await friend.save();

    io.emit('friendRemoved', { userId: user._id, friendId: friend._id });
    res.json({ message: "Friend removed successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error removing friend" });
  }
};

const getFriends = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = Jwt.verify(token, config.secret);

    const { userId } = req.params;
    const user = await User.findById(userId).populate('friends');

    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ error: "Error fetching friends" });
  }
};

const searchUsers = async (req, res) => {
  const { term } = req.body;
  const token = req.headers["x-access-token"];
  const decoded = Jwt.verify(token, config.secret);

  if (!term) {
    return res.status(400).json({ message: "Falta término de búsqueda" });
  }

  try {
    const usuarios = await User.find({
      $and: [
        { _id: { $ne: decoded.id } },
        {
          $or: [
            { fullname: { $regex: term, $options: "i" } },
            { username: { $regex: term, $options: "i" } },
          ],
        },
      ],
    }).populate("role", "name");

    io.emit('userUpdate', usuarios);
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar usuarios" });
  }
};

const verified = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.find(userId);

    if (user.verified === false) {
      user.verified = true;
      await user.save();
    } else if (user.verified === true) {
      user.verified = false;
      await user.save();
    };

    io.emit('userUpdate', user);
    res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error fetching verified" });
  }
};

export { getAllUsers, getFollowers, getFollowing, getFriends, getUsersById, getUsersByUsername, searchUsers, deleteUser, updateStatus, updateUser, followUser, unfollowUser, addFriend, removeFriend, changeRole, verified };
