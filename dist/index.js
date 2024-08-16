"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeFirestore = exports.subscribe = exports.publish = void 0;
const pubsub_1 = require("./pubsub");
Object.defineProperty(exports, "publish", { enumerable: true, get: function () { return pubsub_1.publish; } });
Object.defineProperty(exports, "subscribe", { enumerable: true, get: function () { return pubsub_1.subscribe; } });
Object.defineProperty(exports, "initializeFirestore", { enumerable: true, get: function () { return pubsub_1.initializeFirestore; } });
