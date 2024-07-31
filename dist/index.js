"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFirestoreInstance = exports.initializePubSub = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
let firestoreInstance = null;
/**
 * Inicializa o Firebase Firestore com a configuração fornecida.
 * @param firebaseConfig - Configuração do Firebase
 */
const initializePubSub = (firebaseConfig) => {
    const app = (0, app_1.initializeApp)(firebaseConfig);
    firestoreInstance = (0, firestore_1.getFirestore)(app);
};
exports.initializePubSub = initializePubSub;
/**
 * Obtém a instância do Firestore inicializada.
 * @returns A instância do Firestore
 */
const getFirestoreInstance = () => {
    if (!firestoreInstance) {
        throw new Error('Firestore não inicializado. Chame initializePubSub primeiro.');
    }
    return firestoreInstance;
};
exports.getFirestoreInstance = getFirestoreInstance;
__exportStar(require("./publish"), exports);
__exportStar(require("./subscribe"), exports);
