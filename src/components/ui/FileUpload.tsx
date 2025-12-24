'use client';

import { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, X, FileImage, FileVideo, File } from 'lucide-react';

interface FileWithPreview {
    file: File;
    preview: string;
    type: 'image' | 'video' | 'document';
}

interface FileUploadProps {
    files: FileWithPreview[];
    onFilesChange: (files: FileWithPreview[]) => void;
    maxFiles?: number;
    maxSizeMB?: number;
}

export default function FileUpload({
    files,
    onFilesChange,
    maxFiles = 5,
    maxSizeMB = 10
}: FileUploadProps) {
    const [dragOver, setDragOver] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const getFileType = (file: File): 'image' | 'video' | 'document' => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        return 'document';
    };

    const validateFile = (file: File): string | null => {
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            return `ไฟล์ ${file.name} มีขนาดเกิน ${maxSizeMB}MB`;
        }

        const allowedTypes = [
            'image/jpeg', 'image/png', 'image/gif', 'image/webp',
            'video/mp4', 'video/mov', 'video/webm',
            'application/pdf'
        ];

        if (!allowedTypes.includes(file.type)) {
            return `ไม่รองรับไฟล์ประเภท ${file.type}`;
        }

        return null;
    };

    const processFiles = (fileList: FileList) => {
        setError(null);

        if (files.length + fileList.length > maxFiles) {
            setError(`สามารถอัปโหลดได้สูงสุด ${maxFiles} ไฟล์`);
            return;
        }

        const newFiles: FileWithPreview[] = [];

        Array.from(fileList).forEach(file => {
            const validationError = validateFile(file);
            if (validationError) {
                setError(validationError);
                return;
            }

            const type = getFileType(file);
            const preview = type !== 'document' ? URL.createObjectURL(file) : '';

            newFiles.push({ file, preview, type });
        });

        if (newFiles.length > 0) {
            onFilesChange([...files, ...newFiles]);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(false);

        if (e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
        // Reset input
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    const removeFile = (index: number) => {
        const newFiles = [...files];
        // Revoke object URL to prevent memory leaks
        if (newFiles[index].preview) {
            URL.revokeObjectURL(newFiles[index].preview);
        }
        newFiles.splice(index, 1);
        onFilesChange(newFiles);
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image':
                return <FileImage className="w-8 h-8 text-indigo-400" />;
            case 'video':
                return <FileVideo className="w-8 h-8 text-pink-400" />;
            default:
                return <File className="w-8 h-8 text-cyan-400" />;
        }
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                className={`upload-area ${dragOver ? 'dragover' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf"
                    onChange={handleFileInput}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-foreground font-medium">
                            ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือก
                        </p>
                        <p className="text-sm text-foreground/40 mt-1">
                            รองรับ: รูปภาพ (JPG, PNG, GIF), วิดีโอ (MP4, MOV), PDF
                        </p>
                        <p className="text-xs text-foreground/30 mt-1">
                            ขนาดสูงสุด {maxSizeMB}MB ต่อไฟล์ | สูงสุด {maxFiles} ไฟล์
                        </p>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* File Previews */}
            {files.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {files.map((fileData, index) => (
                        <div key={index} className="file-preview">
                            {fileData.type === 'image' ? (
                                <img src={fileData.preview} alt={fileData.file.name} />
                            ) : fileData.type === 'video' ? (
                                <video src={fileData.preview} />
                            ) : (
                                <div className="h-[120px] flex items-center justify-center">
                                    {getFileIcon(fileData.type)}
                                </div>
                            )}

                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-linear-to-t from-black/80 to-transparent">
                                <p className="text-xs text-white truncate">{fileData.file.name}</p>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                className="remove-btn"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export type { FileWithPreview };
