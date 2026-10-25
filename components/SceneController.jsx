'use client';

import { useEffect } from 'react';
import { initializeScene } from '../lib/scene.js';

export default function SceneController() {
  useEffect(() => initializeScene(), []);
  return null;
}
