import { Firestore } from 'firebase/firestore';
/**
 * Inicializa o Firebase Firestore com a configuração fornecida.
 * @param firebaseConfig - Configuração do Firebase
 */
export declare const initializePubSub: (firebaseConfig: object) => void;
/**
 * Obtém a instância do Firestore inicializada.
 * @returns A instância do Firestore
 */
export declare const getFirestoreInstance: () => Firestore;
export * from './publish';
export * from './subscribe';
