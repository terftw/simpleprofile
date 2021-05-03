import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './dropzone.css';

const Dropzone = (props) => {
    const [files, setFiles] = useState([]);
    const [invalid, setInvalid] = useState(false);

    const { 
        getRootProps, 
        getInputProps,
        fileRejections
    } = useDropzone({
        accept: "image/png, image/jpg, image/jpeg",
        multiple: false,
        onDrop: (acceptedFiles, rejectedFiles) => {
            if (acceptedFiles.length) {
                const files = acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                );
                setFiles(files);
                setInvalid(false);
                props.imageOk();
            } else if (rejectedFiles.length) {
                setFiles([]);
                setInvalid(true);
                props.imageNotOk();
            }
        }
    });

    const removeFile = file => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setInvalid(false);
        setFiles(newFiles);
    };

    const uploadPicture = () => {
        props.onSubmit(files[0], props.image);
        removeFile(files[0])
    }

    const fileRejectionsItems = fileRejections.map(( { file } ) => (
        <span key={file.name}>
            {file.path.substring(0, 9)}... - {file.size} bytes
        </span>
    ));

    useEffect(
        () => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
        },
        [files]
    );

    return (
        <div className="image-field">
            <div className="image-container">
                <div className="image-link">
                    <img 
                        className="circular ui image profile-image" 
                        src={files.length ? files[0].preview : "https://firebasestorage.googleapis.com/v0/b/glints-demo.appspot.com/o/images%2Fplaceholder.png?alt=media&token=5131e7e2-7a74-492e-8389-e63ffc0234d6"}
                    />
                    <label className="image-preview">Image Preview</label>
                </div>
                <div className="dropzone-container">
                    <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span>Drag or click here to upload image</span>
                    </div>
                    <div>
                        <span className="upload-error">{invalid ? "only .png, .jpg and .jpeg image files are accepted": null} <br></br> {fileRejectionsItems}</span>
                        
                    </div>
                    <div className="button-container">
                        <a
                            className="ui button green"
                            onClick={uploadPicture}
                        >
                            Submit
                        </a>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Dropzone;
