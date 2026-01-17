import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Array of achievement objects - EDIT YOUR ACHIEVEMENTS HERE
const achievements = [
  {
    title: "🏆 Hackathon Winner",
    organization: "WE PITCH 1.0",
    date: "2025",
    description: "Co-developed an innovative temperature-controlled mattress solution and Secured patent support and early-stage funding through Creiya",
  
  },

  {
    title: "Hackathon Winner",
    organization: "Shodh 1.0 Campus",
    date: "2025",
    description: "Developed a real-time canteen management platform with digital payments and inventory tracking",
  },
  
];

// Reusable component to render each achievement item with animations
function AchievementItem({ achievement, idx, start, end, scrollYProgress, layout }) {
  const markerScale = useTransform(scrollYProgress, [start, end], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const cardOpacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  const isAbove = idx % 2 === 0;
  const cardY = useTransform(scrollYProgress, [start, end], [isAbove ? 30 : -30, 0]);
  const cardX = useTransform(scrollYProgress, [start, end], [-24, 0]);

  // Render for Desktop layout
  if (layout === "desktop") {
    return (
      <div className="relative flex-1 flex justify-center items-center min-w-0" key={`${achievement.title}-${idx}`}>
        <motion.div
          className="z-10 w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_0_8px_rgba(251,191,36,0.3)]"
          style={{ scale: markerScale, opacity: markerOpacity }}
        />
        <motion.div
          className={`absolute ${isAbove ? "-top-8" : "-bottom-8"} w-[3px] bg-yellow-400/40`}
          style={{ height: 40, opacity: cardOpacity }}
        />
        <motion.article
          className={`absolute ${isAbove ? "bottom-12" : "top-12"} bg-gray-900/80 backdrop-blur border border-yellow-500/30 rounded-xl p-7 w-[320px] shadow-lg hover:border-yellow-500/60 transition-colors duration-300`}
          style={{ opacity: cardOpacity, y: cardY, maxWidth: "90vw" }}
          transition={{ duration: 0.4, delay: idx * 0.15 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{achievement.title.split(" ")[0]}</span>
            <h3 className="text-lg font-semibold text-yellow-400">{achievement.title.replace(/^[^\s]+(\s[^\s]+)?/, "").trim()}</h3>
          </div>
          <p className="text-sm text-gray-400 mb-2">{achievement.organization} | {achievement.date}</p>
          <p className="text-sm text-gray-300 break-words">{achievement.description}</p>
        </motion.article>
      </div>
    );
  }

  // Render for Mobile layout
  return (
    <div key={`${achievement.title}-${idx}-m`} className="relative flex items-start">
      <motion.div
        className="absolute -left-[14px] top-3 z-10 w-7 h-7 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_0_8px_rgba(251,191,36,0.3)]"
        style={{ scale: markerScale, opacity: markerOpacity }}
      />
      <motion.article
        className="bg-gray-900/80 backdrop-blur border border-yellow-500/30 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg hover:border-yellow-500/60 transition-colors duration-300"
        style={{ opacity: cardOpacity, x: cardX }}
        transition={{ duration: 0.4, delay: idx * 0.15 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{achievement.title.split(" ")[0]}</span>
          <h3 className="text-lg font-semibold text-yellow-400">{achievement.title.replace(/^[^\s]+(\s[^\s]+)?/, "").trim()}</h3>
        </div>
        <p className="text-sm text-gray-400 mb-2 break-words">{achievement.organization} | {achievement.date}</p>
        <p className="text-sm text-gray-300 break-words">{achievement.description}</p>
      </motion.article>
    </div>
  );
}

// Main Achievements component
const Achievements = () => {
  const sceneRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 100 * achievements.length * 1.6 : 100 * achievements.length * 1.2;

  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });

  const numAchievements = achievements.length;
  const thresholds = React.useMemo(
    () => Array.from({ length: numAchievements }, (_, i) => (i + 1) / numAchievements),
    [numAchievements]
  );

  const lineWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const lineHeight = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <section id="achievements" className="relative bg-black text-white">
      <div ref={sceneRef} style={{ height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh" }} className="relative">
        <div className="sticky top-0 h-screen flex flex-col">
          <div className="shrink-0 px-6 pt-8">
            <motion.h2 
              className="text-4xl sm:text-5xl font-semibold mt-5 text-center"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Achievements
            </motion.h2>
            <motion.p 
              className="text-center text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Milestones & Recognitions
            </motion.p>
          </div>
          
          <div className="flex-1 flex items-center justify-center px-6 pb-10">
            {/* Desktop Timeline */}
            <div className="relative w-full max-w-7xl hidden md:block">
              <div className="relative h-[6px] bg-yellow-400/15 rounded">
                <motion.div 
                  className="absolute left-0 top-0 h-[6px] bg-gradient-to-r from-yellow-400 to-orange-500 rounded origin-left" 
                  style={{ width: lineWidth }} 
                />
              </div>
              <div className="relative flex justify-between mt-0">
                {achievements.map((achievement, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <AchievementItem
                      key={`${achievement.title}-${idx}`}
                      achievement={achievement}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="desktop"
                    />
                  );
                })}
              </div>
            </div>
            
            {/* Mobile Timeline */}
            <div className="relative w-full max-w-md md:hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-yellow-400/15 rounded">
                <motion.div className="absolute top-0 left-0 w-[6px] bg-gradient-to-b from-yellow-400 to-orange-500 rounded origin-top" style={{ height: lineHeight }} />
              </div>
              <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                {achievements.map((achievement, idx) => {
                  const start = idx === 0 ? 0 : thresholds[idx - 1];
                  const end = thresholds[idx];
                  return (
                    <AchievementItem
                      key={`${achievement.title}-${idx}-m`}
                      achievement={achievement}
                      idx={idx}
                      start={start}
                      end={end}
                      scrollYProgress={scrollYProgress}
                      layout="mobile"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;

