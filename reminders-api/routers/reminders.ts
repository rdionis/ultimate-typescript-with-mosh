import { Router } from 'express';
import CreateReminderDto from '../dtos/create-reminder';

const router = Router();

router.get('/', (req, res) => {
    res.send('List of reminders')
})



router.post('/', (req, res) => {
    const { title } = req.body as CreateReminderDto
    // here we use type assertion
    // in the 'const {title}' implementation, we are using destructuring
    res.json(title)
})

// this will render an error in Postman: 'Cannot destructure property &#39;title&#39; of &#39;req.body&#39; as it is undefined.' This happens because, by default, express does not parse incoming request bodies. To solve this problem, we have to install a special type of middleware:
// we need to add the following line of code to index.ts: 'app.use(express.json())'


export default router;