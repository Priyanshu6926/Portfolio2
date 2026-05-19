'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue, AnimatePresence, useSpring } from 'framer-motion';

const FRAME_COUNT = 120; // 0 to 119

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRequestRef = useRef<number | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isHeroReady, setIsHeroReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loadedCount = 0;

    const markFrameReady = (index: number) => {
      loadedCount++;
      setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
      if (index === 0 || loadedCount >= 8) setIsHeroReady(true);
    };

    const loadFrame = (index: number) => {
      const img = new Image();
      const frameNum = String(index).padStart(3, '0');
      img.decoding = 'async';
      img.src = `/sequence/frame_${frameNum}_delay-0.066s.png`;
      img.onload = () => markFrameReady(index);
      img.onerror = () => markFrameReady(index);
      loadedImages[index] = img;
    };

    loadFrame(0);
    setImages(loadedImages);

    const loadRemainingFrames = () => {
      for (let i = 1; i < FRAME_COUNT; i++) loadFrame(i);
    };

    const canLoadWhenIdle = typeof window.requestIdleCallback === 'function';
    const idleCallback = canLoadWhenIdle ? window.requestIdleCallback(loadRemainingFrames, { timeout: 1200 }) : undefined;
    const timeout = canLoadWhenIdle ? undefined : window.setTimeout(loadRemainingFrames, 250);
    const heroFallback = window.setTimeout(() => setIsHeroReady(true), 3500);

    return () => {
      if (idleCallback) window.cancelIdleCallback?.(idleCallback);
      if (timeout) window.clearTimeout(timeout);
      window.clearTimeout(heroFallback);
    };
  }, []);

  const renderFrame = useCallback((index: number) => {
    if (images.length === 0 || !canvasRef.current || !images[index]) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = images[index];
    let fallbackIndex = index;

    while ((!img || !img.complete || img.naturalWidth === 0) && fallbackIndex > 0) {
      fallbackIndex--;
      img = images[fallbackIndex];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    // object-fit: cover logic
    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, [images]);

  useMotionValueEvent(frameIndex, 'change', (latest) => {
    if (frameRequestRef.current) cancelAnimationFrame(frameRequestRef.current);
    frameRequestRef.current = requestAnimationFrame(() => renderFrame(Math.round(latest)));
  });

  useEffect(() => {
    return () => {
      if (frameRequestRef.current) cancelAnimationFrame(frameRequestRef.current);
    };
  }, []);

  useEffect(() => {
    if (images.length > 0 && canvasRef.current) {
      renderFrame(0);
    }
  }, [images, renderFrame]);

  useEffect(() => {
    if (images.length > 0 && canvasRef.current) {
      renderFrame(Math.round(frameIndex.get()));
    }
  }, [progress, images, frameIndex, renderFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && window) {
        // High DPI canvas support
        canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
        canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
        renderFrame(Math.round(frameIndex.get()));
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex, renderFrame]);

  return (
    <>
      <AnimatePresence>
        {!isHeroReady && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Letter-by-letter name reveal */}
            <div className="relative z-10 flex flex-col items-center gap-4 px-4 text-center">
              <motion.div
                className="flex flex-wrap justify-center"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.1 } },
                  hidden: {},
                }}
              >
                {"PRIYANSHU SHINGOLE".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
                      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
                    }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className={`text-4xl sm:text-5xl md:text-7xl font-black tracking-tight ${char === " " ? "w-4 md:w-8" : ""
                      }`}
                    style={{
                      background: "linear-gradient(135deg, #fff 40%, #a78bfa 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.7, ease: "easeOut" }}
                className="text-gray-500 text-sm sm:text-base tracking-[0.22em] uppercase font-medium"
              >
                Third-Year B.Tech IT Student | Full-Stack Developer
              </motion.p>
            </div>

            {/* Progress bar at bottom */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Loading percentage - subtle, bottom right */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 right-6 text-xs text-white/20 font-mono tracking-widest"
            >
              {progress}%
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} id="home" className="relative h-[450vh] bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-0 object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
          <Overlay progress={scrollYProgress} />
        </div>
      </div>
    </>
  );
}

