export default class Reminder {
    id: number;
    isComplete: boolean;

    constructor(public title: string) {
        // this is where we set the 'id' and 'isComplete'
        this.id = Date.now();
        this.isComplete = false;
        // this is the right place to implement these details
    }
}