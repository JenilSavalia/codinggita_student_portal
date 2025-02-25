import express from 'express'
import { getEventList, postEvent, deleteEvent } from '../Controller/Events.Controller/Events.Controller.js'
import protect from '../Middlleware/protect.js'

// LevelOne: ["Admin"],
// LevelTwo: ["Admin", "Tutor"],
// LevelThree: ["Admin", "Tutor", "Student",],
// LevelFour: ["Admin", "Tutor", "Student", "Guest"],

const EventRouter = express.Router()

EventRouter.get('/', getEventList)
EventRouter.post('/', postEvent)
EventRouter.delete('/', deleteEvent)
// EventRouter.get('/', protect("LevelFour"), getEventList)
// EventRouter.post('/', protect("LevelThree"), postEvent)
// EventRouter.delete('/', protect("LevelOne"), deleteEvent)

export default EventRouter;