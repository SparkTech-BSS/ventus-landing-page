import React, {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import Image from "next/future/image";

import { useToasts } from "react-toast-notifications";

import { v4 } from "uuid";

import { storage } from "../../../config/firebase";

import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

import { Loading } from "components/Loading";

import { formatFileSize } from "utils";

import { CgImage } from "react-icons/cg";

import { MAX_EVENT_IMAGE_ALLOWED_SIZE } from "config";

import styles from "./styles.module.scss";

interface Props {
  setEventImage: Dispatch<SetStateAction<string>>;
}

export function UploadImageEvent({ setEventImage }:Props) {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSelectedFile, setIsSelectedFile] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | any>();

  const [fileUploaded, setFileUploaded] = useState("");

  const [error, setError] = useState(false);

  const { addToast } = useToasts();

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const imageListRef = ref(storage, "images/");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      setFileUploaded("");
      return;
    }

    if (file?.size > MAX_EVENT_IMAGE_ALLOWED_SIZE) {
      addToast("Tamanho da imagem superior a 2mb ...", {
        appearance: "error",
        autoDismiss: true,
      });
      setFileUploaded("");
      setEventImage("");
      return;
    }

    const imageRef = ref(storage, `images/${file?.name + v4()}`);

    setIsLoading(true);

    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // setImageList((prev: any) => [...prev, url])
        console.log(url)
        setEventImage(url);
      });
      setIsLoading(false);
      setIsSelectedFile(true);

    });

    setIsLoading(true);
    setSelectedFile(file);

    // setTimeout(() => {
    //   setIsLoading(false);
    //   setSelectedFile(file);
    //   setIsSelectedFile(true);
    // }, 2000);
  };

  function handleRemoveFile() {
    setSelectedFile(undefined);
    setIsSelectedFile(false);
    setSelectedFile("");
    setEventImage("");
  }

  return (
    <div className={`${styles["upload-image-event-wrapper"]}`}>
      <label className={styles["label"]}>Image de divulgação (opcional)</label>

      <div className={`${styles["upload-image-event-row"]}`}>
        <div className={`${styles["upload-image-event-box"]}`}>
          {isLoading ? (
            <div className={styles["upload-image-event-box__loader"]}>
              <Loading />
            </div>
          ) : (
            <>
              {isSelectedFile || selectedFile ? (
                <div className={`${styles["upload-image-event-box__full"]}`}>
                  <Image
                    src={URL?.createObjectURL(selectedFile)}
                    alt=""
                    loading="lazy"
                    width={100}
                    height={100}
                    className={styles["event-image"]}
                  />
                </div>
              ) : (
                <div className={`${styles["upload-image-event-box__empty"]}`}>
                  <CgImage size={30} color="#939598" />
                  <span
                    className={`${styles["upload-image-event-box__empty--text"]}`}
                  >
                    Clique ou arraste a imagem aqui
                  </span>
                  <input
                    type="file"
                    value=""
                    onChange={changeHandler}
                    accept=".png, .jpg, .jpeg"
                    ref={inputRef}
                  />
                </div>
              )}
            </>
          )}
        </div>

        <div className={`${styles["upload-image-event-info"]}`}>
          {isSelectedFile && (
            <div className={`${styles["upload-image-event-info-group-btn"]}`}>
              <button
                className={`${styles["upload-image-event-info-btn"]} ${styles["upload-image-event-info-btn-change"]}`}
                type="button"
              >
                TROCAR IMAGEM
                <input
                  type="file"
                  value=""
                  onChange={changeHandler}
                  accept=".png, .jpg, .jpeg"
                  ref={inputRef}
                />
              </button>

              <button
                className={`${styles["upload-image-event-info-btn"]} ${styles["upload-image-event-info-btn-remove"]}`}
                type="button"
                onClick={handleRemoveFile}
              >
                REMOVER
              </button>
            </div>
          )}

          <p className={`${styles["upload-image-event-info--text"]}`}>
            A dimensão recomendada é de <span>1280 x 621</span> (mesma proporção
            do formato utilizado nas páginas de evento no Facebook). Formato{" "}
            <span>JPEG, GIF ou PNG de no máximo 2MB</span>. Imagens com
            dimensões diferentes serão redimensionadas.
          </p>
        </div>
      </div>
    </div>
  );
}
