import "@/src/assets/custom/CustomAnimations.css";

/**How to use?
 * targetElement has to be have a style of "pointer-events: none;"
 * and has to be the first child with that tag
 */
export function autoScrollOnHover(event) {
  const element = event.target.querySelector("span");
  const scroll = event.target.querySelector("div");

  if (element.getAnimations().length) {
    element.getAnimations()[0].cancel();
  }

  if (scroll.offsetWidth < element.offsetWidth) {
    const difference = element.offsetWidth - scroll.offsetWidth;

    element.animate(
      [
        { transform: "translateX(0)", offset: 0 },
        {
          transform: `translateX(-${difference + 3}px)`,
          offset: 0.6,
        },
        {
          transform: `translateX(-${difference + 3}px)`,
          offset: 0.7,
        },
        { transform: "translateX(0)", offset: 0.9 },
      ],
      {
        duration: difference * 50,
        iterations: Infinity,
        direction: "normal",
        easing: "linear",
      },
    );
  }
}

export function autoScrollUnHover(event) {
  const element = event.target.querySelector("span");

  if (element.getAnimations().length) {
    element.getAnimations()[0].cancel();
  }
}
