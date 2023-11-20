/** Info
 * autoScroll_onHover is used in User_comp
 *
 * it checks if the scroll container is smaller than the element
 * then adds a scrollEffect
 */
export function scrollEffect_onHover(event) {
  const element = event.target.querySelector("span");
  const scroll = event.target.querySelector("div");

  if (element.getAnimations().length) {
    element.getAnimations()[0].cancel();
  }

  if (scroll.offsetWidth < element.offsetWidth) {
    const elementOverFlow = element.offsetWidth - scroll.offsetWidth;

    element.animate(
      [
        { transform: "translateX(0)" },
        {
          transform: `translateX(0)`,
        },
        {
          transform: `translateX(-${elementOverFlow + 8}px)`,
        },
        {
          transform: `translateX(-${elementOverFlow + 8}px)`,
        },
        {
          transform: `translateX(0)`,
        },
      ],
      {
        duration: 3000,
        easing: "linear",
        fill: "forwards",
        iterations: Infinity,
      },
    );

    event.target.onmouseout = () => {
      element.getAnimations().forEach((animation) => {
        animation.cancel();
      });
    };
  }
}
