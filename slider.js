(function initSlider() {
  class Slider {
    constructor(selector = ".slides", time = 500) {
      this.container = document.querySelector(selector);
      this.slidesCount = this.container.children.length;
      this.slidesWidth = 100 / this.slidesCount;
      this.canChange = true;
      this.setTime = { duration: time, easing: "ease-in-out" };

      this.animationNext = [
        {
          gridTemplateColumns: ` 0% ${this.gridTemplateColumns(
            this.slidesCount - 1,
            this.slidesWidth
          )} `,
        },
        {
          gridTemplateColumns: ` ${this.gridTemplateColumns(
            this.slidesCount,
            this.slidesWidth
          )}`,
        },
      ];
      this.animationPrev = [
        {
          gridTemplateColumns: `${this.gridTemplateColumns(
            this.slidesCount,
            this.slidesWidth
          )}`,
        },
        {
          gridTemplateColumns: `0% ${this.gridTemplateColumns(
            this.slidesCount - 1,
            this.slidesWidth
          )}`,
        },
      ];

      this.container.style.cssText = `grid-template-columns: ${this.gridTemplateColumns(
        this.slidesCount,
        this.slidesWidth
      )}; width: ${100 * this.slidesCount}%`;

      this.handleNext();
      this.handlePrev();
    }

    gridTemplateColumns(count, value) {
      let output = "";

      for (let i = 0; i < count; i++) {
        output += value + "% ";
      }

      return output;
    }

    prevSlide() {
      const lastChild = this.container.removeChild(
        this.container.lastElementChild
      );
      this.container.insertBefore(lastChild, this.container.children[0]);
    }

    nextSlide() {
      const firstChild = this.container.removeChild(this.container.children[0]);
      this.container.insertBefore(firstChild, null);
    }

    handlePrev() {
      const button = document.querySelector(".my-slider__button--prev");
      button.addEventListener("click", () => {
        if (this.canChange) {
          this.canChange = false;
          this.prevSlide();
          this.container.animate(this.animationNext, this.setTime);

          Promise.all(
            this.container
              .getAnimations()
              .map((animation) => animation.finished)
          ).then(() => {
            this.canChange = true;
          });
        }
      });
    }

    handleNext() {
      const button = document.querySelector(".my-slider__button--next");
      button.addEventListener("click", () => {
        if (this.canChange) {
          this.canChange = false;
          this.container.animate(this.animationPrev, this.setTime);

          Promise.all(
            this.container
              .getAnimations()
              .map((animation) => animation.finished)
          ).then(() => {
            this.canChange = true;
            return this.nextSlide();
          });
        }
      });
    }
  }

  if (document.querySelector(".slides")) {
    const NewSlider = new Slider();
  }
})();
