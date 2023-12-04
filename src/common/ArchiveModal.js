import {
  CButton,
  CInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
} from "@coreui/react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../config";
import Dropzone from "./Dropzone/Dropzone";
import Progress from "./Progress/Progress";

const ArchiveModal = ({ modal, toggle, data }) => {
  const [uploading, setUploading] = useState(false);
  const [successfullUploaded, setSuccessfullUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [files, setFiles] = useState([]);
  const onFilesAdded = (array) => {
    const newArray = array.map((file, index) => {
      return { id: index, title: "", file: file };
    });
    setFiles(files.concat(newArray));
  };

  const onChangeTitle = (title, index) => {
    let res = files.map((a) => {
      return { ...a };
    });
    res.find((a) => a.id == index).title = title.target.value;
    setFiles(res);
  };

  const renderProgress = (file) => {
    const uploadProgressFile = uploadProgress[file.name];
    if (uploading || successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress
            progress={uploadProgressFile ? uploadProgressFile.percentage : 0}
          />
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="CheckIcon"
            style={{
              opacity:
                uploadProgressFile && uploadProgressFile.state === "done"
                  ? 0.5
                  : 0,
            }}
          />
        </div>
      );
    }
  };

  const uploadFiles = async () => {
    setUploadProgress(true);
    setUploading(true);
    const promises = [];
    files.forEach(({ file, title }) => {
      promises.push(sendRequest(file, title));
    });
    try {
      await Promise.all(promises);
      setSuccessfullUploaded(true);
      setUploading(false);
      toast.success("Dossiers archivés avec success!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      // console.log(e);
      // Not Production ready! Do some error handling here instead...
      // this.setState({ successfullUploaded: true, uploading: false });
    }
  };

  const sendRequest = (file, title) => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("title", title);
      formData.append("matricule", data.matricule);

      const idArchive = data.personnelIdArchive;

      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const copy = { ...uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100,
          };
          setUploadProgress(copy);
        }
      });

      req.upload.addEventListener("load", (event) => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        setUploadProgress(copy);
        resolve(req.response);
      });

      req.upload.addEventListener("error", (event) => {
        const copy = { ...uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        setUploadProgress(copy);
        reject(req.response);
      });

      req.open("POST", `${API_URL}/personnels/upload/${idArchive}`);
      req.send(formData);
    });
  };

  const renderActions = () => {
    if (successfullUploaded) {
      return (
        <CButton
          color="primary"
          onClick={() => {
            setFiles([]);
            setSuccessfullUploaded(false);
          }}
        >
          Nettoyer
        </CButton>
      );
    } else if (files && files.length >= 1) {
    } else {
      return (
        <CButton
          color="primary"
          disabled={files.length < 0 || uploading}
          onClick={uploadFiles}
        >
          Cliquez ici pour archiver
        </CButton>
      );
    }
  };
  return (
    <CModal size="xl" show={modal} onClose={toggle} color="info">
      <CModalHeader closeButton>{data ? data.nomsPrenoms : ""}</CModalHeader>
      <CModalBody>
        <div className="CardDropZone">
          <Dropzone
            onFilesAdded={onFilesAdded}
            disabled={uploading || successfullUploaded}
          />
          <div className="Files">
            {files.map((file, index) => {
              return (
                <div key={file?.file?.name} className="Row">
                  <span className="Filename">{file?.file?.name}</span>
                  <CInput
                    type="text"
                    required
                    placeholder="Le titre du document"
                    onChange={(value) => onChangeTitle(value, index)}
                  />
                  {renderProgress(file)}
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-between">
        <CButton
          color="danger"
          onClick={() => {
            setFiles([]);
            setSuccessfullUploaded(false);
          }}
        >
          Vider les champs
        </CButton>
        <CButton
          color="primary"
          disabled={files.length < 0 || uploading}
          onClick={uploadFiles}
        >
          Cliquez ici pour archiver
        </CButton>
        <CButton color="secondary" onClick={toggle}>
          Fermer
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default ArchiveModal;
