

# PubSub Legacy

PubSub é uma biblioteca para gerenciar a publicação e assinatura de mensagens usando o Firebase Firestore.

## Índice

- [Introdução](#introdução)
- [Instalação](#instalação)
- [Uso](#uso)
  - [Inicialização](#inicialização)
  - [Publicação de Mensagens](#publicação-de-mensagens)
  - [Assinatura de Mensagens](#assinatura-de-mensagens)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Introdução

O PubSub é uma biblioteca para facilitar a comunicação assíncrona entre diferentes partes de um sistema usando o Firebase Firestore. Ele permite a publicação de mensagens em canais específicos e a assinatura para receber essas mensagens.

## Instalação

Para instalar a biblioteca PubSub, siga os passos abaixo:


  

 Instalação :
    ```sh
    yarn add @savanapoint/pub-sub-legacy
    ```

 Ou:
    ```sh
    npm install @savanapoint/pub-sub-legacy
    ```

## Uso

### Inicialização

Antes de utilizar o PubSub, você precisa inicializar o Firebase Firestore com as suas configurações:

```typescript
import { initializeFirestore } from '@savanapoint/pub-sub-legacy';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

initializeFirestore(firebaseConfig);
```

### Publicação de Mensagens

Para publicar uma mensagem em um canal específico, utilize o método `publish`:

```typescript
import { publish } from '@savanapoint/pub-sub-legacy';

const channel = 'testChannel';
const message = 'Hello World';
const subscribers = ['subscriber1', 'subscriber2'];

publish(channel, message, subscribers).then(() => {
  console.log('Mensagem publicada com sucesso!');
}).catch((error) => {
  console.error('Erro ao publicar mensagem:', error);
});
```

### Assinatura de Mensagens

Para se inscrever em um canal e processar as mensagens recebidas, utilize o método `subscribe`:

```typescript
import { subscribe } from '@savanapoint/pub-sub-legacy';

const channel = 'testChannel';
const subscriberIds = ['subscriber1', 'subscriber2'];

subscribe(channel, subscriberIds, (message) => {
  console.log('Mensagem recebida:', message);
});
```

## API

### `initializeFirestore(firebaseConfig: object): void`

Inicializa a instância do Firestore com a configuração fornecida.

- `firebaseConfig` - Objeto de configuração do Firebase.

### `publish(channel: string, message: string, subscribers: string[]): Promise<void>`

Publica uma mensagem em um canal específico.

- `channel` - Nome do canal.
- `message` - Mensagem a ser publicada.
- `subscribers` - Lista de IDs dos subscribers.

### `subscribe(channel: string, subscriberIds: string[], onMessage: (message: string) => void): void`

Inscreve um ou mais subscribers em um canal específico e processa mensagens recebidas.

- `channel` - Nome do canal.
- `subscriberIds` - IDs dos subscribers que devem receber as mensagens.
- `onMessage` - Função callback que será chamada quando uma nova mensagem for recebida.

## Contribuição

Contribuições são bem-vindas! Se você tem alguma ideia, encontrou um bug ou tem uma sugestão de melhoria, sinta-se à vontade para abrir uma issue ou enviar um pull request.

1. Fork o repositório.
2. Crie sua branch de feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

