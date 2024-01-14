interface FileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): ReadableStream | null;
}
