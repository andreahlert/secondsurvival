import { Directory, File, Paths } from 'expo-file-system';
import { loadAsync } from 'expo-three';

const GLB_CACHE_DIR = new Directory(Paths.cache, 'glb-models');

async function ensureCacheDir() {
  if (!GLB_CACHE_DIR.exists) {
    GLB_CACHE_DIR.create();
  }
}

function getFilenameFromUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

export async function loadGLBFromUrl(url: string): Promise<any> {
  try {
    await ensureCacheDir();

    const filename = getFilenameFromUrl(url);
    const localFile = new File(GLB_CACHE_DIR, filename);

    if (!localFile.exists) {
      console.log(`Downloading GLB: ${filename}`);
      await File.downloadFileAsync(url, GLB_CACHE_DIR);
      console.log(`Downloaded to cache`);
    } else {
      console.log(`Using cached GLB: ${filename}`);
    }

    // Load from local cache
    const model = await loadAsync(localFile.uri);
    return model;
  } catch (error) {
    console.error('Error loading GLB:', error);
    throw error;
  }
}

export async function clearGLBCache(): Promise<void> {
  try {
    if (GLB_CACHE_DIR.exists) {
      GLB_CACHE_DIR.delete();
      console.log('GLB cache cleared');
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
}
