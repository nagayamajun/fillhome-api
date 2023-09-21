import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class AuthService {
  // firebase_authに作成
  createOwner(
    {email, password}: { email: string, password: string }
  ): Promise<UserRecord> {
    return admin.auth().createUser({
      email,
      password,
      disabled: false
    });
  };
  
  //カスタムtokenを作成
  createCustomToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  };

  //firebase_admin上から削除
  deleteOwner(uid: string): Promise<void> {
    return admin.auth().deleteUser(uid);
  };
}