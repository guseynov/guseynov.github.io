import React, { useEffect } from "react";
import { useLocalStore, observer } from "mobx-react";
import "./bubble.scss";

export const Bubble = observer(() => {
  const bubbleStore = useLocalStore(() => ({
    states: [
      {
        shape: "expanding",
        text: "breathe in",
      },
      {
        shape: "expanding",
        text: "hold",
      },
      {
        shape: "shrinking",
        text: "breathe out",
      },
    ],
    activeState: 0,
    pause: false,
    toggle() {
      bubbleStore.pause = !bubbleStore.pause;
    },
    nextStage() {
      switch (this.activeState) {
        case 0:
          this.activeState++;
          this.bubbleClass = "bubble--" + this.states[1].shape;
          break;
        case 1:
          this.activeState++;
          this.bubbleClass = "bubble--" + this.states[2].shape;
          break;
        case 2:
          this.activeState = 0;
          this.bubbleClass = "bubble--" + this.states[0].shape;
          break;
        default:
          break;
      }
    },
    bubbleClass: "bubble--static bubble--inactive",
  }));

  useEffect(() => {
    setTimeout(() => {
      bubbleStore.bubbleClass = "bubble--" + bubbleStore.states[1].shape;
      setInterval(bubbleStore.nextStage, 3333);
    }, 1000);
  }, [bubbleStore.nextStage, bubbleStore]);

  return (
    <div className={`bubble ${bubbleStore.bubbleClass}`}>
      <div className="bubble__outer">
        <span className="bubble__box">
          <span className="bubble__point bubble__point--current"></span>
        </span>
        <span className="bubble__point bubble__point--top"></span>
        <span className="bubble__point bubble__point--right"></span>
        <span className="bubble__point bubble__point--left"></span>
        <div className="bubble__inner">
          <p className="bubble__text">
            {bubbleStore.states[bubbleStore.activeState].text}
          </p>
        </div>
      </div>
    </div>
  );
});
