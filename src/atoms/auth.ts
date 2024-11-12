import { atom } from 'jotai';
import type { User } from '../lib/db';

export const userAtom = atom<User | null>(null);