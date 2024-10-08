import { Meteor } from "meteor/meteor";
import { TaskCollection } from "../imports/api/TasksCollection";

import "../imports/api/TaskPublications";
import "../imports/api/tasksMethods.js";

const insertTask = (task) => {
  TaskCollection.insertAsync({ text: task.text });
};

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

Meteor.startup(async () => {
  // Used to wipe the table from his data
  // TaskCollection.removeAsync({});
  if ((await TaskCollection.find().countAsync()) === 0) {
    tasks.forEach(insertTask);
  }

});
