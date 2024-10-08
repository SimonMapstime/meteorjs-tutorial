import { Meteor } from "meteor/meteor";
import { TaskCollection } from "./TasksCollection";


// We need to use the function keyword to make it work.
Meteor.publish("tasks", function () {
  const userId = this.userId;
  if (!userId) {
    return this.ready();
  }
  return TaskCollection.find({ userId });
});