function Overlay({ progress }: { progress: MotionValue<number> }) {
  const smoothProgress = useSpring(progress, {
    stiffness: 70,
    damping: 24,
    mass: 0.35,
  });

  // Text 1: Primary Intro (Center)
  const opacity1 = useTransform(smoothProgress, [0, 0.13, 0.2], [0.88, 0.88, 0]);
  const y1 = useTransform(smoothProgress, [0, 0.2], [0, -70]);
  const scale1 = useTransform(smoothProgress, [0, 0.2], [1, 0.9]);
  const blur1 = useTransform(smoothProgress, [0.13, 0.2], ["blur(0px)", "blur(6px)"]);

  // Text 2: Focus 1 (Left)
  const opacity2 = useTransform(smoothProgress, [0.2, 0.27, 0.38, 0.44], [0, 1, 1, 0]);
  const x2 = useTransform(smoothProgress, [0.2, 0.27, 0.44], [-36, 0, 32]);
  const scale2 = useTransform(smoothProgress, [0.2, 0.27, 0.44], [0.94, 1, 1.03]);
  const blur2 = useTransform(smoothProgress, [0.2, 0.27, 0.38, 0.44], ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);

  // Text 3: Focus 2 (Right)
  const opacity3 = useTransform(smoothProgress, [0.43, 0.5, 0.61, 0.67], [0, 1, 1, 0]);
  const x3 = useTransform(smoothProgress, [0.43, 0.5, 0.67], [36, 0, -32]);
  const scale3 = useTransform(smoothProgress, [0.43, 0.5, 0.67], [0.94, 1, 1.03]);
  const blur3 = useTransform(smoothProgress, [0.43, 0.5, 0.61, 0.67], ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);

  // Text 4: Focus 3 (Left-Center)
  const opacity4 = useTransform(smoothProgress, [0.67, 0.74, 0.86, 0.93], [0, 1, 1, 0]);
  const y4 = useTransform(smoothProgress, [0.67, 0.74, 0.93], [32, 0, -32]);
  const scale4 = useTransform(smoothProgress, [0.67, 0.74, 0.93], [0.95, 1, 0.96]);
  const blur4 = useTransform(smoothProgress, [0.67, 0.74, 0.86, 0.93], ["blur(6px)", "blur(0px)", "blur(0px)", "blur(6px)"]);

  // Text 5: Final Call to Action (Right-Center)
  const opacity5 = useTransform(smoothProgress, [0.9, 0.95, 1], [0, 1, 1]);
  const x5 = useTransform(smoothProgress, [0.9, 0.95], [48, 0]);
  const scale5 = useTransform(smoothProgress, [0.9, 0.95, 1], [1.05, 1, 0.98]);
  const blur5 = useTransform(smoothProgress, [0.9, 0.95], ["blur(6px)", "blur(0px)"]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-10 flex flex-col justify-center px-6">
      <div className="container mx-auto relative h-full flex flex-col justify-center overflow-hidden">

        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1, scale: scale1, filter: blur1 }}
          className="absolute inset-x-0 top-[50%] sm:top-[52%] text-center text-white"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter mb-4 italic text-white/85 drop-shadow-[0_8px_28px_rgba(0,0,0,0.75)]">
            PRIYANSHU SHINGOLE
          </h1>
          <p className="text-base sm:text-xl md:text-3xl font-light tracking-[0.22em] text-white/55 uppercase">
            Full-Stack Developer | Open to Internships
          </p>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, x: x2, scale: scale2, filter: blur2 }}
          className="absolute left-4 md:left-24 top-[40%] text-white"
        >
          <p className="text-cyan-400 font-mono text-sm mb-4 tracking-widest uppercase">What I Build</p>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter max-w-2xl drop-shadow-2xl">
            Interfaces <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">people can use.</span>
          </h2>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, x: x3, scale: scale3, filter: blur3 }}
          className="absolute right-4 md:right-24 top-[40%] text-right text-white"
        >
          <p className="text-indigo-400 font-mono text-sm mb-4 tracking-widest uppercase">How I Learn</p>
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-bold tracking-tighter max-w-2xl ml-auto drop-shadow-2xl">
            Turning ideas <br />
            <span className="text-white">into shipped work.</span>
          </h2>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          style={{ opacity: opacity4, y: y4, scale: scale4, filter: blur4 }}
          className="absolute left-4 md:left-32 top-[55%] text-white"
        >
          <p className="text-white/40 font-mono text-sm mb-2 tracking-widest uppercase">Current Stack</p>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter max-w-xl">
            React. <br />
            Node. <br />
            Firebase.
          </h2>
        </motion.div>

        {/* Section 5 */}
        <motion.div
          style={{ opacity: opacity5, x: x5, scale: scale5, filter: blur5 }}
          className="absolute right-4 md:right-32 top-[50%] text-right text-white"
        >
          <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black tracking-tighter drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10 leading-[0.8] mb-8">
            INTERN <br />
            READY.
          </h2>
          <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Available for software development internship roles.</p>
        </motion.div>

      </div>
    </div>
  );
}
