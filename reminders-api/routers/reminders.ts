import { Router } from 'express';
import CreateReminderDto from '../dtos/create-reminder';
import Reminder from '../models/reminder';

const router = Router();
const reminders: Reminder[] = []

router.get('/', (req, res) => {
    // res.send('List of reminders')
    res.json(reminders)
})

router.post('/', (req, res) => {
    const { title } = req.body as CreateReminderDto;
    // here we use type assertion
    // in the 'const {title}' implementation, we are using destructuring
    // const reminder = {
    //     id: Date.now(),
    //     title,
    //     isComplete: false
    // } // – we could add this here, but it is better to keep the router module responsible only for routers and nothing else; no other details should be implemented here
    const reminder = new Reminder(title);
    reminders.push(reminder);
    res.status(201).json(reminder);
})

router.delete('/', (req, res) => {
    reminders
})

// this will render an error in Postman: 'Cannot destructure property &#39;title&#39; of &#39;req.body&#39; as it is undefined.' This happens because, by default, express does not parse incoming request bodies. To solve this problem, we have to install a special type of middleware:
// we need to add the following line of code to index.ts: 'app.use(express.json())'


export default router;