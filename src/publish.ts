import { collection, addDoc, serverTimestamp, Firestore } from 'firebase/firestore';
import { getFirestoreInstance } from './index';

/**
 * Publica uma mensagem em um canal específico.
 * @param channel - Nome do canal
 * @param message - Mensagem a ser publicada
 * @param subscribers - Lista de IDs dos subscribers
 */
export const publishMessage = async (channel: string, message: string, subscribers: string[]): Promise<void> => {
  try {
    const firestore: Firestore = getFirestoreInstance();

    for (const subscriber of subscribers) {
      await addDoc(collection(firestore, 'channels', channel, 'messages'), {
        message,
        timestamp: serverTimestamp(),
        read: false,
        subscriber
      });
      console.log(`Mensagem publicada no canal ${channel} para ${subscriber}: ${message}`);
    }
  } catch (err) {
    console.error(`Erro ao publicar mensagem no canal ${channel}:`, err);
  }
};
