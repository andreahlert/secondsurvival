import { Directory, File, Paths } from 'expo-file-system';
import { loadAsync, loadTextureAsync } from 'expo-three';
import { MeshStandardMaterial, Mesh } from 'three';

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

export async function loadGLBFromUrl(
  url: string,
  textureUrl?: string
): Promise<any> {
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

    // Load model from local cache
    const model = await loadAsync(localFile.uri);

    // If texture URL provided, load and apply it
    if (textureUrl && model.scene) {
      try {
        console.log(`Loading texture from: ${textureUrl}`);
        const texture = await loadTextureAsync({ asset: textureUrl });

        model.scene.traverse((child: any) => {
          if (child instanceof Mesh && child.material) {
            if (child.material instanceof MeshStandardMaterial) {
              child.material.map = texture;
              child.material.needsUpdate = true;
            } else if (Array.isArray(child.material)) {
              child.material.forEach((mat: any) => {
                if (mat instanceof MeshStandardMaterial) {
                  mat.map = texture;
                  mat.needsUpdate = true;
                }
              });
            }
          }
        });
        console.log('Texture applied successfully');
      } catch (texError) {
        console.warn('Failed to load texture:', texError);
      }
    }

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
