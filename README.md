

# `@savanapoint/pub-sub`

`@savanapoint/pub-sub` é uma biblioteca para gerenciar o padrão de publicação/assinatura usando o Firebase Firestore. Ela permite publicar e assinar mensagens em canais específicos com suporte a múltiplos assinantes.

## Instalação

Para instalar a biblioteca, use o npm ou yarn:

```bash
npm install @savanapoint/pub-sub
# ou
yarn add @savanapoint/pub-sub
```

## Configuração

### Inicializar o Pub/Sub

Antes de usar qualquer funcionalidade da biblioteca, você precisa inicializar o Pub/Sub com a configuração do Firebase:

```typescript
import { initializePubSub } from '@savanapoint/pub-sub';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

initializePubSub(firebaseConfig);
```

## Métodos

### `initializePubSub(config: Object): void`

Inicializa o Pub/Sub com a configuração do Firebase.

**Parâmetros:**
- `config`: Um objeto contendo a configuração do Firebase.

### `publishMessage(channel: string, message: string, subscriber: string): Promise<void>`

Publica uma mensagem em um canal específico.

**Parâmetros:**
- `channel`: O nome do canal onde a mensagem será publicada.
- `message`: O conteúdo da mensagem a ser publicada.
- `subscriber`: O ID do assinante para quem a mensagem é direcionada.

**Retorno:**
- `Promise<void>`: Retorna uma Promise que é resolvida quando a mensagem é publicada.

**Exemplo:**

```typescript
import { publishMessage } from '@savanapoint/pub-sub';

publishMessage('newsletter', 'Sua mensagem aqui', 'savanapoint')
  .then(() => console.log('Mensagem publicada com sucesso'))
  .catch(error => console.error('Erro ao publicar mensagem:', error));
```

### `subscribeToChannel(channel: string, subscriberIds: string[]): Promise<string>`

Inscreve um ou mais assinantes em um canal específico e retorna a mensagem recebida.

**Parâmetros:**
- `channel`: O nome do canal ao qual o assinante se inscreve.
- `subscriberIds`: Um array de IDs de assinantes que devem receber as mensagens.

**Retorno:**
- `Promise<string>`: Retorna uma Promise que resolve com uma string contendo a mensagem recebida quando uma nova mensagem é recebida.

**Exemplo:**

```typescript
import { subscribeToChannel } from '@savanapoint/pub-sub';

subscribeToChannel('newsletter', ['savanapoint'])
  .then((message: string) => {
    console.log('Mensagem recebida:', message);
  })
  .catch(error => console.error('Erro ao se inscrever no canal:', error));
```

## Tipos

### `Message`

Interface que representa uma mensagem recebida.

**Propriedades:**
- `message`: O conteúdo da mensagem.
- `timestamp`: O timestamp da mensagem (`Timestamp` do Firebase Firestore).
- `read`: Um booleano indicando se a mensagem foi lida.
- `subscriber`: O ID do assinante associado à mensagem.

**Exemplo:**

```typescript
import { Timestamp } from 'firebase/firestore';

export interface Message {
  message: string;
  timestamp: Timestamp;
  read: boolean;
  subscriber: string;
}
```

## Build

Para construir a biblioteca, use o comando:

```bash
npm run build
```

Isso compila o código TypeScript para JavaScript e gera os arquivos de saída na pasta `dist`.

## Contribuição

Se você deseja contribuir para a biblioteca, siga estas etapas:

1. Faça um fork do repositório.
2. Crie uma branch para suas alterações.
3. Faça suas modificações e teste-as.
4. Envie um pull request com uma descrição detalhada das alterações.

## Licença

Esta biblioteca está licenciada sob a [MIT License](LICENSE).


