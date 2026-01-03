import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import {
  Scene,
  PerspectiveCamera,
  AmbientLight,
  DirectionalLight,
  BoxGeometry,
  MeshStandardMaterial,
  Mesh,
  PlaneGeometry,
  Color,
  Group,
} from 'three';
import { models, textures } from '../assets';
import { loadGLBFromUrl } from '../utils/glbLoader';

export type TavernSceneRef = {
  setJoystickInput: (x: number, y: number) => void;
};

type TavernSceneProps = {};

const TavernScene = forwardRef<TavernSceneRef, TavernSceneProps>((_, ref) => {
  const timeoutRef = useRef<number | null>(null);
  const joystickInputRef = useRef({ x: 0, y: 0 });
  const cameraPositionRef = useRef({ x: 0, z: 8 });

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
    // Create renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    renderer.setClearColor(new Color('#1a1210'));

    // Create scene
    const scene = new Scene();
    scene.background = new Color('#1a1210');

    // Create camera
    const camera = new PerspectiveCamera(
      60,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    camera.position.set(0, 4, 8);
    camera.lookAt(0, 1, 0);

    // Add lights
    const ambientLight = new AmbientLight(0xffd4a6, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Warm point light (simulating fireplace)
    const warmLight = new DirectionalLight(0xff6600, 0.4);
    warmLight.position.set(-3, 2, 0);
    scene.add(warmLight);

    // Create floor (wooden tavern floor)
    const floorGeometry = new PlaneGeometry(12, 12);
    const floorMaterial = new MeshStandardMaterial({
      color: 0x4a3728,
      roughness: 0.8,
    });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    // Create bar counter
    const counterGeometry = new BoxGeometry(4, 1.2, 1);
    const counterMaterial = new MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.6,
    });
    const counter = new Mesh(counterGeometry, counterMaterial);
    counter.position.set(0, 0.6, -4);
    scene.add(counter);

    // Create counter top
    const counterTopGeometry = new BoxGeometry(4.2, 0.1, 1.2);
    const counterTopMaterial = new MeshStandardMaterial({
      color: 0x3d2817,
      roughness: 0.4,
    });
    const counterTop = new Mesh(counterTopGeometry, counterTopMaterial);
    counterTop.position.set(0, 1.25, -4);
    scene.add(counterTop);

    // Create barrels
    const barrelGeometry = new BoxGeometry(0.8, 1.2, 0.8);
    const barrelMaterial = new MeshStandardMaterial({
      color: 0x6b4423,
      roughness: 0.7,
    });

    const barrel1 = new Mesh(barrelGeometry, barrelMaterial);
    barrel1.position.set(-4, 0.6, -3);
    scene.add(barrel1);

    const barrel2 = new Mesh(barrelGeometry, barrelMaterial);
    barrel2.position.set(-4, 0.6, -1.5);
    scene.add(barrel2);

    // Create tables
    const tableTopGeometry = new BoxGeometry(1.5, 0.1, 1.5);
    const tableMaterial = new MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.6,
    });

    // Table 1
    const tableTop1 = new Mesh(tableTopGeometry, tableMaterial);
    tableTop1.position.set(2, 0.8, 1);
    scene.add(tableTop1);

    const legGeometry = new BoxGeometry(0.1, 0.8, 0.1);
    const leg1 = new Mesh(legGeometry, tableMaterial);
    leg1.position.set(2, 0.4, 1);
    scene.add(leg1);

    // Table 2
    const tableTop2 = new Mesh(tableTopGeometry, tableMaterial);
    tableTop2.position.set(-2, 0.8, 2);
    scene.add(tableTop2);

    const leg2 = new Mesh(legGeometry, tableMaterial);
    leg2.position.set(-2, 0.4, 2);
    scene.add(leg2);

    // Create chairs
    const chairSeatGeometry = new BoxGeometry(0.5, 0.05, 0.5);
    const chairMaterial = new MeshStandardMaterial({
      color: 0x4a3728,
      roughness: 0.7,
    });

    const chair1 = new Mesh(chairSeatGeometry, chairMaterial);
    chair1.position.set(2, 0.5, 2.2);
    scene.add(chair1);

    const chair2 = new Mesh(chairSeatGeometry, chairMaterial);
    chair2.position.set(-2, 0.5, 3.2);
    scene.add(chair2);

    // Back wall
    const wallGeometry = new BoxGeometry(12, 4, 0.2);
    const wallMaterial = new MeshStandardMaterial({
      color: 0x3d2e24,
      roughness: 0.9,
    });

    const backWall = new Mesh(wallGeometry, wallMaterial);
    backWall.position.set(0, 2, -6);
    scene.add(backWall);

    // Side walls
    const sideWallGeometry = new BoxGeometry(0.2, 4, 12);

    const leftWall = new Mesh(sideWallGeometry, wallMaterial);
    leftWall.position.set(-6, 2, 0);
    scene.add(leftWall);

    const rightWall = new Mesh(sideWallGeometry, wallMaterial);
    rightWall.position.set(6, 2, 0);
    scene.add(rightWall);

    // Create a simple character placeholder (will be replaced with GLB)
    const characterGroup = new Group();
    
    // Body
    const bodyGeometry = new BoxGeometry(0.6, 1, 0.4);
    const bodyMaterial = new MeshStandardMaterial({ color: 0x8B4513 });
    const body = new Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    characterGroup.add(body);

    // Head
    const headGeometry = new BoxGeometry(0.4, 0.4, 0.4);
    const headMaterial = new MeshStandardMaterial({ color: 0xFFDBAC });
    const head = new Mesh(headGeometry, headMaterial);
    head.position.y = 1.7;
    characterGroup.add(head);

    // Position character behind counter (tavernkeeper)
    characterGroup.position.set(0, 0, -3.5);
    scene.add(characterGroup);

    // Try to load Knight model from remote URL (downloads to cache first)
    try {
      console.log('Loading Knight from:', models.knight);
      const model = await loadGLBFromUrl(models.knight, textures.knight);
      if (model.scene) {
        model.scene.scale.set(1, 1, 1);
        model.scene.position.set(2, 0, 1.5);
        model.scene.rotation.y = Math.PI;
        scene.add(model.scene);
      }
    } catch (error) {
      console.log('Could not load Knight model, using placeholder');
    }

    // Animation loop
    const animate = () => {
      timeoutRef.current = requestAnimationFrame(animate);

      // Apply joystick input to camera
      const speed = 0.1;
      const input = joystickInputRef.current;
      
      cameraPositionRef.current.x += input.x * speed;
      cameraPositionRef.current.z -= input.y * speed;

      // Clamp camera position
      cameraPositionRef.current.x = Math.max(-4, Math.min(4, cameraPositionRef.current.x));
      cameraPositionRef.current.z = Math.max(2, Math.min(10, cameraPositionRef.current.z));

      camera.position.x = cameraPositionRef.current.x;
      camera.position.z = cameraPositionRef.current.z;
      camera.lookAt(cameraPositionRef.current.x, 1, -2);

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

export default TavernScene;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  glView: {
    flex: 1,
  },
});
