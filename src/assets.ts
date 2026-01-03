// Asset registry for 3D models
// Using GitHub Raw URLs for Expo Go compatibility

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/andreahlert/secondsurvival/master';

// Remote URLs for GLB models (works in Expo Go)
export const remoteModels = {
  // Characters
  rogue: `${GITHUB_RAW_BASE}/assets/characters/Rogue.glb`,
  rogueHooded: `${GITHUB_RAW_BASE}/assets/characters/Rogue_Hooded.glb`,
  knight: `${GITHUB_RAW_BASE}/assets/characters/Knight.glb`,
  barbarian: `${GITHUB_RAW_BASE}/assets/characters/Barbarian.glb`,
  mage: `${GITHUB_RAW_BASE}/assets/characters/Mage.glb`,
  ranger: `${GITHUB_RAW_BASE}/assets/characters/Ranger.glb`,

  // Animations
  animGeneral: `${GITHUB_RAW_BASE}/assets/animations/Rig_Medium_General.glb`,
  animMovement: `${GITHUB_RAW_BASE}/assets/animations/Rig_Medium_MovementBasic.glb`,
};

// Textures (remote)
export const remoteTextures = {
  barbarian: `${GITHUB_RAW_BASE}/assets/characters/barbarian_texture.png`,
  knight: `${GITHUB_RAW_BASE}/assets/characters/knight_texture.png`,
  mage: `${GITHUB_RAW_BASE}/assets/characters/mage_texture.png`,
  ranger: `${GITHUB_RAW_BASE}/assets/characters/ranger_texture.png`,
  rogue: `${GITHUB_RAW_BASE}/assets/characters/rogue_texture.png`,
  dungeon: `${GITHUB_RAW_BASE}/assets/dungeon_texture.png`,
};

// Helper to get GLTF props URLs (for props that use .gltf + .bin)
export const getGltfUrl = (name: string) => `${GITHUB_RAW_BASE}/assets/${name}.gltf`;

// Local requires (only works in dev builds, NOT Expo Go)
export const localModels = {
  rogue: require('../assets/characters/Rogue.glb'),
  knight: require('../assets/characters/Knight.glb'),
  barbarian: require('../assets/characters/Barbarian.glb'),
  mage: require('../assets/characters/Mage.glb'),
  ranger: require('../assets/characters/Ranger.glb'),
};

// Use remote by default for Expo Go compatibility
export const models = remoteModels;
export const textures = remoteTextures;
