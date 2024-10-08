import {Meteor} from "meteor/meteor"
import { TaskCollection } from "./TasksCollection";

Meteor.publish("tasks", () => {
    return TaskCollection.find();
})