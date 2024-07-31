import { collection, query, orderBy, onSnapshot, where, updateDoc, doc, Firestore } from 'firebase/firestore';
import { getFirestoreInstance } from './index';
import { Message } from './types';

/**
 * Inscreve um ou mais subscribers em um canal específico.
 * @param channel - Nome do canal
 * @param subscriberIds - IDs dos subscribers que devem receber as mensagens
 * @returns Promise que resolve para a mensagem recebida
 */
export const subscribeToChannel = (channel: string, subscriberIds: string[]): Promise<string> => {
  return new Promise((resolve, reject) => {
    const firestore: Firestore = getFirestoreInstance();

    if (!firestore) {
      reject('Firestore instance is not initialized.');
      return;
    }

    subscriberIds.forEach((subscriberId) => {
      const messagesRef = collection(firestore, 'channels', channel, 'messages');
      const q = query(
        messagesRef,
        orderBy('timestamp'),
        where('read', '==', false),
        where('subscriber', '==', subscriberId)
      );

      onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            const messageData = change.doc.data();
            console.log(`Recebida mensagem do canal ${channel} por ${subscriberId}: ${messageData.message}`);

            try {
              // Processar a mensagem como necessário
              await updateDoc(doc(firestore, 'channels', channel, 'messages', change.doc.id), { read: true });
              resolve(messageData.message);
            } catch (error) {
              console.error(`Erro ao processar a mensagem com ID ${change.doc.id}:`, error);
              reject(error);
            }
          }
        });
      }, (err) => {
        console.error('Erro ao escutar mensagens:', err);
        reject(err);
      });
    });
  });
};
