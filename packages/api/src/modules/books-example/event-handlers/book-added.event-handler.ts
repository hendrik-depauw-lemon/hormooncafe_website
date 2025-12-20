import { EventHandler } from '@boostercloud/framework-core';

import { sendEmail } from '../../../services/email.service';
import { BookAdded } from '../events/book-added.event';

@EventHandler(BookAdded)
export class BookAddedHandler {
    public static async handle(event: BookAdded): Promise<void> {
        await sendEmail({
            to: 'studio@lemon.be',
            from: 'studio@lemon.be',
            subject: 'Book added',
            content: `Book with title ${event.title} was added`,
        });
    }
}
