"use client";

import { ChangeEvent, useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
//@ts-ignore
import { Progress } from "react-sweet-progress";
import "react-sweet-progress/lib/style.css";
import { Controller, UseFormRegister, Control } from "react-hook-form";
import { uploadImage } from "@/lib/firebase/storage";
import { UserRecord } from "firebase-admin/auth";
import { v4 } from "uuid";

interface DropzoneProps {
  purpose: string;
  initialState: string[];
  onDropChange: Function
}
export default function DropzoneV2(props: DropzoneProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(props?.initialState?.[1] ? 100 : 0);
  const [uploadError, setUploadError] = useState(false);
  var onDropChange = useRef((...event: any) => {});

  const onUploadProgress = (_progress: number) => {
    setProgress(_progress);
  };

  const onUploadError = (error: any) => {
    console.log(error);
    setUploadError(true);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do something with the files
    setUploadError(false);
    if (!acceptedFiles) {
      console.log("No files");
      return;
    }
    await uploadImage(
      `/${props.purpose}/${v4()}`,
      acceptedFiles[0],
      (_progress: number) => {
        onUploadProgress(_progress);
      },
      onUploadError,
      (imageFileName, ImageUrl) => {
        setPreview(ImageUrl);
        onDropChange.current([imageFileName, ImageUrl]);
        props.onDropChange([imageFileName, ImageUrl])
         console.log('saved url')
      }
    );
  }, []);
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
      accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    });

  return (
    <div
      {...getRootProps({ className: "flex w-full flex-col border-[2px] p-2 " })}
    >
      <input
        {...getInputProps({
          onChange: (e) => {
            // upload to firebase
            // console.log('on change', acceptedFiles)
          },
        })}
      />

      <div className="flex flex-col sm:flex-row p-2 gap-3 items-center">
        <Image
          src={preview || props.initialState?.[1] || "/upload.png"}
          unoptimized
          width={0}
          height={0}
          alt={`uploadcompanyimg `}
          className={
            " rounded-xl object-cover" +
            (preview ? " w-[150px] h-[100px] " : " w-[80px] h-[80px]")
          }
        ></Image>
        <div className="flex flex-col justify-center pl-2 pr-2 pt-2 pb-2 ">
          {isDragActive ? (
            <p className="font-poppins text-center text-bloomblue">
              Drop the image here ...
            </p>
          ) : (
            <p className="font-poppins text-center text-bloomblue">
              Upload Company Logo
            </p>
          )}
        </div>
      </div>
      <div className="ml-2 mr-2">
        <Progress
          percent={Number(progress.toFixed(1))}
          status={
            uploadError ? "error" : progress === 100 ? "success" : "active"
          }
        />
      </div>
    </div>
  );
}
