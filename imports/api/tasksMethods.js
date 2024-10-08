import { Meteor } from "meteor/meteor";
import { TaskCollection } from "./TasksCollection";

Meteor.methods({
  "tasks.insert"(doc) {
    return TaskCollection.insertAsync({
      ...doc,
      userId: this.userId,
    });
  },
  "tasks.toggleChecked"({ _id, isChecked }) {
    return TaskCollection.updateAsync(_id, {
      $set: { isChecked: !isChecked },
    });
  },
  "tasks.delete"({_id})  {
    return TaskCollection.removeAsync(_id);
  }
});
