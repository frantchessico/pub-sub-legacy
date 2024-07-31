import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

let firestoreInstance: Firestore | null = null;

/**
 * Inicializa o Firebase Firestore com a configuração fornecida.
 * @param firebaseConfig - Configuração do Firebase
 */
export const initializePubSub = (firebaseConfig: object): void => {
  const app: FirebaseApp = initializeApp(firebaseConfig);
  firestoreInstance = getFirestore(app);
};

/**
 * Obtém a instância do Firestore inicializada.
 * @returns A instância do Firestore
 */
export const getFirestoreInstance = (): Firestore => {
  if (!firestoreInstance) {
    throw new Error('Firestore não inicializado. Chame initializePubSub primeiro.');
  }
  return firestoreInstance;
};

export * from './publish';
export * from './subscribe';
