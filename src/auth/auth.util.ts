import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthUtil {
  initialize(): void {
    const firebaseConfig = {
      type: process.env.FIREBASE_DEV_TYPE,
      projectId: process.env.FIREBASE_DEV_PROJECT_ID,
      privateKeyId: process.env.FIREBASE_DEV_PRIVATE_KEY_ID,
      privateKey: process?.env.FIREBASE_DEV_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_DEV_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_DEV_CLIENT_ID,
      authUri: process.env.FIREBASE_DEV_AUTH_URI,
      tokenUri: process.env.FIREBASE_DEV_TOKEN_URI,
      authProviderX509CertUrl:
      process.env.FIREBASE_DEV_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FIREBASE_DEV_CLIENT_X509_CERT_URL,
    };
    admin.initializeApp({
      credential: admin.credential.cert(firebaseConfig),
    });
  }
}

