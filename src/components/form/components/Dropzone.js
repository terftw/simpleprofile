import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './dropzone.css';

const Dropzone = (props) => {
    const [files, setFiles] = useState([]);
    const [invalid, setInvalid] = useState(false);
    const [hasFile, setHasFile] = useState(true);

    const { 
        getRootProps, 
        getInputProps,
        fileRejections
    } = useDropzone({
        accept: "image/png, image/jpg, image/jpeg",
        multiple: false,
        onDrop: (acceptedFiles, rejectedFiles) => {
            props.promptSwitchOff();
            if (acceptedFiles.length) {
                const files = acceptedFiles.map(file =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file)
                    })
                );

                props.pendingSwitch(true)
                setFiles(files);
                setInvalid(false);
            } else if (rejectedFiles.length) {
                setFiles([]);
                setInvalid(true);
            }

            setHasFile(true);
        }
    });

    const removeFile = file => () => {
        const newFiles = [...files];
        newFiles.splice(newFiles.indexOf(file), 1);
        setInvalid(false);
        setFiles(newFiles);

        props.pendingSwitch(false)
        props.promptSwitchOff();
    };

    const discardPicture = event => {
        removeFile(files[0])();
        event.preventDefault();
    }

    const uploadPicture = event => {
        if (files.length === 0) {
            setHasFile(false);
        } else if (hasFile) {
            if (props.onSubmit) {
                props.onSubmit(files[0], props.image);
            } else if (props.onLogoUpload) {
                props.onLogoUpload(files[0]);
            }
    
            removeFile(files[0])();
        }

        event.preventDefault();
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

    const submitDisabled = files.length === 0 ? "disabled" : "";
    console.log(files.length && files[0].preview);

    return (
        <div className="image-field">
            <div className="image-container">
                <div className="image-link">
                    <div className="image-wrapper">
                        <img 
                            className="circular ui image profile-image" 
                            src={files.length ? files[0].preview : props.online ? props.image : props.image.preview}
                            alt="preview"
                        />
                    </div>       
                    <label className="image-preview">{files.length ? "Image Preview" : "Current Image"}</label>
                </div>
                <div className="dropzone-container">
                    <div className="dropzone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <span>Drag or click here to upload image</span>
                    </div>
                    <div>
                        <span className="upload-error">
                            { invalid && "only .png, .jpg and .jpeg image files are accepted" }
                            { props.uploadPrompt && "You have a pending image upload"}
                            { !hasFile && "Please give us a file to upload" }
                            <br></br>
                            { invalid && fileRejectionsItems }
                        </span>    
                    </div>
                    <div className="button-container">
                        <button
                            className={`ui button ${submitDisabled}`}
                            onClick={discardPicture}
                        >
                            Discard
                        </button>
                        <button
                            className={`ui button green ${submitDisabled}`}
                            onClick={uploadPicture}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>    
    );
}

export default Dropzone;
