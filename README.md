
# @savanapoint/pub-sub

The `@savanapoint/pub-sub` library facilitates implementing a pub/sub messaging system using Firebase Firestore and TypeScript. It enables publishing messages to channels and subscribing to receive messages from those channels.

## Installation

To install the library, run the following command:

```bash
npm install @savanapoint/pub-sub
```

## Usage

### Initialization

First, initialize the `PubSub` class with your Firebase configuration:

```typescript
import PubSub from '@savanapoint/pub-sub';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const pubSub = new PubSub(firebaseConfig);
```

### Publish a Message

To publish a message to a channel, use the `publish` method of the `PubSub` class:

```typescript
pubSub.publish('channelName', 'Hello, World!', ['subscriberId1', 'subscriberId2'])
  .then(() => {
    console.log('Message published successfully');
  })
  .catch((error) => {
    console.error('Error publishing message:', error);
  });
```

- **`channel`**: The name of the channel where the message will be published.
- **`message`**: The content of the message to be published.
- **`subscribers`**: List of subscriber IDs who will receive the message.

### Subscribe to a Channel

To subscribe to a channel and receive messages, use the `subscribe` method of the `PubSub` class:

```typescript
pubSub.subscribe('channelName', ['subscriberId1', 'subscriberId2'], (message) => {
    console.log('Received message:', message);
  })
  .catch((error) => {
    console.error('Error subscribing to channel:', error);
  });
```

- **`channel`**: The name of the channel to which the subscribers are subscribing.
- **`subscriberIds`**: List of subscriber IDs who should receive the messages.
- **`onMessage`**: Callback function that will be called when a new message is received. It receives the message as an argument.

### Error Handling

- **Errors When Publishing Messages:** Any error that occurs during the publishing of the message will be caught and logged to the console.
- **Errors When Subscribing to Channels:** Any error that occurs during subscription to the channel will be caught and logged to the console.

## Contributing

If you would like to contribute to the library, please follow these steps:

1. Fork the repository.
2. Create a branch for your changes.
3. Make your modifications and test them.
4. Submit a pull request to the main repository.

## License

The library is licensed under the [MIT License](LICENSE).

