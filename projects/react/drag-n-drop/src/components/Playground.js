import React from "react";

class PlaygroundComponent extends React.Component {
  render() {
    let images = [];
    let index = 1;
    this.props.activeImages.forEach(image => {
      images.push(
        <figure
          data-x-offset="0"
          data-y-offset="0"
          draggable="true"
          key={image.name + index}
          style={{
            backgroundImage: `url(${image.url})`,
            top: `${image.topOffset}px`,
            left: `${image.leftOffset}px`,
            zIndex: index
          }}
          className="playground__image"
        ></figure>
      );
      index++;
    });

    return (
      <div className="playground" ref="{this.props.innerRef}">
        {images}
      </div>
    );
  }
  componentDidUpdate() {
    const playgroundWidth = this.props.playgroundWidth;
    const playgroundHeight = this.props.playgroundHeight;
    const playground = document.querySelector(".playground");

    playground.addEventListener("mousedown", dragStart, false);
    playground.addEventListener("mouseup", dragEnd, false);
    playground.addEventListener("mousemove", drag, false);

    function dragStart(e) {
      if (e.target.className === "playground__image") {
        e.target.setAttribute("data-active", "true");
        e.target.setAttribute(
          "data-initial-x",
          e.clientX - e.target.getAttribute("data-x-offset")
        );
        e.target.setAttribute(
          "data-initial-y",
          e.clientY - e.target.getAttribute("data-y-offset")
        );
      }
    }

    function dragEnd(e) {
      e.target.setAttribute(
        "data-initial-x",
        e.target.getAttribute("data-current-x")
      );
      e.target.setAttribute(
        "data-initial-y",
        e.target.getAttribute("data-current-y")
      );
      e.target.setAttribute("data-active", "false");
    }

    function drag(e) {
      if (e.target.getAttribute("data-active") === "true") {
        e.preventDefault();

        e.target.setAttribute(
          "data-current-x",
          e.clientX - e.target.getAttribute("data-initial-x")
        );
        e.target.setAttribute(
          "data-current-y",
          e.clientY - e.target.getAttribute("data-initial-y")
        );

        e.target.setAttribute(
          "data-x-offset",
          e.target.getAttribute("data-current-x")
        );
        e.target.setAttribute(
          "data-y-offset",
          e.target.getAttribute("data-current-y")
        );

        setTranslate(
          e.target.getAttribute("data-current-x"),
          e.target.getAttribute("data-current-y"),
          e.target
        );
      }
    }

    function setTranslate(xPos, yPos, el) {
      if (
        parseInt(el.style.left, 10) + parseInt(xPos, 10) >= 0 &&
        parseInt(el.style.left, 10) + parseInt(xPos, 10) <= playgroundWidth &&
        parseInt(el.style.top, 10) + parseInt(yPos, 10) >= 0 &&
        parseInt(el.style.top, 10) + parseInt(yPos, 10) <= playgroundHeight
      ) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
      }
    }
  }
}

const Playground = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="playground-container">
      <PlaygroundComponent {...props} />
    </div>
  );
});

export default Playground;
