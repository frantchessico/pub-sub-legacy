/**
 * Inscreve um ou mais subscribers em um canal específico.
 * @param channel - Nome do canal
 * @param subscriberIds - IDs dos subscribers que devem receber as mensagens
 * @returns Promise que resolve para a mensagem recebida
 */
export declare const subscribeToChannel: (channel: string, subscriberIds: string[]) => Promise<string>;
