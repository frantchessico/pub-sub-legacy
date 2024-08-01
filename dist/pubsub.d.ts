/**
 * Classe PubSub para gerenciar publicação e assinatura de mensagens usando Firebase Firestore.
 */
declare class PubSub {
    private firestoreInstance;
    /**
     * Construtor da classe PubSub.
     * @param {object} firebaseConfig - Configuração do Firebase.
     */
    constructor(firebaseConfig: object);
    /**
     * Obtém a instância inicializada do Firestore.
     * @returns {Firestore} - A instância do Firestore.
     * @throws {Error} - Se a instância do Firestore não estiver inicializada.
     * @private
     */
    private getFirestoreInstance;
    /**
     * Publica uma mensagem em um canal específico.
     * @param {string} channel - Nome do canal.
     * @param {string} message - Mensagem a ser publicada.
     * @param {string[]} subscribers - Lista de IDs dos subscribers.
     * @returns {Promise<void>} - Uma promessa que resolve quando a mensagem é publicada.
     */
    publish(channel: string, message: string, subscribers: string[]): Promise<void>;
    /**
     * Inscreve um ou mais subscribers em um canal específico e processa mensagens recebidas.
     * @param {string} channel - Nome do canal.
     * @param {string[]} subscriberIds - IDs dos subscribers que devem receber as mensagens.
     * @param {Function} onMessage - Função callback que será chamada quando uma nova mensagem for recebida.
     * @returns {void}
     */
    subscribe(channel: string, subscriberIds: string[], onMessage: (message: string) => void): void;
}
export default PubSub;
