const headingSelector =
  "h1, h2, h3, .section-heading-ltr, .heading-ltr, .animate-heading-side, .start-a-project-section, .scroll-reveal-left";
const lineSelector = ".section-line-expand";
const cardSelector =
  ".box-scroll-reveal, .card-hover-elevate, .scroll-reveal-scale, [data-card], .scroll-counter";

/**
 * Enhanced bidirectional website motion engine:
 * - Content is ALWAYS 100% visible and readable by default (zero missing text, zero hydration issues).
 * - Uses native Web Animations API so DOM attributes (class/style) are never mutated,
 *   completely preventing React SSR hydration mismatches.
 * - Triggers smooth Left-to-Right sweep on headings & START A PROJECT section whenever scrolled into view.
 * - Replays smoothly in both directions: scrolling down (top to bottom) or up (bottom to top).
 * - Accompanying 2-color brand line expands horizontally left to right.
 * - Cards and boxes elevate gracefully with staggered entrances.
 */
export function installWebsiteMotion(root: HTMLElement): () => void {
  const animatedSet = new WeakSet<Element>();
  const activeAnimations = new WeakMap<Element, Animation>();
  let intersection: IntersectionObserver | undefined;
  let scrollRafId: number | undefined;

  const triggerAnimation = (element: Element) => {
    if (!(element instanceof HTMLElement) || typeof element.animate !== "function") return;
    if (element.matches("section:not(.start-a-project-section), .heading-scroll-reveal")) return;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

    // Cancel existing animation if any
    const prev = activeAnimations.get(element);
    if (prev) {
      prev.cancel();
    }

    try {
      if (element.matches(headingSelector)) {
        const startX = isMobile ? "-35px" : "-70px";
        const anim = element.animate(
          [
            { opacity: 0.15, transform: `translateX(${startX})`, filter: "blur(2px)" },
            {
              opacity: 0.95,
              transform: `translateX(${isMobile ? "-10px" : "-18px"})`,
              filter: "blur(0.5px)",
              offset: 0.35,
            },
            { opacity: 1, transform: "translateX(0)", filter: "blur(0)", offset: 1 },
          ],
          {
            duration: 850,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        activeAnimations.set(element, anim);
      } else if (element.matches(lineSelector)) {
        const anim = element.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
          duration: 850,
          delay: 120,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          fill: "both",
        });
        activeAnimations.set(element, anim);
      } else if (element.matches(cardSelector)) {
        const anim = element.animate(
          [
            { opacity: 0.35, transform: "translateY(32px) scale(0.98)" },
            { opacity: 1, transform: "translateY(0) scale(1)" },
          ],
          {
            duration: 800,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            fill: "both",
          },
        );
        activeAnimations.set(element, anim);
      }
    } catch {
      // Graceful fallback
    }
  };

  const resetAnimation = (element: Element) => {
    const anim = activeAnimations.get(element);
    if (anim) {
      anim.cancel();
      activeAnimations.delete(element);
    }
  };

  const checkElementsInView = () => {
    if (typeof window === "undefined") return;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elements = root.querySelectorAll(`${headingSelector}, ${lineSelector}, ${cardSelector}`);

    elements.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      if (element.matches("section:not(.start-a-project-section), .heading-scroll-reveal")) return;

      const rect = element.getBoundingClientRect();
      const inView = rect.top <= windowHeight - 20 && rect.bottom >= 20;

      if (inView) {
        if (!animatedSet.has(element)) {
          animatedSet.add(element);
          triggerAnimation(element);
        }
      } else {
        if (animatedSet.has(element)) {
          animatedSet.delete(element);
          resetAnimation(element);
        }
      }
    });
  };

  const onScrollOrResize = () => {
    if (scrollRafId !== undefined) return;
    scrollRafId = window.requestAnimationFrame(() => {
      scrollRafId = undefined;
      checkElementsInView();
    });
  };

  if (typeof IntersectionObserver !== "undefined") {
    intersection = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target;
          if (!(el instanceof HTMLElement)) continue;

          if (entry.isIntersecting) {
            if (!animatedSet.has(el)) {
              animatedSet.add(el);
              triggerAnimation(el);
            }
          } else {
            if (animatedSet.has(el)) {
              animatedSet.delete(el);
              resetAnimation(el);
            }
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -20px 0px",
      },
    );
  }

  const registerElements = () => {
    const elements = root.querySelectorAll(`${headingSelector}, ${lineSelector}, ${cardSelector}`);
    elements.forEach((el) => {
      if (el.matches("section:not(.start-a-project-section), .heading-scroll-reveal")) return;
      intersection?.observe(el);
    });
  };

  const observe = () => {
    registerElements();
    checkElementsInView();
  };

  // Register straight away so content animates as soon as it is on the page
  // instead of waiting on a timer. Anything React mounts afterwards is picked
  // up by the mutation watch below.
  observe();

  let mutations: MutationObserver | undefined;
  if (typeof MutationObserver !== "undefined") {
    mutations = new MutationObserver(() => registerElements());
    mutations.observe(root, { childList: true, subtree: true });
  }

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
  }

  return () => {
    mutations?.disconnect();
    intersection?.disconnect();
    if (typeof window !== "undefined") {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (scrollRafId !== undefined) {
        window.cancelAnimationFrame(scrollRafId);
      }
    }
  };
}
