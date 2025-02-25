"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirestore = initializeFirestore;
exports.publish = publish;
exports.subscribe = subscribe;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
let firestoreInstance = null;
/**
 * Inicializa a instância do Firestore com a configuração fornecida.
 * @param {object} firebaseConfig - Configuração do Firebase.
 */
function initializeFirestore(firebaseConfig) {
    const app = (0, app_1.initializeApp)(firebaseConfig);
    firestoreInstance = (0, firestore_1.getFirestore)(app);
}
/**
 * Obtém a instância inicializada do Firestore.
 * @returns {Firestore} - A instância do Firestore.
 * @throws {Error} - Se a instância do Firestore não estiver inicializada.
 */
function getFirestoreInstance() {
    if (!firestoreInstance) {
        throw new Error('Firestore não inicializado.');
    }
    return firestoreInstance;
}
/**
 * Publica uma mensagem em um canal específico.
 * @param {string} channel - Nome do canal.
 * @param {string} message - Mensagem a ser publicada.
 * @param {string[]} subscribers - Lista de IDs dos subscribers.
 * @returns {Promise<void>} - Uma promessa que resolve quando a mensagem é publicada.
 */
function publish(channel, message, subscribers) {
    return __awaiter(this, void 0, void 0, function* () {
        const firestore = getFirestoreInstance();
        for (const subscriber of subscribers) {
            yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firestore, 'channels', channel, 'messages'), {
                message,
                timestamp: (0, firestore_1.serverTimestamp)(),
                read: false,
                subscriber
            });
            console.log(`Mensagem publicada no canal ${channel} para ${subscriber}: ${message}`);
        }
    });
}
/**
 * Inscreve um ou mais subscribers em um canal específico e processa mensagens recebidas.
 * @param {string} channel - Nome do canal.
 * @param {string[]} subscriberIds - IDs dos subscribers que devem receber as mensagens.
 * @param {Function} onMessage - Função callback que será chamada quando uma nova mensagem for recebida.
 * @returns {void}
 */
function subscribe(channel, subscriberIds, onMessage) {
    const firestore = getFirestoreInstance();
    if (!firestore) {
        throw new Error('Firestore instance is not initialized.');
    }
    subscriberIds.forEach((subscriberId) => {
        const messagesRef = (0, firestore_1.collection)(firestore, 'channels', channel, 'messages');
        const q = (0, firestore_1.query)(messagesRef, (0, firestore_1.orderBy)('timestamp'), (0, firestore_1.where)('read', '==', false), (0, firestore_1.where)('subscriber', '==', subscriberId));
        (0, firestore_1.onSnapshot)(q, (snapshot) => __awaiter(this, void 0, void 0, function* () {
            for (const change of snapshot.docChanges()) {
                if (change.type === 'added') {
                    const messageData = change.doc.data();
                    console.log(`Recebida mensagem do canal ${channel} por ${subscriberId}: ${messageData.message}`);
                    try {
                        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firestore, 'channels', channel, 'messages', change.doc.id), { read: true });
                        onMessage(messageData.message); // Chama a função de callback com a mensagem recebida
                    }
                    catch (error) {
                        console.error(`Erro ao processar a mensagem com ID ${change.doc.id}:`, error);
                    }
                }
            }
        }), (err) => {
            console.error('Erro ao escutar mensagens:', err);
        });
    });
}
