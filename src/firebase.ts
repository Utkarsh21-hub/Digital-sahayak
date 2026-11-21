import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  initializeFirestore,
  doc,
  getDocFromServer,
  Firestore,
} from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  Auth,
} from 'firebase/auth';

export const BOOTSTRAPPED_ADMIN_EMAIL = 'utkarsh.tech21@gmail.com';

interface FirebaseAppletConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  firestoreDatabaseId?: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
}

// Optional eager glob: bundles ../firebase-applet-config.json when present
// without failing production builds (e.g., Vercel) if the file is absent from Git.
const configModules = import.meta.glob<FirebaseAppletConfig>(
  '../firebase-applet-config.json',
  { eager: true, import: 'default' }
);
const fileConfig = configModules['../firebase-applet-config.json'];

const envConfig: Partial<FirebaseAppletConfig> = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY as string | undefined)?.trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined)?.trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined)?.trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string | undefined)?.trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string | undefined)?.trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID as string | undefined)?.trim(),
  firestoreDatabaseId: (import.meta.env.VITE_FIREBASE_DATABASE_ID as string | undefined)?.trim(),
};

const firebaseConfig: Partial<FirebaseAppletConfig> =
  fileConfig?.apiKey && fileConfig?.projectId ? fileConfig : envConfig;

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let app: FirebaseApp | null = null;
let firestoreInstance: Firestore | null = null;
let authInstance: Auth | null = null;

if (isFirebaseConfigured) {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  const databaseId = firebaseConfig.firestoreDatabaseId?.trim() || undefined;
  try {
    firestoreInstance = databaseId
      ? initializeFirestore(app, { experimentalAutoDetectLongPolling: true }, databaseId)
      : initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
  } catch {
    firestoreInstance = databaseId
      ? getFirestore(app, databaseId)
      : getFirestore(app);
  }
  authInstance = getAuth(app);
}

export const db: Firestore | null = firestoreInstance;
export const auth: Auth | null = authInstance;
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo:
        auth?.currentUser?.providerData.map((provider) => ({
          providerId: provider.providerId,
          displayName: provider.displayName,
          email: provider.email,
          photoUrl: provider.photoURL,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function isBootstrappedAdminUser(
  email?: string | null,
  emailVerified?: boolean
): boolean {
  return (
    Boolean(emailVerified) &&
    typeof email === 'string' &&
    email.toLowerCase() === BOOTSTRAPPED_ADMIN_EMAIL.toLowerCase()
  );
}

let connectionTested = false;

export async function testFirestoreConnection(): Promise<void> {
  if (connectionTested || !db) return;
  connectionTested = true;

  const attemptCheck = async (): Promise<void> => {
    if (!db) return;
    await getDocFromServer(doc(db, 'test', 'connection'));
  };

  try {
    await attemptCheck();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes('the client is offline')
    ) {
      // Allow Firestore long-polling auto-detection to settle before reporting offline
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        await attemptCheck();
      } catch (retryError) {
        if (
          retryError instanceof Error &&
          retryError.message.includes('the client is offline')
        ) {
          console.error(
            'Please check your Firebase configuration. Firestore client is offline.'
          );
        }
      }
    }
    // Permission errors on test/connection are expected due to default-deny rules.
  }
}

if (typeof window !== 'undefined' && isFirebaseConfigured) {
  void testFirestoreConnection();
}
