import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore, addDoc, collection, serverTimestamp, query, orderBy, where, onSnapshot, updateDoc, doc } from 'firebase/firestore';

/**
 * Classe PubSub para gerenciar publicação e assinatura de mensagens usando Firebase Firestore.
 */
class PubSub {
  private firestoreInstance: Firestore | null = null;

  /**
   * Construtor da classe PubSub.
   * @param {object} firebaseConfig - Configuração do Firebase.
   */
  constructor(firebaseConfig: object) {
    const app: FirebaseApp = initializeApp(firebaseConfig);
    this.firestoreInstance = getFirestore(app);
  }

  /**
   * Obtém a instância inicializada do Firestore.
   * @returns {Firestore} - A instância do Firestore.
   * @throws {Error} - Se a instância do Firestore não estiver inicializada.
   * @private
   */
  private getFirestoreInstance(): Firestore {
    if (!this.firestoreInstance) {
      throw new Error('Firestore não inicializado.');
    }
    return this.firestoreInstance;
  }

  /**
   * Publica uma mensagem em um canal específico.
   * @param {string} channel - Nome do canal.
   * @param {string} message - Mensagem a ser publicada.
   * @param {string[]} subscribers - Lista de IDs dos subscribers.
   * @returns {Promise<void>} - Uma promessa que resolve quando a mensagem é publicada.
   */
  async publish(channel: string, message: string, subscribers: string[]): Promise<void> {
    const firestore = this.getFirestoreInstance();
    for (const subscriber of subscribers) {
      await addDoc(collection(firestore, 'channels', channel, 'messages'), {
        message,
        timestamp: serverTimestamp(),
        read: false,
        subscriber
      });
      console.log(`Mensagem publicada no canal ${channel} para ${subscriber}: ${message}`);
    }
  }

  /**
   * Inscreve um ou mais subscribers em um canal específico e processa mensagens recebidas.
   * @param {string} channel - Nome do canal.
   * @param {string[]} subscriberIds - IDs dos subscribers que devem receber as mensagens.
   * @param {Function} onMessage - Função callback que será chamada quando uma nova mensagem for recebida.
   * @returns {void}
   */
  subscribe(channel: string, subscriberIds: string[], onMessage: (message: string) => void): void {
    const firestore = this.getFirestoreInstance();
    if (!firestore) {
      throw new Error('Firestore instance is not initialized.');
    }
    subscriberIds.forEach((subscriberId) => {
      const messagesRef = collection(firestore, 'channels', channel, 'messages');
      const q = query(
        messagesRef,
        orderBy('timestamp'),
        where('read', '==', false),
        where('subscriber', '==', subscriberId)
      );
      onSnapshot(q, async (snapshot) => {
        for (const change of snapshot.docChanges()) {
          if (change.type === 'added') {
            const messageData = change.doc.data();
            console.log(`Recebida mensagem do canal ${channel} por ${subscriberId}: ${messageData.message}`);
            try {
              await updateDoc(doc(firestore, 'channels', channel, 'messages', change.doc.id), { read: true });
              onMessage(messageData.message); // Chama a função de callback com a mensagem recebida
            } catch (error) {
              console.error(`Erro ao processar a mensagem com ID ${change.doc.id}:`, error);
            }
          }
        }
      }, (err) => {
        console.error('Erro ao escutar mensagens:', err);
      });
    });
  }
}

export default PubSub;
