import React from "react";
import swal from "sweetalert";
import ImagesList from "./components/ImagesList";
import Playground from "./components/Playground";
import "./css/main.css";
class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      imageIsAboveDropzone: false,
      activeImages: new Set(),
      pendingImages: new Set(),
      photoSize: 200,
      playgroundWidth: 760,
      playgroundHeight: 300
    };
    this.playgroundRef = React.createRef();
    this.fileBtnRef = React.createRef();
  }
  activateAllImages = () => {
    this.setState(state => {
      return {
        pendingImages: new Set(),
        activeImages: new Set([...state.activeImages, ...state.pendingImages])
      };
    });
  };
  uploadFileHandler = file => {
    if (file === undefined) {
      return;
    }
    if (file.size > 1048576) {
      swal("The image exceedes the size limit (1MB)");
      return;
    }
    if (this.state.activeImages.size + this.state.pendingImages.size === 10) {
      swal("The maximum amount of images is uploaded (10)");
      return;
    }
    this.setState(state => {
      return {
        imageIsAboveDropzone: false,
        pendingImages: state.pendingImages.add({
          name: file.name,
          url: URL.createObjectURL(file),
          leftOffset: Math.floor(
            Math.random() * (state.playgroundWidth - state.photoSize + 1)
          ),
          topOffset: Math.floor(
            Math.random() * (state.playgroundHeight - state.photoSize + 1)
          )
        })
      };
    });
  };
  dragHandler = event => {
    event.persist();
    event.stopPropagation();
    event.preventDefault();
    switch (event.type) {
      case "dragenter":
      case "dragover":
        if (event.target.matches(".upload")) {
          this.setState({
            imageIsAboveDropzone: true
          });
        } else {
          this.setState({
            imageIsAboveDropzone: false
          });
        }

        break;
      case "dragleave":
        this.setState({
          imageIsAboveDropzone: false
        });
        break;
      case "drop":
        if (event.target.matches(".upload")) {
          this.uploadFileHandler(event.dataTransfer.files[0]);
        }
        break;
      default:
        break;
    }
    return false;
  };
  uploadBtnHandler = event => {
    event.persist();
    this.uploadFileHandler(event.nativeEvent.srcElement.files["0"]);
  };
  uploadClick = () => {
    this.fileBtnRef.current.click();
  };
  render() {
    return (
      <main className="main">
        <header className="header">
          <h1 className="header__title">
            upload images
            <br />
            drag them around on a playground
          </h1>
        </header>
        <div className="inner">
          <div
            onDragEnter={this.dragHandler}
            onDragLeave={this.dragHandler}
            onDrop={this.dragHandler}
            className={
              this.state.imageIsAboveDropzone
                ? "upload upload--drag-enter"
                : "upload"
            }
          >
            <button onClick={this.uploadClick} className="upload__btn">
              select an image
            </button>
            <span className="upload__divider">or</span>
            <p className="upload__drop">drop it here</p>
            <input
              type="file"
              className="upload__hidden-btn"
              accept="image/*"
              onChange={this.uploadBtnHandler}
              ref={this.fileBtnRef}
            />
          </div>
          <div
            className={
              this.state.activeImages.size === 0
                ? "images-list-container images-list-container--pending"
                : "images-list-container"
            }
          >
            <header className="images-list-header">images list</header>
            <ImagesList activeImages={this.state.activeImages} />
          </div>
        </div>
        <button
          className={
            this.state.pendingImages.size === 0
              ? "add-to-playground add-to-playground--pending"
              : "add-to-playground"
          }
          onClick={this.activateAllImages}
        >
          add {this.state.pendingImages.size}{" "}
          {this.state.pendingImages.size === 1 ? "image" : "images"} to the
          playground
        </button>

        <Playground
          activeImages={this.state.activeImages}
          ref={this.playgroundRef}
          playgroundWidth={this.state.playgroundWidth}
          playgroundHeight={this.state.playgroundHeight}
        />
      </main>
    );
  }
  componentDidMount() {
    const preventDefaultAction = event => {
      event.preventDefault();
    };
    window.addEventListener("dragenter", preventDefaultAction);
    window.addEventListener("dragover", preventDefaultAction);
    window.addEventListener("drop", preventDefaultAction);
  }
}

export default Game;
