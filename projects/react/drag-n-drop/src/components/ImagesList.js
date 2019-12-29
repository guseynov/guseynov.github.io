import React from "react";

class ImagesList extends React.Component {
  render() {
    let listItems = [];
    let index = 0;
    this.props.activeImages.forEach(image => {
      listItems.push(<li key={image.name + index}>{image.name}</li>);
      index++;
    });
    return <ul className="images-list">{listItems}</ul>;
  }
}

export default ImagesList;
