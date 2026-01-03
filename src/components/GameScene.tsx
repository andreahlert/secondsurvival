import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  MeshStandardMaterial,
  Mesh,
  PlaneGeometry,
  Color,
  CylinderGeometry,
  SphereGeometry,
  Group,
} from 'three';
import { models, textures } from '../assets';
import { loadGLBFromUrl } from '../utils/glbLoader';

export type GameSceneRef = {
  setJoystickInput: (x: number, y: number) => void;
};

const GameScene = forwardRef<GameSceneRef, {}>((_, ref) => {
  const timeoutRef = useRef<number | null>(null);
  const joystickInputRef = useRef({ x: 0, y: 0 });
  const playerPositionRef = useRef({ x: 0, z: 0 });
  const playerRotationRef = useRef(0);

  useImperativeHandle(ref, () => ({
    setJoystickInput: (x: number, y: number) => {
      joystickInputRef.current = { x, y };
    },
  }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        cancelAnimationFrame(timeoutRef.current);
      }
    };
  }, []);

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(new Color('#87CEEB'));

    const scene = new Scene();
    scene.background = new Color('#87CEEB');

    const camera = new PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 12, 8);
    camera.lookAt(0, 0, 0);

    // Lights
    const ambientLight = new AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const sunLight = new DirectionalLight(0xffffff, 1);
    sunLight.position.set(10, 20, 10);
    scene.add(sunLight);

    const backLight = new DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-5, 5, -10);
    scene.add(backLight);

    // Ground
    const ground = new Mesh(
      new PlaneGeometry(50, 50),
      new MeshStandardMaterial({ color: 0x4a7c23, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Player container
    const player = new Group();
    scene.add(player);

    // Load Rogue model from remote URL (downloads to cache first)
    try {
      console.log('Loading model from:', models.rogue);
      const model = await loadGLBFromUrl(models.rogue, textures.rogue);

      if (model.scene) {
        model.scene.scale.set(1.2, 1.2, 1.2);
        model.scene.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        player.add(model.scene);
        console.log('Rogue model loaded!');
      }
    } catch (error) {
      console.log('Error loading Rogue:', error);
      // Fallback - stylized rogue
      const body = new Mesh(
        new CylinderGeometry(0.3, 0.5, 1.4, 8),
        new MeshStandardMaterial({ color: 0x2a2a35 })
      );
      body.position.y = 0.9;
      player.add(body);

      const head = new Mesh(
        new SphereGeometry(0.28, 12, 12),
        new MeshStandardMaterial({ color: 0xffdbac })
      );
      head.position.y = 1.85;
      player.add(head);
    }

    // Trees
    const treePositions = [
      { x: 5, z: 5 }, { x: -6, z: 3 }, { x: 4, z: -7 },
      { x: -5, z: -5 }, { x: 8, z: -2 }, { x: -8, z: 7 },
    ];

    treePositions.forEach(pos => {
      const tree = new Group();
      const trunk = new Mesh(
        new CylinderGeometry(0.2, 0.3, 2, 6),
        new MeshStandardMaterial({ color: 0x4a3520 })
      );
      trunk.position.y = 1;
      tree.add(trunk);
      
      const leaves = new Mesh(
        new SphereGeometry(1.2, 8, 8),
        new MeshStandardMaterial({ color: 0x2d5a1d })
      );
      leaves.position.y = 2.8;
      tree.add(leaves);
      
      tree.position.set(pos.x, 0, pos.z);
      scene.add(tree);
    });

    // Animation
    const animate = () => {
      timeoutRef.current = requestAnimationFrame(animate);

      const input = joystickInputRef.current;
      const speed = 0.15;

      if (input.x !== 0 || input.y !== 0) {
        playerPositionRef.current.x += input.x * speed;
        playerPositionRef.current.z -= input.y * speed;
        playerRotationRef.current = Math.atan2(input.x, input.y);
      }

      playerPositionRef.current.x = Math.max(-20, Math.min(20, playerPositionRef.current.x));
      playerPositionRef.current.z = Math.max(-20, Math.min(20, playerPositionRef.current.z));

      player.position.x = playerPositionRef.current.x;
      player.position.z = playerPositionRef.current.z;
      player.rotation.y = playerRotationRef.current;

      camera.position.x = playerPositionRef.current.x;
      camera.position.z = playerPositionRef.current.z + 8;
      camera.lookAt(playerPositionRef.current.x, 0, playerPositionRef.current.z);

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    animate();
  };

  return (
    <View style={styles.container}>
      <GLView style={styles.glView} onContextCreate={onContextCreate} />
    </View>
  );
});

export default GameScene;

const styles = StyleSheet.create({
  container: { flex: 1 },
  glView: { flex: 1 },
});
