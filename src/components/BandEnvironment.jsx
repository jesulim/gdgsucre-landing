import { useEffect, useRef, useState } from 'react';
import { CanvasTexture, Vector3, CatmullRomCurve3, RepeatWrapping } from 'three';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

// path card 3d model
const GLTF_PATH = '/assets/kartu.glb';

// path to lanyard texture
const TEXTURE_PATH = '/assets/bandd.png';

// adjust to change the cards appearance
const TEXTURE_CONFIG = {
  WIDTH: 256, // width of each half
  HEIGHT: 384  // height of each half
};

// function to combine two images into a single texture
async function combineTextures(frontImagePath, backImagePath, personName, personImage, role) {
  console.log('Combining textures with:', { frontImagePath, backImagePath, personName, personImage, role });
  
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      console.log('Loading image from:', src);
      
      // check if its an SVG
      const isSvg = src.toLowerCase().endsWith('.svg');
      
      if (isSvg) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          console.log('SVG loaded successfully:', src);
          resolve(img);
        };
        
        img.onerror = (err) => {
          console.error('Error loading SVG:', src, err);
          reject(new Error(`Failed to load SVG: ${src}`));
        };
        
        // load the SVG
        fetch(src)
          .then(response => response.text())
          .then(svgText => {
            // create data URL from SVG text
            const svgBlob = new Blob([svgText], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(svgBlob);
            img.src = url;
          })
          .catch(err => {
            console.error('Error fetching SVG:', src, err);
            reject(err);
          });
      } else {
        // regular image
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = () => {
          console.log('Image loaded successfully:', src);
          resolve(img);
        };
        
        img.onerror = (err) => {
          console.error('Error loading image:', src, err);
          reject(new Error(`Failed to load image: ${src}`));
        };
        
        img.src = src;
      }
    });
  };

  try {
    console.log('Starting to load images...');
    const [frontImg, backImg, personImg] = await Promise.all([
      loadImage(frontImagePath).catch(err => {
        console.error('Failed to load front image:', err);
        return null;
      }),
      loadImage(backImagePath).catch(err => {
        console.error('Failed to load back image:', err);
        return null;
      }),
      personImage ? loadImage(personImage).catch(err => {
        console.error('Failed to load person image:', err);
        return null;
      }) : null
    ]);

    if (!frontImg || !backImg) {
      console.error('Critical images failed to load:', { frontImg, backImg });
      return null;
    }

    console.log('All images loaded, creating texture...');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the back of the card (izquierda)
    ctx.drawImage(backImg, 0, 0, TEXTURE_CONFIG.WIDTH, TEXTURE_CONFIG.HEIGHT);

    // draw the front of the card (derecha)
    ctx.drawImage(frontImg, TEXTURE_CONFIG.WIDTH, 0, TEXTURE_CONFIG.WIDTH, TEXTURE_CONFIG.HEIGHT);

    if (personImg) {
      // draw profile image in a circle
      const imageSize = 120;
      const x = 384;
      const y = 90;
      
      // colored border for profile
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, imageSize/2 + 3, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = '#E4C472';
      ctx.fill();
      ctx.restore();
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, imageSize/2, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.clip();

      ctx.drawImage(personImg, x - imageSize/2, y - imageSize/2, imageSize, imageSize);
      ctx.restore();
    }

    if (personName) {
      // name text 
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 28px Arial';
      ctx.fillText(personName, 384, 175, 200);
      
      // role text
      if (role) {
        ctx.font = 'bold 16px Arial'; // Smaller font for role
        ctx.fillText(role, 384, 210, 200);
      }
    }
    
    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  } catch (error) {
    console.error('Error loading images:', error);
    return null;
  }
}

const CARD_TEXTURES = {
  // can be PNG, JPG, or SVG 
  front: '/assets/front.png', // should be 256x384
  back: '/assets/back.png'    // should be 256x384
};

// preloaders
useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);

// actual card and lanyard
function Lanyard({ maxSpeed = 50, minSpeed = 10, personName, personImage, role, cardTextures }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  
  const vec = new Vector3();
  const ang = new Vector3();
  const rot = new Vector3();
  const dir = new Vector3();
  
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(GLTF_PATH);
  const texture = useTexture(TEXTURE_PATH);
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(() => new CatmullRomCurve3([new Vector3(), new Vector3(), new Vector3(), new Vector3()]));
  const [cardTexture, setCardTexture] = useState(null);
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    const frontTexture = cardTextures?.front || CARD_TEXTURES.front;
    const backTexture = cardTextures?.back || CARD_TEXTURES.back;
    
    combineTextures(frontTexture, backTexture, personName, personImage, role)
      .then(texture => {
        if (texture) {
          texture.flipY = false;
          texture.needsUpdate = true;
          setCardTexture(texture);
        } else {
          console.warn('Failed to create combined texture, using fallback');
          // fallback texture
          new TextureLoader().load(CARD_TEXTURES.front, (tex) => {
            tex.flipY = false;
            tex.needsUpdate = true;
            setCardTexture(tex);
          });
        }
      })
      .catch(error => {
        console.error('Error in texture creation:', error);
        // fallback texture
        new TextureLoader().load(CARD_TEXTURES.front, (tex) => {
          tex.flipY = false;
          tex.needsUpdate = true;
          setCardTexture(tex);
        });
      });
  }, [personName, personImage, role, cardTextures]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            rotation={[0, Math.PI, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={(e) => (e.target.setPointerCapture(e.pointerId), drag(new Vector3().copy(e.point).sub(vec.copy(card.current.translation()))))}>
            <mesh geometry={nodes.card.geometry}>
              {cardTexture && (
                <meshPhysicalMaterial 
                  map={cardTexture} 
                  map-anisotropy={16} 
                  clearcoat={1} 
                  clearcoatRoughness={0.15} 
                  roughness={0.3} 
                  metalness={0.5} 
                />
              )}
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={texture} repeat={[-4, 1]} lineWidth={1} />
      </mesh>
    </>
  );
}

// card enviroment
export default function BandEnvironment({ userName, email, role, picture, cardTextures }) {
  const personName = userName;
  const personImage = picture ? `https://unavatar.io/${email}?fallback=${picture}` : null;

  return (
    <div className="relative responsive-wrapper" style={{ width: '100%', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 13], fov: 25 }}>
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Lanyard 
            personName={personName} 
            personImage={personImage}
            email={email}
            role={role || 'Participante'} 
            cardTextures={cardTextures}
          />
        </Physics>
        <Environment background blur={0.75}>
          {/* transparent background looks kinda ugly, TODO: try different colors */}
          <color attach="background" args={['#202124']} />
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
} 