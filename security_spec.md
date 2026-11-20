# Digital Sahayak — Firestore Security Specification

## 1. Roles & Trust Boundaries
- **Public Citizen (Unauthenticated or Authenticated)**:
  - May `get` and `list` `/officers/{officerId}` ONLY where `verificationStatus == 'verified'`.
  - May NEVER read `/officers/{officerId}/private/credentials` or `/admins/{uid}`.
- **Officer Registrant (Authenticated via Google Sign-In)**:
  - May create `/officers/{officerId}` ONLY with `ownerUid == request.auth.uid`, `verificationStatus == 'pending'`, and server timestamps `createdAt == request.time`, `updatedAt == request.time`.
  - May create `/officers/{officerId}/private/credentials` ONLY with `ownerUid == request.auth.uid`, empty `reviewNotes`/`reviewedByUid`, and server timestamps.
  - May read/update/delete their own pending or rejected officer profile (never mutating `ownerUid`, `verificationStatus`, or `createdAt`).
  - Once an officer listing is `verified`, only an Admin can change its `verificationStatus` (terminal/verified protection).
- **Admin Verifier (`utkarsh.tech21@gmail.com` with `email_verified == true`, or listed in `/admins/{uid}`)**:
  - Bootstrapped admin may list all officer profiles (including `pending` and `rejected`) without `exists()`/`get()` inside `allow list`.
  - Admin may approve (`verified`) or reject (`rejected`) listings by mutating ONLY `['verificationStatus', 'updatedAt']` on `/officers/{officerId}` and `['reviewNotes', 'reviewedByUid', 'updatedAt']` on `/officers/{officerId}/private/credentials`.

## 2. Data Invariants
- Strict PII separation: `personalEmail`, `personalPhone`, and `registrationId` NEVER appear on `/officers/{officerId}`.
- Strict schema validation: `keys().hasOnly(...)` and `keys().hasAll(...)` on every document; bounded string lengths; valid Indian 6-digit PIN regex `^[1-9][0-9]{5}$`; valid coordinate ranges (`lat` in `[-90, 90]`, `lng` in `[-180, 180]`); enum-restricted `role` and `verificationStatus`.
- Path ID validation: `isValidId(id)` prevents empty/oversized or path-traversal document IDs.

## 3. Dirty Dozen Attack Payloads Checked
1. **Self-Verification on Create**: Attacker submits `verificationStatus: 'verified'` -> Blocked (`request.resource.data.verificationStatus == 'pending'`).
2. **Self-Verification via Shadow Update**: Owner updates profile and sneaks `verificationStatus: 'verified'` -> Blocked (`affectedKeys().hasOnly(...)` excludes `verificationStatus`).
3. **Owner Hijack**: Attacker updates `ownerUid` on an officer profile -> Blocked (`affectedKeys().hasOnly(...)` excludes `ownerUid`).
4. **Timestamp Spoofing**: Attacker sends backdated `createdAt`/`updatedAt` -> Blocked (`== request.time`).
5. **PII Leakage on Public Directory**: Public citizen attempts to `list` or `get` `/officers/{id}/private/credentials` -> Blocked (`allow list: if false`, `allow get` requires owner or admin).
6. **Unverified Listing Scrape**: Public citizen queries `/officers` without `verificationStatus == 'verified'` -> Blocked (`allow list` requires `resource.data.verificationStatus == 'verified'` for non-owner/non-admin).
7. **Admin Email Spoofing**: Unverified email token claims admin email -> Blocked (`request.auth.token.email_verified == true` required).
8. **Payload Bloat / DoS**: Attacker submits 100 KB `addressLine` or 100 `supportedTasks` -> Blocked by explicit `.size()` caps.
9. **Invalid Coordinates / PIN Poisoning**: Attacker submits `lat: 999` or `pinCode: "000000"` -> Blocked by numeric bounds and PIN regex.
10. **Extra Unvalidated Fields**: Attacker injects `isAdmin: true` or `badge: 'gold'` on `/officers/{id}` -> Blocked by `keys().hasOnly(...)`.
11. **Verified Listing Tampering**: Owner alters verified listing's coordinates/name to impersonate another official after approval -> Blocked (`resource.data.verificationStatus in ['pending', 'rejected']` required for owner updates).
12. **Admin Registry Escalation**: Non-admin tries to write `/admins/{uid}` -> Blocked (`isBootstrappedAdmin()` required).
