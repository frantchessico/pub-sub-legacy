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
exports.publishMessage = void 0;
const firestore_1 = require("firebase/firestore");
const index_1 = require("./index");
/**
 * Publica uma mensagem em um canal específico.
 * @param channel - Nome do canal
 * @param message - Mensagem a ser publicada
 * @param subscribers - Lista de IDs dos subscribers
 */
const publishMessage = (channel, message, subscribers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firestore = (0, index_1.getFirestoreInstance)();
        for (const subscriber of subscribers) {
            yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firestore, 'channels', channel, 'messages'), {
                message,
                timestamp: (0, firestore_1.serverTimestamp)(),
                read: false,
                subscriber
            });
            console.log(`Mensagem publicada no canal ${channel} para ${subscriber}: ${message}`);
        }
    }
    catch (err) {
        console.error(`Erro ao publicar mensagem no canal ${channel}:`, err);
    }
});
exports.publishMessage = publishMessage;
