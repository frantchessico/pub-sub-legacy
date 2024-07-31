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
exports.subscribeToChannel = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("./index");
/**
 * Inscreve um ou mais subscribers em um canal específico.
 * @param channel - Nome do canal
 * @param subscriberIds - IDs dos subscribers que devem receber as mensagens
 * @returns Promise que resolve para a mensagem recebida
 */
const subscribeToChannel = (channel, subscriberIds) => {
    return new Promise((resolve, reject) => {
        const firestore = (0, index_1.getFirestoreInstance)();
        if (!firestore) {
            reject('Firestore instance is not initialized.');
            return;
        }
        subscriberIds.forEach((subscriberId) => {
            const messagesRef = (0, firestore_1.collection)(firestore, 'channels', channel, 'messages');
            const q = (0, firestore_1.query)(messagesRef, (0, firestore_1.orderBy)('timestamp'), (0, firestore_1.where)('read', '==', false), (0, firestore_1.where)('subscriber', '==', subscriberId));
            (0, firestore_1.onSnapshot)(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => __awaiter(void 0, void 0, void 0, function* () {
                    if (change.type === 'added') {
                        const messageData = change.doc.data();
                        console.log(`Recebida mensagem do canal ${channel} por ${subscriberId}: ${messageData.message}`);
                        try {
                            // Processar a mensagem como necessário
                            yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(firestore, 'channels', channel, 'messages', change.doc.id), { read: true });
                            resolve(messageData.message);
                        }
                        catch (error) {
                            console.error(`Erro ao processar a mensagem com ID ${change.doc.id}:`, error);
                            reject(error);
                        }
                    }
                }));
            }, (err) => {
                console.error('Erro ao escutar mensagens:', err);
                reject(err);
            });
        });
    });
};
exports.subscribeToChannel = subscribeToChannel;
