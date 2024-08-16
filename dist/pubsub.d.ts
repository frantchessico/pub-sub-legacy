/**
 * Inicializa a instância do Firestore com a configuração fornecida.
 * @param {object} firebaseConfig - Configuração do Firebase.
 */
declare function initializeFirestore(firebaseConfig: object): void;
/**
 * Publica uma mensagem em um canal específico.
 * @param {string} channel - Nome do canal.
 * @param {string} message - Mensagem a ser publicada.
 * @param {string[]} subscribers - Lista de IDs dos subscribers.
 * @returns {Promise<void>} - Uma promessa que resolve quando a mensagem é publicada.
 */
declare function publish(channel: string, message: string, subscribers: string[]): Promise<void>;
/**
 * Inscreve um ou mais subscribers em um canal específico e processa mensagens recebidas.
 * @param {string} channel - Nome do canal.
 * @param {string[]} subscriberIds - IDs dos subscribers que devem receber as mensagens.
 * @param {Function} onMessage - Função callback que será chamada quando uma nova mensagem for recebida.
 * @returns {void}
 */
declare function subscribe(channel: string, subscriberIds: string[], onMessage: (message: string) => void): void;
export { initializeFirestore, publish, subscribe };
