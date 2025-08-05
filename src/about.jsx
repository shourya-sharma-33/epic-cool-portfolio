import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import RepresentationOfProjects from "./components/representationOfProjects";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textsRef = useRef([]);
  const panelRefs = useRef([]);
  const paraRefs = useRef([]);

  useEffect(() => {
    // Setup Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);

    // GSAP Animations
    const ctx = gsap.context(() => {
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=20000", // increased scroll length for slower scroll
          scrub: true,
          pin: true,
        },
      });

      textsRef.current.forEach((textEl, index) => {
        const panel = panelRefs.current[index];
        const para = paraRefs.current[index];

        gsap.set(panel, { opacity: 0 });
        gsap.set(para, { opacity: 0 });

        const nestedDivs = panel.querySelectorAll("div > div > div");
        gsap.set(nestedDivs, { opacity: 0 });

        const sectionTL = gsap.timeline();

        sectionTL
          .to(textEl, {
            color: "white",
            fontSize: "10rem",
            duration: 2,
          })
          .to(
            panel,
            {
              opacity: 1,
              duration: 1,
              onStart: () => {
                panel?.classList.remove("hidden");
                para?.classList.remove("hidden");
              },
            },
            "<"
          )
          .to(
            para,
            {
              opacity: 1,
              duration: 1.5,
            },
            "<"
          )
          .to(
            nestedDivs,
            {
              opacity: 1,
              stagger: 0.4,
              duration: 1.5,
            },
            "-=0.2"
          )
          .to(
            textEl,
            {
              color: "rgba(255,255,255,0.3)",
              fontSize: "5rem",
              duration: 2,
            },
            "+=0.5"
          );

        masterTL.add(sectionTL);
      });
    }, containerRef);

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[100vh] w-full overflow-hidden relative about"
    >
      <div className="w-[95%] mx-auto py-16 h-[100vh] grid grid-cols-2 gap-4 items-center">
        <div className="flex flex-col gap-6 jersey-25-regular text-[10rem] text-transparent bg-gradient-to-b from-white/30 to-transparent bg-clip-text">
          {["I make mordern design", "Blue", "Green", "Red"].map((label, index) => (
            <span
              key={index}
              ref={(el) => (textsRef.current[index] = el)}
              className="transition-all duration-300 ease-in-out relative"
            >
              {label}
              <p
                className="text-3xl hidden duration-300"
                ref={(el) => (paraRefs.current[index] = el)}
              >
                meowmeowmeowmeowmeowmeowmeow
              </p>
            </span>
          ))}
        </div>

        <div className="relative w-full h-[90vh]">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              ref={(el) => (panelRefs.current[index] = el)}
              className="absolute top-0 left-0 w-full h-full hidden opacity-0 flex justify-center items-center"
            >
              <div className="text-white text-3xl jersey-25-regular">
                <div className={`${index === 0 ? "" : "hidden"} bg-black text-9xl`}>
                  <RepresentationOfProjects
                    img={<img src="./assets/project1.png" alt="Project 1" />}
                    head={<h2 className="text-xl font-bold">Project One</h2>}
                    para={<p>This is a description of project one.</p>}
                  />
                  <div>div1.2</div>
                  <div>div1.3</div>
                </div>
                <div className={`${index === 1 ? "" : "hidden"} bg-black text-9xl`}>
                  <div>div2.1</div>
                  <div>div2.2</div>
                  <div>div2.3</div>
                </div>
                <div className={`${index === 2 ? "" : "hidden"} bg-black text-9xl`}>
                  <div>div3.1</div>
                  <div>div3.2</div>
                  <div>div3.3</div>
                </div>
                <div className={`${index === 3 ? "" : "hidden"} bg-black text-9xl`}>
                  <div>div4.1</div>
                  <div>div4.2</div>
                  <div>div4.3</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
