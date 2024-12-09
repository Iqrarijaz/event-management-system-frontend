import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl, DOCUMENTS } from "@/config";
import { useQueryClient } from "react-query";

const UploadDocument = ({ type, setLoader }) => {
  const queryClient = useQueryClient();
  const handleUpload = async (options) => {
    setLoader(true);
    const { file } = options;
    const formData = new FormData();
    formData.append("documents", file);
    formData.append("type", type);

    try {
      const local = JSON.parse(localStorage.getItem("userData"));
      const response = await axios.post(
        `${baseUrl}/api/admin/upload_document`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: local?.token,
          },
        }
      );
      toast.success(response.data?.message || "Document uploaded successfully");
      setLoader(false);
      queryClient.invalidateQueries([
        "document",
        DOCUMENTS.PROGRAM_POLICY,
      ]);
    } catch (error) {
      toast.error(
        response.data?.message ||
          "Something went wrong while uploading document"
      );
      setLoader(false);
    }
  };

  return (
    <Upload
      name="file"
      customRequest={handleUpload}
      fileList={[]}
      onChange={({ file }) => {
        if (file.status === "done") {
          onSuccess(file);
        } else if (file.status === "error") {
          onError(file);
        }
      }}
    >
      <Button className="add-button" icon={<UploadOutlined />}>
        Upload Document
      </Button>
    </Upload>
  );
};

export default UploadDocument;
