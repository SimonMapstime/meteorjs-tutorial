import { Meteor } from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import { TaskCollection } from "../imports/api/TasksCollection";

import "../imports/api/TaskPublications";
import "../imports/api/tasksMethods.js";

const SEED_USERNAME = "admin"
const SEED_PASSWORD = "password"

const tasks = [
  { _id: 1, text: "One" },
  { _id: 2, text: "Two" },
  { _id: 3, text: "Three" },
  { _id: 4, text: "Four" },
  { _id: 5, text: "Five" },
  { _id: 6, text: "Six" },
  { _id: 7, text: "Seven" },
  { _id: 8, text: "Eight" },
  { _id: 9, text: "Nine" },
  { _id: 10, text: "Ten" },
];

const insertTask = (task) => {
  TaskCollection.insertAsync({
     text: task.text,
     user_id: user._id,
     createdAt: new Date(),
    });
};

Meteor.startup(async () => {
  // Creating the user if he does not exist
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))) {
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    })
  }
  const user = await Accounts.findUserByUsername(SEED_USERNAME);
  // Used to wipe the table from his data
  // TaskCollection.removeAsync({});
  if ((await TaskCollection.find().countAsync()) === 0) {
    tasks.forEach(insertTask);
  }
});
