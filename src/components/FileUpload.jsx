import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

export default class FileUpload extends React.Component {
  static propTypes = {
    handleFileChange: PropTypes.func.isRequired,
    files: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  onDrop = (files) => {
    this.props.handleFileChange(files);
  };

  render() {
    const file = this.props.files[0];

    return (
      <div className="dropzone">
        <Dropzone
          onDrop={this.onDrop}
          multiple={false}
          accept="image/jpeg, image/png"
          className="dropzone__preview"
          style={{
            backgroundImage: `url(${file && file.preview})`,
          }}
        >
          <div>{!file && 'Сюда можно добавить картинку'}</div>
        </Dropzone>
      </div>
    );
  }
}
