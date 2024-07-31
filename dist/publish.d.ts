/**
 * Publica uma mensagem em um canal específico.
 * @param channel - Nome do canal
 * @param message - Mensagem a ser publicada
 * @param subscribers - Lista de IDs dos subscribers
 */
export declare const publishMessage: (channel: string, message: string, subscribers: string[]) => Promise<void>;
