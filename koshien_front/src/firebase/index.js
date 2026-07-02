const { initializeApp } = require("firebase/app");
const {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} = require("firebase/auth");
const firebaseConfig =
  process.env.FIREBASE_CONFIG === undefined
    ? require("./firebase.config")
    : require(process.env.FIREBASE_CONFIG);

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

async function signUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/weak-password") {
      return {
        errorCode: errorCode,
        message: "パスワード設定の条件を満たしていません",
        status: false,
      };
    } else if (errorCode == "auth/email-already-in-use") {
      return {
        errorCode: errorCode,
        message: "すでにアカウントが存在しています",
        status: false,
      };
    } else {
      return {
        errorCode: errorCode,
        message: errorMessage,
        status: false,
      };
    }
  }
  return { status: true, message: "アカウントが作られました" };
}

async function signIn(email, password) {
  if (auth.currentUser) {
    return {
      status: false,
      message: "すでにログインされています",
    };
  } else {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        return {
          errorCode: errorCode,
          status: false,
          message: "パスワードが間違えています",
        };
      } else {
        return { errorCode: errorCode, status: false, message: errorMessage };
      }
    }
    return { status: true, message: "サインイン成功" };
  }
}

async function signOutF() {
  await signOut(auth);
}

function authState() {
  const result = {};
  onAuthStateChanged(auth, function (user) {
    if (user) {
      // truthy => ログインされている
      result.status = true;
      result.uid = user.uid;
      result.email = user.email;
    } else {
      result.status = false;
      result.message = "ログインされていません";
    }
  });
  return result;
}

async function passwordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode == "auth/invalid-email") {
      // メールアドレスが悪い
      return {
        errorCode: errorCode,
        status: false,
        message: "無効なメールアドレスです",
      };
    } else if (errorCode == "auth/user-not-found") {
      // そもそも登録されていない
      return {
        errorCode: errorCode,
        status: false,
        message: "ユーザーが存在しません",
      };
    } else {
      return { errorCode: errorCode, status: false, message: errorMessage };
    }
  }
  return { status: true, message: "パスワードリセットのメールが送られました" };
}

module.exports = {
  signIn,
  signUp,
  signOutF,
  passwordReset,
  authState,
};
