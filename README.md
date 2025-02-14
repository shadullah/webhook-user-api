**Backend API with JWT Authentication & Webhook Implementation**

This project consists of two main tasks:

- API Development & Authentication (Basic to Intermediate Level)
- Webhook Implementation (Advanced Level)

_Task 1: API Development & Authentication_

- Used mongodb for data storing
- used mongoose for designing schema
- jwt middleware was implemented for get request when a single user data is called

_Task 2: Webhook Implementation_

A webhook is used for event-driven architecture. The Post request for endpoint /api/webhook, this endpoint validates request signature, stores data in json file(db.json)

Libraries used:

- svix: this is used for webhook as a service
- clerk: Clerk uses Svix to send webhooks.

The webhook processes the following:

- Event Type: Type of event being triggered.
- Data: The payload of the event.
