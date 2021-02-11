import firebase from "./firebase";

const firestore = firebase.firestore();

export async function createUser(uid, data) {
  try {
    await firestore
      .collection("users")
      .doc(uid)
      .set({ uid, ...data }, { merge: true });
  } catch (error) {
    // TODO: Error handling...
    console.log("[firestore] Error saving user");
  }
}

export async function createSite(data) {
  try {
    await firestore.collection("users").add(data);
  } catch (error) {
    // TODO: Error handling...
    console.log("[firestore] Error creating site");
  }
}
