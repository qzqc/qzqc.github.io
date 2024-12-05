// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, setDoc } from "firebase/firestore";
import axios from 'axios';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgvGzlFA9je9KgkN7fGwD-0FRWREtJ1Ao",
    authDomain: "text-ae63e.firebaseapp.com",
    projectId: "text-ae63e",
    storageBucket: "text-ae63e.firebasestorage.app",
    messagingSenderId: "226171768624",
    appId: "1:226171768624:web:99edef5dd894bde20502f5",
    measurementId: "G-DVT39XNPHJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

// Handle user login
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        signInAnonymously(auth).then(() => {
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('chat-container').style.display = 'block';
            document.getElementById('video-container').style.display = 'block';
            // Initialize chat and video streams here
            startVideoCall();
        }).catch((error) => {
            console.error("Error signing in: ", error);
        });
    }
}

// Send a message
function sendMessage() {
    const messageBox = document.getElementById('message-box');
    const message = messageBox.value;
    if (message) {
        addDoc(collection(db, "messages"), {
            username: auth.currentUser.uid,
            message: message,
            timestamp: new Date()
        });
        messageBox.value = '';
    }
}

// Listen for incoming messages
const messagesQuery = query(collection(db, "messages"), orderBy("timestamp"));
onSnapshot(messagesQuery, snapshot => {
    const messages = document.getElementById('messages');
    messages.innerHTML = '';
    snapshot.forEach(doc => {
        const data = doc.data();
        const messageElement = document.createElement('div');
        messageElement.textContent = `${data.username}: ${data.message}`;
        messages.appendChild(messageElement);
    });
});

// WebRTC setup
let localStream;
let remoteStream;
let peerConnection;

async function startVideoCall() {
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
    document.getElementById('localVideo').srcObject = localStream;

    const turnCredentials = await getTurnCredentials();
    const servers = {
        iceServers: turnCredentials.iceServers
    };

    peerConnection = new RTCPeerConnection(servers);
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

    peerConnection.ontrack = event => {
        if (event.streams && event.streams[0]) {
            document.getElementById('remoteVideo').srcObject = event.streams[0];
        }
    };

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            sendIceCandidate(event.candidate);
        }
    };

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendOffer(offer);
}

async function getTurnCredentials() {
    try {
        const response = await axios.get('/turn-credentials');
        return response.data;
    } catch (error) {
        console.error('Error fetching TURN credentials:', error);
        return { iceServers: [] };
    }
}

// Send and handle signaling data (offers, answers, and ICE candidates) as shown previously
