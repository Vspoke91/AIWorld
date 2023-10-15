import "@/src/assets/custom/CustomAnimations.css";

/**How to use?
 * targetElement has to be have a style of "pointer-events: none;"
 * and has to be the first child with that tag
 */
export function autoScrollOnHover(event) {
  const animationClass = "custom__HorizontalSliderShower_ChildrenSpan";
  const element = event.target.querySelector("span");

  if (element.clientWidth < element.scrollWidth) {
    event.target.classList.add(animationClass);
  } else {
    event.target.classList.remove(animationClass);
  }
}

export function autoScrollUnHover(event) {
  const animationClass = "custom__HorizontalSliderShower_ChildrenSpan";
  const element = event.target.querySelector("span");

  if (element.clientWidth < element.scrollWidth) {
    event.target.classList.add(animationClass);
  } else {
    event.target.classList.remove(animationClass);
  }
}
