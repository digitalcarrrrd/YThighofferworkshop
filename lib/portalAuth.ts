import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'portal_users.json');
const CONFIG_FILE = path.join(DATA_DIR, 'portal_config.json');

function ensureFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(CONFIG_FILE)) {
    const defaultConfig = {
      recordingTitle: 'Session 1: US/UK Faceless YouTube Automation & AI Systems',
      recordingVideoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // default placeholder or unlisted embed
      recordingDuration: '2 Hours 14 Minutes',
      sessionDate: 'Daily Live Batch (8:00 PM - 10:00 PM PKT)',
      nextSessionDate: 'Tomorrow at 8:00 PM PKT',
      nextSessionLink: 'https://meet.google.com/mfm-cmfi-bnn',
      offerUrl: 'https://www.abrarnadir.com/ytempirebuilder',
      offerDiscount: '50% OFF Founder Pass',
      bonuses: [
        {
          title: '50+ High-Retention AI Script & Hook Prompts Pack',
          description: 'Tested viral video prompts for ChatGPT & Claude to generate US/UK high retention scripts.',
          url: 'https://www.abrarnadir.com/workshops/yt2#bonuses'
        },
        {
          title: 'US/UK High-CPM Niche Matrix Template',
          description: 'Top CPM niches breakdown with RPM estimates, competition index, and monetization paths.',
          url: 'https://www.abrarnadir.com/workshops/yt2#bonuses'
        },
        {
          title: '90-Day Content Calendar & Workflow Planner',
          description: 'Production pipeline tracker to manage voiceovers, thumbnail drafts, and upload schedules.',
          url: 'https://www.abrarnadir.com/workshops/yt2#bonuses'
        },
        {
          title: '7-Day Private Creator Support Access',
          description: 'Direct priority WhatsApp assistance for channel setup, niche audit, and automation questions.',
          url: 'https://wa.me/923266641695?text=Hi%20Abrar%2C%20I%20need%20support%20for%20my%20YT%20Empire%20Builder%20workshop.'
        }
      ]
    };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
  }
}

export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export function getPortalConfig() {
  ensureFiles();
  return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

export function updatePortalConfig(newConfig: any) {
  ensureFiles();
  const current = getPortalConfig();
  const updated = { ...current, ...newConfig };
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(updated, null, 2));
  return updated;
}

export function getPortalUsers(): any[] {
  ensureFiles();
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

export function savePortalUsers(users: any[]) {
  ensureFiles();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

export function createOrGetSetupToken(email: string, name: string = 'Creator') {
  const users = getPortalUsers();
  const normalizedEmail = email.trim().toLowerCase();
  let user = users.find(u => u.email === normalizedEmail);

  const token = crypto.randomBytes(24).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  if (user) {
    user.setupToken = token;
    user.setupTokenExpires = expiresAt;
    user.name = name || user.name;
    user.updatedAt = new Date().toISOString();
  } else {
    user = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      email: normalizedEmail,
      name: name || 'Creator',
      passwordHash: null,
      passwordSalt: null,
      setupToken: token,
      setupTokenExpires: expiresAt,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hasSetPassword: false
    };
    users.push(user);
  }

  savePortalUsers(users);
  return { token, user };
}

export function getUserByToken(token: string) {
  const users = getPortalUsers();
  const user = users.find(u => u.setupToken === token && u.setupTokenExpires > Date.now());
  return user || null;
}

export function setStudentPassword(token: string, password: string) {
  const users = getPortalUsers();
  const user = users.find(u => u.setupToken === token && u.setupTokenExpires > Date.now());
  if (!user) return { success: false, error: 'Invalid or expired setup link' };

  const salt = crypto.randomBytes(16).toString('hex');
  const hash = hashPassword(password, salt);

  user.passwordHash = hash;
  user.passwordSalt = salt;
  user.hasSetPassword = true;
  user.setupToken = null; // consume token
  user.setupTokenExpires = null;
  user.updatedAt = new Date().toISOString();

  savePortalUsers(users);

  const sessionToken = crypto.randomBytes(32).toString('hex');
  return {
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
    sessionToken
  };
}

export function verifyStudentLogin(email: string, password: string) {
  const users = getPortalUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find(u => u.email === normalizedEmail);

  if (!user) return { success: false, error: 'Account not found with this email. Please check the email you registered with.' };
  if (!user.passwordHash || !user.passwordSalt) {
    return { success: false, error: 'Password has not been set yet. Please check your setup link on WhatsApp.' };
  }

  const computedHash = hashPassword(password, user.passwordSalt);
  if (computedHash !== user.passwordHash) {
    return { success: false, error: 'Incorrect email or password.' };
  }

  const sessionToken = crypto.randomBytes(32).toString('hex');
  return {
    success: true,
    user: { id: user.id, email: user.email, name: user.name },
    sessionToken
  };
}
